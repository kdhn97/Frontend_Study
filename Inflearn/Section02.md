# 섹션2. 본격 클론 시작!

- 레이아웃 클론하기
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/9484c39c-aed0-4048-afa0-ca610177c818/Untitled.png)
  🌟 **flex container 안의 두 요소 가운데 정렬하기**
  - 방법1) container에 `margin: 0 auto`
  - 방법2) container에 `justify-content: center`
  - 방법3) 각 flex 요소에 `flex-grow: 1`
    <aside>
    💡 부모가 flex인 경우에 부모 요소에 `margin: 0 auto` , `justify-content: center`가 적용되지 않을 때 방법3를 사용할 수 있다.
    
    </aside>

- useSelectedLayoutSegement로 ActiveLink 만들기 **질문있어요!**
    <aside>
    💡 **ActiveLink**
    다른 페이지로 이동이 가능한 사이드바(Link)를 클릭했을 때
    현재 페이지가 active 상태로, 현재 페이지가 아닌 페이지들은 active 하지 않은 상태를 가진 링크를 `ActiveLink`라 부른다.
    
    </aside>
    
    ## 💠 서버 컴포넌트를 클라이언트 컴포넌트로 전환하기
    
    현재 ActiveLink를 만들어주기 위해서는 사용자가 ‘어떤’ 페이지에 있는지 알아야 한다.
    
    이는 서버 컴포넌트에서는 할 수 없기 때문에 클라이언트 컴포넌트로 만들어 주는 작업이 필요하다.
    
    ```tsx
    // (afterLogin)/layout.tsx
    import { ReactNode } from "react";
    import style from "@/app/(afterLogin)/layout.module.css";
    import Link from "next/link";
    import Image from "next/image";
    import zLogo from "../../../public/zlogo.png";
    
    export default function AfterLoginLayout({
      children,
    }: {
      children: ReactNode;
    }) {
      return (
        <div className={style.container}>
          <header className={style.leftSectionWrapper}>
            // ...
              **<nav>
                <ul>
                  <NavMenu />
                </ul>
              </nav>**
          </header>
          <div className={style.rightSectionWrapper}>
            // ...
          </div>
          {children}
        </div>
      );
    }
    ```
    
    로그인 이후의 레이아웃 컴포넌트에서 `<NavMenu />` 컴포넌트를 클라이언트 컴포넌트로 변경해주자.
    
    ```tsx
    // (afterLogin)/_component/NavMenu.tsx
    "use client";
    
    export default function NavMenu() {
      return <></>;
    }
    ```
    
    ## 💠 useSelectedLayoutSegment()
    
    [Functions: useSelectedLayoutSegment](https://nextjs.org/docs/app/api-reference/functions/use-selected-layout-segment)
    
    <aside>
    💡 **useSelectedLayoutSegement()**는 Nextjs에서 제공하는 훅으로 클라이언트 컴포넌트에서 사용되는 훅이다.
    
    **레이아웃보다 한 수준 아래에 있는 active 경로 세그먼트를 읽을 수 있다.**
    따라서 활성된 하위 세그먼트에 따라 스타일을 변경하는 상위 레이아웃 내부의 탭과 같은 탐색 UI에 유용하다.
    
    </aside>
    
    ```tsx
    // (afterLogin)/_component/NavMenu.tsx
    "use client";
    
    import { useSelectedLayoutSegment } from "next/navigation";
    
    export default function NavMenu() {
      const segment = useSelectedLayoutSegment();
    
      console.log(segment);
    
      return <></>;
    }
    ```
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/fed4735c-d19c-4546-ba50-11d079f69e96/Untitled.png)
    
    만약 위와 같은 폴더 구조를 가지고 있다면, segment는 폴더 이름과 같이 `[username]` `compose` `explore` .. 등등의 값을 가지게 된다.
    
    세그먼트의 구조를 더 상세하게 받고 싶다면 `useSelectedLayoutSegments()` 훅을 사용하면 된다.
    
    ```tsx
    // compose/tweet 일 때
    
    conosle.log(useSelectedLayoutSegement()); // 'compose'
    conosle.log(useSelectedLayoutSegements()); // ['compose', 'tweet']
    ```
    
    <aside>
    💡 **public 폴더 안에 있는 이미지 경로 가져오기**
    
    ```tsx
    // src/app/(afterLogin)/_component/LogoutButton.tsx
    export default function LogoutButton() {
      const me = {
        id: "nor0",
        nickname: "노르",
        image: "/5Udwvqim.jpg", // '/'를 사용하여 public 폴더 안의 이미지를 가져올 수 있음
      };
    ```
    
    </aside>
    
    <aside>
    💡 onClick과 같은 함수가 서버 컴포넌트에 있으면 오류가 발생할 수 있기 때문에 클라이언트 컴포넌트로 변경해주어야 한다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/6865020c-f5a5-4b67-a369-6ac5f9e25b87/Untitled.png)
    
    ![https://www.js-craft.io/blog/client-components-use-client-directive-nextjs-13/#when-to-use-the-use-client-directive-in-nextjs-13](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/a83c4d26-577d-483e-b9c2-36a75b5640b5/Untitled.png)
    
    https://www.js-craft.io/blog/client-components-use-client-directive-nextjs-13/#when-to-use-the-use-client-directive-in-nextjs-13
    
    </aside>
    
    <aside>
    ❓ **onClick과 같은 함수를 사용할 때 서버 컴포넌트라면 왜 오류가 발생할까?**
    
    서버 컴포넌트 에서는 사용자에게 즉각적인 피드백을 제공하고 UI를 업데이트 할 수 없다. 즉, 이벤트 리스너를 사용할 수 없다.
    그 이유는 서버 컴포넌트와 클라이언트 컴포넌트의 페이지 로드에 있다.
    
    서버 컴포넌트는 서버에서 React에 의해 클라이언트 컴포넌트에 대한 참조를 포함하는 **RSC 페이로드**(React Server Component Payload)라는 특수 데이터 형식으로 렌더링된다. 이후 Nextjs가 RSC 페이로드와 클라이언트 컴포넌트의 JavaScript 지침을 사용하여 HTML을 렌더링한다. 따라서 JavaScript 번들 다운로드 및 구문 분석을 기다릴 필요없이 즉시 페이지 콘텐츠를 볼 수 있다.
    이후 **클라이언트에서 RSC 페이로드는 클라이언트 및 서버 컴포넌트 트리 조정 및 DOM 업데이트에 사용되고, JavaScript 지침을 hydrate에 사용하면서 클라이언트 컴포넌트를 구성한다.** 해당 UI를 대화형, 즉 상호작용할 수 있게끔 만들기 때문에 서버 컴포넌트에서는 이벤트 리스너를 사용할 수 없는 것이다.
    ****
    
    [Rendering: Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components#full-page-load)
    
    </aside>
    
    <aside>
    💡 **hydrate
    
    hydrate**는 이벤트 리스너를 DOM에 연결하여 정적 HTML을 대화형으로 만드는 프로세스이다.
    
    </aside>
    
    <aside>
    💡 **SSR 방식과 서버 컴포넌트의 차이**
    
    SSR 방식은 서버 컴포넌트와 다른 방식이다. **서버에서 컴포넌트를 렌더링한다는 점에서는 동일하지만 렌더링의 결과값과 동작 방식이 다르다.**
    
    SSR은 Prerendering의 방식으로 서버에서 HTML을 만들어낸다. 이후에 클라이언트로 전달된 JS 번들 파일과 수화되는 과정을 거쳐 React 컴포넌트로 사용된다. 기존의 React 컴포넌트이며 이를 클라이언트 컴포넌트라고 부른다.
    
    서버 컴포넌트는 JSON과 유사한 형태가 만들어진다. 그 자체로 React 컴포넌트이기에 별도의 JS 번들 파일 없이 브라우저에서 컴포넌트로 사용된다. 새로운 컴포넌트이고 React Server Component, RSC라고 부른다.
    
    </aside>
    
    <aside>
    ❓ **<img> 와 <Image>의 사용처**
    
    Nextjs에서는 서버에서 이미지를 최적화하여 클라이언트에 보내주는 `<Image>` 컴포넌트가 존재한다.
    그렇다면, Nextjs 프로젝트에서는 기존 HTML 요소인 `<img>` 는 사용되지 않을까?
    
    ⇒ public 폴더는 프론트 서버에서 불러오는 정적 요소들이다. 따라서 고정되어 있는 것이기 때문에 한 번만 최적화 하면 되므로 `<Image>` 컴포넌트를 사용하기에 유용하다. 로그아웃 버튼에 사용되는 사용자의 아이콘 같은 경우, 백엔드 서버에서 불러오고 그때그때 로그인 한 사용자에 따라 이미지를 불러오게 된다. 따라서 굳이 프론트 서버인 Nextjs 서버의 리소스를 낭비하여 최적화하는 것이 적합하지 않다.
    
    </aside>

- 오른쪽 섹션 클론코딩
    <aside>
    💡 만약, 클래스명이나 css등 제대로 코드가 적용되지 않는다면 next 서버를 재실행하거나 `.next` 폴더를 삭제하고 다시 서버를 실행하자.
    
    </aside>

- 홈탭 만들면서 Context API 적용해보기
  ## 💠 홈 페이지 분석하기
  ### ✔️ Tab 컴포넌트
  현재 탭은 `추천 / 팔로우 중` 으로 나뉘어져 있다. 탭 마다 보이는 포스트가 다르기 때문에 어떤 탭인지에 대한 **상태값**을 가지고 있어야 한다. **따라서 추천 탭과 팔로우 중 탭은 클라이언트 컴포넌트라는 걸 유추해볼 수 있다.**
  홈 페이지를 분석해보면 아래에 <Tab /> 컴포넌트와 <Post/> 컴포넌트가 병렬적으로 존재하고 있다. 사용자가 어떤 탭에 위치하냐에 따라 보여지는 게시글이 달라져야 하기 때문에 **서로 탭의 상태를 공유**하고 있어야 한다. 이를 여러가지 방법으로 해결할 수 있지만, 제일 간단한 **Context**를 사용해서 해결해보자.
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/1531a8b8-103f-485d-bf98-b3851431dd47/Untitled.png)
  ## 💠 Context API 적용하기
  ### ✔️ TabProvider 정의
  Context API를 사용하기 위한 Provider를 정의한다.
  현재 Tab의 상태를 전역으로 공유해야 하기 때문에 Tab에 대한 Provider로 정의하는 것.
  ```tsx
  "use client";

  import { ReactNode, createContext, useState } from "react";

  export const TabContext = createContext({
    tab: "rec",
    setTab: (value: "rec" | "fol") => {},
  });

  type Props = { children: ReactNode };

  export default function TabProvider({ children }: Props) {
    const [tab, setTab] = useState("rec");

    return (
      <TabContext.Provider value={{ tab, setTab }}>
        {children}
      </TabContext.Provider>
    );
  }
  ```
  ### ✔️ TabProvider 적용
  상태를 공유하기 위해선 부모 컴포넌트에서 Provider를 적용해야하기 때문에 Home 페이지 컴포넌트에 Provider를 적용해준다.
  ```tsx
  import Post from "../_component/Post";
  import PostForm from "./_component/PostForm";
  import Tab from "./_component/Tab";
  import TabProvider from "./_component/TabProvider";
  import style from "./home.module.css";

  export default function Home() {
    return (
      <main className={style.main}>
        **
        <TabProvider>
          **
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
          **
        </TabProvider>
        **
      </main>
    );
  }
  ```
- PostForm 만들기(타이핑 외우기)
    <aside>
    💡 Form의 경우 대부분 이벤트 리스너가 많기 때문에 **클라이언트 컴포넌트**라고 생각하면 좋다.
    [**Server Actions 기능**](https://codingapple.com/unit/nextjs-server-actions/)을 사용하여 데이터를 요청하는 방법도 있지만, 아직 실험적인 기능이라 강의에서는 다루지 않을 예
    
    </aside>

- Post 만들며 dayjs 사용해보기
  - `dayjs.fromNow()`
    - 현재 시간으로부터 상대 시간 문자열을 반환한다.
    - 매개변수에 `true`를 전달하면 접미사 없는 값을 얻을 수 있다.
    - 메소드를 사용하기 위해서는 RelativeTime 플러그인이 필요하다.
      ```tsx
      import relativeTime from "dayjs/plugin/relativeTime";
      ```
    - dayjs 플러그인 적용하기
    ```
    import "dayjs/locale/ko";

    dayjs.locale("ko"); // 한글 플러그인 설정
    dayjs.extend(relativeTime); // relativeTime 플러그인 설정
    ```
    [Time from now · Day.js](https://day.js.org/docs/en/display/from-now)
- classnames로 클래스 합성하기 (feat. npmtrends로 라이브러리 고르기)
  ## 💠 classnames 라이브러리
  https://github.com/JedWatson/classnames
  classnames 라이브러리를 사용하면 여러 클래스를 추가하거나, 조건부로 클래스명을 줄 수 있다.
  css modules를 사용할 때 상태에 따른 클래스명을 부여해야할 경우 유용하게 쓸 수 있다.
  ### ✔️ 사용 예시
  ```tsx
  import cx from "classnames";

  // 조건부 클래스명을 주는 방법은 여러가지가 존재한다.
  <div className={cx(style.commentButton, { [style.commented]: commented })}>
  <div className={cx(style.repostButton, reposted && style.reposted)}>
  <div className={cx([style.heartButton, liked && style.liked])}>
  ```
    <aside>
    💡 npm trends 사이트를 통해 현재 사용하고 있는 라이브러리와 비슷한 경쟁 라이브러리를 비교해본 후, 사용 빈도 수가 많은 것을 선택하는 것이 좋다. (안정성)
    
    </aside>

- /compose/tweet 만들기
- usePathname과 /explore 페이지
  ## 💠 /explore 분석하기
  /explore 페이지에는 레이아웃에 있던 나를 위한 트렌드, 검색 부분이 우측 섹션에서 가운데 섹션으로 이동된다.
  `useSelectedLayoutSegment()` 훅을 사용해서 주소에 맞는 렌더링을 해주어도 되지만, `usePathname()` 훅을 사용하는 방법도 존재한다.
    <aside>
    💡 **usePathname()**
    현재 URL의 pathname 문자열을 반환한다.
    
    | URL | 반환된 값 |
    | --- | --- |
    | / | / |
    | /explore | /explore |
    | /explore?v=2 | /explore |
    | /explore/123 | /explore/123 |
    </aside>
    
    나를 위한 트렌드(TrendSection) 컴포넌트에 `usePathname()` 훅을 사용해서 조건부 렌더링을 적용한다.
    
    ```tsx
    // app/(afterLogin)/_component/TrendSection.tsx
    import style from "./trendSection.module.css";
    import Trend from "./Trend";
    import { usePathname } from "next/navigation";
    
    export default function TrendSection() {
      const pathname = usePathname();
    
      if (pathname === "/explore") return null;
    
      return (
        <div className={style.trendBg}>
          <div className={style.trend}>
            <h3>나를 위한 트렌드</h3>
            <Trend />
            <Trend />
            <Trend />
            <Trend />
            <Trend />
            <Trend />
            <Trend />
            <Trend />
            <Trend />
            <Trend />
          </div>
        </div>
      );
    }
    ```

- useSearchParams와 프로필, /search 페이지
  ## 💠 Tab 컴포넌트
  홈에서 사용되는 Tab 컴포넌트와 탐색하기 페이지에서 사용되는 Tab 컴포넌트는 역할이 다르다. 홈에는 Tab을 활성화하면 주소창에 변화가 없지만, 탐색하기 페이지의 Tab은 활성화 될 때마다 주소창에 변화가 생기기 때문에 이럴 때에는 각각의 컴포넌트로 만들어주는 것이 좋다.
  ### Tab 활성화 될 때 주소 변경하기
  - useRouter()의 replace()와 useSearchParams() 활용하기
  ```
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClickHot = () => {
    setCurrent("hot");
    router.replace(`/search?q=${searchParams.get("q")}`);
  };
  ```
    <aside>
    💡 [**useRouter()**](https://nextjs.org/docs/app/api-reference/functions/use-router)
    router 객체에 접근할 수 있는 훅
    **replace()**
    router.push()와 동일하게 동작하지만, 히스토리 스택에 URL을 추가하지 않고 변경시킨다. 즉 현재 페이지의 url을 완전히 바꿔주는 것이기 때문에 뒤로가기를 했을 시 push()와의 차이점이 발생한다.
    
    `push`
    
    `홈` > `로그인` > `리다이렉트 페이지` > [뒤로가기] > `로그인`
    `replace`
    `홈` > `로그인` > `리다이렉트 페이지` > [뒤로가기] > `홈`
    
    [**useSearchParams()](https://nextjs.org/docs/app/api-reference/functions/use-search-params)**
    클라이언트 컴포넌트에서 쿼리 스트링 문자열을 읽을 수 있다.
    
    </aside>

- 이벤트 캡처링과 /status/[id] 페이지
  ## 💠 Post 컴포넌트 분석
  🚩 Post 컴포넌트를 클릭했을 때, status 페이지로 이동되어야 한다. 단, Link와 같이 a 태그가 사용되는 것이 아닌 클라이언트에서 동작을 추가해야 한다.
    <aside>
    💡 **Link와 useRouter의 차이**
    Link의 경우 hover 동작을 했을 때 브라우저 좌측 하단에 이동할 주소가 보여지고, useRouter를 사용하여 onClick 동작으로 이동될 경우 좌측 하단에 이동할 주소가 보여지지 않는다.
    
    </aside>
    
    <aside>
    💡 하나의 동작을 위해 서버 컴포넌트를 클라이언트 컴포넌트로 변경해야 할 경우, 과감하게 해당 컴포넌트를 분리하여 **children**이나 **props**로 넘겨서 작은 클라이언트 컴포넌트로 세분화하자.
    
    </aside>
    
    ## 💠 onClickCapture()
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/726a223b-377f-409e-9a15-47054fc260af/Untitled.png)
    
    ```tsx
    // src/app/(afterLogin)/_component/Post.tsx
    // ...
    
    export default function Post() {
    // ...
    
      return (
        **<PostArticle post={target}>**
          <div className={style.postWrapper}>
            <div className={style.postUserSection}>
              **<Link href={`/${target.User.id}`} className={style.postUserImage}>**
                <img src={target.User.image} alt={target.User.nickname} />
                <div className={style.postShade} />
              **</Link>**
            </div>
            <div className={style.postBody}>
              <div className={style.postMeta}>
                **<Link href={`/${target.User.id}`}>**
                  <span className={style.postUserName}>{target.User.nickname}</span>
                  &nbsp;
                  <span className={style.postUserId}>@{target.User.id}</span>
                  &nbsp; · &nbsp;
                **</Link>**
                <span className={style.postDate}>
                  {dayjs(target.createdAt).fromNow(true)}
                </span>
              </div>
              <div>{target.content}</div>
              <div className={style.postImageSection}></div>
              <ActionButtons />
            </div>
          </div>
        **</PostArticle>**
      );
    }
    ```
    
    Post 컴포넌트에서의 클릭 이벤트는 PostArticle과 그 자식 Link 들이 있다.
    
    이때 PostArticle 내의 자식 요소인 Link를 클릭했을 때에도 PostArticle 클릭 이벤트가 동작되는 현상이 발생한다.
    
    이러한 현상을 **이벤트 캡쳐링** 이라 하며 이때는 **onClick 핸들러 외에 onClickCapture 핸들러를 사용**하여 캡쳐링 단계에 PostArticle의 클릭 이벤트가 동작하도록 변경해서 이러한 현상을 해결할 수 있다.
    
    ```tsx
    export default function PostArticle({ children, post }: Props) {
      const router = useRouter();
    
      const onClick = () => {
        router.push(`/${post.User.id}/status/${post.postId}`);
      };
    
      return (
        <article **onClickCapture={onClick}** className={style.post}>
          {children}
        </article>
      );
    }
    ```

- faker.js와 /photo/[photoId]
  ## 💠 faker.js
  더미데이터를 만들어주는 라이브러리
  ```bash
  $ npm i @faker-js/faker
  ```
    <aside>
    📌 **faker의 기존 라이브러리 제작자가 6버전부터 망쳐놓았기 때문에 아래의 라이브러리는 설치하지 말자.**
    
    [npm: faker](https://www.npmjs.com/package/faker)
    
    </aside>
    
    ### 사용 코드
    
    ```tsx
    export default function Post() {
      const target = {
        postId: 1,
        User: {
          id: "elonmusk",
          nickname: "Elon Musk",
          image: "/yRsRRjGO.jpg",
        },
        content: "클론코딩 라이브로 하니 너무 힘들어요 ㅠㅠ",
        createdAt: new Date(),
        Images: [] as any[],
      };
    
      // 반반 확률로 임시 이미지를 넣어준다.
      if (Math.random() > 0.5) {
        **target.Images.push({ imageId: 1, link: faker.image.urlLoremFlickr() });**
      }
    
    return (
        <PostArticle post={target}>
          <div className={style.postWrapper}>
            <div className={style.postUserSection}>
    				// ...
    				</div>
              <div>{target.content}</div>
              **<div className={style.postImageSection}>
                {target.Images && target.Images.length > 0 && (
    							<Link
    							  href={`/${target.User.id}/status/${target.postId}/photo/${target.Images[0].imageId}`}
    							  className={style.postImageSection}
    							>
    							  <img src={target.Images[0]?.link} alt="" />
    							</Link>
                )}
              </div>**
              <ActionButtons />
            </div>
          </div>
        </PostArticle>
      );
    }
    ```
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/95139154-13d6-4787-b7d8-a3f25b54aee3/Untitled.png)
    
    랜덤한 확률로 이미지를 생성해준다.
    
    ## 💠 이미지 상세보기
    
    <aside>
    📌 이미지를 클릭했을 때, 이미지 모달이 뜨기 때문에 해당 주소 페이지를 만들어주어야 한다.
    
    </aside>
    
    ### 폴더 생성
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/6b30c3dc-fb17-46d1-b027-468c599ac08f/Untitled.png)
    
    ### 페이지 만들기
    
    이미지 모달 형태이기 때문에 패러릴 라우트와 인터셉팅 라우팅이 필요하다.
    
    따라서 뒤의 배경 페이지는 홈과 동일하기 때문에 홈 컴포넌트를 사용해준다.
    
    ```tsx
    // src/app/(afterLogin)/[username]/status/[id]/photo/[photoId]/page.tsx
    import Home from "@/app/(afterLogin)/home/page";
    
    type Props = {
      params: { username: string; id: string; photoId: string };
    };
    export default function Page({ params }: Props) {
      params.username; // elonmusk
      params.id; // 1
      params.photoId; // 1
    
      return <Home />;
    }
    ```
    
    <aside>
    💡 slug 부분(`[folder]`)들을 컴포넌트의 params로 받아볼 수 있다.
    
    ```tsx
    export default function Page({ params }: Props) {
      params.username; // elonmusk
      params.id; // 1
      params.photoId; // 1
    
      return <Home />;
    }
    ```
    
    </aside>
    
    ### 모달 만들기
    
    모달 폴더에 해당 주소와 같은 경로로 폴더를 생성한다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/397a3841-f32f-4dab-b9ad-357a5bd3fbea/Untitled.png)
    
    <aside>
    💡 **기존에 페이지가 존재하는 곳마다 default 페이지를 추가해주어야 한다.**
    
    아래에서는 `[username]/default.tsx`, `[username]/status/[id]/default.tsx`를 추가해주었다.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/1e047916-6b97-4698-baf2-dfa30192fe8b/Untitled.png)
    
    </aside>
    
    ```tsx
    // src\app\(afterLogin)\@modal\[username]\status\[id]\photo\[photoId]\page.tsx
    import Post from "@/app/(afterLogin)/_component/Post";
    import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
    import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
    import style from "./photoModal.module.css";
    import PhotoModalCloseButton from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_component/PhotoModalCloseButton";
    import { faker } from "@faker-js/faker";
    
    export default function Default() {
      const photo = {
        imageId: 1,
        link: faker.image.urlLoremFlickr(),
        Post: {
          content: faker.lorem.text(),
        },
      };
    
      return (
        <div className={style.container}>
          <PhotoModalCloseButton />
          <div className={style.imageZone}>
            <img src={photo.link} alt={photo.Post?.content} />
            <div
              className={style.image}
              style={{ backgroundImage: `url(${photo.link})` }}
            />
            <div className={style.buttonZone}>
              <div className={style.buttonInner}>
                <ActionButtons white />
              </div>
            </div>
          </div>
          <div className={style.commentZone}>
            <Post noImage />
            <CommentForm />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      );
    }
    ```

- /messages 페이지 라이브 클론
    <aside>
    💡 **Tip. 객체의 키 값이 대문자인 경우,** 서버에서 보내주는 데이터 형태가 이러할 거다 예상하고 작성한 것이다. 유저 정보와 메시지 정보를 join해서 DB를 구성한 컬럼은 대문자로 오기 때문에 아래와 같은 형태를 띈다.
    
    ```
    export default function Room() {
      const router = useRouter();
      const user = {
        id: "hero",
        nickname: "영웅",
        Messages: [
          { roomId: 123, content: "안녕하세요.", createdAt: new Date() },
          { roomId: 123, content: "안녕히가세요.", createdAt: new Date() },
        ],
      };
    ```
    
    </aside>
    
    <aside>
    💡 **dayjs 플러그인은 페이지 별로 설정해주어야 한다.**
    
    ```tsx
    import "dayjs/locale/ko";
    
    dayjs.locale("ko");
    dayjs.extend(relativeTime);
    ```
    
    </aside>

- 다중 이미지 구역 만들기 **(⇒ 리팩토링 할 순 없을까?) + 이미지 상세보기 캐러셀 구현(키보드로만 이동 가능, 강의예정)**
  ## 💠 PostImages 컴포넌트
  이미지 업로드가 4개까지로 제한되어 있기 때문에 배열 길이에 따라 코딩해준다.
  ```tsx
  // src\app\(afterLogin)\_component\PostImages.tsx
  import Link from "next/link";
  import style from "@/app/(afterLogin)/_component/post.module.css";
  import cx from "classnames";

  type Props = {
    post: {
      postId: number;
      content: string;
      User: {
        id: string;
        nickname: string;
        image: string;
      };
      createdAt: Date;
      Images: any[];
    };
  };

  export default function PostImages({ post }: Props) {
    if (!post.Images) return null;
    if (!post.Images.length) return null;
    if (post.Images.length === 1) {
      return (
        <Link
          href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
          className={cx(style.postImageSection, style.oneImage)}
          style={{
            backgroundImage: `url(${post.Images[0]?.link})`,
            backgroundSize: "contain",
          }}
        >
          <img src={post.Images[0]?.link} alt="" />
        </Link>
      );
    }
    if (post.Images.length === 2) {
      return (
        <div className={cx(style.postImageSection, style.twoImage)}>
          <Link
            href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
            style={{
              backgroundImage: `url(${post.Images[0]?.link})`,
              backgroundSize: "cover",
            }}
          ></Link>
          <Link
            href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
            style={{
              backgroundImage: `url(${post.Images[1]?.link})`,
              backgroundSize: "cover",
            }}
          ></Link>
        </div>
      );
    }
    if (post.Images.length === 3) {
      return (
        <div className={cx(style.postImageSection, style.threeImage)}>
          <Link
            href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
            style={{
              backgroundImage: `url(${post.Images[0]?.link})`,
              backgroundSize: "cover",
            }}
          ></Link>
          <div>
            <Link
              href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
              style={{
                backgroundImage: `url(${post.Images[1]?.link})`,
                backgroundSize: "cover",
              }}
            ></Link>
            <Link
              href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
              style={{
                backgroundImage: `url(${post.Images[2]?.link})`,
                backgroundSize: "cover",
              }}
            ></Link>
          </div>
        </div>
      );
    }
    if (post.Images.length === 4) {
      return (
        <div className={cx(style.postImageSection, style.fourImage)}>
          <Link
            href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[0].imageId}`}
            style={{
              backgroundImage: `url(${post.Images[0]?.link})`,
              backgroundSize: "cover",
            }}
          ></Link>
          <Link
            href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[1].imageId}`}
            style={{
              backgroundImage: `url(${post.Images[1]?.link})`,
              backgroundSize: "cover",
            }}
          ></Link>
          <Link
            href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[2].imageId}`}
            style={{
              backgroundImage: `url(${post.Images[2]?.link})`,
              backgroundSize: "cover",
            }}
          ></Link>
          <Link
            href={`/${post.User.id}/status/${post.postId}/photo/${post.Images[3].imageId}`}
            style={{
              backgroundImage: `url(${post.Images[3]?.link})`,
              backgroundSize: "cover",
            }}
          ></Link>
        </div>
      );
    }
    return null;
  }
  ```
- 반응형 만들기
    <aside>
    💡 미디어 쿼리의 기준 px 등은 변수로 만들어 두는 것이 좋다.
    
    </aside>
