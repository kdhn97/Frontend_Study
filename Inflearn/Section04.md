# 섹션 4. 백엔드 개발자가 드디어 API 문서를 주었다

<aside>
💡 Next 서버 실행 명령어는 `npm run dev` 이다…
`npm start` 로 삽질 금지 ❌❌❌

</aside>

- 백엔드 서버 세팅하기
  ## 💠 PostgreSQL 설치
  [PostgreSQL](https://www.postgresql.org/)
    <aside>
    💡 **PostgreSQL과 MySQL의 차이점**
    MySQL은 읽기 전용 명령을 관리하는 데 주로 사용되며, PostgreSQL는 읽기-쓰기 작업, 대규모 데이터 세트 및 복잡한 쿼리를 관리하는 데 주로 사용된다.
    
    MySQL은 PostgreSQL보다 기능이 적지만, 읽기 전용 쿼리에서 더 가볍고 안정적이며 빠른 처리 속도를 유지할 수 있다.
    
    MySQL은 **관계형 데이터베이스 관리 시스템(RDBMS)**, PostgreSQL은 **객체 관계형 데이터베이스 관리 시스템(ORDBMS)**이다.
    
    [PostgreSQL과 MySQL 비교: 주요 차이점](https://www.integrate.io/ko/blog/postgresql-vs-mysql-which-one-is-better-for-your-use-case-ko/)
    
    </aside>
    
    ### ✔️ DB 관리자 유저 세팅
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/b3bcccb4-7805-41e9-8d03-48ce7acbcaa6/Untitled.png)
    
    <aside>
    💡 ID: postgres
    PW: 123123
    Default port: 5432
    
    </aside>
    
    ## 💠 Redis (Windows는 Memurai) 설치
    
    [Redis](https://redis.io/)
    
    [Redis for Windows alternative, In-Memory Datastore | Memurai](https://www.memurai.com/?gclid=CjwKCAiA5L2tBhBTEiwAdSxJX1tst--Tx6hwXFmnWyXeFnVnx-x6AMFMFyG5HXIX2uDxqmTKlqEJdRoC2WwQAvD_BwE)
    
    - Memurai는 공식 사이트에서도 설명 되어 있듯, 윈도우에서 Redis 대체용으로 사용된다.
    - Memurai port: 6379
    
    ### ✔️ Redis란?
    
    **Re**mote **Di**ctionary **S**erver의 약자로 Dictionary 구조(key-value 형태)로 데이터를 저장하고 관리하는 서버이다. Redis는 데이터베이스, 캐시, 메시지 브로커 및 스트리밍 엔진으로 사용되는 오픈 소스, 인메모리 데이터 구조 저장소이다. **인메모리**란 컴퓨터의 주기억장치인 RAM에 데이터를 올려서 사용하는 방법으로 데이터를 저장하고 조회할 때 하드 디스크를 오고 가는 과정을 거치지 않아 SSD, HDD 같은 저장 공간에서 데이터를 가져오는 것보다 속도가 훨씬 빠르다. 따라서 **Redis는 속도가 빠르다는 장점을 가지고 있지만, 용량으로 인해 데이터 유실이 발생할 수 있어 메인 DB로 사용되지는 않는다.**
    
    이 강의에서는 로그인 기능과 관련해서 사용되었다.
    
    <aside>
    💡 **Memurai 설치 시 자동으로 실행이 안 되는 경우 윈도우 서비스에서 직접 실행해주기**
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/05db8623-2a98-46a5-b451-52e905621f40/Untitled.png)
    
    </aside>
    
    ## 💠 Server Code Clone
    
    https://github.com/ZeroCho/nest-prisma
    
    - 깃헙에서 다운로드 받은 ZIP파일을 VSCode로 새로 열어 `npm i` 로 패키지 설치
    
    ## 💠 pgAdmin4 실행
    
    - pgAdmin4는 PostgreSQL 설치 시 설치된다.
    
    ### ✔️ 서버 생성
    
    `Servers > Register > Server` 로 서버를 생성한다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/93ce536e-f9e7-41fc-ae66-a2da8929bf6c/Untitled.png)
    
    Host name/address에는 `localhost` 를, Maintenance database와 Username, Password는 PostgreSQL 설치 시 세팅했던 유저 정보로 입력해주면 된다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/bc7e463d-58ec-466d-ad34-e7f6732623a2/Untitled.png)
    
    ### ✔️ 서버 코드 수정
    
    서버 코드의 `.env` 파일에서 설정한 유저 비밀번호로 코드를 수정해준다.
    
    ```json
    // .env
    DATABASE_URL="postgresql://postgres:[유저 비밀번호]@localhost:5432/zcom?schema=public"
    REDIS_URL=redis://localhost:6379
    COOKIE_SECRET=cookienyamnyam
    ```
    
    ### ✔️ DB 생성
    
    `Create > Database` 로 DB를 생성한다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/b8e34641-babc-4b7a-a076-10ab22be112d/Untitled.png)
    
    DB 이름은 zcom으로 설정하며, 이는 서버 코드의 `.env` 에서 DATABASE_URL에서 적어주었던 DB 이름과 일치해야한다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/f4bfb72a-f1cc-4a40-bbd0-210193014162/Untitled.png)
    
    ### ✔️ draft migration file 생성
    
    Prisma 라이브러리를 통해 migration 초안을 작성한다.
    
    ```bash
    $ npx prisma migrate dev
    ```
    
    zcom의 DB 아래의 Schemas 아래에 Table이 생성된다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/bc63f180-c09b-422f-b01f-78d014c456d2/Untitled.png)
    
    ## 💠 서버 실행
    
    ```bash
    $ npm run start:dev
    ```
    
    - 서버를 실행하면 [localhost:9090/api](http://localhost:9090/api) 에서 백엔드 개발자가 준 swagger 문서를 확인할 수 있다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/760c2ca7-d947-47bb-a774-8a5f22fa5102/Untitled.png)

- 로그인과 회원가입 실제로 하기 **(로그인 시 리다이렉트, 에러 메시지 보이지 않는 오류 해결 완료)**
    <aside>
    💡 기존 mock server를 끄고, 백엔드 서버 코드 실행시키기
    
    </aside>
    
    <aside>
    💡 **Nextjs Server Action 사용 시에 발생하는 에러는 개발자 도구에서 확인할 수 없다. 개발자 도구에는 올바른 요청이라고 표시되기 때문이다.** 만약, 따로 콘솔에 에러를 출력하도록 설정했다면, vscode에서는 확인 가능하므로 주의하자.
    
    </aside>
    
    ## 💠 회원가입
    
    - 회원가입 시 세션 쿠키가 브라우저에 등록되어 cookie를 사용하려면 `credentials: 'include'` 옵션을 꼭 넣어주도록 하자.
    
    ```tsx
    try {
    	const response = await fetch(
    	  `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
    	  {
    	    method: "post",
    	    body: formData,
    	    **credentials: "include", // 이 속성이 있어야 쿠키 전달 가능**
    	  }
    	// ...
    );
    ```
    
    ### ✔️ 회원가입 후 자동 로그인이 될 때 로그아웃 버튼이 나타나지 않는 현상
    
    현재 로그인 이후의 코드들을 확인해보면, server action으로 만들어둔 `auth()` 의 반환 값을 할당한 session 에는 값이 존재하지만, LogoutButton 컴포넌트에서 `useSession()` 으로 가져온 반환 값은 null 인 상태이다.
    
    ```tsx
    // src\app\(afterLogin)\layout.tsx
    export default async function AfterLoginLayout({ children, modal }: Props) {
      const session = await auth();
    // ...
    ```
    
    ```tsx
    // src\app\(afterLogin)\_component\LogoutButton.tsx
    export default function LogoutButton() {
      const { data: me } = useSession();
    // ...
    ```
    
    따라서 useSession() 훅을 통해서 값을 가져오지 않고, 레아웃에서 LogoutButton으로 props를 넘겨주도록 코드를 수정한다.
    
    ```tsx
    // src\app\(afterLogin)\layout.tsx
    export default async function AfterLoginLayout({ children, modal }: Props) {
      const session = await auth();
    
      return (
          // ...
          <LogoutButton me={session} />
    ```
    
    ```tsx
    // src\app\(afterLogin)\_component\LogoutButton.tsx
    import { Session } from "@auth/core/types";
    
    type Props = {
      me: Session | null;
    };
    
    export default function LogoutButton({ me }: Props) {
    	// ...
    ```
    
    그 외에 client 컴포넌트에서 자동 로그인 후 session 정보를 가져와야할 부분을 위와 같이 변경해준다.
    
    ### ✔️ 회원 이미지가 보이지 않는 현상
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/4db0d9f7-52cc-4503-82cb-b5c032195636/Untitled.png)
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/d0602b3b-df5f-4caf-8a6d-d3d850d4ca7e/Untitled.png)
    
    회원가입시 선택한 이미지가 보이지 않는 이유는 프론트 서버 주소로 이미지가 업로드 되어 있기 때문이다.
    
    이는 Next.js rewrites 기능을 사용하면 해결할 수 있다.
    
    <aside>
    💡 **rewrites
    rewrites**는 `next.config.js` 에서 사용할 수 있고, 요청 경로를 다른 경로에 매핑할 수 있다.
    URL 프록시 역할을 하며 대상 경로를 마스킹하여 사용자가 사이트에서 자신의 위치를 변경하지 않은 것처럼 보이게 한다. 반면, redirection은 새 페이지로 다시 라우팅되고 URL 변경 사항을 표시한다는 점에서 차이가 있다.
    
    </aside>
    
    [next.config.js Options: rewrites](https://nextjs.org/docs/app/api-reference/next-config-js/rewrites#path-matching)
    
    아래의 코드는 주소가 `/upload/:slug` 라면, `http://localhost:9090/upload/:slug` 로 재작성되어 매핑된다. 따라서 요청은 destination에 설정한 주소에만 요청된다.
    
    ```tsx
    // next.config.js
    const nextConfig = {
      async rewrites() {
        return [
          {
            source: "/upload/:slug", // 기존 경로
            destination: "http://localhost:9090/upload/:slug", // 매핑할 경로
          },
        ];
      },
    };
    
    module.exports = nextConfig;
    ```
    
    ## 💠 로그인
    
    ### ✔️ `TypeError: Failed to construct 'URL': Invalid base URL` 에러 발생
    
    <aside>
    ⚠️ **문제 상황 1.**
    올바른 아이디와 비밀번호를 입력하여 session token이 생성되지만, 에러가 발생하여 redirect가 되지 않았다.
    하지만 새로고침을 할 경우 생성된 session token에 의해 afterLogin 페이지로 이동된다.
    
    </aside>
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/63bbca7c-d7db-4fc4-8d61-1b8f5f1d4321/Untitled.png)
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/12b7d228-9deb-46d0-b2ed-87df49a9ea3d/Untitled.png)
    
    ```tsx
    "use client";
    
    import { signIn } from "next-auth/react";
    
    export default function LoginModal() {
    	// ...
      const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
    
        try {
          const response = await signIn("credentials", {
            username: id,
            password: password,
            redirect: false,
          });
    
    			console.log(response); **// 콘솔에 출력되지 않음**
    
          if (!response?.ok) {
            setMessage("아이디와 비밀번호가 일치하지 않습니다.");
          } else {
            router.replace("/home");
          }
        } catch (err) {
          console.error(err);
          setMessage("아이디와 비밀번호가 일치하지 않습니다.");
        }
      }
    ```
    
    위 문제는 next-auth의 `signIn()` 을 사용할 때 발생한다고 한다.
    
    내가 사용했던 next-auth 버전은 v5.0.0-beta.4 이었으며 현재 v5.0.0-beta.5에는 패치가 포함되었다.
    
    [V5 `signin()` throws error when using `redirect: false` · Issue #9279 · nextauthjs/next-auth](https://github.com/nextauthjs/next-auth/issues/9279)
    
    최신 beta 버전으로 업데이트 해주니, 에러 없이 response가 잘 출력되는 것을 확인할 수 있었다.
    
    ```bash
    $ npm i next-auth@beta
    ```
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/ccdd1475-1070-4b15-be44-6ea8f17e2c95/Untitled.png)
    
    <aside>
    ⚠️ **문제상황 2. redirect이 되지 않는다.**
    
    </aside>
    
    하지만 콘솔로 if-else 문이 잘 실행되는 것을 확인했음에도, home으로 리다이렉션이 되지 않았다.
    
    아래는 LogoutButton에서 사용된 next-auth signOut()의 코드이다. 로그아웃 시에는 리다이렉트가 잘 되고 있다.
    
    **로그아웃 코드와 로그인시 코드와의 차이점은 async-await가 아닌 then을 사용해주었다는 것이다.**
    
    ```tsx
    // src\app\(afterLogin)\_component\LogoutButton.tsx
    import { signOut } from "next-auth/react";
    
    export default function LogoutButton({ me }: Props) {
      const router = useRouter();
    
      const onLogout = () => {
        signOut({ redirect: false }).then(() => {
          router.replace("/");
        });
      };
    ```
    
    - **기존 코드 (async-await 사용)**
    
    ```tsx
    // src\app\(beforeLogin)\_component\LoginModal.tsx
    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        // ...
        try {
          const response = await signIn("credentials", {
            username: id,
            password: password,
            redirect: false, // true로 할 경우 서버에서 리다이렉트 되므로 클라이언트 컴포넌트에서는 false로 설정 후 router.replace() 사용
          });
    
          if (!response?.ok) {
            setMessage("아이디와 비밀번호가 일치하지 않습니다.");
          } else {
            router.replace("/home");
          }
    
        } catch (err) {
          console.error(err);
          setMessage("아이디와 비밀번호가 일치하지 않습니다.");
        }
      };
    ```
    
    - **수정된 코드 (then 사용)**
    
    ```tsx
    // src\app\(beforeLogin)\_component\LoginModal.tsx
    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    		// ...
        signIn("credentials", {
          username: id,
          password: password,
          redirect: false, // true로 할 경우 서버에서 리다이렉트 되므로 클라이언트 컴포넌트에서는 false로 설정 후 router.replace() 사용
        })
          .then((response) => {
            if (!response?.ok) {
              setMessage("아이디와 비밀번호가 일치하지 않습니다.");
            } else {
              router.replace("/home");
            }
          })
          .catch((err) => {
            console.error(err);
            setMessage("아이디와 비밀번호가 일치하지 않습니다.");
          });
    }
    ```
    
    <aside>
    ⚠️ **문제상황 3.** redirect는 해결되었지만, 아이디 비밀번호를 틀리게 입력했을 시 에러 메시지가 보이지 않는다.
    
    </aside>
    
    then() 안에서 콘솔로 확인해보니 response의 형태는 아래와 같았다.
    
    위에가 아이디 비밀번호를 틀리게 입력했을 경우, 아래가 아이디 비밀번호를 올바르게 입력했을 경우이다.
    
    **둘다 ok가 true여서 에러 메시지 상태값이 제대로 변경되지 않았다.**
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/d23af097-b2ed-4d51-bb56-485ae164a84e/Untitled.png)
    
    - **수정된 최종 코드**
    
    `!response?.ok` 가 아닌 `response?.error` 로 분기처리를 해주었더니 아이디 비밀번호가 일치하지 않을 때 에러 메시지를 띄워주고, 올바르다면 리다이렉트 시켜주는 동작까지 해결할 수 있었다.✨
    
    ```tsx
    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    		// ..
        signIn("credentials", {
          username: id,
          password: password,
          redirect: false, // true로 할 경우 서버에서 리다이렉트 되므로 클라이언트 컴포넌트에서는 false로 설정 후 router.replace() 사용
        })
          .then((response) => {
            **if (response?.error)** {
              setMessage("아이디와 비밀번호가 일치하지 않습니다.");
            } else {
              router.replace("/home");
            }
          })
          .catch((err) => {
            console.error(err);
            setMessage("아이디와 비밀번호가 일치하지 않습니다.");
          });
      };
    ```
    
    ## 💠 403 Forbidden 에러
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/32473d3e-c5c5-4ca1-b5c9-968afd2955b1/Untitled.png)
    
    API 요청 함수에 쿠키가 포함되어 있지 않아서 발생하는 오류이다. fetch 함수에서 `credentials: 'include'` 옵션을 추가하면 된다.
    
    ```tsx
    export async function getTrends() {
      const res = await fetch("http://localhost:9090/api/hashtags/trends", {
        next: {
          tags: ["trends"],
        },
        **credentials: "include",**
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

- 업로드 이미지 미리보기
  ## 💠 게시글 작성 폼 수정하기
  ### ✔️ 입력하는 글에 따라 textarea 자동 조정
  - react-textarea-autosize 라이브러리
    - `<textarea>` 부분을 `<ReactTextAreaAutosize>` 로 변
  [npm: react-textarea-autosize](https://www.npmjs.com/package/react-textarea-autosize)
  ```tsx
  // src\app\(afterLogin)\home\_component\PostForm.tsx
  import ReactTextareaAutosize from "react-textarea-autosize";

  export default function PostForm({ me }: Props) {
    return (
      // ...
      <ReactTextareaAutosize
        value={content}
        onChange={onChange}
        placeholder="무슨 일이 일어나고 있나요?"
      />
    );
  }
  ```
  ## 💠 업로드 이미지 미리보기 뷰
  ### ✔️ onUpload 함수 작성
  - 선택된 이미지 파일을 상태값으로 저장
  ```tsx
  export default function PostForm({ me }: Props) {
    const [imagePreview, setImagePreview] = useState<Array<{ dataUrl: string; file: File }| null>>([]);

  	const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
      e.preventDefault();

      // 선택한 파일이 있는 경우
      if (e.target.files) {
        // 각 이미지 파일을 Data URL로 변환하고, imagePreview 배열에 업데이트
        // readAsDataURL()의 반환값은 무조건 string
        Array.from(e.target.files).forEach((file, index) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview((prevPreview) => {
              const prev = [...prevPreview];
              prev[index] = { dataUrl: reader.result as string, file };
              return prev;
            });
          };
          reader.readAsDataURL(file);
        });
      }
    };
  ```
  - `if(e.target.files)`
    - input의 type=’file’ 요소에서 사용자가 선택한 파일이 있을 경우
  - `Array.from(e.target.files).forEach((file, index) => {...})`
    - 선택된 파일 목록을 배열로 변환 후, 각 파일에 대해 callback 함수 실행
  - `const reader = new FileReader();`
    - 각 파일에 대한 FileReader 객체 생성
    - FileReader는 파일을 비동기적으로 읽을 수 있는 객체이다.
  - `reader.onloadend = () => {...}`
    - FileReader의 onloadend 이벤트 핸들러를 설정
    - 해당 이벤트는 파일 읽기가 완료되었을 때 호출된다.
  - `reader.readAsDataURL(file);`
    - FileReader를 사용하여 현재 파일을 읽는다.
    - 이때 파일을 Data URL로 변환하고, 해당 작업이 완료되면 **onloadend** 이벤트 핸들러가 호출된다.
  위 함수는 `input type="file"` 에 적용한다.
  ```tsx
  <input
    type="file"
    name="imageFiles"
    multiple
    hidden
    ref={imageRef}
    onChange={onUpload}
  />
  ```
  ### ✔️ 미리보기 요소 만들기
  - 선택한 이미지들을 보여주는 뷰 만들
  ```tsx
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {imagePreview.map(
      (image, index) =>
        image && (
          <div key={index} style={{ flex: 1 }} onClick={onRemoveImage(index)}>
            <img
              src={image.dataUrl}
              alt="이미지 미리보기"
              style={{
                width: "100%",
                maxHeight: "100",
                objectFit: "contain",
              }}
            />
          </div>
        )
    )}
  </div>
  ```
  ## 💠 작성한 게시글 업로드
  ```tsx
  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    imagePreview.forEach((image) => {
      image && formData.append("images", image.file);
    });

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
      method: "post",
      credentials: "include",
      body: formData,
    });
  };
  ```
- 서버 쿠키 공유하기 & 게시글 업로드 완성 **(질문-해결✅)**
  ## 💠 서버 쿠키 공유하기
    <aside>
    💡 **프론트에서는 session-token으로 로그인 여부를 확인할 수 있고, 백엔드에서는 connect.sid로 로그인 여부를 확인할 수 있다.**
    
    session-token은 백엔드에서 사용되지 않으니, connect.sid라는 백엔드에 요청을 보내기 위한 토큰이 존재하고, 프론트에서는 해당 토큰을 쿠키 형태로 취한다고 이해하기!
    
    </aside>
    
    - cookie
        
        [npm: cookie](https://www.npmjs.com/package/cookie?activeTab=readme)
        
        - 문자열 형태의 쿠키를 객체 형태로 변환시켜주는 라이브러리
        - 쿠키 생성, 읽기, 수정, 삭제 등의 기능이 추상화되어 제공되기 때문에 간단한 코드로 쿠키를 관리할 수 있다.
        - 보안 관련 기능을 내장하고 있어 쿠키의 안정성과 신뢰성을 높이는데 도움이 된다.
        - 쿠키의 만료 관리, 도메인 간 쿠키 전송 설정, 쿠키 암호화 등의 기능을 쉽게 사용할 수 있어 직접 구현할 필요가 없다.
    - cookies()
        
        [Functions: cookies](https://nextjs.org/docs/app/api-reference/functions/cookies)
        
        - HTTP 수신 요청 쿠키를 읽거나 요청 보내는 쿠키에 사용되는 Nextjs 제공 함수
        - `set()` : 쿠키 이름, 값, 옵션을 가져와서 요청 보내는 쿠키를 설정할 수 있다.
            - HTTP는 스트리밍 시작 후 쿠키 설정을 허용하지 않으므로 Server Action 혹은 Route Handler에서 사용해야 한다.
            - 프론트 서버에 쿠키를 심어주는 것이 아니라 브라우저에 쿠키를 심어주는 것!
            - 프론트 서버에는 쿠키를 심으면 안된다. 프론트 서버는 **서버**이기 때문에 여러 브라우저가 해당 서버를 공유할 수 있다. 즉, **프론트 서버에 로그인 쿠키를 심어버리면 개인정보유출 문제가 발생할 수 있다.** 따라서 항상 브라우저에 쿠키를 심도록 유의하자
            
            <aside>
            💡 브라우저에 쿠키 심기? 프론트 서버에 쿠키 심기?
            
            [학습 페이지](https://www.inflearn.com/course/lecture?courseSlug=next-react-query-sns서비스&unitId=194509&category=questionDetail&tab=community&q=1142876)
            
            > fetch 함수 내의 cookies는 백엔드에 요청할 때 사용하기 위해 브라우저의 쿠키를 프론트 서버로 가져오는 것이고, 로그인 authorize에서 cookies.set은 백엔드에서 준 쿠키를 프론트 서버를 거쳐 브라우저에 심는 것이다.
            > 
            </aside>
            
    
    ```bash
    $ npm i cookie
    ```
    
    ```tsx
    import cookie from "cookie";
    import { cookies } from "next/headers";
    
    export const {
      handlers: { GET, POST },
      auth,
      signIn,
    } = NextAuth({
      pages: {
        //...
      },
      providers: [
        CredentialsProvider({
          async authorize(credentials) {
            const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: credentials.username,
                password: credentials.password,
              }),
            });
    
            **// 백엔드 서버의 로그인 토큰 받아오기
            let setCookie = authResponse.headers.get("Set-Cookie");
    
            if (setCookie) {
              // 해당 토큰은 문자열 형태로 그대로 사용하기엔 보안에 취약
              const parsed = cookie.parse(setCookie);
    					// set(쿠키 이름, 쿠키 값, 옵션)
              cookies().set("connect.sid", parsed["connect-sid"], parsed); // 브라우저에 쿠키를 심어주는 것
            }**
    
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
    ```
    
    ## 💠 게시글 업로드 기능 완성
    
    - 현재 게시글은 react-query의 useInfiniteQuery 훅을 통해 렌더링 되고 있다.
    - 따라서 해당 쿼리 키를 가진 쿼리에 작성된 게시글 데이터를 `setQueryData` 훅으로 맨 앞에 추가해준다.
    
    ```tsx
     export default function PostForm({ me }: Props) {
      const queryClient = useQueryClient();
    
    	const onSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("content", content);
        imagePreview.forEach((image) => {
          image && formData.append("images", image.file);
        });
    
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
            {
              method: "post",
              credentials: "include",
              body: formData,
            }
          );
    
          **if (response.status === 201) {
            setContent("");
            setImagePreview([]);
    
            const newPost = await response.json();
    
            queryClient.setQueryData(
              ["posts", "recommends"],
              (prevData: { pages: Post[][] }) => {
                const shallow = { ...prevData, pages: [...prevData.pages] };
                shallow.pages[0] = [...shallow.pages[0]];
                shallow.pages[0].unshift(newPost);
                return shallow;
              }
            );
          }**
        } catch (err) {
          console.log(err);
        }
      };
    ```

- useMutation 사용하기
  ## 💠 useMutation 사용 이유
  - 데이터 상태 관리가 가능하다 (loading, error, success)
  - react-query의 장점 활용 가능
    - optimistic update, 낙관적 업데이트
      - 반응속도를 빠르게 하기 위해 사용된다. (→ 사용자가 로딩창을 보는 것을 최소화하기 위해 사용)
      - 요청을 보낼 때 성공했다고 가정하고 화면을 업데이트 해준 뒤, 에러가 발생한다면 요청을 취소하여 복구하고, 성공했다면 이미 화면을 업데이트 해주었기 때문에 별도로 고려해줄 필요가 없다.
      - 요청이 성공했을 때 유저 입장에서는 로딩을 기다리지 않아도 되서 편할 수 있지만, 에러가 발생했을 경우에는 상황이 다르다.
      - 화면이 업데이트 되었지만 에러가 발생한다면 로딩 이후 에러가 발생한 경우보다 당황스러움이 배가 될 수 있기 때문에 게시글 등록과 같은 동작에는 적용하지 않는 것이 좋다.
      - 대체적으로 좋아요 기능에 사용됨
  ## 💠 submit 함수에 mutation 적용해보기
  - 기존 submit 함수 코드
    ```tsx
    // src\app\(afterLogin)\home\_component\PostForm.tsx
    const onSubmit: FormEventHandler = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("content", content);
      imagePreview.forEach((image) => {
        image && formData.append("images", image.file);
      });

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
          {
            method: "post",
            credentials: "include",
            body: formData,
          }
        );

        if (response.status === 201) {
          setContent("");
          setImagePreview([]);

          const newPost = await response.json();

          // 추천 탭 게시글에 등록
          queryClient.setQueryData(
            ["posts", "recommends"],
            (prevData: { pages: Post[][] }) => {
              const shallow = { ...prevData, pages: [...prevData.pages] };
              shallow.pages[0] = [...shallow.pages[0]];
              shallow.pages[0].unshift(newPost);
              return shallow;
            }
          );

          // 팔로우 탭 게시글에 등록
          queryClient.setQueryData(
            ["posts", "followings"],
            (prevData: { pages: Post[][] }) => {
              const shallow = { ...prevData, pages: [...prevData.pages] };
              shallow.pages[0] = [...shallow.pages[0]];
              shallow.pages[0].unshift(newPost);
              return shallow;
            }
          );
        }
      } catch (err) {
        alert("업로드 중 에러가 발생했습니다.");
      }
    };
    ```
  - submit 함수에서 처리해줬던 try-catch를 react query에 위임하고, 요청 값만 return 해주면 된다.
  - try-catch 위임은 `onMutate` `onSuccess` `onError` 옵션에 할 수 있다.
    - onMutate: mutate 함수가 호출되었을 때 실행할 코드
    - onSuccess: 요청이 성공되었을 때 실행할 코드
      - response: mutation 요청의 응답
      - variable: mutation 요청 시 매개변수 (→ formEvent라면 이벤트 객체)
      - context: onMutate의 리턴 값
    - onError: 요청이 실패했을 때 실행할 코드
    - onSettled: 성공이든, 실패든 mutate 실행이 종료되면 실행할 코드
  ```tsx
  const mutation = useMutation({
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("content", content);
      imagePreview.forEach((image) => {
        image && formData.append("images", image.file);
      });

      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
        method: "post",
        credentials: "include",
        body: formData,
      });
    },
    async onSuccess(response) {
    // 요청 성공 시 실행
      const newPost = await response.json();

      setContent("");
      setImagePreview([]);

      if (queryClient.getQueryData(["posts", "recommends"])) {
        queryClient.setQueryData(
          ["posts", "recommends"],
          (prevData: { pages: Post[][] }) => {
            const shallow = {
              ...prevData,
              pages: [...prevData.pages],
            };
            shallow.pages[0] = [...shallow.pages[0]];
            shallow.pages[0].unshift(newPost);
            return shallow;
          }
        );
      }
      if (queryClient.getQueryData(["posts", "followings"])) {
        queryClient.setQueryData(
          ["posts", "followings"],
          (prevData: { pages: Post[][] }) => {
            const shallow = {
              ...prevData,
              pages: [...prevData.pages],
            };
            shallow.pages[0] = [...shallow.pages[0]];
            shallow.pages[0].unshift(newPost);
            return shallow;
          }
        );
      }
    },
    onError() {
  	// 요청 실패 시 실행
      alert("업로드 중 에러가 발생했습니다.");
    },
  });

  return (
  		// onSubmit props에 mutate 함수 전달
      <form className={style.postForm} onSubmit={mutation.mutate}>
  // ...
  ```
  ## 💠 요청이 성공했지만 onError가 동작하는 경우
  네트워크 탭에서 확인해봤을 때 posts 요청은 성공했지만, onError가 동작하여 alert창이 실행되는 것을 확인할 수 있다.
  alert창을 닫으면 게시글도 등록된다.
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/5f1cc439-65d6-47af-b017-9248edaa0d29/Untitled.png)
  그 이유는 현재 onSuccess 코드를 보면 [’posts’, ‘recommends’] 쿼리와 [’posts’, ‘followings’] 쿼리에 동시에 데이터를 추가하고 있는데 사용자가 보는 페이지에 따라 각 쿼리가 inactive 상태이기 때문이다.
  즉 추천 게시글 페이지에서는 팔로잉 게시글 쿼리가 없고, 팔로잉 게시글 페이지에서는 추천 게시글 쿼리가 존재하지 않아서 mutate에 에러가 발생하는 것 같다.
  따라서 **if문을 추가해 데이터가 있는지 점검**해준 뒤, 데이터를 추가해주면 해결된다.
  ```tsx
  async onSuccess(response) {
    setContent("");
    setImagePreview([]);

    const newPost = await response.json();

    if (queryClient.getQueryData(["posts", "recommends"])) {
      // 추천 탭 게시글에 등록
      queryClient.setQueryData(
        ["posts", "recommends"],
        (prevData: { pages: Post[][] }) => {
          const shallow = { ...prevData, pages: [...prevData.pages] };
          shallow.pages[0] = [...shallow.pages[0]];
          shallow.pages[0].unshift(newPost);
          return shallow;
        }
      );
    }

    if (queryClient.getQueryData(["posts", "followings"])) {
      // 팔로우 탭 게시글에 등록
      queryClient.setQueryData(
        ["posts", "followings"],
        (prevData: { pages: Post[][] }) => {
          const shallow = { ...prevData, pages: [...prevData.pages] };
          shallow.pages[0] = [...shallow.pages[0]];
          shallow.pages[0].unshift(newPost);
          return shallow;
        }
      );
    }
  },
  ```
  - react query dev tools에서 어떤 mutation이 실행되고 실패되었는지도 확인할 수 있다.
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/f83f6bcc-cf87-4518-aa0d-ea00eb67de2d/Untitled.png)
    <aside>
    💡 **fetching vs. pending**
    fetching은 데이터를 가져오는 중인 상태, pending은 데이터가 없는 초기에 데이터를 가져오는 중인 상태이다.
    즉, pending은 초기 데이터 + fetching인 경우를 말한다.
    
    </aside>

- 주소에 해시가 들어가면 문제가 됩니다(encodedURIComponent) **(+인피니티 스크롤링 적용해보기)**
    <aside>
    💡 내가 로그인 했는지의 여부를 서버에서 알아야 할 땐, fetch 요청에 `credentials: 'include'` 를 꼭! 추가해주어야 한다.
    ex) ‘나를 위한 트렌드’의 경우 로그인한 유저에만 트렌드를 보여주기 때문에 해당 옵션이 필요하다.
    
    </aside>
    
    ## 💠 검색 요청 파라미터 변환
    
    검색창을 통한 검색 시, 요청 URL에 파라미터가 객체 형태로 들어가 있어 에러가 발생하고 있다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/ed71c1be-cf7e-4b4e-9de9-869158a133eb/Untitled.png)
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/60ce4a2e-565d-4953-85d2-bfc1eab40624/Untitled.png)
    
    검색 결과를 가져오는 getSearchResult 함수를 보면 searchParams를 toString()으로 변환하고 있다.
    
    현재 searchParams가 `new URLSearchParams()` 로 생성된 객체가 아닌 일반 객체이기 때문에 toString()으로 변환해줄 경우 [object$20Object]의 형태로 변환된다.
    
    ```tsx
    // src\app\(afterLogin)\search\_lib\getSearchResult.ts
    export const getSearchResult: QueryFunction<
      Post[],
      [_1: string, _2: string, searchParams: { q: string; pf?: string; f?: string }]
    > = async ({ queryKey }) => {
      const [_1, _2, searchParams] = queryKey;
    	const res = await fetch(
    	  `http://localhost:9090/api/search/${
    	    searchParams.q
    	  }?${**searchParams.toString()**}`,
    	  {
    	    next: {
    	      tags: ["posts", "search", searchParams.q],
    	    },
    	    cache: "no-store",
    	  }
    	);
    // ....
    ```
    
    searchParams를 `URLSearchParams()` 생성자의 매개변수로 전달하여 URL 쿼리 문자열 객체로 변환해준다.
    
    <aside>
    💡 **URLSearchParams**
    URLSearchParams로 생성된 객체는 URL의 쿼리 문자열을 대상으로 작업할 수 있는 유틸리티 메서드를 사용할 수 있고, for…of 문을 통해 순회가 가능하다.
    
    [URLSearchParams - Web API | MDN](https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams)
    
    </aside>
    
    ```tsx
    **const urlSearchParams = new URLSearchParams(searchParams);**
    
    const res = await fetch(
      `http://localhost:9090/api/search/${
        searchParams.q
      }?${**urlSearchParams.toString()**}`,
      {
        next: {
          tags: ["posts", "search", searchParams.q],
        },
        cache: "no-store",
      }
    );
    ```
    
    ## 💠 주소에 해시가 들어갈 경우
    
    해시태그를 검색할 경우 쿼리 파라미터에는 `#` 이 포함되어 있다.
    
    브라우저는 url에 `#` 이 있을 때 이를 해시라고 판단한다.
    
    해시는 서버에 전달이 되지 않아 react query devtools를 확인해보면 q에 빈 문자열이 전달되고 있는걸 확인할 수 있다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/7c16c92e-d337-4ac0-82c7-f5d15cc781ca/Untitled.png)
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/a942e29c-3c09-4a35-aa05-3235579bf74f/Untitled.png)
    
    `encodedURIComponent()` 를 사용하면 특정 문자를 이스케이프 시퀀스로 대체하기 때문에 #을 해시로 인식하지 않게 할 수 있다.
    
    [encodeURIComponent() - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
    
    ```tsx
    // src\app\(afterLogin)\_component\Trend.tsx
    export default function Trend({ trend }: Prop) {
      return (
        <Link
          href={`/search?q=${**encodeURIComponent(trend.title)**}`}
          className={style.container}
        >
          <div className={style.count}>실시간트렌드</div>
          <div className={style.title}>{trend.title}</div>
          <div className={style.count}>{trend.count.toLocaleString()} posts</div>
        </Link>
      );
    }
    ```
    
    ### ✔️ 결과
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/0eeeaf84-f67a-4de7-975f-ebb201dec702/Untitled.png)
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/900f3b3d-e085-4896-829d-459a15000b70/Untitled.png)
    
    ### ✔️ 검색 결과가 안나올 때
    
    - 검색 결과가 안나올 경우 변경된 API 주소를 적용해준다.
    - 추가적으로, 검색도 로그인이 되어 있어야 기능을 사용할 수 있기 때문에 `credentials: 'include'` 를 사용해준다.
    
    ```tsx
    // src\app\(afterLogin)\search\_lib\getSearchResult.ts
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/api/posts?${urlSearchParams.toString()}`,
      {
        next: {
          tags: ["posts", "search", searchParams.q],
        },
        credentials: "include",
        cache: "no-store",
      }
    );
    ```
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/f81eec5b-8e70-4125-af67-4ee6429d5339/Untitled.png)

- 하트 누를 때 optimistic update 적용하기
  [Optimistic Updates | TanStack Query Docs](https://tanstack.com/query/v4/docs/framework/react/guides/optimistic-updates#updating-a-list-of-todos-when-adding-a-new-todo)
  ## 💠 react query 공식문서 예제 분석
  ```tsx
  const queryClient = useQueryClient();

  useMutation({
    mutationFn: updateTodo,
    // When mutate is called:
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // 요청 보내는 리패치를 취소한다.
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Snapshot the previous value
      // 이전 값을 스냅샷
      const previousTodos = queryClient.getQueryData(["todos"]);

      // Optimistically update to the new value
      // 낙관적으로 새 값으로 업데이트하기
      queryClient.setQueryData(["todos"], (old) => [...old, newTodo]);

      // 스냅샨 된 값을 컨텍스트 객체로 반환
      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    // mutation이 실패했을 경우 onMutate에서 반환된 컨텍스트로 롤백
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  ```
  ## 💠 좋아요 클릭 시 게시글 상세 페이지로 이동되는 현상
  - 게시글의 좋아요 클릭 시 게시글 상세 페이지로 이동되는 이유는 게시글 상세 컴포넌트 안에 좋아요 버튼이 들어가 있고, 좋아요 버튼 클릭시 이벤트 버블링이 발생하여 게시글 상세의 클릭 이벤트가 실행되기 때문이다.
  - 버블링 단계에서 이벤트 핸들러가 실행되는 것을 막기 위해서 부모 컴포넌트에서 `onClickCapture` 를 사용해 캡쳐링 단계에 이벤트 핸들러가 실행되게 하는 방법이 있다.
  - 혹은, 클릭하려는 요소의 클릭 이벤트에서 `stopPropagation()` 을 해주면 이벤트 전파를 막는것을 통해 해결할 수 있다.
  ```tsx
  const onClickHeart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
  };
  ```
  ## 💠 좋아요 기능에 optimistic update 적용하기
  - 현재 ‘posts’ 키를 가지고 있는 쿼리들이 많이 존재하기 때문에 좋아요 기능이 필요한 쿼리키를 탐색해주는 사전 작업이 필요하다.
  - 직접 쿼리키마다 다 업데이트 해주어도 되지만, 중복 코드 제거를 위해!
  ```tsx
  const heart = useMutation({
    mutationFn: () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}/heart`,
        {
          method: "post",
          credentials: "include",
        }
      );
    },
    onMutate: () => {
      // 쿼리 키 탐색
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "posts") {
          const value: Post | Post[] | undefined =
            queryClient.getQueryData(queryKey);

          // 배열인 경우 -> 게시물 리스트
          if (Array.isArray(value)) {
            // 하트를 누른 특정 게시물을 탐색
            const index = value.findIndex((v) => v.postId === postId);

            // 게시물이 존재한다면 해당 게시물의 하트를 누른 유저와, 좋아요 개수를 업데이트
            if (index > -1) {
              const shallow = [...value];
              shallow[index] = {
                ...shallow[index],
                Hearts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...shallow[index]._count,
                  Hearts: shallow[index]._count.Hearts + 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            // 싱글 포스트인 경우

            // 특정 쿼리의 postId와 좋아요를 누른 게시글의 postId가 같다면 좋아요 관련 데이터들 업데이트
            if (value.postId === postId) {
              const shallow = {
                ...value,
                Hearts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...value._count,
                  Hearts: value._count.Hearts + 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
    onError: () => {},
    onSettled: () => {},
  });
  ```
    <aside>
    💡 현재 게시물 리스트는 infinity scroll로 데이터를 가져오기 때문에 위와 같은 코드를 적용할 경우, optimistic update가 되지 않는다.
    value의 데이터 형태를 Post[]에서 InfiniteData<Post[]>로 변경 후 그에 맞게 코드를 변경해준다.
    
    *얕은 복사가 많이 필요할 경우 코드가 복잡해지므로 Immer 라이브러리를 사용하는 것이 좋다.
    
    [23. Immer 를 사용한 더 쉬운 불변성 관리 · GitBook](https://react.vlpt.us/basic/23-immer.html)
    
    </aside>
    
    ```tsx
    onMutate: () => {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "posts") {
          const value: Post | **InfiniteData<Post[]>** | undefined =
            queryClient.getQueryData(queryKey);
    
          // 게시물 리스트일 경우
          if (value && "pages" in value) {
            const obj = value.pages.flat().find((v) => v.postId === postId);
    
            if (obj) {
              // 페이지 탐색
              const pageIndex = value.pages.findIndex((page) =>
                page.includes(obj)
              );
              const index = value.pages[pageIndex].findIndex(
                (v) => v.postId === postId
              );
    
              // 게시물이 존재한다면 해당 게시물의 하트를 누른 유저와, 좋아요 개수를 업데이트
              const shallow = { ...value };
              value.pages = { ...value.pages };
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Hearts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Hearts: shallow.pages[pageIndex][index]._count.Hearts + 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            // 싱글 포스트인 경우
    
            // 특정 쿼리의 postId와 좋아요를 누른 게시글의 postId가 같다면 좋아요 관련 데이터들 업데이트
            if (value.postId === postId) {
              const shallow = {
                ...value,
                Hearts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...value._count,
                  Hearts: value._count.Hearts + 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
    ```
    
    ## 💠 onError 작성하기
    
    - 요청이 실패했을 때의 롤백은 heart와 unheart의 onMutate에 작성했던 함수를 반대로 onError에 적용해주면 된다.
    - heart mutate 요청 시 → heart 수 증가, heart한 계정에 내 계정 추가
    unheart mutate 요청 시 → heart 수 감소, heart한 계정에 내 계정 빼기
    반대로,
    heart mutate 요청 실패 시 →  heart 수 감소, heart한 계정에 내 계정 빼기
    unheart mutate 요청 실패 시 → heart 수 증가, heart한 계정에 내 계정 추가
    - 코드
        
        ```tsx
        // src\app\(afterLogin)\_component\ActionButtons.tsx
        export default function ActionButtons({ white, post }: Props) {
          const queryClient = useQueryClient();
          const { data: session } = useSession();
        
          const commented = !!post.Comments?.find(
            (v) => v.userId === session?.user?.email
          );
          const reposted = !!post.Reposts?.find(
            (v) => v.userId === session?.user?.email
          );
          const liked = !!post.Hearts?.find((v) => v.userId === session?.user?.email);
        
          const { postId } = post;
        
          const heart = useMutation({
            mutationFn: () => {
              return fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}/heart`,
                {
                  method: "post",
                  credentials: "include",
                }
              );
            },
            onMutate: () => {
              const queryCache = queryClient.getQueryCache();
              const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
              queryKeys.forEach((queryKey) => {
                if (queryKey[0] === "posts") {
                  const value: Post | InfiniteData<Post[]> | undefined =
                    queryClient.getQueryData(queryKey);
        
                  // 게시물 리스트일 경우
                  if (value && "pages" in value) {
                    const obj = value.pages.flat().find((v) => v.postId === postId);
        
                    if (obj) {
                      // 페이지 탐색
                      const pageIndex = value.pages.findIndex((page) =>
                        page.includes(obj)
                      );
                      const index = value.pages[pageIndex].findIndex(
                        (v) => v.postId === postId
                      );
        
                      // 게시물이 존재한다면 해당 게시물의 하트를 누른 유저와, 좋아요 개수를 업데이트
                      const shallow = { ...value };
                      value.pages = { ...value.pages };
                      value.pages[pageIndex] = [...value.pages[pageIndex]];
                      shallow.pages[pageIndex][index] = {
                        ...shallow.pages[pageIndex][index],
                        Hearts: [{ userId: session?.user?.email as string }],
                        _count: {
                          ...shallow.pages[pageIndex][index]._count,
                          Hearts: shallow.pages[pageIndex][index]._count.Hearts + 1,
                        },
                      };
                      queryClient.setQueryData(queryKey, shallow);
                    }
                  } else if (value) {
                    // 싱글 포스트인 경우
        
                    // 특정 쿼리의 postId와 좋아요를 누른 게시글의 postId가 같다면 좋아요 관련 데이터들 업데이트
                    if (value.postId === postId) {
                      const shallow = {
                        ...value,
                        Hearts: [{ userId: session?.user?.email as string }],
                        _count: {
                          ...value._count,
                          Hearts: value._count.Hearts + 1,
                        },
                      };
                      queryClient.setQueryData(queryKey, shallow);
                    }
                  }
                }
              });
            },
            onError: () => {
              const queryCache = queryClient.getQueryCache();
              const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
              queryKeys.forEach((queryKey) => {
                if (queryKey[0] === "posts") {
                  const value: Post | InfiniteData<Post[]> | undefined =
                    queryClient.getQueryData(queryKey);
        
                  if (value && "pages" in value) {
                    const obj = value.pages.flat().find((v) => v.postId === postId);
        
                    if (obj) {
                      // 페이지 탐색
                      const pageIndex = value.pages.findIndex((page) =>
                        page.includes(obj)
                      );
                      const index = value.pages[pageIndex].findIndex(
                        (v) => v.postId === postId
                      );
        
                      // 게시물이 존재한다면 해당 게시물의 하트를 누른 유저와, 좋아요 개수를 업데이트
                      const shallow = { ...value };
                      value.pages = { ...value.pages };
                      value.pages[pageIndex] = [...value.pages[pageIndex]];
                      shallow.pages[pageIndex][index] = {
                        ...shallow.pages[pageIndex][index],
                        Hearts: shallow.pages[pageIndex][index].Hearts.filter(
                          (v) => v.userId !== session?.user?.email
                        ),
                        _count: {
                          ...shallow.pages[pageIndex][index]._count,
                          Hearts: shallow.pages[pageIndex][index]._count.Hearts - 1,
                        },
                      };
                      queryClient.setQueryData(queryKey, shallow);
                    }
                  } else if (value) {
                    // 싱글 포스트인 경우
        
                    // 특정 쿼리의 postId와 좋아요를 누른 게시글의 postId가 같다면 좋아요 관련 데이터들 업데이트
                    if (value.postId === postId) {
                      const shallow = {
                        ...value,
                        Hearts: value.Hearts.filter(
                          (v) => v.userId !== session?.user?.email
                        ),
                        _count: {
                          ...value._count,
                          Hearts: value._count.Hearts - 1,
                        },
                      };
                      queryClient.setQueryData(queryKey, shallow);
                    }
                  }
                }
              });
            },
            // onSettled: () => {
            //   queryClient.invalidateQueries({
            //     queryKey: ["posts"],
            //   });
            // },
          });
        
          const unheart = useMutation({
            mutationFn: () => {
              return fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}/heart`,
                {
                  method: "delete",
                  credentials: "include",
                }
              );
            },
            onMutate: () => {
              const queryCache = queryClient.getQueryCache();
              const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
              queryKeys.forEach((queryKey) => {
                if (queryKey[0] === "posts") {
                  const value: Post | InfiniteData<Post[]> | undefined =
                    queryClient.getQueryData(queryKey);
        
                  if (value && "pages" in value) {
                    const obj = value.pages.flat().find((v) => v.postId === postId);
        
                    if (obj) {
                      // 페이지 탐색
                      const pageIndex = value.pages.findIndex((page) =>
                        page.includes(obj)
                      );
                      const index = value.pages[pageIndex].findIndex(
                        (v) => v.postId === postId
                      );
        
                      // 게시물이 존재한다면 해당 게시물의 하트를 누른 유저와, 좋아요 개수를 업데이트
                      const shallow = { ...value };
                      value.pages = { ...value.pages };
                      value.pages[pageIndex] = [...value.pages[pageIndex]];
                      shallow.pages[pageIndex][index] = {
                        ...shallow.pages[pageIndex][index],
                        Hearts: shallow.pages[pageIndex][index].Hearts.filter(
                          (v) => v.userId !== session?.user?.email
                        ),
                        _count: {
                          ...shallow.pages[pageIndex][index]._count,
                          Hearts: shallow.pages[pageIndex][index]._count.Hearts - 1,
                        },
                      };
                      queryClient.setQueryData(queryKey, shallow);
                    }
                  } else if (value) {
                    // 싱글 포스트인 경우
        
                    // 특정 쿼리의 postId와 좋아요를 누른 게시글의 postId가 같다면 좋아요 관련 데이터들 업데이트
                    if (value.postId === postId) {
                      const shallow = {
                        ...value,
                        Hearts: value.Hearts.filter(
                          (v) => v.userId !== session?.user?.email
                        ),
                        _count: {
                          ...value._count,
                          Hearts: value._count.Hearts - 1,
                        },
                      };
                      queryClient.setQueryData(queryKey, shallow);
                    }
                  }
                }
              });
            },
            onError: () => {
              const queryCache = queryClient.getQueryCache();
              const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
              queryKeys.forEach((queryKey) => {
                if (queryKey[0] === "posts") {
                  const value: Post | InfiniteData<Post[]> | undefined =
                    queryClient.getQueryData(queryKey);
        
                  // 게시물 리스트일 경우
                  if (value && "pages" in value) {
                    const obj = value.pages.flat().find((v) => v.postId === postId);
        
                    if (obj) {
                      // 페이지 탐색
                      const pageIndex = value.pages.findIndex((page) =>
                        page.includes(obj)
                      );
                      const index = value.pages[pageIndex].findIndex(
                        (v) => v.postId === postId
                      );
        
                      // 게시물이 존재한다면 해당 게시물의 하트를 누른 유저와, 좋아요 개수를 업데이트
                      const shallow = { ...value };
                      value.pages = { ...value.pages };
                      value.pages[pageIndex] = [...value.pages[pageIndex]];
                      shallow.pages[pageIndex][index] = {
                        ...shallow.pages[pageIndex][index],
                        Hearts: [{ userId: session?.user?.email as string }],
                        _count: {
                          ...shallow.pages[pageIndex][index]._count,
                          Hearts: shallow.pages[pageIndex][index]._count.Hearts + 1,
                        },
                      };
                      queryClient.setQueryData(queryKey, shallow);
                    }
                  } else if (value) {
                    // 싱글 포스트인 경우
        
                    // 특정 쿼리의 postId와 좋아요를 누른 게시글의 postId가 같다면 좋아요 관련 데이터들 업데이트
                    if (value.postId === postId) {
                      const shallow = {
                        ...value,
                        Hearts: [{ userId: session?.user?.email as string }],
                        _count: {
                          ...value._count,
                          Hearts: value._count.Hearts + 1,
                        },
                      };
                      queryClient.setQueryData(queryKey, shallow);
                    }
                  }
                }
              });
            },
            // onSettled: () => {
            //   queryClient.invalidateQueries({
            //     queryKey: ["posts"],
            //   });
            // },
          });
        ```
        
    
    ## 💠 onSettled 작성하기(옵션)
    
    - 좋아요 요청을 하면 posts로 시작하는 키를 invalidate하여 리패치하게 만들기
    - 서버와 로컬의 상태를 확실하게 일치시키고 싶다면 추가하고, 좋아요 한번으로 전체 게시글을 다시 가져오는 로직이 부담스럽다면 빼도 되는 옵션
    
    ```tsx
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    ```

- 팔로우/언팔로우 optimistic update
  - 좋아요 버튼과 마찬가지로 진행하기
    - 코드
      ```tsx
      // src\app\(afterLogin)\_component\FollowRecommend.tsx
      export default function FollowRecommend({ user }: Props) {
        const queryClient = useQueryClient();
        const { data: session } = useSession();

        const followed = !!user.Followers?.find(
          (v) => v.userId === session?.user?.email
        );

        const follow = useMutation({
          mutationFn: (userId: string) => {
            return fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
              {
                method: "post",
                credentials: "include",
              }
            );
          },
          onMutate(userId: string) {
            const value: User[] | undefined = queryClient.getQueryData([
              "users",
              "followRecommends",
            ]);

            if (value) {
              const index = value.findIndex((v) => v.id === userId);
              const shallow = [...value]; // 참조 끊어내기
              shallow[index] = {
                ...shallow[index],
                Followers: [{ userId: session?.user?.email as string }],
                _count: {
                  ...shallow[index]._count,
                  Followers: shallow[index]._count?.Followers + 1,
                },
              };
              queryClient.setQueryData(["users", "followRecommends"], shallow);
            }
          },
          onError() {},
        });

        const unfollow = useMutation({
          mutationFn: (userId: string) => {
            return fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
              {
                method: "delete",
                credentials: "include",
              }
            );
          },
          onMutate(userId: string) {
            const value: User[] | undefined = queryClient.getQueryData([
              "users",
              "followRecommends",
            ]);

            if (value) {
              const index = value.findIndex((v) => v.id === userId);
              const shallow = [...value]; // 참조 끊어내기
              shallow[index] = {
                ...shallow[index],
                Followers: shallow[index].Followers.filter(
                  (v) => v.userId !== session?.user?.email
                ),
                _count: {
                  ...shallow[index]._count,
                  Followers: shallow[index]._count?.Followers - 1,
                },
              };
              queryClient.setQueryData(["users", "followRecommends"], shallow);
            }
          },
          onError() {},
        });

        const onFollow = () => {
          // TODO: 로그인되어 있지 않을 때 팔로우 클릭 시 로그인 페이지로 이동
          if (followed) {
            unfollow.mutate(user.id);
          } else {
            follow.mutate(user.id);
          }
        };
      ```
- 서로 다른 컴포넌트간 query 일치하게 하기
  - 팔로우 추천 섹션에서 팔로우 시 유저 상세 페이지의 팔로우도 업데이트 해주기
  - User 페이지에서 사용되는 UserInfo 컴포넌트에도 동일 코드 적용
    - 코드
      ```tsx
      onMutate(userId: string) {
        // 팔로우 추천
        const value: User[] | undefined = queryClient.getQueryData([
          "users",
          "followRecommends",
        ]);

        if (value) {
          const index = value.findIndex((v) => v.id === userId);
          const shallow = [...value]; // 참조 끊어내기
          shallow[index] = {
            ...shallow[index],
            Followers: [{ userId: session?.user?.email as string }],
            _count: {
              ...shallow[index]._count,
              Followers: shallow[index]._count?.Followers + 1,
            },
          };
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }

        // 유저 상세 페이지
        const value2: User | undefined = queryClient.getQueryData([
          "users",
          userId,
        ]);

        if (value2) {
          const shallow = {
            ...value2,
            Followers: [{ userId: session?.user?.email as string }],
            _count: {
              ...value2._count,
              Followers: value2._count?.Followers + 1,
            },
          };
          queryClient.setQueryData(["users", userId], shallow);
        }
      },
      onError() {},
      });

      const unfollow = useMutation({
      mutationFn: (userId: string) => {
        return fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`,
          {
            method: "delete",
            credentials: "include",
          }
        );
      },
      onMutate(userId: string) {
        // 팔로우 추천
        const value: User[] | undefined = queryClient.getQueryData([
          "users",
          "followRecommends",
        ]);

        if (value) {
          const index = value.findIndex((v) => v.id === userId);
          const shallow = [...value]; // 참조 끊어내기
          shallow[index] = {
            ...shallow[index],
            Followers: shallow[index].Followers.filter(
              (v) => v.userId !== session?.user?.email
            ),
            _count: {
              ...shallow[index]._count,
              Followers: shallow[index]._count?.Followers - 1,
            },
          };
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }

        // 유저 상세 페이지
        const value2: User | undefined = queryClient.getQueryData([
          "users",
          userId,
        ]);

        if (value2) {
          const shallow = {
            ...value2,
            Followers: value2.Followers.filter(
              (v) => v.userId !== session?.user?.email
            ),
            _count: {
              ...value2._count,
              Followers: value2._count?.Followers - 1,
            },
          };
          queryClient.setQueryData(["users", userId], shallow);
        }
      // ...
      ```
    <aside>
    💡 사용자 페이지에는 팔로우 대상의 유저가 존재하지만, 팔로우 추천에는 없을 경우 코드에서 오류가 발생하므로 예외 처리 해주기
    
    </aside>
    
    ```tsx
    onMutate(userId: string) {
      // 팔로우 추천
      const value: User[] | undefined = queryClient.getQueryData([
        "users",
        "followRecommends",
      ]);
    
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        **if (index > -1) {**
          const shallow = [...value]; // 참조 끊어내기
          shallow[index] = {
            ...shallow[index],
            Followers: [{ userId: session?.user?.email as string }],
            _count: {
              ...shallow[index]._count,
              Followers: shallow[index]._count?.Followers + 1,
            },
          };
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }
      }
    
      // 유저 상세 페이지
      const value2: User | undefined = queryClient.getQueryData([
        "users",
        userId,
      ]);
    
      if (value2) {
        const shallow = {
          ...value2,
          Followers: [{ userId: session?.user?.email as string }],
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers + 1,
          },
        };
        queryClient.setQueryData(["users", userId], shallow);
      }
    },
    ```

- 완전히 로그아웃 하기 & 프론트 서버에 쿠키 보내기 **(유저 페이지에서 게시글을 안 불러오는 상황-해결✅)**
    <aside>
    💡 현재 유저 페이지에 들어가면 게시글들을 안 불러오는데 확인해보기 → UserPosts 컴포넌트 InfiniteScroll 적용해서 해결! api 요청 URL에 cursor가 필수값인데 없어서 400 Error가 나왔던 것
    
    </aside>
    
    ## 💠 로그아웃 시 팔로우한 사람 목록 초기화
    
    - 로그아웃 동작 시 기존 쿼리들 캐시 초기화 진행
    
    ```tsx
    // src\app\(afterLogin)\_component\LogoutButton.tsx
    const queryClient = useQueryClient();
    
    const onLogout = () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      signOut({ redirect: false }).then(() => {
        router.replace("/");
      });
    };
    ```
    
    하지만 현재 LogoutButton은 RQProvider 바깥에 존재하기 때문에 queryClient 등을 사용할 수 없다.
    
    따라서 RQProvider의 위치를 옮겨주어야 한다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/63bdbafb-44d0-490c-b38c-cedf0859754c/Untitled.png)
    
    ## 💠 로그아웃 시 백엔드 쿠키 정리하기(connect.sid)
    
    - 로그아웃 API 요청 추가
    - session-token 뿐만 아니라 connect.sid도 같이 삭제 된다.
    
    <aside>
    💡 next-auth의 signOut 메서드는 session-token만 정리해줌
    
    </aside>
    
    ```tsx
    const onLogout = () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      signOut({ redirect: false }).then(() => {
        **fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
          method: "post",
          credentials: "include",
        });**
        router.replace("/");
      });
    };
    ```
    
    ## 💠 브라우저에 쿠키 넣기
    
    <aside>
    💡 유저 프로필 페이지에서 내가 팔로우한 유저가 팔로우 하고 있다고 표시되어 있지 않다.
    react query devtools에서 refetch를 실행하면 그제서야 적용됨
    
    ![팔로우 후, refetch 전](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/3e292445-b183-47fd-92ff-87493c643f87/Untitled.png)
    
    팔로우 후, refetch 전
    
    ![팔로우 후, refetch 이후](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/133afcc9-b99f-4fd3-ab37-30011f06ae96/Untitled.png)
    
    팔로우 후, refetch 이후
    
    </aside>
    
    해당 문제는 getUser 함수에서 발견할 수 있다.
    
    현재 getUser 함수는 페이지에서 prefetchQuery를 통해 서버에서 호출되어 실행되고 있다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/f5b704be-c342-4a45-8b9c-f602dc2123f0/Untitled.png)
    
    `credentials: 'include'` 가 들어가 있어도 getUser 함수가 서버에서 실행되기 때문에 쿠키가 브라우저로  제대로 전달되지 않는 문제가 발생된다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/308694eb-e79e-4a63-bc15-926cba9e6173/Untitled.png)
    
    API 요청 코드의 headers에 쿠키를 담아 요청해서 해결할 수 있다.
    
    ```tsx
    import { cookies } from "next/headers";
    
    export const getUser: QueryFunction<User, [_1: string, _2: string]> = async ({
      queryKey,
    }) => {
      const [_1, username] = queryKey;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,
        {
          next: {
            tags: ["users", username],
          },
          credentials: "include",
          **headers: {
            Cookie: cookies().toString(),
          },**
          cache: "no-store",
        }
      );
    ```
    
    하지만 cookies를 import한 `next/headers` 의 경우 서버 컴포넌트에서만 사용 가능하기 때문에 아래와 같은 에러가 발생한다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/3072c600-7728-46a6-81fe-d7eedfd37eb0/Untitled.png)
    
    현재 getUser 함수와 getUser를 호출하고 있는 페이지는 서버 컴포넌트이지만, getUser를 호출하는 또 다른 UserInfo 컴포넌트는 클라이언트 컴포넌트이기 때문에 에러가 발생한다.
    
    이에 대한 해결 방법은 여러가지이지만 가장 간단한 방법으로는 클라이언트에서 사용될 getUser 함수와 서버에서 사용될 getUserServer 함수 두 가지를 두는 방법이 있다.
    
    - getUserServer
        
        ```tsx
        // src\app\(afterLogin)\[username]\_lib\getUserServer.ts
        import { QueryFunction } from "@tanstack/query-core";
        import { User } from "@/model/User";
        import { cookies } from "next/headers";
        
        export const getUserServer: QueryFunction<
          User,
          [_1: string, _2: string]
        > = async ({ queryKey }) => {
          const [_1, username] = queryKey;
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,
            {
              next: {
                tags: ["users", username],
              },
              credentials: "include",
              headers: {
                Cookie: cookies().toString(),
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
        
    - getUser
        
        ```tsx
        // src\app\(afterLogin)\[username]\_lib\getUser.ts
        import { QueryFunction } from "@tanstack/query-core";
        import { User } from "@/model/User";
        import { cookies } from "next/headers";
        
        export const getUser: QueryFunction<User, [_1: string, _2: string]> = async ({
          queryKey,
        }) => {
          const [_1, username] = queryKey;
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,
            {
              next: {
                tags: ["users", username],
              },
              credentials: "include",
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
    💡 **useSession() 훅을 쓰지 않고 props로 유저 정보를 넘겨주는 경우는 언제일까?**
    useSession() 훅을 사용하면 아무래도 사용자 정보 전달에 간극이 존재한다.
    따라서 페이지를 새로고침할 때 기본 텍스트인 ‘팔로우’ 에서 ‘팔로잉’으로 변경되는 화면이 보이기도 한다.
    따라서 SSR 된 페이지(HTML)에서 부터 해당 유저 정보가 들어가 있게 하려면 props로 유저 정보를 넘겨주어 SSR 최적화를 해주는 것이 좋다.
    
    </aside>
    
    ![현재 브라우저는 유저를 팔로우 중이라 ‘팔로잉’이란 텍스트가 보이지만, SSR된 HTML 페이지에는 ‘팔로우’ 텍스트가 보임](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/5a27be4e-3e5e-4217-9eb3-73bd24669059/Untitled.png)
    
    현재 브라우저는 유저를 팔로우 중이라 ‘팔로잉’이란 텍스트가 보이지만, SSR된 HTML 페이지에는 ‘팔로우’ 텍스트가 보임
    
    위와 같은 경우에 useSession()이 아닌 props로 session 정보를 전달받으면 된다.
    
    ```tsx
    // 기존 코드
    export default function UserInfo({ username }: Props) {
      const { data: user, error } = useQuery<
        User,
        Object, // 모든 값이 다 된다는 의미의 TS 문법
        User,
        [_1: string, _2: string]
      >({
        queryKey: ["users", username],
        queryFn: getUser,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
      });
    
      **const { data: session } = useSession();**
    ```
    
    ```tsx
    // 변경된 코드
    import { Session } from "next-auth";
    
    type Props = {
      username: string;
      **session: Session | null;**
    };
    
    export default function UserInfo({ username, **session** }: Props) {
    ```
    
    ```tsx
    // 페이지에서 자식 컴포넌트에 session props 내려주기
    import { auth } from "@/auth";
    
    type Props = {
      params: { username: string };
    };
    
    export default async function Profile({ params }: Props) {
      const { username } = params;
    	**const session = await auth();**
    
    // ...
    	return (
    	    <main className={style.main}>
    	      <HydrationBoundary state={dehydratedState}>
    	        <UserInfo username={username} **session={session}** />
    	        <div>
    ```
    
    ![SSR된 페이지에서도 적용이 된 모습을 볼 수 있다.](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/e955f3f3-e8ea-4274-ba99-bba5399ce117/Untitled.png)
    
    SSR된 페이지에서도 적용이 된 모습을 볼 수 있다.

- 메타데이터 설정하기
  ## 💠 HTML 타이틀 변경
  ```tsx
  // src\app\layout.tsx
  // 메타 데이터를 변경하는 부분
  export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
  };
  ```
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/39fc3780-8f55-407c-96d2-5d779e2e4601/Untitled.png)
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/555888e4-893c-4725-be3b-2b7d445400a0/Untitled.png)
  각각의 page.tsx에서도 Metadata를 설정해줄 수 있다.
  ```tsx
  import { Metadata } from "next";

  export const metadata: Metadata = {
    title: "홈 / Z",
    description: "홈",
  };

  export default async function Home() {
  ```
  ## 💠 메타데이터에 정보가 들어가야 할 경우 - generateMetadata
  - 검색 페이지나 프로필 페이지의 경우 별도의 정보가 메타 데이터에 들어가야한다.
  - 이 때는 `generateMetadata()` 를 사용할 수 있다.
    <aside>
    💡 **generateMetadata()**
    동적으로 URL 쿼리 파라미터, 외부 데이터 등을 가져와서 메타 데이터 객체를 반환하여 메타 데이터를 설정할 수 있다.
    
    [Functions: generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function)
    
    </aside>
    
    ```tsx
    // 검색 페이지
    export async function generateMetadata({
      searchParams,
    }: Props): Promise<Metadata> {
      return {
        title: `${searchParams.q} - 검색 / Z`,
        description: `${searchParams.q} - 검색 / Z`,
      };
    }
    ```
    
    ```tsx
    // 유저 페이지
    export async function generateMetadata({ params }: Props) {
      const user: User = await getUserServer({
        queryKey: ["users", params.username],
      });
      return {
        title: `${user.nickname} (${user.id}) / Z`,
        description: `${user.nickname} (${user.id}) 프로필`,
      };
    }
    ```
    
    ```tsx
    // 특정 유저 게시물 한 개 페이지
    export async function generateMetadata({params}: Props) {
      const user: User = await getUserServer({ queryKey: ["users", params.username] });
      const post: Post = await getSinglePostServer({ queryKey: ["posts", params.id] });
      return {
        title: `Z에서 ${user.nickname} 님 : ${post.content}`,
        description: post.content,
      }
    }
    ```
    
    <aside>
    💡 **generateMetadata() 함수도 서버에서 실행**되기 때문에 쿠키 값이 필요한 get 함수들은 Server 함수로도 생성해주어 `headers: { Cookie: cookies().toString() }` 적용해주기!
    
    </aside>

- 답글과 재게시글 꾸미기 **(+답글 눌렀을 때 팝업창 뜨는 것 해보기 → [재게시, 답글 기능 zustand로 만들어보기](https://www.notion.so/zustand-831d4842083a43f2824e41dbbcd72a2d?pvs=21))**
  ## 💠 타입 인터페이스 추가
  - Parent 객체가 들어있다면 해당 게시글은 답글
  - Original 객체가 들어있다면 해당 게시글은 재게시한 글
  ```tsx
  export interface Post {
    postId: number;
    User: User;
    content: string;
    createdAt: Date;
    Images: PostImage[];
    Hearts: UserId[];
    Reposts: UserId[];
    Comments: UserId[];
    _count: {
      Hearts: number;
      Reposts: number;
      Comments: number;
    };
    **Parent?: Post; // 답글
    Original?: Post; // 재게시**
  }
  ```
  ## 💠 테스트 요청 추가
  - formData를 만들어 테스트 해보기
  ```tsx
  const onClickComment: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    const formData = new FormData();
    formData.append("content", "답글 테스트");
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.postId}/comments`,
      {
        method: "post",
        credentials: "include",
        body: formData,
      }
    );
  };
  const onClickRepost: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (!reposted) {
      const formData = new FormData();
      formData.append("content", "재게시 테스트");
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.postId}/reposts`,
        {
          method: "post",
          credentials: "include",
          body: formData,
        }
      );
    }
  };
  ```
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/490ca2cf-2c9a-448c-b60e-bde52c269362/Untitled.png)
  ## 💠 스타일링
  ### ✔️ 재게시글
  - 재게시글이라면 원 글을 위에 보여주기
  ```tsx
  export default function Post({ noImage, post }: Props) {
    let target = post;

    // 재게시글이라면 target을 재게시글로 업데이트
    if (post.Original) {
      target = post.Original;
    }

    return (
      <PostArticle post={target}>
        **{post.Original && (
          <div className={style.postReposted}>
            <svg
              viewBox="0 0 24 24"
              width={16}
              aria-hidden="true"
              className="r-14j79pv r-4qtqp9 r-yyyyoo r-10ptun7 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1janqcz"
            >
              <g>
                <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path>
              </g>
            </svg>
            재게시했습니다
          </div>
        )}**
  ```
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/49029c44-6916-43aa-af89-50513d7d6f88/Untitled.png)
  ### ✔️ 답글
  ```tsx
  **{target.Parent && (
    <div>
      <Link
        href={`/${target.Parent.User.id}`}
        style={{ color: "rgb(29, 155, 240)" }}
        onClick={stopPropagation}
      >
        @{target.Parent.User.id}
      </Link>{" "}
      님에게 보내는 답글
    </div>
  )}**
  <div>{target.content}</div>
  {!noImage && (
    <div>
      <PostImages post={target} />
    </div>
  )}
  <ActionButtons post={target} />
  ```
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/788cdb7b-c658-426d-8451-ab4a41c1071e/Untitled.png)
  ## 💠 재게시글 눌렀을 때 원글로 가지 않는다면?
  - 현재 내 프로젝트에는 오류가 발생하지 않지만, 강의에서는 오류가 발생해서 해결 방법을 남겨놓는다.
  ```tsx
  export default function PostArticle({ children, post }: Props) {
    const router = useRouter();

    let target = post;

    if (post.Original) {
      target = post.Original;
    }

    const onClick = () => {
      router.push(`/${target.User.id}/status/${target.postId}`);
    };

    return (
      <article onClick={onClick} className={style.post}>
        {children}
      </article>
    );
  }
  ```
- SSR 적용 여부 판단 기준
  - 로그인을 안 해도 해당 페이지에 접근 가능하다 → SSR 적용
    - url 공유를 하는 페이지들은 로그인을 하지 않아도 접근 가능해야하고, 검색엔진에 나와야 좋기 때문에 SSR이 적용되면 좋다.
    - 검색 엔진에 포함되지 않는 부분은 굳이 SSR로 적용하지 않아도 된다.
- 재게시, 답글 기능 zustand로 만들어보기
  ## 💠 재게시
  - heart에서 사용했던 코드를 재사용
  - optimistic update를 사용하지 않기 때문에 onMutate가 아닌 onSuccess 에 작성해주면 된다.
  ```tsx
  const repost = useMutation({
    mutationFn: () => {
      return fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.postId}/reposts`,
        {
          method: "post",
          credentials: "include",
        }
      );
    },
    async onSuccess(response) {
      const data = await response.json();

      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "posts") {
          const value: Post | InfiniteData<Post[]> | undefined =
            queryClient.getQueryData(queryKey);

          // 게시물 리스트일 경우
          if (value && "pages" in value) {
            const obj = value.pages.flat().find((v) => v.postId === postId);

            if (obj) {
              // 페이지 탐색
              const pageIndex = value.pages.findIndex((page) =>
                page.includes(obj)
              );
              const index = value.pages[pageIndex].findIndex(
                (v) => v.postId === postId
              );

              // 게시물이 존재한다면 해당 게시물의 리포스트를 누른 유저와, 리포스트 개수를 업데이트
              const shallow = { ...value };
              value.pages = { ...value.pages };
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Reposts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Reposts: shallow.pages[pageIndex][index]._count.Reposts + 1,
                },
              };
              shallow.pages[0].unshift(data);
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            // 싱글 포스트인 경우
            if (value.postId === postId) {
              const shallow = {
                ...value,
                Reposts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...value._count,
                  Reposts: value._count.Reposts + 1,
                },
              };
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      });
    },
  });
  ```
  - click 함수에 적용
  ```tsx
  const onClickRepost: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    if (!reposted) {
      repost.mutate();
    } else {
      deleteRepost.mutate();
    }
  };
  ```
  ## 💠 답글
  - 답글은 url이 /compose/tweet 으로 변경되면서 글작성과 동일한 모달이 띄워진다.
  - 이 때, 답글 버튼을 클릭했을 때 ‘답글 작성 중’이라는 현재 상태를 컴포넌트 간에 공유를 하고 있어야 글 작성 모달과 답글 작성 모달을 구분할 수 있다.
  - 이번에는 **zustand**를 사용해서 상태 공유를 해보자
    <aside>
    💡 **zustand**
    Redux를 간소화한 상태 관리 라이브러리
    Context API와 다르게 최적화가 되어 있다는 장점이 있다.
    react-query로도 staleTime과 gcTime을 늘려 상태 관리를 하는 것처럼 구현할 수 있지만 react-query의 목적은 데이터 관리이기 때문에 목적에 맞게 사용하는 것이 좋다.
    
    </aside>
    
    ### ✔️ zustand 설치
    
    ```bash
    $ npm i zustand
    ```
    
    ### ✔️ store 설정
    
    - zustand의 `create()` 의 첫 번째 매개변수인 set 함수로 스토어의 데이터들을 변경해줄 수 있다.
    
    ```tsx
    // src\store\modal.ts
    import { create } from "zustand";
    
    export const useModalStore = create((set) => ({
      // 초기 데이터
      mode: "new",
      data: null,
    
      setMode(mode) {
        set({ mode });
      },
      setData(data) {
        set({ data });
      },
      reset() {
        set({
          mode: "new",
          data: null,
        });
      },
    }));
    ```
    
    - typescript 적용
    
    ```tsx
    import { Post } from "@/model/Post";
    import { create } from "zustand";
    
    interface ModalState {
      mode: "new" | "comment";
      data: Post | null;
      setMode(mode: "new" | "comment"): void;
      setData(data: Post): void;
      reset(): void;
    }
    
    export const useModalStore = create<ModalState>((set) => ({
      // 초기 데이터
      mode: "new",
      data: null,
    
      setMode(mode) {
        set({ mode });
      },
      setData(data) {
        set({ data });
      },
      reset() {
        set({
          mode: "new",
          data: null,
        });
      },
    }));
    ```
    
    ### ✔️ modalStore 사용
    
    ```tsx
    export default function ActionButtons({ white, post }: Props) {
      const queryClient = useQueryClient();
      const { data: session } = useSession();
      const router = useRouter();
    
      **const modalStore = useModalStore();**
    
    	// ...
    	
    	const onClickComment: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
    
        **modalStore.setMode("comment");
        modalStore.setData(post);**
    
        router.push("/compose/tweet");
      };
    
    ```
    
    ### ✔️ 게시글 추가 로직 구현하기 & /compose/tweet에서 모달 상태 읽어오기
    
    <aside>
    💡 모달 닫을 때, mutation 성공할 때 `modalStore.reset()` 을 해주어야 답글 모달이 닫히고, 게시글 모달이 뜰 때 값이 잘 적용된다.
    
    </aside>
