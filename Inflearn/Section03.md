# 섹션 3. 그런데 백엔드 개발자가 API를 아직 못 만들었다

[TanStack Query v5에서 변경사항](https://wonsss.github.io/library/tanstack-query-v5/)

- msw 세팅과 버전 업그레이드
  ## 💠 MSW (Mock Service Worker)
  JavaScript를 위한 API 모킹 서비스 라이브러리
  백엔드가 아직 준비되지 않을 때, 모킹 라이브러리인 msw로 미리 화면을 구성해볼 수 있다.
  만약, 백엔드가 준비되더라도 에러를 발생시켜야 하는 환경, 로그인이 되었을 때의 화면 등을 테스트 해보고 싶을 때 유용하게 사용할 수 있다.
    <aside>
    💡 Nextjs에서 아직 msw가 매끄럽게 돌아가지 않는다는 점에 주의하자.
    
    </aside>
    
    ### ✔️ MSW 설치
    
    msw 설치
    
    ```bash
    $ npm install msw --save-dev
    ```
    
    로컬의 public 폴더 아래에 세팅(초기화)
    
    /public/mockServiceWorker.js 파일이 생성되며, `--save` 옵션을 사용하면 package.json에 등록되고 msw를 업데이트 할 때마다 자동으로 해당 항목을 업데이트 한다.
    
    ```bash
    $ npx msw init public/ --save
    ```
    
    ### ✔️ mockServiceWorker.js
    
    실제 서버로 보내지는 요청이 있다면 mockServiceWorker가 가로채서 mockServiceWorker에서 응답을 준다.
    
    ## 💠 MSW 세팅하기
    
    ### src/mocks/browser.ts
    
    MSW의 경우 service worker가 브라우저의 요청(CSR에서의 요청)을 뺏어서 browser.ts로 요청을 전달한다.
    
    ```tsx
    import { setupWorker } from "msw/browser";
    import { handlers } from "./handlers";
    
    // This configures a Service Worker with the given request handlers.
    const worker = setupWorker(...handlers);
    
    export default worker;
    ```
    
    ### src/mocks/http.ts
    
    Nextjs는 서버와 클라이언트에서 동작하기 때문에 SSR 동작을 할 때에 서버에서도 MSW가 동작해야 한다.
    
    서버와 클라이언트 두 곳에서 MSW가 동작해야 하는데 아직 서버에서 MSW를 동작시키는 방식이 나오지 않아(Nextjs와 매끄럽게 호환되지 않음) Node 서버를 활용하여 임시로 MSW를 동작시킨다.
    
    즉, **http.ts 같은 경우 서버 컴포넌트에서 서버로 요청을 보낼 때 next 서버(SSR)에서의 요청을 모킹하기 위해 사용된다.**
    
    ```tsx
    import { createMiddleware } from '@mswjs/http-middleware';
    import express from 'express';
    import cors from 'cors';
    import { handlers } from './handlers';
    
    const app = express();
    const port = 9090; // 서버 포트
    
    app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200, credentials: true }));
    app.use(express.json());
    app.use(createMiddleware(...handlers));
    app.listen(port, () => console.log(`Mock server is running on port: ${port}`));
    ```
    
    ```bash
    # http-middleware: msw로 mock server를 만들기 위해 필요한 라이브러
    $ npm i -D @mswjs/http-middleware express cors @types/express @types/cors
    ```
    
    ### src/mocks/handler.ts
    
    api 별로 어떤 요청에 어떤 응답을 줄지 세팅
    
    ```tsx
    import {http, HttpResponse, StrictResponse} from 'msw'
    import {faker} from "@faker-js/faker";
    
    function generateDate() {
      const lastWeek = new Date(Date.now());
      lastWeek.setDate(lastWeek.getDate() - 7);
      return faker.date.between({
        from: lastWeek,
        to: Date.now(),
      });
    }
    const User = [
      {id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
      {id: 'zerohch0', nickname: '제로초', image: '/5Udwvqim.jpg'},
      {id: 'leoturtle', nickname: '레오', image: faker.image.avatar()},
    ]
    const Posts = [];
    
    export const handlers = [
      http.post('/api/login', () => {
        console.log('로그인');
        return HttpResponse.json(User[1], {
          headers: {
            'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
          }
        })
      }),
      http.post('/api/logout', () => {
        console.log('로그아웃');
        return new HttpResponse(null, {
          headers: {
            'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
          }
        })
      }),
    // ...
    ];
    ```
    
    ## 💠 MSW 서버 실행
    
    package.json에 서버 실행 명령 스크립트를 등록한다.
    
    `watch` 옵션으로 인해 서버 코드가 수정되면 서버가 자동으로 재시작되기 때문에 유용하게 사용할 수 있다.
    
    <aside>
    💡 **서버 코드는 수정되면 재시작 되어야 수정이 반영된다**
    
    </aside>
    
    ```json
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      **"mock": "npx tsx watch ./src/mocks/http.ts"**
    },
    ```
    
    ```bash
    $ npm run mock
    ```

- next용 msw 컴포넌트와 .env
  ## 💠 MSW 적용 분기 처리
  ### ✔️ MSW 컴포넌트 생성
  Nextjs에서 어떤 곳에서 MSW를 적용할지 분기 처리를 하기 위해서는 컴포넌트를 별도로 생성해주면 된다.
  ```tsx
  // src\app\_component\MSWCoponent.tsx
  // 로그인 전이나, 로그인 후에 동일하게 사용되므로 app 폴더 하위에 컴포넌트를 생성해준다.
  "use client";
  import { useEffect } from "react";

  export const MSWComponent = () => {
    useEffect(() => {
      if (typeof window !== "undefined") {
        if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
          // NEXT_PUBLIC_API_MOCKING 환경 변수가 enabled일 때 MSW 실행
          require("@/mocks/browser");
        }
      }
    }, []);

    return null;
  };
  ```
    <aside>
    💡 MSW가 v2로 업그레이드 되면서 `if (typeof window !== "undefined")` 로 감싸주게 바뀌었다. window가 undefined가 아니다 ⇒ window 가 존재한다 ⇒  클라이언트 환경, 즉 브라우저이다 ⇒ if문 안의 코드가 브라우저에서만 돌아가게끔 보장된다.
    
    </aside>
    
    ### ✔️ .env.local 파일 생성
    
    `.env` 파일에 환경 변수를 선언하게 되면 배포 환경에도 해당 환경 변수가 적용된다.
    
    하지만 MSW는 개발 환경일 때에만 사용하면 되므로 `.env.local` 파일에 환경 변수를 선언하게 되면 개발 환경일 때에만 해당 환경 변수가 유효하다.
    
    ```tsx
    NEXT_PUBLIC_API_MOCKING=enabled 
    ```
    
    <aside>
    💡 `NEXT_PUBLIC_` 환경 변수는 브라우저에서도 접근이 가능하기 때문에 `src` 폴더에서 해당 환경 변수에 접근할 수 있다.
    만약, `NEXT_PUBLIC` 이 없는 `API_MOCKING` 이라는 이름의 환경 변수라면 서버에서만 접근 가능하다.
    
    </aside>
    
    ### ✔️ MSW 컴포넌트 적용
    
    ```tsx
    // src\app\layout.tsx
    export default function RootLayout({ children }: Props) {
      return (
        <html lang="en">
          <body className={inter.className}>
            <div className={styles.container}>
              **<MSWComponent />**
              {children}
            </div>
          </body>
        </html>
      );
    }
    ```

- 서버 컴포넌트에서 Server Actions 사용하기
  ## 💠 회원가입 기능
  ### ✔️ 서버 컴포넌트 생각하기
  - 기존의 SignupModal
    ```tsx
    "use client";

    import style from "./signup.module.css";
    import { useRouter } from "next/navigation";
    import { ChangeEventHandler, FormEventHandler, useState } from "react";

    export default function SignupModal() {
      const [id, setId] = useState("");
      const [password, setPassword] = useState("");
      const [nickname, setNickname] = useState("");
      const [image, setImage] = useState("");
      const [imageFile, setImageFile] = useState<File>();

      const router = useRouter();
      const onClickClose = () => {
        router.back();
        // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
      };

      const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
        setId(e.target.value);
      };

      const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value);
      };

      const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNickname(e.target.value);
      };

      const onChangeImageFile: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.target.files && setImageFile(e.target.files[0]);
      };

      const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        fetch("http://localhost:9090/api/users", {
          method: "post",
          body: JSON.stringify({
            id,
            nickname,
            image,
            password,
          }),
          credentials: "include",
        })
          .then((response: Response) => {
            console.log(response.status);
            if (response.status === 200) {
              router.replace("/home");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      };

      return (
        <>
          <div className={style.modalBackground}>
            <div className={style.modal}>
              <div className={style.modalHeader}>
                <button className={style.closeButton} onClick={onClickClose}>
                  <svg
                    width={24}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
                  >
                    <g>
                      <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                    </g>
                  </svg>
                </button>
                <div>계정을 생성하세요.</div>
              </div>
              <form>
                <div className={style.modalBody}>
                  <div className={style.inputDiv}>
                    <label className={style.inputLabel} htmlFor="id">
                      아이디
                    </label>
                    <input
                      id="id"
                      className={style.input}
                      type="text"
                      placeholder=""
                      value={id}
                      onChange={onChangeId}
                    />
                  </div>
                  <div className={style.inputDiv}>
                    <label className={style.inputLabel} htmlFor="name">
                      닉네임
                    </label>
                    <input
                      id="name"
                      className={style.input}
                      type="text"
                      placeholder=""
                      value={nickname}
                      onChange={onChangeNickname}
                    />
                  </div>
                  <div className={style.inputDiv}>
                    <label className={style.inputLabel} htmlFor="password">
                      비밀번호
                    </label>
                    <input
                      id="password"
                      className={style.input}
                      type="password"
                      placeholder=""
                      value={password}
                      onChange={onChangePassword}
                    />
                  </div>
                  <div className={style.inputDiv}>
                    <label className={style.inputLabel} htmlFor="image">
                      프로필
                    </label>
                    <input
                      id="image"
                      className={style.input}
                      type="file"
                      accept="image/*"
                      onChange={onChangeImageFile}
                    />
                  </div>
                </div>
                <div className={style.modalFooter}>
                  <button className={style.actionButton} disabled>
                    가입하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      );
    }
    ```
  Nextjs의 `Server Actions` 를 서버 컴포넌트에서 사용해보자.
  `use client` 와 기존의 hook, 이벤트 핸들러 등을 지워주어야 하는데, 그렇다면 state 없이 어떻게 구현할 수 있을까?
  ### ✔️ 이벤트 핸들러 처리
  이벤트 핸들러는 클라이언트 컴포넌트에서 사용 가능하다. 서버 컴포넌트로 변환하고자 하는 클라이언트 컴포넌트에 이벤트 핸들러가 있다면, 해당 요소를 클라이언트 컴포넌트로 따로 분리해주면 된다.
  **`onClickClose`**
  예를 들어 현재 SignupModal의 `onClickClose` 이벤트 핸들러가 붙은 모달 닫기 버튼을 컴포넌트로 따로 분리할 수 있다.
  ```tsx
  import style from "./signup.module.css";
  import { useRouter } from "next/navigation";

  export default function SignupModal() {
    // ...
    const router = useRouter();
    const onClickClose = () => {
      router.back();
      // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
    };

    return (
      <>
        // ... **// 이 버튼 부분을 따로 클라이언트 컴포넌트로 만들기**
        <button className={style.closeButton} onClick={onClickClose}>
          <svg
            width={24}
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
          >
            <g>
              <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
            </g>
          </svg>
        </button>
        // ...
      </>
    );
  }
  ```
  ```tsx
  // src\app\(beforeLogin)\_component\CloseButton.tsx
  "use client";

  import style from "./signup.module.css";
  import { useRouter } from "next/navigation";

  export default function CloseButton() {
    const router = useRouter();
    const onClickClose = () => {
      router.back();
      // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
    };

    return (
      <button className={style.closeButton} onClick={onClickClose}>
        <svg
          width={24}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
        >
          <g>
            <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
          </g>
        </svg>
      </button>
    );
  }
  ```
  **`그 외 input과 submit button 처리`**
  **state가 없다면 기존에 html, js로 처리했던 form을 생각해주면 된다.**
  state를 사용하여 value 값과 이벤트 핸들러를 처리했던 **input**은 `value` 와 `handler` 부분을 지워주고, `name` 속성과 `required` 속성을 붙여준다.
  ```tsx
  <input
    id="id"
    name="id"
    className={style.input}
    type="text"
    placeholder=""
    required
  />
  ```
  <button>과 <form>의 경우 button의 타입을 submit으로, form의 action 속성을 사용한다. 이 때 **form의 `action` 속성에 들어가는 값이 Server Actions이다.**
  ```tsx
  <form action={submit}>
    ...
    <div className={style.modalFooter}>
      <button type="submit" className={style.actionButton}>
        가입하기
      </button>
    </div>
  </form>
  ```
  ### ✔️ Server Actions 함수 작성
  ```tsx
  const submit = async (formData: FormData) => {
    "use server";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: "post",
        body: formData,
        credentials: "include", // 이 속성이 있어야 쿠키 전달 가능
      }
    );
    redirect("/home");
  };
  ```
  매개변수의 `formData` 의 경우 `formData.get('id')` 메소드로 <form> 안의 데이터들을 가져올 수 있다. get 메서드의 인자로는 `name` 속성에 작성한 값들을 넘겨주면 된다.
  [FormData.get() - Web API | MDN](https://developer.mozilla.org/ko/docs/Web/API/FormData/get)
  쿠키를 활용하기 위해서는 `credentials: 'include'` 를 해주어야 한다.
  쿠키는 이미 로그인한 사람이 회원가입을 하고 있는지 알 수 있고, 이외에도 유용한 기능을 구현할 수 있다.
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/bf707191-dca9-4074-be28-eff99d8494ad/Untitled.png)
  ### ✔️ redirect 처리
  회원가입 후, 바로 메인화면으로 이동시켜주기 위해 redirect()를 사용한다.
    <aside>
    💡 **redirect()는 try-catch문 안에서 사용할 수 없으므로 주의하자.**
    
    </aside>
    
    하지만, redirect는 try-catch문 안에서 사용할 수 없다. 오류가 발생하더라도 홈 화면으로 이동되어 사용자에게 혼란을 줄 수 있다는 것이다.
    
    **따라서 별도의 변수를 두어 처리하는 것이 좋다.**
    
    ```tsx
    const submit = async (formData: FormData) => {
      "use server";
    
      **let shouldRedirect = false;**
    
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
          {
            method: "post",
            body: formData,
            credentials: "include", // 이 속성이 있어야 쿠키 전달 가능
          }
        );
        **shouldRedirect = true;**
      } catch (err) {
        console.error(err);
        **shouldRedirect = false;**
      }
    
      **if (shouldRedirect) {
        redirect("/home");
      }**
    };
    ```
    
    ### ✔️ formData 검증
    
    입력된 데이터거나 중복 사용자가 있을 때 message를 바로 return 해주어 서버에 불필요한 요청을 하지 않게끔 처리한다.
    
    <aside>
    💡 **return 해주는 message는 클라이언트 컴포넌트에서 처리해서 보여주어야 사용자에게 보인다.**
    
    </aside>
    
    ```tsx
    const submit = async (formData: FormData) => {
        "use server";
    
        // formData 검증
        **if (!formData.get("id")) {
          return { message: "no_id" };
        }
        if (!formData.get("name")) {
          return { message: "no_name" };
        }
        if (!formData.get("password")) {
          return { message: "no_password" };
        }
        if (!formData.get("image")) {
          return { message: "no_image" };
        }**
    
        let shouldRedirect = false;
    
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
            {
              method: "post",
              body: formData,
              credentials: "include", // 이 속성이 있어야 쿠키 전달 가능
            }
          );
    
    			**// 중복 사용자 체크
          if (response.status === 403) {
            return { message: "user_exists" };
          }**
    
          shouldRedirect = true;
        } catch (err) {
          console.error(err);
          shouldRedirect = false;
        }
    
        if (shouldRedirect) {
          redirect("/home");
        }
      };
    ```
    
    <aside>
    💡 **input에 `required` 속성이 있음에도 데이터의 검증이 따로 필요할까?**
    클라이언트 측에서의 유효성 검증 외에 서버 측에서도 유효성 검증을 수행하는 것이 중요하다. 클라이언트 측 검증은 브라우저의 도구를 통해 우회할 수 있기 때문에 서버 측에서도 검증을 해야 보안이 강화된다.
    
    </aside>
    
    ### ✔️ 회원가입 테스트
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/2f5d4c14-505e-40ad-a09e-94ed8e4863f2/Untitled.png)
    
    - 전체 코드
        
        ```tsx
        // src\app\(beforeLogin)\_component\SignupModal.tsx
        import style from "./signup.module.css";
        import CloseButton from "./CloseButton";
        import { redirect } from "next/navigation";
        
        export default function SignupModal() {
          const submit = async (formData: FormData) => {
            "use server";
        
            // formData 검증
            if (!formData.get("id")) {
              return { message: "no_id" };
            }
            if (!formData.get("name")) {
              return { message: "no_name" };
            }
            if (!formData.get("password")) {
              return { message: "no_password" };
            }
            if (!formData.get("image")) {
              return { message: "no_image" };
            }
        
            let shouldRedirect = false;
        
            try {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
                {
                  method: "post",
                  body: formData,
                  credentials: "include", // 이 속성이 있어야 쿠키 전달 가능
                }
              );
        
              // 중복 사용자 체크
              if (response.status === 403) {
                return { message: "user_exists" };
              }
        
              shouldRedirect = true;
            } catch (err) {
              console.error(err);
              shouldRedirect = false;
            }
        
            if (shouldRedirect) {
              redirect("/home");
            }
          };
        
          return (
            <>
              <div className={style.modalBackground}>
                <div className={style.modal}>
                  <div className={style.modalHeader}>
                    <CloseButton />
                    <div>계정을 생성하세요.</div>
                  </div>
                  <form action={submit}>
                    <div className={style.modalBody}>
                      <div className={style.inputDiv}>
                        <label className={style.inputLabel} htmlFor="id">
                          아이디
                        </label>
                        <input
                          id="id"
                          name="id"
                          className={style.input}
                          type="text"
                          placeholder=""
                          required
                        />
                      </div>
                      <div className={style.inputDiv}>
                        <label className={style.inputLabel} htmlFor="name">
                          닉네임
                        </label>
                        <input
                          id="name"
                          name="name"
                          className={style.input}
                          type="text"
                          placeholder=""
                          required
                        />
                      </div>
                      <div className={style.inputDiv}>
                        <label className={style.inputLabel} htmlFor="password">
                          비밀번호
                        </label>
                        <input
                          id="password"
                          name="password"
                          className={style.input}
                          type="password"
                          placeholder=""
                          required
                        />
                      </div>
                      <div className={style.inputDiv}>
                        <label className={style.inputLabel} htmlFor="image">
                          프로필
                        </label>
                        <input
                          id="image"
                          name="image"
                          className={style.input}
                          type="file"
                          accept="image/*"
                          required
                        />
                      </div>
                    </div>
                    <div className={style.modalFooter}>
                      <button type="submit" className={style.actionButton}>
                        가입하기
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          );
        }
        ```
        
        ```tsx
        // src\mocks\handlers.ts
        import { http, HttpResponse, StrictResponse } from "msw";
        
        export const handlers = [
          http.post("/api/users", async ({ request }) => {
            console.log("회원가입");
            // 중복 유저가 존재할 때를 테스트 하고 싶다면 아래의 주석을 해제하여 사용
            // return HttpResponse.text(JSON.stringify("user_exists"), {
            //   status: 403,
            // });
            return HttpResponse.text(JSON.stringify("ok"), {
              headers: {
                "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/;Max-Age=0",
              },
          })];
        ```

- 클라이언트 컴포넌트에서 Server Actions 사용하기
  ## 💠 클라이언트 컴포넌트에서 에러 message 표시하기
  ### ✔️ Server Actions 함수 분리
  클라이언트 컴포넌트에서 Server Actions 함수를 사용할 때 함수는 외부에 정의해두는 것이 좋다.
  ```tsx
  // src\app\(beforeLogin)\_lib\signup.ts
  "use server";

  import { redirect } from "next/navigation";

  export default async function onSubmit(formData: FormData) {
    // formData 검증
    if (!formData.get("id")) {
      return { message: "no_id" };
    }
    if (!formData.get("name")) {
      return { message: "no_name" };
    }
    if (!formData.get("password")) {
      return { message: "no_password" };
    }
    if (!formData.get("image")) {
      return { message: "no_image" };
    }

    let shouldRedirect = false;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
        {
          method: "post",
          body: formData,
          credentials: "include", // 이 속성이 있어야 쿠키 전달 가능
        }
      );

      // 중복 사용자 체크
      if (response.status === 403) {
        return { message: "user_exists" };
      }
      shouldRedirect = true;
    } catch (err) {
      console.error(err);
      shouldRedirect = false;
    }

    if (shouldRedirect) {
      redirect("/home");
    }
  }
  ```
  ```tsx
  // src\app\(beforeLogin)\_component\SignupModal.tsx
  'use client'

  import style from "./signup.module.css";
  import CloseButton from "./CloseButton";
  import onSubmit from "../_lib/signup";

  export default function SignupModal() {
    const submit = onSubmit;
  // ...
  ```
  ## ✔️ useFormState, useFormStatus
  [useFormState – React](https://react.dev/reference/react-dom/hooks/useFormState)
  `useFormState(fn, initialState)` 는 React18에서 지원해주는 Form 작업의 결과에 따라 상태값을 업데이트 해주는 Hook이다.
  - `fn` : 양식을 제출하거나 버튼을 눌렀을 때 호출되는 함수
  - `initialState` : 초기 상태
  [useFormStatus – React](https://react.dev/reference/react-dom/hooks/useFormStatus)
  `useFormStatus()` 는 Form이 제출될 때의 상태 정보를 제공한다.
  Form이 현재 제출중인지 아닌지, 어떤 method를 사용하고 있는지, action은 어떤걸 전달했는지 등을 반환한다.
  useFormState에 기존에 사용했던 server actions 함수를 매개변수로 전달함으로써 useFormState 훅이 해당 함수를 관리하게끔 한다.
  이를 <form>의 action에 전달한다.
  ```tsx
  // src\app\(beforeLogin)\_component\SignupModal.tsx
  "use client";

  import style from "./signup.module.css";
  import CloseButton from "./CloseButton";
  import onSubmit from "../_lib/signup";
  import { useFormState, useFormStatus } from "react-dom";

  export default function SignupModal() {
    const [state, formAction] = useFormState(onSubmit, { message: null });
    const { pending } = useFormStatus();

    return (
      <>
  			// ...
        <form action={formAction}>
  			</form>
  			// ...
  ```
  그리고 사용했던 onSubmit 함수에 매개변수를 하나 더 추가해준다.
  `prevState` 는 양식의 현재 상태를 매개변수로 받아, 양식이 처음 제출될 때는 초기 상태를 인자로 받고, 이후의 제출에는 마지막으로 호출되었을 때의 반환값을 받는다.
  현재 onSubmit 함수는 반환 값이 string이거나, null, undefined 등 다양한 타입 값을 가지고 있기 때문에 일단은 `any` 로 설정해두고 이후 강의(ch4)에서 수정한다.
  ```tsx
  // src\app\(beforeLogin)\_lib\signup.ts
  export default async function onSubmit(prevState: any, formData: FormData) {}
  ```
  ### ✔️ 폼 작업의 반환 값인 메시지 표기
  ```tsx
  // src\app\(beforeLogin)\_component\SignupModal.tsx
  <form action={formAction}>
    // ...
    <div className={style.modalFooter}>
      <button type="submit" className={style.actionButton}>
        가입하기
      </button>
      **<div className={style.error}>{state?.message}</div>**
    </div>
  </form>
  ```
  현재 onSubmit 함수에서 반환해주는 메시지는 아래와 같이 **에러 코드**와도 같기 때문에, 사용자가 알아볼 수 있도록 별도의 함수를 정의해주는 것이 좋다.
  ```tsx
  // src\app\(beforeLogin)\_lib\signup.ts
  export default async function onSubmit(prevState: any, formData: FormData) {
  	// formData 검증 - 입력을 안했을 때 || 빈 칸만 입력하는 경우
    if (!formData.get("id") || !(formData.get("id") as string)?.trim()) {
      return { message: "no_id" };
    }
    if (!formData.get("name") || !(formData.get("name") as string)?.trim()) {
      return { message: "no_name" };
    }
    if (
      !formData.get("password") ||
      !(formData.get("password") as string)?.trim()
    ) {
      return { message: "no_password" };
    }
    if (!formData.get("image")) {
      return { message: "no_image" };
    }
  ```
  ### ✔️ 메시지 코드 변환 함수 정의
  ```tsx
  // src\app\(beforeLogin)\_component\SignupModal.tsx
  function showMessage(messasge: string) {
    if (messasge === "no_id") {
      return "아이디를 입력하세요.";
    }
    if (messasge === "no_name") {
      return "닉네임을 입력하세요.";
    }
    if (messasge === "no_password") {
      return "비밀번호를 입력하세요.";
    }
    if (messasge === "no_image") {
      return "이미지를 업로드하세요.";
    }
    if (messasge === "user_exists") {
      return "이미 사용 중인 아이디입니다.";
    }
  }
  ```
  ```tsx
  // src\app\(beforeLogin)\_component\SignupModal.tsx
  <form action={formAction}>
    // ...
    <div className={style.modalFooter}>
      <button type="submit" className={style.actionButton}>
        가입하기
      </button>
      **<div className={style.error}>{showMessage(state?.message)}</div>**
    </div>
  </form>
  ```
    <aside>
    💡 **onSubmit에서 반환해주는 message를 아예 한글화해서 적용하면 되지 않을까? 왜 별도로 메시지를 보여주는 함수를 만드는 것일까?**
    
    서비스를 글로벌화 할 경우 message를 한글화하게 되면 어려움이 발생한다.
    따라서 에러 코드를 지정하고 이에 따라 보여지는 메시지를 각각 다른 함수로 정의하는 방식이 더 쉽고 좋다.
    
    </aside>
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/e0c1a8cd-6f6b-4c82-a041-68a6a4cf63b7/Untitled.png)

- 미들웨어, API 라우트, catch-all 라우트
  ## 💠 next-auth 설명
  로그인 기능을 직접 구현해도 되지만, **Auth.js**(구 next-auth) 라이브러리를 이용하면 쉽게 구현할 수 있다.
  **`장점`**
  - Auth.js는 **Login Provider**로 카카오, 구글, 네이버 등을 지원하고 있기 때문에 간편 로그인 구현 시 쉽게 가능하다.
  - 또한 **Credential Provider**로 기본적인 로그인, 로그아웃 등을지원하고, 로그인에 따른 쿠키 관리해준다.
  - 사용자 세션을 클라이언트 방식으로 처리하고 여러 인증 방법 (OAuth, 이메일 등…)을 지원하도록 설계되었기 때문에 자체 인증 서비스를 실행하지 않아도 된다.
  ### ✔️ next-auth 설치
  ```bash
  $ npm i next-auth@beta @auth/core
  ```
  ### ✔️ Middleware
  nextjs에서 페이지를 렌더링하기 전에 서버 측에서 실행되는 함수이다.
  즉, 특정 요청 전에 무언가를 수행할 수 있게 해주는 기능이다.
  `Middleware`에서는 `Request` 객체와 `Response` 객체에 접근할 수 있으며
  이를 활용해 요청 정보를 받아와 부가적인 처리를 하고 응답 객체에 무언가를 추가하거나 응답을 변경할 수 있다.
  특정 조건에 맞는 유저만 url에 접근가능하게끔 할 수 있다.
  middleware.ts는 src 폴더에 포함되거나, app과 같은 수준의 트리에 존재해야 한다.
    <aside>
    💡 **정리**
    **app router에서는 middleware를 통해 페이지별 권한을 관리하기 용이해졌다.**
    
    </aside>
    
    [Routing: Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/b43a35dd-f90e-4ace-8a15-5507f3b4ffff/Untitled.png)
    
    config에 정의된 `matcher` 에 해당되는 경로에 진입하면, 렌더링 이전에 middleware() 함수가 호출된다.
    
    ### ✔️ API 라우트
    
    브라우저처럼 실제 주소가 된다.
    
    `route.ts` 는 백엔드 서버처럼 프론트 서버의 API 역할을 해서 백엔드 서버 없이도 서버 역할을 할 수 있다.
    
    ### ✔️ catch-all 라우트
    
    - `[...segmentName]`
    
    동적 세그먼트에서 `...` 를 추가하면 catch-all 세그먼트를 만들 수 있다.
    
    URL에서 `...slug` 에 오는 부분들을 slug 배열로 반환한다.
    
    | Route | Example URL | params |
    | --- | --- | --- |
    | pages/shop/[...slug].js | /shop/a | { slug: ['a'] } |
    | pages/shop/[...slug].js | /shop/a/b | { slug: ['a', 'b'] } |
    | pages/shop/[...slug].js | /shop/a/b/c | { slug: ['a', 'b', 'c'] } |
    
    [Routing: Dynamic Routes](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#catch-all-segments)

- next-auth로 로그인하기
  ## 💠 next-auth 시작
  [Getting Started | NextAuth.js](https://next-auth.js.org/getting-started/example)
  ### 1. API 라우트 추가
  프로젝트에 NextAuth.js를 추가하려면 `app/api/auth` (Next.js 13.2 하위 버전인 경우 pages/api/auth)에 API 라우터인 `[...nextauth]` 를 추가해주어야 한다.
  ```tsx
  // src\app\api\auth\[...nextauth]\route.ts
  export { GET, POST } from "@/auth";

  // /api/auth 에 관한 API는 이 곳, 프론트 서버에서 담당
  ```
  ### 2. 환경 변수 설정
  ```bash
  # .env
  AUTH_URL=http://localhost:9090 # next.js가 실행될 URL
  AUTH_SECRET=mustkeepinsecret # 쿠키를 암호화하는 비밀번호
  ```
  ## 💠 next-auth 설정하기
  [Auth.js](https://authjs.dev/getting-started/providers/credentials-tutorial)
  next-auth를 설정하려면 사용자가 설정한 자격 증명을 수신하고, 인증 서비스를 호출하는 `authorize()` 메서드를 정의하면 된다.
  ```tsx
  // src\auth.ts
  import NextAuth from "next-auth";
  import CredentialsProvider from "next-auth/providers/credentials";
  import { NextResponse } from "next/server";

  export const {
    handlers: { GET, POST },
    auth,
    signIn,
  } = NextAuth({
    pages: {
      signIn: "/i/flow/login",
      newUser: "/i/flow/signup",
    },
    providers: [
      CredentialsProvider({
        async authorize(credentials) {
          const authResponse = await fetch(
            `${process.env.AUTH_URL}/api/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: credentials.username,
                password: credentials.password,
              }),
            }
          );

          if (!authResponse.ok) {
            // 로그인 실패
            return null;
          }

          const user = await authResponse.json();
          console.log("user", user);
          return {
            email: user.id,
            name: user.nickname,
            image: user.image,
            ...user,
          };
        },
      }),
    ],
  });

  // handlers: API 라우트
  // auth(): 로그인 여부 확인
  // signIn(): 로그인
  ```
  ### ✔️ 코드 설명
  ```tsx
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },
  ```
  next-auth를 적용하면 기본적으로 로그인 할 수 있는 페이지가 생성된다.
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/d8c71604-f18b-4e76-8476-36fe5e08746b/Untitled.png)
  하지만, 우리는 자체적인 로그인, 회원가입 페이지를 만들어두었기 때문에 `pages` 속성을 통해 next-auth에 등록해주어야 한다.
  ```tsx
  async authorize(credentials) {
  	const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
  	    method: "POST",
  	    headers: {
  	      "Content-Type": "application/json",
  	    },
  	    **body: JSON.stringify({
  	      id: credentials.username,
  	      password: credentials.password,
  	    }),**
  	  });
  // ...
  ```
  next-auth에서 전달 받는 `credentials` 인자에는 우리가 로그인 창에서 입력한 username과 password가 들어있다.
  백엔드 서버에는 id와 password로 요청을 보내야하기 때문에 형식에 맞게 변환해서 요청한다.
  ```tsx
  return {
    email: user.id,
    name: user.nickname,
    image: user.image,
    ...user,
  };
  ```
  next-auth에서 어떤 유저가 로그인 했는지 유저 정보를 가져오는 기능을 사용해야 하기 때문에 `authorize()` 함수의 리턴 값은 로그인 한 유저의 정보를 리턴해준다.
  ## 💠 클라이언트 컴포넌트에 적용
  ```tsx
  "use client";

  import style from "@/app/(beforeLogin)/_component/login.module.css";
  import { useRouter } from "next/router";
  import { ChangeEventHandler, FormEventHandler, useState } from "react";
  import { signIn } from "next-auth/react"; **// 서버 컴포넌트일 경우 우리가 @/auth에 만든 함수를 사용하면 된다.**

  export default function LoginModal() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const router = useRouter();

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      setMessage("");

      try {
        await signIn("credentials", {
          username: id,
          password: password,
          redirect: false, **// true로 할 경우 서버에서 리다이렉트 되므로 클라이언트 컴포넌트에서는 false로 설정 후 router.replace() 사용**
        });
        router.replace("/home");
      } catch (err) {
        console.error(err);
        setMessage("아이디와 비밀번호가 일치하지 않습니다.");
      }
    };

    const onClickClose = () => {
      router.back();
    };

    const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
      setId(e.target.value);
    };

    const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
      setPassword(e.target.value);
    };

    return (
      // ...
    );
  }
  ```
- 로그아웃 & 로그인 여부에 따라 화면 다르게 하기
  ## 💠 로그아웃 기능
  next-auth를 사용해 로그아웃 기능을 완성 시키면 된다.
  ```jsx
  // src\app\(afterLogin)\_component\LogoutButton.tsx
  "use client";

  import style from "./logoutButton.module.css";
  import { signOut } from "next-auth/react";
  import { useRouter } from "next/navigation";

  export default function LogoutButton() {
    const router = useRouter();

  	const onLogout = () => {
  		// 클라이언트 컴포넌트이므로 서버의 리다이렉트를 off 하고
  		// useRouter 훅을 통해 리다이렉트 해준다.
      signOut({ redirect: false }).then(() => {
        router.replace("/");
      });
    };
  ```
  ## 💠 로그인한 유저 정보 가져오기
  ### ✔️ useSession()
  useSesion() 훅을 사용하면 로그인한 유저의 정보를 가져올 수 있다. **(클라이언트 컴포넌트에서만 사용 가능)**
  [Getting Started | NextAuth.js](https://next-auth.js.org/getting-started/example#frontend---add-react-hook)
  ```jsx
  "use client";

  import style from "./logoutButton.module.css";
  import { signOut, useSession } from "next-auth/react";
  import { useRouter } from "next/navigation";

  export default function LogoutButton() {
    const { data: me } = useSession();

    const router = useRouter();

    const onLogout = () => {
      signOut({ redirect: false }).then(() => {
        router.replace("/");
      });
    };

    if (!me?.user) {
      return null;
    }

    return (
      <button className={style.logOutButton} onClick={onLogout}>
        <div className={style.logOutUserImage}>
          <img src={me.user?.image!} alt={me.user?.id} />
        </div>
        <div className={style.logOutUserName}>
          <div>{me.user?.name}</div>
          <div>@{me.user?.id}</div>
        </div>
      </button>
    );
  }
  ```
    <aside>
    💡 useSession()에는 user 프로퍼티 안에 유저 정보가 들어있다.
    또한 user의 타입 정보는 아래와 같이 고정되어 있다.
    
    ```tsx
    export interface User {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
    ```
    
    따라서 해당 속성에 맞게 jsx 부분을 수정해주어야 하며, img 태그의 src는 null이 될 수 없기 때문에 `me.user?.image!` 로 값이 무조건 있을거라고 타입스크립트에게 알려주거나 `me.user?.image as string` 으로 타입 단언을 해주면 된다.
    
    </aside>
    
    ## 💠 SessionProvider
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/e8233b02-17f7-41f7-b8ff-72e54b90d446/Untitled.png)
    
    useSession()을 사용하기 위해서는 SessionProvider로 랩핑이 되어 있어야 한다.
    
    ### ✔️ SessionProvider 정의하기
    
    ```tsx
    // src\app\_component\AuthSession.tsx
    "use client";
    import { SessionProvider } from "next-auth/react";
    
    type Props = {
      children: React.ReactNode;
    };
    
    export default function AuthSession({ children }: Props) {
      return <SessionProvider>{children}</SessionProvider>;
    }
    ```
    
    Provider들은 대게 클라이언트 컴포넌트로 사용된다.
    
    ### ✔️ SessionProvider 적용
    
    ```tsx
    // src\app\layout.tsx
    import type { Metadata } from "next";
    import { Inter } from "next/font/google";
    import "./globals.css";
    import styles from "@/app/(beforeLogin)/_component/main.module.css";
    import { MSWComponent } from "./_component/MSWCoponent";
    import AuthSession from "./_component/AuthSession";
    
    const inter = Inter({ subsets: ["latin"] });
    
    export const metadata: Metadata = {
      title: "Create Next App",
      description: "Generated by create next app",
    };
    
    type Props = {
      children: React.ReactNode;
    };
    
    export default function RootLayout({ children }: Props) {
      return (
        <html lang="en">
          <body className={inter.className}>
            <div className={styles.container}>
              <MSWComponent />
              **<AuthSession>{children}</AuthSession>**
            </div>
          </body>
        </html>
      );
    ```
    
    AuthSessionProvider로 감싼 내부 컴포넌트에서는 이제 어디서든 `useSession()` 훅을 사용할 수 있다.
    
    ## 💠 로그인되어 있을 때 리다이렉트 해주기
    
    ```tsx
    // src\app\(beforeLogin)\login\page.tsx
    "use client";
    
    import { useRouter } from "next/navigation";
    import Main from "../_component/Main";
    import { useSession } from "next-auth/react";
    
    export default function Login() {
      const router = useRouter();
      **const { data: session } = useSession();
    
      if (session?.user) {
        router.replace("/home");
        return null;
      }
    
      router.replace("/i/flow/login");**
    
      return <Main />;
    }
    ```
    
    클라이언트 컴포넌트의 경우 `useSession()` 을 사용하여 로그인 정보를 가져와준다.
    
    ```tsx
    // src\app\(beforeLogin)\page.tsx
    import { auth } from "@/auth";
    import Main from "./_component/Main";
    import { redirect } from "next/navigation";
    
    export default async function Home() {
      **const session = await auth();
    
      if (session?.user) {
        redirect("/home");
        return null;
      }**
    
      return <Main />;
    }
    ```
    
    서버 컴포넌트의 경우 next-auth를 통해 만들었던 `auth()` 함수를 통해 로그인 정보를 가져와준다.
    
    ## 💠 csrf-token
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/fb494146-5f21-4322-be00-dbdb3468fb6f/Untitled.png)
    
    next-auth를 설치하게 되면 쿠키에 `authjs-` 쿠키들이 생성되는데, 로그인을 할 경우 `authjs.session-token` 값이 주어진다.
    
    이 토큰이 유출되면 해커가 자유롭게 내 정보로 로그인을 할 수 있게 된다.
    
    이 csrf 공격으로 인해 유출될 수 있는데, next-auth에서는 `authjs.csrf-token` 을 통해 공격을 방어해준다.
    
    ## 💠 로그인이 되어 있지 않을 때 url 막기
    
    ```tsx
    import { auth } from "./auth";
    import { NextResponse } from "next/server";
    
    export async function middleware() {
      **const session = await auth();
    
      // 현재 로그인이 되어 있지 않다면 로그인 페이지로 이동시키기
      if (!session) {
        return NextResponse.redirect("http://localhost:3000/i/flow/login");
      }**
    }
    
    // See "Matching Paths" below to learn more
    export const config = {
      matcher: ["/compose/tweet", "/home", "/explore", "/messages", "/search"],
    };
    ```
    
    미들웨어 본연의 기능을 살리기 위해 middleware에서 리다이렉트를 시켜준다.

- react-query SSR 설정하기
  ## 💠 react-query로 인피니티 스크롤 구현하기
  ### ✔️ react-query 설치
  ```bash
  npm i @tanstack/react-query@5
  npm i @tanstack/react-query-devtools@5 -D #devtools 설치
  ```
  ### ✔️ ReactQuery Provider 설정
  데이터 패칭은 로그인 이후에만 일어나기 때문에 로그인 이후 그룹에만 적용시키기 위해 `(afterLogin)/_component` 하위에 Provider를 만들어준다.
  ```tsx
  // src\app\(afterLogin)\_component\RQProvider.tsx
  "use client";

  import React, { useState } from "react";
  import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
  import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

  type Props = {
    children: React.ReactNode;
  };

  function RQProvider({ children }: Props) {
    const [client] = useState(
      new QueryClient({
        defaultOptions: {
          // react-query 전역 설정
          queries: {
            refetchOnWindowFocus: false,
            retryOnMount: true,
            refetchOnReconnect: false,
            retry: false,
          },
        },
      })
    );

    return (
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools
          initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
        />
      </QueryClientProvider>
    );
  }

  export default RQProvider;
  ```
  로그인 이후의 layout에서 `<main>` 부분에 데이터가 오가기 때문에 적당히 감싸 Provider를 적용시킨다.
  ```tsx
  // src\app\(afterLogin)\layout.tsx
  export default async function AfterLoginLayout({ children, modal }: Props) {
    const session = await auth();

    return (
      <div className={style.container}>
        <header className={style.leftSectionWrapper}>// ...</header>
        **<RQProvider>
          **
          <div className={style.rightSectionWrapper}>
            <div className={style.rightSectionInner}>
              <main className={style.main}>{children}</main>
              <section className={style.rightSection}>
                <RightSearchZone />
                <TrendSection />
                <div className={style.followRecommend}>
                  <h3>팔로우 추천</h3>
                  <FollowRecommend />
                  <FollowRecommend />
                  <FollowRecommend />
                </div>
              </section>
            </div>
          </div>
          {modal}
          **
        </RQProvider>**
      </div>
    );
  }
  ```
  ## 💠 Home 페이지
  ```tsx
  import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
  } from "@tanstack/react-query";
  import Post from "../_component/Post";
  import PostForm from "./_component/PostForm";
  import Tab from "./_component/Tab";
  import TabProvider from "./_component/TabProvider";
  import style from "./home.module.css";

  // 서버 컴포넌트이기 때문에 이 함수는 서버에서 실행된다.
  async function getPostRecommends() {
    const res = await fetch("http://localhost:9090/api/postRecommends", {
      next: {
        tags: ["posts", "recommends"], // 서버에서 가져온 데이터에 tag를 설정, 이후 캐시 초기화 등에 사용됨
      },
      cache: "no-store", // cache를 하지 않음
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }

  export default async function Home() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
      queryKey: ["posts", "recommends"],
      queryFn: getPostRecommends,
    });
    const dehydratedstate = dehydrate(queryClient);

    return (
      <main className={style.main}>
        <HydrationBoundary state={dehydratedstate}>
          <TabProvider>
            <Tab />
            <PostForm />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </TabProvider>
        </HydrationBoundary>
      </main>
    );
  }
  ```
  서버에서 불러온 데이터를 클라이언트가 전달 받는다. (=hydrate 한다)
    <aside>
    💡 **Hydrate**
    Server Side에서 렌더링된 정적 페이지와 번들링된 js 코드를 클라이언트에게 보낸 후, js 코드가 HTML DOM 위에서 다시 렌더링 되면서 서로 매칭되는 과정이다.
    
    </aside>

- 클라이언트 react-query
  ## 💠 PostRecommends 컴포넌트
  Home 페이지에서 prefetch 시에 서버로부터 데이터를 받아와서 그려주고, **useQuery를 사용해서 해당 데이터를 사용하는 PostRecommends 컴포넌트를 정의한다.**
  ### ✔️ getPostRecommends() 분리
    <aside>
    💡 **파일의 여러 곳에서 재사용되는 함수는 `_lib` 폴더를 만들어 분리해주는 습관을 가지자**
    
    </aside>
    
    ```tsx
    // src\app\(afterLogin)\home\_lib\getPostRecommends.ts
    export async function getPostRecommends() {
      const res = await fetch("http://localhost:9090/api/postRecommends", {
        next: {
          tags: ["posts", "recommends"], // 서버에서 가져온 데이터에 tag를 설정, 이후 캐시 초기화 등에 사용됨
        },
        cache: "no-store", // cache를 하지 않음
      });
    
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
    
      return res.json();
    }
    ```
    
    ### ✔️ Home 페이지 코드 변경 및 PostRecommends 컴포넌트 정의
    
    ```tsx
    import {
      HydrationBoundary,
      QueryClient,
      dehydrate,
    } from "@tanstack/react-query";
    import Post from "../_component/Post";
    import PostForm from "./_component/PostForm";
    import Tab from "./_component/Tab";
    import TabProvider from "./_component/TabProvider";
    import style from "./home.module.css";
    **import { getPostRecommends } from "./_lib/getPostRecommends";**
    import PostRecommends from "../_component/PostRecommends";
    
    export default async function Home() {
      const queryClient = new QueryClient();
    
      await queryClient.prefetchQuery({
        queryKey: ["posts", "recommends"],
        queryFn: getPostRecommends,
      });
      const dehydratedstate = dehydrate(queryClient);
    
      return (
        <main className={style.main}>
          <HydrationBoundary state={dehydratedstate}>
            <TabProvider>
              <Tab />
              <PostForm />
              **<PostRecommends />**
            </TabProvider>
          </HydrationBoundary>
        </main>
      );
    }
    ```
    
    ```tsx
    // src\app\(afterLogin)\_component\PostRecommends.tsx
    "use client";
    
    import { useQuery } from "@tanstack/react-query";
    import { getPostRecommends } from "../home/_lib/getPostRecommends";
    import Post from "./Post";
    
    export default function PostRecommends() {
      const { data } = useQuery({
        queryKey: ["posts", "recommends"],
        queryFn: getPostRecommends,
      });
    
      return data.map((post) => {
        <Post key={post.postId} post={post} />;
      });
    }
    ```
    
    ### ✔️ Post 컴포넌트 수정
    
    임의의 데이터를 사용했던 Post 컴포넌트에서 props로 전달받은 데이터를 사용해준다.
    
    ```tsx
    // src\app\(afterLogin)\_component\Post.tsx
    type Props = {
      noImage?: boolean;
      post: Post;
    };
    
    export default function Post({ noImage, post }: Props) {
      const target = post;
    	
    	// ...
    ```
    
    <aside>
    💡 자주 사용되는 타입들의 경우 폴더(ex. `model`)를 만들어 관리해주면 좋다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/c70ebd3f-82ed-4690-9ec4-600d489145ec/Untitled.png)
    
    </aside>
    
    ### ✔️ SSR 확인
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/f4a03db6-6d7a-4a35-a4be-d0829e248eeb/Untitled.png)
    
    현재 SSR이 되고 있기 때문에 미리보기 탭에서 서버에서 받아온 데이터가 그려지고 있는 것을 확인할 수 있다.
    
    서버에서 보내온 데이터를 `dehydratedstate` 를 통해 물려 받아서 client react-query에서 데이터를 사용할 수 있다.

- react-query를 쓰는 이유와 fresh, stale inactive
  ## 💠 react-query를 쓰는 이유
  - **react-query**의 핵심은 서버에서 **데이터를 가져오는 것**, **redux**의 핵심은 컴포넌트간에 **데이터를 공유하는 것**
  - 데이터를 공유한다는 것도 그 이전에 데이터를 가져와야 하지만, **react-query**의 경우 데이터를 가져오면서 **캐싱**을 잘 관리해준다.
  - 데이터의 사용량이 늘어나면서 트래픽 관리를 잘 해주어야 하는데, 이때 캐싱을 잘 해주어야 한다. 이를 react-query는 잘 관리해주기 때문에 이에 대한 이점이 있다.
  - **캐싱을 잘 해두면 사용자가 매우 빠른 속도로 콘텐츠를 볼 수 있다.** 서버와 클라이언트 간의 물리적 거리는 매우 멀기 때문에, 캐싱을 잘 해두면 이를 해결할 수 있다. ⇒ **UX 증대**
  - react-query도 컴포넌트 간에 데이터를 공유할 수 있기 때문에 세팅이 많은 redux를 굳이 사용하지 않아도 된다.
  - **react-query는 interface를 표준화 했다**는 것에 장점이 있다. 데이터 통신에는 loading과 success, failed라는 상태가 있는데, react-query에서는 표준 API로 사용할 수 있어서 개발자 입장에서는 매우 편리하다.
  - **queryKey** 또한 장점이다. key를 통해 데이터를 한번에 갱신하거나 관리할 수 있어 개발자 입장에서 편리하다.
  ## 💠 react-query 데이터 상태
  ### ✔️ Fresh
  이 데이터는 항상 최신 데이터고, 업데이트할 필요가 없다. 서버에서 불러올 필요가 없다.
  → 데이터가 fresh 상태일 경우 새로고침 시 등의 동작이 있을 경우, 다시 서버에 데이터를 요청하지 않는다.
  → 언제까지 Fresh 상태를 유지할지는 개발자가 설정할 수 있다.
  → react-query의 기본 데이터 상태는 Fresh가 아니다.
  → staleTime은 ms 기준으로, 기본 값은 0이다. 이를 설정하게 되면 데이터를 fresh 상태로 staleTime만큼 유지한 뒤, stale 상태로 변경된다.
  → Infinity 값을 적용하 항상 fresh 데이터가 된다.
  ```tsx
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // fresh -> stale로 변환되는 시간(ms)
  });
  ```
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/fc8a6c5f-bbe9-4381-b105-be0705fc7adc/Untitled.png)
    <aside>
    💡 gcTime(Garbage Collect Time)
    react-query devtools의 Query Explorer 탭에 있는 `gcTime` 은 캐시 타임을 의미한다. 기본적으로 5분으로 설정되어있다.
    (react-query@5에서 cacheTime → gcTime 으로 변경됨)
    
    </aside>
    
    ### ✔️ Stale
    
    기회가 되면 항상 데이터를 새로 가져와라.
    
    → 기회는 언제?
    
    → 개발자가 설정한 조건에 따라 데이터를 새로 가져온다.
    
    → 전역으로 설정하거나, useQuery 훅에서 별도로 설정할 수도 있다.
    
    → 새로고침이 될 경우 서버에 다시 요청해 데이터를 받아온다.
    
    ```tsx
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          **refetchOnWindowFocus: false, // 해당 브라우저에 포커스가 될 경우 리패치
          retryOnMount: true, // 컴포넌트가 언마운트 되었다가 다시 마운트 될 경우 리패치
          refetchOnReconnect: false, // 인터넷 연결이 재접속될 경우 리패치**
          retry: false, // 데이터를 가져올 때 실패할 경우 재시도 할 횟수
        },
      },
    })
    ```
    
    ### ✔️ Inactive
    
    **사용자가 보고 있는 화면에서 해당 queryKey를 사용하는 query가 쓰이지 않는다면 inactive 상태가 된다.**
    
    예를 들어, [’posts, ‘recommends’] queryKey를 사용하는 query가 쓰이지 않는 ‘탐색하기’ 탭으로 이동한다면, 해당 query는 inactive 상태가 된다.
    
    **캐시와는 관계가 없다.**
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/0ea8e022-b28a-469e-9886-02ed334d49cd/Untitled.png)
    
    **inactive 상태가 되면 gcTime이 흘러가기 시작한다.**
    
    따라서 기본적으로 gcTime은 5분으로 설정되어 있기 때문에 query가 inactive 상태가 되면 메모리에서 해당 쿼리 데이터가 정리되어 캐시에서 삭제된다.
    
    <aside>
    💡 **staleTime은 항상 gcTime보다 짧아야한다.**
    그 이유는 staleTime이 gcTime보다 길다면, staleTime의 의미가 퇴색되기 때문이다.
    staleTime을 지정하는 이유는 그 시간동안 캐시에서 데이터를 가져오고 싶기 때문인데, 만약 gcTime이 더 짧아 inactive 상태 때 해당 쿼리가 정리된다면 staleTime을 gcTime보다 길게 가져가는 의미가 없다.
    
    </aside>
    
    ### ✔️ fetching
    
    데이터를 가지고 오는 중
    
    ### ✔️ Paused
    
    데이터를 가지고 오는게 일시정지 일 때
    
    → 오프라인 상태일 때 볼 수 있다.

- refetch, invalidate, reset의 차이
  ## 💠 react-query의 액션 타입
  ### ✔️ refetch
  - 데이터를 서버에서 새로 가져온다.
  ### ✔️ Invalidate
  - refetch랑 기능이 거의 같다. 특정 쿼리를 더 이상 쓰지 말라는 의미로, **쿼리가 inactive일 때는 새로 가져오지 않지만, Observers가 1이상이 될 경우에 서버에 데이터를 새로 요청한다**는 점에서 refetch와 차이가 있다.
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/08a41e24-82ba-49ff-9678-3c90351052d6/Untitled.png)
  `Observers`: 현재 페이지에서 해당 쿼리를 사용하고 있는 곳을 가리킨다.
  위 사진에서는 Observers가 1이므로 해당 페이지에서는 [’posts’, ‘recommends’] queryKey를 가진 쿼리가 한 곳에서 사용되고 있다는 의미이다.
    <aside>
    💡 **refetch보다 invalidate만 사용하는게 효율적이지 않을까?**
    화면에 보이지 않더라도 다른 컴포넌트에서 전역적으로 사용되는 데이터 등 데이터의 최신화가 필요할 수 있기 때문에 두 가지를 잘 섞어서 사용하면 좋다.
    
    </aside>
    
    ### ✔️ reset
    
    useQuery()의 옵션 중 initialData가 있다면, 해당 데이터로 리셋되고 그렇지 않을 경우 새로 데이터를 가져온다.
    
    ### ✔️ remove
    
    해당 쿼리가 제거된다.
    
    ### ✔️ Trigger Loading / Trigger Error
    
    로딩 상태와 에러 상태일 때를 확인할 수 있다.

- 팔로잉 게시글, 검색 결과 불러오기
  ## 💠 탭에 따른 게시글 보여주기
  ### ✔️ 팔로우중인 게시글을 불러오는 react-query 함수 정의
  ```tsx
  // src\app\(afterLogin)\home\_lib\getFollowingPosts.ts
  export async function getFollowingPosts() {
    const res = await fetch(`http://localhost:9090/api/followingPosts`, {
      next: {
        tags: ["posts", "followings"],
      },
      cache: "no-store",
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }
  ```
  ### ✔️ FollowingPosts 컴포넌트 정의
  ```tsx
  "use client";

  import { useQuery } from "@tanstack/react-query";
  import { getFollowingPosts } from "@/app/(afterLogin)/home/_lib/getFollowingPosts";
  import Post from "@/app/(afterLogin)/_component/Post";
  import { Post as IPost } from "@/model/Post";

  export default function FollowingPosts() {
    const { data } = useQuery<IPost[]>({
      queryKey: ["posts", "followings"],
      queryFn: getFollowingPosts,
      staleTime: 60 * 1000, // fresh -> stale로 변환되는 시간(ms)
      gcTime: 300 * 1000,
    });

    return data?.map((post) => <Post key={post.postId} post={post} />);
  }
  ```
  ### ✔️ TabDecider 컴포넌트 정의
  탭에 따라 각각 다른 컴포넌트를 보여주어야 하기 때문에, 클라이언트 컴포넌트인 TabDecider 컴포넌트를 정의해준다.
  ```tsx
  "use client";

  import { useContext } from "react";
  import { TabContext } from "./TabProvider";
  import PostRecommends from "../../_component/PostRecommends";
  import FollowingPosts from "./FollowingPosts";

  export default function TabDecider() {
    const { tab } = useContext(TabContext);

    if (tab === "rec") {
      return <PostRecommends />;
    }

    return <FollowingPosts />;
  }
  ```
    <aside>
    💡 **useContext()를 사용하려면 클라이언트 컴포넌트여야 하므로 따로 분리하여 컴포넌트를 생성해준 것**
    
    </aside>
    
    ### ✔️ Home 페이지에 적용
    
    - 기존 코드
    
    ```tsx
    export default async function Home() {
      const queryClient = new QueryClient();
    
      await queryClient.prefetchQuery({
        queryKey: ["posts", "recommends"],
        queryFn: getPostRecommends,
      });
      const dehydratedstate = dehydrate(queryClient);
    
      return (
        <main className={style.main}>
          <HydrationBoundary state={dehydratedstate}>
            <TabProvider>
              <Tab />
              <PostForm />
              **<PostRecommends />**
            </TabProvider>
          </HydrationBoundary>
        </main>
      );
    }
    ```
    
    - 변경 후 코드
    
    ```tsx
    export default async function Home() {
      const queryClient = new QueryClient();
    
      await queryClient.prefetchQuery({
        queryKey: ["posts", "recommends"],
        queryFn: getPostRecommends,
      });
      const dehydratedstate = dehydrate(queryClient);
    
      return (
        <main className={style.main}>
          <HydrationBoundary state={dehydratedstate}>
            <TabProvider>
              <Tab />
              <PostForm />
              **<TabDecider />**
            </TabProvider>
          </HydrationBoundary>
        </main>
      );
    ```
    
    ## 💠 검색 결과 불러오기
    
    ### ✔️ SearchResult 컴포넌트
    
    ```tsx
    "use client";
    
    import Post from "@/app/(afterLogin)/_component/Post";
    import { Post as IPost } from "@/model/Post";
    import { getSearchResult } from "@/app/(afterLogin)/search/_lib/getSearchResult";
    import { useQuery } from "@tanstack/react-query";
    
    type Props = {
      searchParams: { q: string; f?: string; pf?: string };
    };
    export default function SearchResult({ searchParams }: Props) {
      // useQuery의 4번째 타입이 queryKey에 대한 타입이다.
    	const { data } = useQuery<
        IPost[],
        Object,
        IPost[],
        [_1: string, _2: string, Props["searchParams"]]
      >({
        queryKey: ["posts", "search", searchParams],
        queryFn: getSearchResult,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
      });
    
      return data?.map((post) => <Post key={post.postId} post={post} />);
    }
    ```
    
    ### ✔️ getSearchResult 함수
    
    ```tsx
    import { QueryFunction } from "@tanstack/query-core";
    import { Post } from "@/model/Post";
    
    export const getSearchResult: QueryFunction<
      Post[],
      [_1: string, _2: string, searchParams: { q: string; pf?: string; f?: string }]
    > = async ({ queryKey }) => {
      const [_1, _2, searchParams] = queryKey;
      const res = await fetch(
        `http://localhost:9090/api/search/${
          searchParams.q
        }?${searchParams.toString()}`,
        {
          next: {
            tags: ["posts", "search", searchParams.q],
          },
          cache: "no-store",
        }
      );
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.
    
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }
    
      return res.json();
    };
    ```
    
    <aside>
    💡 **queryKey는 queryFn의 매개변수로 사용될 수 있다.**
    
    </aside>
    
    <aside>
    💡 react-query의 queryKey에는 객체가 들어갈 수 있지만 **(다이나믹 쿼리 키)**, next의 tags에는 객체가 들어갈 수 없음에 주의하자.
    
    ```tsx
    queryKey: ["posts", "search", searchParams],
    ```
    
    ```tsx
    next: {
      tags: ["posts", "search", searchParams.q],
    },
    ```
    
    </aside>
    
    <aside>
    💡 **`:` 을 사용한 것을 URL Parameter라 부른다.**
    매번 유동적으로 바뀌는 값에 대해 사용할 수 있다.
    
    ```tsx
    http.get("/api/search/:tag", ({ request, params }) => {
    ```
    
    </aside>
    
    ## 💠 검색창 검색 기능 수정
    
    ```tsx
    "use client";
    
    import { useRouter } from "next/navigation";
    import style from "./rightSearchZone.module.css";
    import { FormEventHandler } from "react";
    
    type Props = { q?: string };
    
    export default function SearchForm({ q }: Props) {
      const router = useRouter();
    
      const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        router.push(`/search?q=${e.currentTarget.search.value}`);
      };
    
      return (
        <form className={style.search} onSubmit={onSubmit}>
          <svg width={20} viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
            </g>
          </svg>
          <input name="search" type="search" />
        </form>
      );
    }
    ```
    
    <aside>
    💡 `currentTarget` 과 `name` 속성을 이용하면 useState() 없이도 input의 value 값을 가져올 수 있다.
    
    </aside>
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/edb17b2d-c5fc-46e3-9fbd-9fbc07796798/Untitled.png)
    
    검색 결과가 매번 쌓여 메모리 부하가 될 수 있기 때문에 gcTime 등을 조절해서 관리해주는 것이 좋다.

- 조건부 쿼리 & 쿼리 재사용하기
  ## 💠 조건부 쿼리 - enabled
  현재 Trend의 경우 로그인하지 않으면 불러오지 않기 때문에 쿼리가 매번 실행될 필요가 없으므로 조건부 쿼리를 사용해준다.
  ```tsx
  export default function TrendSection() {
    const { data: session } = useSession();
    const { data } = useQuery<Hashtag[]>({
      queryKey: ["trends"],
      queryFn: getTrends,
      staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
      gcTime: 300 * 1000,
      enabled: !!session?.user, // 조건부 쿼리, true일 때만 실행
    });
  ```
  ## 💠 쿼리 재사용하기 → dev tools에서 확인 가능
  ### ✔️ 공통 TrendSection 컴포넌트
  ```tsx
  "use client";

  import style from "./trendSection.module.css";
  import Trend from "./Trend";
  import { usePathname } from "next/navigation";
  import { useSession } from "next-auth/react";
  import { getTrends } from "../_lib/getTrends";
  import { useQuery } from "@tanstack/react-query";
  import { Hashtag } from "@/model/Hashtag";

  export default function TrendSection() {
    const { data: session } = useSession();
    const { data } = useQuery<Hashtag[]>({
      queryKey: ["trends"],
      queryFn: getTrends,
      staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
      gcTime: 300 * 1000,
      enabled: !!session?.user, // 조건부 쿼리, true일 때만 실행
    });

  // ...
  ```
  ### ✔️ explore 페이지의 TrendSection 컴포넌트
  ```tsx
  // src\app\(afterLogin)\explore\_component\TrendSection.tsx
  "use client";

  import Trend from "@/app/(afterLogin)/_component/Trend";
  import { useQuery } from "@tanstack/react-query";
  import { Hashtag } from "@/model/Hashtag";
  import { getTrends } from "@/app/(afterLogin)/_lib/getTrends";

  export default function TrendSection() {
    // 'trends' key에 대한 데이터를 이미 받아왔다면
    // 쿼리 요청을 다시 하지 않고 재사용한다.
    const { data } = useQuery<Hashtag[]>({
      queryKey: ["trends"],
      queryFn: getTrends,
      staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
      gcTime: 300 * 1000,
    });

    return data?.map((trend) => <Trend trend={trend} key={trend.tagId} />);
  }
  ```
- 에러 상황 처리하기(유저 정보 없음)
  ## 💠 Profile 페이지
  프로필 페이지는 로그인을 하지 않아도 접근 가능하기 때문에 SSR을 적용한다.
    <aside>
    💡 **어떤 기준으로 SSR을 적용할까?**
    검색 페이지에 노출되는 페이지를 SSR에 적용시켜 SEO에 대비한다.
    
    </aside>

- 게시글 상세 페이지, 답글, 포토모달
  `cache: 'no-store'` 를 사용하지 않을 경우 기본적으로 데이터가 캐싱된다.
  이는 next의 tags 를 revalidation 하기 전까지는 캐싱이 되어 있다.
  ```tsx
  const res = await fetch(`http://localhost:9090/api/posts/${id}`, {
    next: {
      tags: ["posts", id],
    },
    // cache: 'no-store'
  });
  ```
- 미흡한 부분 구현하기
  ## 💠 searchParams 추가하기
  ### ✔️ URLSearchParams()
  URL의 쿼리 문자열을 대상으로 작업할 수 있는 유틸리티 메서드
  - set(name, value)
    - 매개변수 이름(name)에 값(value)를 지정한다.
  ```tsx
  const onChangeFollow = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("pf", "on");
    router.replace(`/search?${newSearchParams.toString()}`);
  };
  ```
- 인피니트 스크롤링
  ## 💠 mock handler 수정
  클라이언트에서 마지막 postId를 서버에 전달하면, 서버에서는 마지막 postId 다음부터 5개의 post를 보내주기 위해 `cursor` 를 사용한다.
  ```tsx
  http.get("/api/postRecommends", ({ request }) => {
      const url = new URL(request.url);
      const cursor = parseInt(url.searchParams.get("cursor") as string) || 0;
      return HttpResponse.json([
        {
          postId: cursor + 1,
          User: User[0],
          content: `${cursor + 1} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 2,
          User: User[0],
          content: `${cursor + 2} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [
            { imageId: 1, link: faker.image.urlLoremFlickr() },
            { imageId: 2, link: faker.image.urlLoremFlickr() },
          ],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 3,
          User: User[0],
          content: `${cursor + 3} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 4,
          User: User[0],
          content: `${cursor + 4} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [
            { imageId: 1, link: faker.image.urlLoremFlickr() },
            { imageId: 2, link: faker.image.urlLoremFlickr() },
            { imageId: 3, link: faker.image.urlLoremFlickr() },
            { imageId: 4, link: faker.image.urlLoremFlickr() },
          ],
          createdAt: generateDate(),
        },
        {
          postId: cursor + 5,
          User: User[0],
          content: `${cursor + 5} Z.com is so marvelous. I'm gonna buy that.`,
          Images: [
            { imageId: 1, link: faker.image.urlLoremFlickr() },
            { imageId: 2, link: faker.image.urlLoremFlickr() },
            { imageId: 3, link: faker.image.urlLoremFlickr() },
          ],
          createdAt: generateDate(),
        },
      ]);
    }),
  ```
  ## 💠 prefetchInfiniteQuery()
  `prefetchInfiniteQuery()` 훅을 사용하여 인피니트 스크롤을 구현한다.
  `initialPageParam` 프로퍼티를 꼭 설정해주어야 하며, 이것이 `cursor` 의 역할을 한다.
  ```tsx
  // src\app\(afterLogin)\home\page.tsx
  export default async function Home() {
    const queryClient = new QueryClient();

    await queryClient.prefetchInfiniteQuery({
      queryKey: ["posts", "recommends"],
      queryFn: getPostRecommends,
      initialPageParam: 0,
    });
  ```
  ## 💠 PostRecommends 컴포넌트 수정
  SSR query에서 보내준 데이터를 받는 PostRecoomends 컴포넌트 또한 `useQuery()` 가 아닌 `useInfiniteQuery()` 로 수정해준다.
  useInfiniteQuery를 사용하기 위해서는 그에 맞는 타입을 설정해주어야 하고, `initialPageParam` 과 `getNextPageParam` 을 설정해주어야 한다.
  ```tsx
  "use client";

  import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
  import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
  import Post from "@/app/(afterLogin)/_component/Post";
  import { Post as IPost } from "@/model/Post";
  import { Fragment } from "react";

  export default function PostRecommends() {
    const { data } = useInfiniteQuery<
      IPost[],
      Object,
      InfiniteData<IPost[]>,
      [_1: string, _2: string],
      number // initialPageParam의 타입
    >({
      queryKey: ["posts", "recommends"],
      queryFn: getPostRecommends,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.at(-1)?.postId, // lastPage: 가장 최근에 불러왔던 페이지들
      staleTime: 60 * 1000, // fresh -> stale로 변환되는 시간(ms)
      gcTime: 300 * 1000,
    });

    return data?.pages.map((page, idx) => (
      <Fragment key={idx}>
        {page.map((post) => (
          <Post key={post.postId} post={post} />
        ))}
      </Fragment>
    ));
  }
  ```
  ## 💠 query 함수에 cursor 추가하기
  queryKey를 queryFn에 전달할 수 있었던 것처럼 **pageParam 또한 전달된다.**
  ```tsx
  // 서버 컴포넌트이기 때문에 이 함수는 서버에서 실행된다.
  type Props = { pageParam?: number };

  export async function getPostRecommends({ pageParam }: Props) {
    const res = await fetch(
      `http://localhost:9090/api/postRecommends?cursor=${pageParam}`,
      {
        next: {
          tags: ["posts", "recommends"], // 서버에서 가져온 데이터에 tag를 설정, 이후 캐시 초기화 등에 사용됨
        },
        cache: "no-store", // cache를 하지 않음
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }
  ```
- react-intersection-observer로 더 불러오기
  다음 페이지를 불러오는 함수를 **언제** 호출할까?
  observer를 활용하여 호출할 수 있다.
  ## 💠 react-intersection-observer 라이브러리
  ### ✔️ 설치
  ```bash
  $ npm i react-intersection-observer
  ```
  ### ✔️ 적용
  react-intersection-observer에서 제공하는 `useInView()` 훅을 사용한다.
  [@storybook/cli - Storybook](https://react-intersection-observer.vercel.app/?path=/story/useinview-hook--basic)
  ```tsx
  // src\app\(afterLogin)\_component\PostRecommends.tsx
  "use client";

  // ...
  import { useInView } from "react-intersection-observer";

  export default function PostRecommends() {
   // ...

    **const { ref, inView } = useInView({ threshold: 0, delay: 0 });**

    return (
      <>
        {data?.pages.map((page, idx) => (
          <Fragment key={idx}>
            {page.map((post) => (
              <Post key={post.postId} post={post} />
            ))}
          </Fragment>
        ))}
        **<div ref={ref} style={{ height: 50 }}></div>**
      </>
    );
  }
  ```
  - threshold
    - ref로 지정한 div가 보이고 나서, 몇 px 정도쯤에 이벤트가 호출될 것인지 지정
  - delay
    - ref로 지정한 div가 보이고 나서 몇 초 후에 이벤트가 호출될 것인지 지정
  ### ✔️ useEffect 내에서 함수 호출
  ```tsx
  useEffect(() => {
    if (inView) {
      // 현재 데이터를 가져오고 있지 않고, 다음 페이지가 있다면
      // 다음 페이지를 패칭해
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, !isFetching, fetchNextPage, hasNextPage]);
  ```
- Suspense로 Streaming하여 최적화하기 (feat.loading.tsx, error.tsx)
    <aside>
    💡 page.tsx처럼 next.js에서 제공하는 loading.tsx, error.tsx라는 페이지가 존재한다.
    해당 페이지가 로딩중일 때는 loading.tsx 페이지가, 로딩이 완료되면 page.tsx, 에러가 발생하면 error.tsx 페이지가 화면에 표시된다.
    이는 React의 Suspense와 Error Boundary를 활용한 것이다.
    
    </aside>
    
    ## 💠 loading.tsx
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/0374da86-8d0d-4824-9a71-bc2af59a8fce/Untitled.png)
    
    Suspense는 페이지가 로딩 중일 때는 fallback props에 있는것을 보여주고, 로딩이 끝나면 children에 있는 <Page />를 보여준다.
    
    ### ✔️ Page가 로딩중인지 판단하는 기준
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/cab18d45-028a-40c2-910e-7195d6e95129/Untitled.png)
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/86752cf5-bb8a-4f81-a611-620afb2b5fcf/Untitled.png)
    
    - `use` 훅으로 값을 가져오는 경우 (React18)
        
        [use – React](https://react.dev/reference/react/use)
        
        - Context나 Promise를 매개변수로 전달한다.
        - 그 중, Promise를 전달할 경우, resolve 되기까지 Suspense가 기다려준다.
        - 훅이나 컴포넌트 안에 들어가야 하는것은 다른 훅들과 동일하지만, try-catch, if, for문 등에 들어갈 수 있다.
    
    <aside>
    💡 Nextjs는 SSR을 하기 때문에 초기 렌더링 시에는 이미 서버에서 완성된 페이지를 보내주어 로딩창이 필요 없다. 단, 페이지 이동시에는 데이터를 다시 요청하기 때문에 로딩창이 필요하다.
    
    </aside>
    
    ## 💠 error.tsx
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/17e14cea-ec0f-49a1-8130-df69215529bb/Untitled.png)
    
    ErrorBoundary도 Suspense와 마찬가지로 에러가 발생하면 fallback props에 있는 컴포넌트가, 에러가 없다면 Page를 보여주는 구조이다.
    
    <aside>
    💡 Suspense와 ErrorBoundary를 같이 쓴다면 아래와 같은 계층 구조를 갖게 된다. Nextjs는 우리가 계층 구조를 갖지 않아도 되게 page.tsx, loading.tsx, error.tsx 로 분리해준 것이다.
    
    ```tsx
    <ErrorBoundary fallback={<Error />}>
    	<Suspense fallback={<Loading />}>
    		<Page />
    	</Suspense>
    </ErrorBoundary>
    ```
    
    </aside>
    
    ## 💠 콘텐츠 내부에서 로딩 구현하기
    
    - isPending: 초기(데이터를 불러오지 않았을 때)에는 true
    - isFetching: 데이터를 가져오는 순간 true
    - isLoading: isPending && isFetching
    
    ```tsx
    // src\app\(afterLogin)\home\_component\PostRecommends.tsx
    export default function PostRecommends() {
      const { data, fetchNextPage, hasNextPage, isFetching, isPending, isLoading } =
        useInfiniteQuery<
          IPost[],
          Object,
          InfiniteData<IPost[]>,
          [_1: string, _2: string],
          number // initialPageParam의 타입
        >({
          queryKey: ["posts", "recommends"],
          queryFn: getPostRecommends,
          initialPageParam: 0,
          getNextPageParam: (lastPage) => lastPage.at(-1)?.postId, // lastPage: 가장 최근에 불러왔던 페이지들
          staleTime: 60 * 1000, // fresh -> stale로 변환되는 시간(ms)
          gcTime: 300 * 1000,
        });
    
      // ...
    
    	// isPending인 경우 로딩창 보여주
      if (isPending) {
        <div style={{ display: "flex", justifyContent: "center" }}>
          <svg
            className={styles.loader}
            height="100%"
            viewBox="0 0 32 32"
            width={40}
          >
            <circle
              cx="16"
              cy="16"
              fill="none"
              r="14"
              strokeWidth="4"
              style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
            ></circle>
            <circle
              cx="16"
              cy="16"
              fill="none"
              r="14"
              strokeWidth="4"
              style={{
                stroke: "rgb(29, 155, 240)",
                strokeDasharray: 80,
                strokeDashoffset: 60,
              }}
            ></circle>
          </svg>
        </div>;
      }
    ```
    
    `<FollowingPosts />`의 경우 서버에서 프리패칭한 데이터를 보내주는 것이 아니라 클라이언트에서 서버로부터 데이터를 바로 전달받기 때문에 `<PostRecommends />` 와 다르게 로딩창을 바로 볼 수 있다.
    
    ```tsx
    
    // src\app\(afterLogin)\home\_component\FollowingPosts.tsx
    export default function FollowingPosts() {
      const { data, isPending } = useQuery<IPost[]>({
        queryKey: ["posts", "followings"],
        queryFn: getFollowingPosts,
        staleTime: 60 * 1000, // fresh -> stale로 변환되는 시간(ms)
        gcTime: 300 * 1000,
      });
    
      if (isPending) {
        <div style={{ display: "flex", justifyContent: "center" }}>
          <svg
            className={styles.loader}
            height="100%"
            viewBox="0 0 32 32"
            width={40}
          >
            <circle
              cx="16"
              cy="16"
              fill="none"
              r="14"
              strokeWidth="4"
              style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
            ></circle>
            <circle
              cx="16"
              cy="16"
              fill="none"
              r="14"
              strokeWidth="4"
              style={{
                stroke: "rgb(29, 155, 240)",
                strokeDasharray: 80,
                strokeDashoffset: 60,
              }}
            ></circle>
          </svg>
        </div>;
      }
    
      return data?.map((post) => <Post key={post.postId} post={post} />);
    }
    ```
    
    ### ✔️ msw handler에서 delay() 적용해보기
    
    handler에서 delay()를 통해 지연시간을 줌으로써 로딩창을 테스트해볼 수 있다.
    
    ```tsx
    // src\mocks\handlers.ts
    const delay = (ms: number) =>
      new Promise((res) => {
        setTimeout(res, ms);
      });
    
    export const handlers = [
    	http.get("/api/followingPosts", async ({ request }) => {
    	    await delay(3000);
    	    return HttpResponse.json([
    	     // ...
    			]);
    	});
    ```
    
    ## 💠 직접 Suspense를 사용하면 좋은 이유
    
    [Routing: Loading UI and Streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense)
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/7c10fd5f-234c-41ab-88d9-b2a130f37f47/Untitled.png)
    
    기존에 SSR의 동작은 프리패칭쿼리를 하고(A) 서버에서 화면을 렌더링해서(B) 클라이언트에서 하이드레이션해서 화면을 렌더링한다. (C + D)
    
    위에 mock handler에서 delay(3000)을 한다면 A부분이 3초로 길어지게 되어 화면이 그만큼 느리게 그려진다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/20f7afde-2a68-453c-aad6-defd9b74861f/Untitled.png)
    
    하지만, 부분적으로 Suspense를 적용하면 특정 부분만 지연시킬 수 있다.
    
    서버에서 로딩이 필요한 부분과 그렇지 않은 부분을 나눠서 로딩이 필요하지 않은 부분은 화면을 먼저 클라이언트에 보내 그려주고, 로딩이 필요한 부분만 로딩이 끝난 후 클라이언트로 보내줄 수 있다.
    
    **Nextjs의 layout.tsx 은 이를 적용하여 먼저 렌더링되게끔 되어 있다.**
    
     그 외에 로딩이 필요하지 않은 부분을 추가적으로 최적화 해주면 된다.
    
    `<Suspense>` 로 로딩이 필요한 부분만 감싸 적용한다.
    
    ```tsx
    // src\app\(afterLogin)\home\page.tsx
    import PostForm from "./_component/PostForm";
    import Tab from "./_component/Tab";
    import TabProvider from "./_component/TabProvider";
    import style from "./home.module.css";
    import { Suspense } from "react";
    import TabDeciderSuspense from "./_component/TabDeciderSuspense";
    import Loading from "@/app/(afterLogin)/home/loading";
    
    export default async function Home() {
      return (
        <main className={style.main}>
          <TabProvider>
            <Tab />
            <PostForm />
            <Suspense fallback={<Loading />}>
              <TabDeciderSuspense />
            </Suspense>
          </TabProvider>
        </main>
      );
    }
    ```
    
    <aside>
    💡 **정리**
    page에서 로딩이 걸리는 경우 → loading.tsx
    별도로 로딩을 적용할 경우 → Suspense
    react-query에서 로딩 화면을 보여줄 경우 → isPending or isLoading
    
    </aside>
    
    ## 💠 loading.tsx의 로딩 컴포넌트를 줄이는 방법 - useSuspenseQuery()
    
    현재 loading.tsx의 svg가 각 컴포넌트에 하드 코딩 되어있는 상태이다.
    
    ```tsx
    // src\app\(afterLogin)\home\loading.tsx
    import styles from "./home.module.css";
    
    export default function Loading() {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <svg
            className={styles.loader}
            height="100%"
            viewBox="0 0 32 32"
            width={40}
          >
            <circle
              cx="16"
              cy="16"
              fill="none"
              r="14"
              strokeWidth="4"
              style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
            ></circle>
            <circle
              cx="16"
              cy="16"
              fill="none"
              r="14"
              strokeWidth="4"
              style={{
                stroke: "rgb(29, 155, 240)",
                strokeDasharray: 80,
                strokeDashoffset: 60,
              }}
            ></circle>
          </svg>
        </div>
      );
    }
    ```
    
    ```tsx
    
    // src\app\(afterLogin)\home\_component\FollowingPosts.tsx
    export default function FollowingPosts() {
      // ...
    
      if (isPending) {
        <div style={{ display: "flex", justifyContent: "center" }}>
          <svg
            className={styles.loader}
            height="100%"
            viewBox="0 0 32 32"
            width={40}
          >
            <circle
              cx="16"
              cy="16"
              fill="none"
              r="14"
              strokeWidth="4"
              style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
            ></circle>
            <circle
              cx="16"
              cy="16"
              fill="none"
              r="14"
              strokeWidth="4"
              style={{
                stroke: "rgb(29, 155, 240)",
                strokeDasharray: 80,
                strokeDashoffset: 60,
              }}
            ></circle>
          </svg>
        </div>;
      }
    
     // ...
    ```
    
    이는 loading.tsx를 컴포넌트로 import해서 사용할 수 있지만,  `useSuspenseQuery()`를 사용하여 대체할 수 있다.
    
    ### ✔️ useSuspenseQuery()
    
    **useSuspenseQuery()는 상위의 Suspense 컴포넌트를 감지한다.**
    
    ```tsx
    "use client";
    
    import { useSuspenseQuery } from "@tanstack/react-query";
    import { getFollowingPosts } from "@/app/(afterLogin)/home/_lib/getFollowingPosts";
    import Post from "@/app/(afterLogin)/_component/Post";
    import { Post as IPost } from "@/model/Post";
    
    export default function FollowingPosts() {
      const { data } = useSuspenseQuery<IPost[]>({
        queryKey: ["posts", "followings"],
        queryFn: getFollowingPosts,
        staleTime: 60 * 1000, // fresh -> stale로 변환되는 시간(ms)
        gcTime: 300 * 1000,
      });
    
      return data?.map((post) => <Post key={post.postId} post={post} />);
    }
    ```
    
    현재 `<FollowingPosts />` 컴포넌트를 렌더링 하는 상위 컴포넌트 `<TabDeciderSuspense />` 컴포넌트가 <Suspense>로 감싸져 있기 때문에 useSuspenseQuery()는 이를 감지하여 로딩상태일 때 Suspense의 fallback props에 있는 컴포넌트를 렌더링한다.
