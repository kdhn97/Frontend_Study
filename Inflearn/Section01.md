# 섹션1. 기획자와 디자이너가 기획서를 던져주었다.

## 프로젝트 설치

```bash
$ npx create-next-app@latest
```

## 폴더구조 분석

### ✔️ public 폴더

- 넥스트 서버에서 누구나 접근할 수 있게 서비스 해준다.
- 모든 사람이 접근할 수 있는 사이트에서 쓰일 이미지 등을 넣는 것이 좋다.

### ✔️ src 폴더

- 주로 루트 아래에 src, app이 별도로 있는 것이 원칙이지만 `src/app` 구조는 타입스크립트를 한번에 처리하기에 용이하다.

### ✔️ app 폴더

- 주소와 관련된 파일이 들어가 있다.

### ✔️ next.config.js

- 넥스트 설정 파일

### ✔️ tsconfig.json

- 타입스크립트 설정 파일

  <aside>
  💡 **path alias**
  경로에 대한 별칭
  ex) 기본 상대 경로 import - ../../../components/Header
  ex) path alias 사용 - @/components/Header
  
  </aside>

- 브라우저 주소 app 폴더에 반영하기

## 💠 레이아웃

- 여러 페이지에서 공유되는 UI

### RootLayout

- 최상위 레이아웃을 `RootLayout` 으로 정의할 수 있고, 필수 레이아웃이다.
- `app` 의 모든 경로에 적용된다.
- 루트 레이아웃에는 `html` 및 `body` 태그가 포함되어야 한다.

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- 레이아웃의 children에는 app 폴더 하위에 정의된 page.tsx 컴포넌트가 렌더링된다.
  <aside>
  💡 **app/layout.tsx 와 app/home/layout.tsx, app/home/page.tsx가 존재하는 경우**

  app/layout.tsx에 정의한 RootLayout → HomeLayout → HomePage의 계층 구조가 형성된다.

  </aside>

  ## 💠 페이지

  - 경로에 대한 고유한 UI
  - `src/page.tsx` 는 애플리케이션의 baseURL 화면에 보여진다.
  - `app` 디렉터리 내에 page.js를 추가하여 해당 경로의 첫 번째 페이지를 만들 수 있다.

  ## 💠 경로에 맞게 폴더 구성하기

  - `baseURL/i/flow/login` , `baseURL/i/flow/signup` 라는 경로가 애플리케이션에 존재한다면, app 폴더 하위에 해당 경로와 동일하게 폴더를 구성하면 된다.

  ```tsx
  src
  └ app
    └ i
      └ flow
          ├ login
          └ ****signup
  ```

  ### 다이나믹 라우팅

  - 정확한 세그먼트 이름을 모르고 동적 데이터에서 경로를 생성하려는 경우, 동적 세그먼트를 사용할 수 있다.

  <aside>
  📍 만약 다이나믹 라우팅에 사용되는 폴더명과 다이나믹 라우팅이 아닌 폴더명이 동시에 존재한다면, 다이나믹 라우팅의 폴더명은 최후순위가 된다.

  ✔️ [username] 폴더와 home 폴더가 app 폴더 아래에 존재했을 때 유저명이 ‘home’일 경우
  → 동적 세그먼트는 최후순위이기 때문에 유저 프로필 페이지가 아닌 **home** 페이지가 보여지게 된다. 따라서 동적 세그먼트에 사용되는 params 들이 다른 라우팅과 겹치지 않도록 하는 것이 제일 좋다.

  </aside>

  **`[폴더명]`**

  - 동적 세그먼트는 폴더 이름을 대괄호로 묶어 생성할 수 있다.
  - 현재 트위터의 경우 username에 따라 userA/status, userB/status, … 의 경로들을 갖게 된다.
  - 따라서 해당 경로에 따른 폴더는 **대괄호**를 묶어 생성해주면 된다.

  ```tsx
  src
  └ app
      └ [username]
          └ status
  ```

  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/29ff0065-2c54-496a-9b48-5cb673f5c6eb/Untitled.png)

  🔼 주소창에 username만 있는 경우 해당 유저의 프로필 페이지([username]/page.tsx)가, `username/status/1` 혹은 `username/status/2` 라는 url이 있는 경우 해당 유저의 각 게시물 페이지([username]/status/[id])s가 렌더링 된다.

  <aside>
  💡 **Not Found 페이지**

  [File Conventions: not-found.js](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)

  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/e42ced37-4146-4290-8947-0afa57a4d5d7/Untitled.png)

  app 폴더 내부에서 라우팅에도 해당 되지 않고, layout.tsx나 page.tsx가 아닌 페이지는 not-found.tsx로 이동되게 된다.

  </aside>

- 라우트 그룹

- 일반적으로 `app` 폴더 하위의 폴더는 URL 경로로 매핑된다.
- 하지만 폴더명을 괄호로 묶어 생성하면 URL 경로 구조에 영향을 주지 않고 그룹화하여 경로를 구성할 수 있다.
ex) app/(afterLogin)/home 의 경우 브라우저 URL에는 /home으로 보이게 된다.
**`(폴더명)`**
폴더 이름을 괄호로 묶어 생성할 수 있다.
  <aside>
  💡 라우트 그룹의 경우 별도의 layout을 가질 수 있다.
  따라서 **그룹별 레이아웃을 다르게 설정할 수 있다**는 장점이 있다.
  
  </aside>
  
  <aside>
  💡 대부분 그룹화를 하는 기준은 **레이아웃**에 있었다.
  
  </aside>

- template.tsx, Link, Image, redirect

## 💠 template.tsx

- 레이아웃의 경우 애플리케이션 내에서 페이지 이동 시 리렌더링이 되지 않는다.
- 페이지 이동 시에는 ‘페이지’만 리렌더링 되는데, 만약 레이아웃도 리렌더링이 되게 하고 싶다면 `template.tsx` 를 사용하면 된다.

* 리렌더링 보다는 새롭게 마운트 된다는 의미가 더 적절하다.
  <aside>
  💡 **템플릿**
  레이아웃과 유사하지만, 사용자가 템플릿을 공유하는 경로 사이를 탐색할 대 구성 요소의 새 인스턴스가 마운트되고 DOM 요소가 다시 생성되며 **상태가 유지되지 않고** 다시 동기화된다.

  `useEffect` (ex. 페이지 보기 로깅) 및 `useState` (ex. 페이지별 피드백 양식)에 의존하는 기능의 경우 템플릿이 더 적합하다.

  **템플릿과 레이아웃은 같이 사용되지 않는다.**

  </aside>

  <aside>
  ❓ Nextjs 공식문서의 [Template 예제](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#templates)에 따르면 레이아웃과 자식요소 사이에 렌더링 된다는 예제가 나와있는데 강의에서는 둘 중 하나를 선택해야 한다고 한다.
  정확히 어떤 의미일까?

  </aside>

  ## 💠 <Link>

  `<Link>` 는 HTML의 `<a>` 를 확장한 리액트 컴포넌트이다.

  prefetching 및 클라이언트 측 탐색을 제공하며, `<a>` 사용시에는 새로고침이 발생하지만, `<Link>` 의 경우 새로고침이 되지 않는다.

  <aside>
  💡 **prefetching**
  사용자가 경로를 방문하기 전에 **백그라운드에서 경로를 미리 로드하는 방법**이다.
  경로가 사용자의 뷰포트에 표시되면 자동으로 가져오며 페이지가 처음 로드될 때 또는 스크롤을 통해 표시될 때 발생한다.

  `<Link>` 의 prop으로 활성화 여부를 설정할 수 있으며, 기본 값은 true이다.
  Dev 모드에서는 활성화 되지 않고 Production에서만 활성화된다.

  </aside>

  ## 💠 <Image>

  `<img>` 가 아닌 `<Image>` 를 사용하게 되면 import 한 이미지를 Next에서 자동으로 최적화해준다.

  <aside>
  💡 Next에서는 이미지를 상대 경로/절대 경로로 import 해서 사용할 수 있다.

  </aside>

  ## 💠 redirect

  `redirect` 함수는 다른 URL로 유저를 리다이렉트 시킬 수 있다.

  ```tsx
  redirect(path, type);
  ```

  기본적으로 `use server` 를 사용한 서버 액션에서는 type은 `push`가 기본 값이며 **브라우저 기록 스택에 리다이렉트 되는 URL이 추가**되고, 그 외의 경우에는 `replace` 타입이 기본 값이므로 **브라우저 기록 스택의 현재 URL을 대체**한다.

- CSS Module을 선택한 이유

## 💠 자주 사용되는 CSS

- tailwind
- Styled Components or Emotion
- sass
- css module
- vanilla extract

### ✔️ tailwind

- 호불호가 심하며, 가독성이 좋지 않다.
- tailwind 가독성은 `tailwind variants`으로 어느정도 해결할 수 있다.
  [Tailwind Variants – Tailwind Variants](https://www.tailwind-variants.org/)

### ✔️ Styled Components / Emotion

- Emotion의 경우 Next13에서 잘 동작하지 않는다.
- Styled Components는 서버 컴포넌트에서 SSR 쪽에 문제가 발생할 수 있다.

### ✔️ vanila extract

- Windows와 문제가 발생한다.
  https://github.com/vanilla-extract-css/vanilla-extract/issues/1086
- 이는 2023.11.9일경 해결된 것으로 보인다.
  \*\*\*\*https://github.com/vanilla-extract-css/vanilla-extract/pull/1193
  🌟 SASS를 사용할 바엔 간단하게 ‘css module’을 채택

## css 새로운 단위 `dvw` `dvh`

- 기존에는 뷰포트 단위로 너비나 높이 값을 주고 싶을 때 `vw` `vh` 를 사용했다.
- 이는 100vh로 설정했을 때, 모바일에서 주소 표시줄 영역에 의해 화면이 잘리거나 주소 표시줄이 없어지는 경우가 발생했다.
- 따라서 `-webkit-fill-available` 을 height 값에 적용하는 방법이 있는데, 이 방법은 ios에만 적용되고 안드로이드에는 적용되지 않는 문제가 있어 권장되지 않는다.

```css
div {
  height: 100vh;
  height: -webkit-fill-available;
}
```

- `dvh` 는 주소 표시줄이 스크롤을 통해 축소가 되건, 노출이 되고 있건 상관 없이 현재 보여지는 뷰포트 높이를 **동적**으로 가져와 이 문제를 해결할 수 있다.
  ![https://blanche-toile.com/web/large-small-and-dynamic-viewport-units](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/f1e85c81-cebb-497e-b87a-618415e1ca70/Untitled.png)
  https://blanche-toile.com/web/large-small-and-dynamic-viewport-units
- 패러렐 라우트

## 💠 패러렐 라우트(Parallel Route)

Parellel은 **병렬**이라는 의미를 가지고 있다.
즉, Parallel Route는 병렬 라우트로 해석할 수 있고, **병렬 라우팅을 사용하면 동일한 레이아웃에서 하나 이상의 페이지를 동시에 또는 조건부로 렌더링할 수 있다.**
![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/da919e1b-3a37-4696-834b-681577a5bb1b/Untitled.png)
병렬 라우팅을 사용하면 경로가 독립적으로 스트리밍 될 때, 각 경로에 대해 독립적인 오류 및 로드 상태를 정의할 수 있다.
![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/d1edac9a-de36-4aa2-81d6-903cb678fb6c/Untitled.png)

### ✔️ 구현하고자 하는 것

- `app/page.tsx` 가 바탕이 되고, `i/flow/login/page.tsx` 가 모달 형식으로 띄워지는 화면
- 이는 위에서 설명한 ‘패러렐 라우트’(+인터셉팅 라우트)로 구현할 수 있다.
[Routing: Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#modals)
  <aside>
  💡 **기존 모달과의 차이점**
  기존 모달과의 차이점은 주소가 바뀌냐 안 바뀌느냐이 차이다.
  **패러렐 라우트는 동시에 띄워진 페이지의 주소가 각각 다르고, 기존 모달은 주소 변경 없이 모달이 동작한다.**
  
  </aside>
  
  ### ✔️ 패러렐 라우트 사용하기
  
  패러렐 라우트는 명명된 **슬롯**을 사용하여 생성된다.
  
  `@folder`
  
  생성된 슬롯은 경로 세그먼트가 아니기 때문에 URL 구조에 영향을 주지 않는다.
  
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/1729a3e0-e565-4a1a-af0f-247f89145456/Untitled.png)
  
  ```tsx
  export default function Layout(props: {
    children: React.ReactNode
    analytics: React.ReactNode
    team: React.ReactNode
  }) {
    return (
      <>
        {props.children}
        {props.team}
        {props.analytics}
      </>
    )
  }
  ```
  
  위와 같은 형태로 슬롯을 생성했다면 예시와 같이 app/layout.tsx에서 @analytics의 페이지와 @team 페이지, children을 병렬로 렌더링 할 수 있다.
  
  <aside>
  💡 children prop은 폴더에 매핑할 필요가 없는 **암시적 슬롯**이다.
  즉, `app/page.tsx` 와 `app/@children/page.tsx` 는 동일하다.
  
  </aside>
  
  <aside>
  💡 다른 계층 구조를 갖고 있는 페이지는 병렬로 렌더링 할 수 없다.
  `app/page.tsx` 와 `app/(beforeLogin)/@modal/page.tsx` 는 병렬로 렌더링 할 수 없다는 의미이다.
  따라서 병렬로 렌더링 하기 위해서는 슬롯과 다른 슬롯(혹은 페이지)가 같은 계층 구조를 가져야 한다.
  
  </aside>
  
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/ed239d7b-7fbf-4852-9d1a-2925a3f334e6/Untitled.png)
  
  ```tsx
  // app/(beforeLogin)/layout.tsx
  import { ReactNode } from "react";
  
  type Props = { children: ReactNode; modal: ReactNode };
  
  export default function Layout({ children, modal }: Props) {
    return (
      <div>
        {children}
        {modal}
      </div>
    );
  }
  
  // 주소가 localhost:3001일 때는 children->page.tsx, modal->@modal/default.tsx
  // 주소가 localhost:3001/i/flow/login 때는 chldren->i/flow/login/page.tsx, modal->@modal/i/flow/login/page.tsx
  ```
  
  같은 상위 폴더(beforeLogin) 아래에 `@modal` 슬롯과 `layout.tsx` 가 같이 있다면 별다른 import 없이 `modal` 을 props로 가져와 패러렐 라우트를 구성할 수 있다.
  
  위 코드에서 `page.tsx` 는 `layout.tsx` 의 `{children}` 에 렌더링 되고, `@modal` 은 `{modal}` 에 렌더링 된다.

- 클라이언트 컴포넌트로 전환하기

## 💠 useState 에러

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/d4a66fe8-0edf-41e2-a58f-c80eba6ce404/Untitled.png)
위 에러를 설명하자면 다음과 같다.

> useState는 클라이언트 컴포넌트에서만 사용되는데, 현재 서버 컴포넌트에서 사용되고 있다.
> 기본적으로 `page.tsx`, `layout.tsx`는 Next 서버에서 동작하고 있는 **서버 컴포넌트**이다.
> 서버 컴포넌트는 컴포넌트 앞에 `async` 키워드를 붙여 비동기 컴포넌트로 만들 수도 있다.
> 단, useState, useEffect와 같은 Hooks를 사용할 수 없다.

## 💠 Client Component로 변경하기

React를 사용하다보면 Hook 기능을 사용하지 않을 수 없다.
따라서 서버 컴포넌트를 클라이언트 컴포넌트로 변경해주어야 하는데 이는 **컴포넌트 코드의 최상단에 “use client” 를 작성**해주면 된다.

  <aside>
  💡 그렇다면 모든 컴포넌트에 use client를 작성해두면 Hook을 사용할 때 편하지 않을까?
  
  → 그러면 서버 컴포넌트를 쓰는 장점이 없어지기 때문에 지양해야한다.
  
  </aside>
  
  <aside>
  📖 **읽을거리**
  [Client Component VS. ServerComponent](https://velog.io/@timosean/Server-component-vs.-Client-Component)
  
  </aside>

- default.tsx

## 💠 default.tsx

- Next.js가 현재 URL을 기반으로 슬롯의 활성 상태를 복구할 수 없는 경우, 대체 파일로 렌더링할 파일
- 패러렐 라우트가 필요없을 때 혹은 그에 해당하는 기본 값 **(모달에 대한 기본 값이 아님에 주의)**
  <aside>
  📖 **읽을거리**
  default.js에 대한 Next.js 공식문서(작성중)
  https://nextjs.org/docs/app/api-reference/file-conventions/default

  </aside>

  ### 적용

  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/a79a40da-88af-4024-a473-d84d1e98db08/Untitled.png)

  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/1bbaefa8-b888-49e4-a949-c2475eb74c3f/Untitled.png)

  현재 프로젝트에서는 modal이 **localhost:3000**이 아닌 **localhost:3000/i/flow/login**에 띄워져야 한다.

  따라서 위의 사진 중 두 번째 사진처럼 폴더 구조를 처리해야 하는데, 그렇게 처리하다보면 @modal의 기본 페이지가 없어 app/beforeLogin/layout.tsx에 넣어두었던 modal을 찾을 수 없게 된다.

  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/e48168cf-0b3a-4c98-9e72-a171f5558a68/Untitled.png)

  즉, not-found 페이지가 띄워지게 되며 이를 해결하는 방법으로는 `@modal/page.tsx`를 만들면 되지만 **패러렐 라우트의 기본값은 default.tsx**이기도 하고, page.tsx에는 넣을 컨텐츠가 없기 때문에 `@modal/default.tsx`를 만들어 해결할 수 있다.

  ```tsx
  // src/app/(beforeLogin)/@modal/default.tsx
  export default function Default() {
    return null;
  }
  ```

  ![@modal/page.tsx로 생성했을 경우](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/fbebe6ba-af4d-41cd-b4a2-0b70390309a6/Untitled.png)

  @modal/page.tsx로 생성했을 경우

  ![@modal/default.tsx로 생성했을 경우](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/085b7693-f4a1-47ab-834a-41096bac41a7/Untitled.png)

  @modal/default.tsx로 생성했을 경우

- 인터셉팅 라우트

## 💠 인터셉팅 라우트(Intercepting Routes)

인터셉팅 라우팅을 하면 현재 레이아웃 내 애플리케이션의 다른 부분에서 경로를 로드할 수 있다.
이 라우팅 패러다임은 사용자가 다른 컨텍스트로 전환하지 않고도 경로의 내용을 표시하려는 경우 유용하게 사용된다.

> 예를 들어, 피드에서 사진을 클릭하면 피드에 오버레이되어 사진을 모달로 표시할 수 있다. 이 경우 Next.js는 `/photo/123`경로를 가로채서 URL을 마스크하고 이를  `/feed` 에 오버레이한다.
>
> ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/04a59233-0bea-4129-ab11-0c950c0c7fc1/Untitled.png)

### 사용방법

- 인터셉팅은 `(..)` 를 사용하여 정의할 수 있는데 이는 상대 경로(`/..` ) 규칙과 유사하다.
- `(.)` 동일한 수준의 세그먼트와 일치
- `(..)` 한 수준 위의 세그먼트와 일치
- `(..)(..)` 두 수준 위의 세그먼트와 일치
- `(...)` 루트 app 디렉터리의 세그먼트와 일치
- ex) `photo` 내에서 `feed/(..)photo` 세그먼트를 가로챌 수 있다.
  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/47c28730-ea37-43f5-aaeb-a41b75d2e677/Untitled.png)

### 적용하기

![모달에서 보이는 페이지들](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/ffd9c8a0-ce66-41f5-87d2-4b8948997961/Untitled.png)
모달에서 보이는 페이지들
![app/(beforeLogin)/layout.tsx의 children에서 보이는 페이지들](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/9c56e329-a583-4e1d-ac9c-5d1cd82f9ded/Untitled.png)
app/(beforeLogin)/layout.tsx의 children에서 보이는 페이지들
현재 폴더 구조가 위와 같다면, 우리의 목표는 `app/page.tsx` 위에 `@modal/i/flow/login/page.tsx` 을 띄워야 한다.
![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/008b9466-658c-45a3-a713-4949ecc77db9/Untitled.png)
따라서 @modal/i/flow/login 구조를 @modal/(.)i/flow/login 으로 변경한다.

  <aside>
  💡 인터셉팅에 사용되는 `..` 은 주소를 기반으로 작성하게 된다.
  즉, 패러렐 라우트의 슬롯(`@`)는 주소에 영향을 미치지 않기 때문에 (beforeLogin)/i/flow 주소를 (beforeLogin)/@modal/i/flow가 가리키려면 `(..)i` 가 아닌 `(.)i` 로 생성해주어야 한다.
  
  </aside>
  
  <aside>
  📍 **클라이언트에서 라우팅 할 때만 인터셉트 라우팅이 적용된다.**
  
  </aside>
  
  <aside>
  ❓ **그렇다면, 현재 app/i/flow/login 부분은 전혀 실행되지 않는걸까?**
  
  → **그렇지 않다.**
  <Link>를 통해서 버튼을 눌렀을 때 URL 이동시 가로채기(인터셉팅)이 발생하여 모달창(app/@modal/(.)i/flow/login)이 보이게 되고, 만약 URL에 직접 입력하여 브라우저에서 접속하거나 새로고침이 발생했을 경우에는 app/i/flow/login에 있는 페이지가 보이게 된다.
  
  </aside>

- private folder(\_폴더)

## 💠 Private Folder

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/fe6765b4-00d6-4cdf-9135-2b74ffe6e6c7/Untitled.png)
위 사진에서 `page.tsx`와 `login.module.css`는 동일한 파일이다.
![*page.tsx → LoginModal.tsx로 변경](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/9b7c2bac-c718-4881-9d55-6ba2b9281bbd/Untitled.png)
\*page.tsx → LoginModal.tsx로 변경
이때 공통되는 부모 폴더에 `_` 를 사용하여 Private Folder를 만들어 줄 수 있다.
private folder 또한 주소창에 영향이 없는 폴더이다.
이 폴더는 **폴더 정리용**으로 주로 사용된다.
private folder로 컴포넌트를 생성해주었으니 기존의 코드는 아래와 같이 수정된다.

```tsx
// app/@modal/(.)i/flow/login/page.tsx 과 app/i/flow/login/page.tsx
import LoginModal from "@/app/(beforeLogin)/_component/LoginModal";

export default function Page() {
  return <LoginModal />;
}
```

따라서 클라이언트 컴포넌트로 변경했던 page.tsx는 다시 서버 컴포넌트로 변경된다.

  <aside>
  📍 **서버 컴포넌트는 클라이언트 컴포넌트를 import 할 수 있지만, 클라이언트 컴포넌트는 서버 컴포넌트를 import 할 수 없다.**
  
  ++ 실제로는 클라이언트 컴포넌트에 서버 컴포넌트를 import 할 수는 있지만, 이 때 서버 컴포넌트는 클라이언트 컴포넌트로 변경된다는 점이 있다.
  
  </aside>

- 로그인 모달에서 발생하는 문제 해결하기(router.replace)
  <aside>
  💡 **css module을 사용하면 모듈마다 다른 랜덤 문자가 클래스명에 추가된다.**
  따라서 Amodule의 .container와 Bmodule의 .container는 다르게 취급된다.
  이는 동일한 클래스명이더라도 중복된 클래스로 취급하지 않도록 하게 해준다.

  ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/76967202-32c4-4e20-a0af-3ea5a115cc9d/Untitled.png)

  </aside>

  ## 💠 로그인 모달에서 발생하는 문제

  - 기대했던 동작은 ‘로그인’을 클릭했을 때 /login으로 이동되지만, `redirect` 함수를 사용하여 /i/flow/login으로 이동하게끔 하는 것이었다.
  - 기대 코드

  ```tsx
  // src/app/(beforeLogin)/page.tsx
  (...)
  <Link href="/login" className={styles.login}>
    로그인
  </Link>
  ```

  ```tsx
  // src/app/(beforeLogin)/login/page.tsx
  import { redirect } from "next/navigation";

  export default function Login() {
    redirect("/i/flow/login"); // /login에 들어왔을 때 /i/flow/login으로 이동시킴
  }
  ```

  - 하지만 이 코드는 인터셉팅 라우팅이 제대로 동작하지 않게 했다.
  - 인터셉팅 라우팅이 동작된다면, app/page.tsx가 바탕에 있고, 로그인 모달창이 띄워지는 화면이 나와야하지만 새로고침 혹은 브라우저에서 직접 접속할 때와 같이 로그인 모달창만 존재하는 화면이 보였다.

  ![‘로그인’을 클릭했을 경우 인터셉팅 라우팅이 동작되었을 때의 기대화면](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/68f24519-3c11-4f20-87d0-c417e775d796/Untitled.png)

  ‘로그인’을 클릭했을 경우 인터셉팅 라우팅이 동작되었을 때의 기대화면

  ![새로고침 혹은 브라우저 직접 접속시 나와야할 화면이 인터셉팅 라우팅이 동작되지 않아 메인 페이지에서 ‘로그인’을 클릭했을 때 나오게 된다.](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/e08fe041-37fc-40e9-94ea-73f514bffb9e/Untitled.png)

  새로고침 혹은 브라우저 직접 접속시 나와야할 화면이 인터셉팅 라우팅이 동작되지 않아 메인 페이지에서 ‘로그인’을 클릭했을 때 나오게 된다.

  ## 💠 문제 분석

  ```tsx
  // app/(beforeLogin)/login/page.tsx
  import { redirect } from "next/navigation";

  export default function Login() {
    redirect("/i/flow/login");
  }
  ```

  리다이렉트를 해주는 코드를 다시 한번 보면, 해당 페이지 컴포넌트는 **서버 컴포넌트**이다.

  즉, 현재 서버에서 리다이렉트를 해주고 있다. 이전 챕터에서 설명했듯이 **인터셉트 라우팅은 클라이언트 컴포넌트에서 Link를 통해 라우팅할 경우에만 적용된다.**

  ## 💠 문제 해결

  따라서 해당 컴포넌트를 클라이언트 컴포넌트로 변경시키고, `redirect()` 함수는 클라이언트 컴포넌트에서 동작하지 않기 때문에 클라이언트에서 동작하는 `useRouter` hook을 사용해준다.

  ```tsx
  // app/(beforeLogin)/login/page.tsx
  "use client";

  import { useRouter } from "next/router";

  export default function Login() {
    const router = useRouter();
    router.replace("/i/flow/login");

    return null;
  }
  ```

  <aside>
  💡 **router.push 와 router.replace의 차이**

  ✔️ **router.push
  브라우저 기록 스택에 리다이렉트 되는 URL이 추가된다.**
  즉 리다이렉트 후, 뒤로가기를 했을 때 리다이렉트 되기 전 주소로 이동된다.
  ✔️ **router.replace**
  **브라우저 기록 스택의 현재 URL을 대체한다.**
  즉 리다이렉트 후, 뒤로가기를 했을 때 진입한 경로보다 한 단계 이전 주소로 이동된다.

  ex) localhost:3000 → localhost:3000/login → (리다이렉트) → localhost:3000/i/flow/login 경로를 진입했을 때 최종 경로에서 뒤로가기를 했을 경우
  `router.push` 는 i/flow/login에서 뒤로가기 할 경우 /login으로 이동된다.
  `router.replace` 는 localhost:3000 으로 이동된다.

  `router.push`의 경우 리다이렉트 되기 전 주소로 이동되기 때문에
  i/flow/login에서 뒤로가기 → /login 진입 → 리다이렉트 되어 뒤로가기를 해도 리다이렉팅이 무한 반복되어 제대로 동작되지 않는다.

  </aside>

  ## 💠 또 다시 문제 봉착

  - 위와 같이 적용해줘도 메인 페이지 배경에 로그인 모달창이 뜨지 않았다.
  - 다시 문제를 분석해보자면, 메인 페이지에서 ‘로그인’을 클릭할 경우 `/login` 으로 먼저 이동되고, `/i/flow/login` 으로 리다이렉팅 되기 때문에 기존 메인 페이지 위에 모달이 아닌 로그인 페이지 배경 위에 모달이 생성되게 된 것이다.
  - 조금 다른 점은 **useRouter 훅 사용으로 인해** 기존에는 로그인 페이지 배경 + /i/flow/login 모달창 이었고, 현재는 로그인 페이지 배경 + /@modal/(.i)/flow/login 모달창이 되었다.
    ```tsx
    // @modal/(.i)/flow/login/page.tsx
    import LoginModal from "@/app/(beforeLogin)/_component/LoginModal";

    export default function Page() {
      return (
        <>
          <p>인터셉트지롱</p>
          <LoginModal />
        </>
      );
    }
    ```
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/a5f08c34-81fb-41c3-aad6-b88833affb72/c725b66a-6904-46ad-aaf6-125de529281a/Untitled.png)
  - 이를 해결하기 위해서는 app/(beforeLogin)/login/page.tsx가 app/(beforeLogin)/page.tsx와 동일한 페이지 구성이 되어야 한다.

  ```tsx
  // app/(beforeLogin)/page.tsx
  import styles from "@/app/page.module.css";
  import Image from "next/image";
  import Link from "next/link";
  import zLogo from "../../../public/zlogo.png";

  export default function Home() {
    return (
      <>
        <div className={styles.left}>
          <Image src={zLogo} alt="logo"></Image>
        </div>
        <div className={styles.right}>
          <h1>지금 일어나고 있는 일</h1>
          <h2>지금 가입하세요.</h2>
          <Link href="/i/flow/signup" className={styles.signup}>
            계정 만들기
          </Link>
          <h3>이미 트위터에 가입하셨나요?</h3>
          <Link href="/login" className={styles.login}>
            로그인
          </Link>
        </div>
      </>
    );
  }
  ```

  ```tsx
  // app/(beforeLogin)/login/page.tsx
  "use client";

  import styles from "@/app/page.module.css";
  import Image from "next/image";
  import Link from "next/link";
  import zLogo from "../../../../public/zlogo.png";
  import { useRouter } from "next/navigation";

  export default function Login() {
    const router = useRouter();
    router.replace("/i/flow/login");

    return (
      <>
        <div className={styles.left}>
          <Image src={zLogo} alt="logo"></Image>
        </div>
        <div className={styles.right}>
          <h1>지금 일어나고 있는 일</h1>
          <h2>지금 가입하세요.</h2>
          <Link href="/i/flow/signup" className={styles.signup}>
            계정 만들기
          </Link>
          <h3>이미 트위터에 가입하셨나요?</h3>
          <Link href="/login" className={styles.login}>
            로그인
          </Link>
        </div>
      </>
    );
  }
  ```

  <aside>
  💡 로그인 페이지와 메인 페이지의 구조가 동일하기 때문에 컴포넌트로(_component) 만들어주는 것도 좋다.

  </aside>

- Main, SignupModal css 설명
- 기본적인 CSS 설명이라 기록할 것 X
