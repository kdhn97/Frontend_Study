# 21. 개발 : 웹 - Create Next App+React+Typescript+next.js로 프론트엔드 프로젝트 토대 쌓기

### React란?

- 사용자 인터페이스를 만들기 위한 자바스크립트 라이브러리

### Next란?

- 풀스택 웹 애플리케이션을 구축하기 위한 React 프레임워크
- Rust 언어 기반의 SWC(Speed Web Compiler)를 타입스크립트 컴파일러로 채택
- 번들링 도구 : TurboPack 채택

### React와 Next 차이점

- React

  1. CSR (Client Side Rendering) - HTML, JS 한꺼번에 생성한 후 렌더링
     클라이언트 사이드에서 '모든 HTML과 JavaScript 파일'을 받아와 페이지를 렌더링합니다.
     맨 처음 요청 시, 전체 페이지와 링크 페이지 정보를 '한꺼번에 받아옵니다.'
     단점: 빈 HTML을 보내고 클라이언트에서 JS로 화면을 그리므로, 검색 엔진 크롤러가 페이지 내용을 인식하지 못해 '검색어 상위 노출에 불리'합니다.

- Next

  1. SSR (Server Side Rendering) - 요청 시 HTML 생성 (매 요청마다 HTML을 생성)
     서버 측에서 즉시 렌더링된 HTML 파일을 생성하여 클라이언트로 보냅니다. 클라이언트는 이를 즉시 렌더링합니다.

  2. SSG (Static Site Generation, 정적 사이트 생성) - 빌드 시에 HTML이 생성 (매 요청마다 HTML을 재사용) - [권장]
     빌드 시점에 HTML 파일을 미리 생성하여 저장합니다. 이후 요청 시, 미리 생성된 정적 HTML 파일을 제공합니다.
     콘텐츠 변경이 자주 일어나지 않고 빠른 로딩 속도가 중요한 애플리케이션에 적합합니다.
     블로그, 문서 사이트, 마케팅 페이지 등에 유용합니다.

  3. SEO (검색 엔진 최적화) 해결

  SSR은 실시간 데이터가 중요한 애플리케이션에 적합합니다.
  SSG는 변경이 자주 일어나지 않는 콘텐츠나 빠른 페이지 로딩이 중요한 애플리케이션에 적합

### Next.js 생성

- npx create-next-app@latest

- Next 옵션 설정
  - What is your project named? my-app
  - Would you like to use TypeScript? No / Yes
  - Would you like to use ESLint? No / Yes
    -> ESLint : 자바스크립트 코드에서 발견되는 문제를 식별하기 위한 정적 코드 분석 도구
    -> "/_ eslint-disable react/prop-types _/" 를 맨 위에 추가하면 ESLint 사용 X
  - Would you like to use Tailwind CSS? No / Yes
  - Would you like to use `src/` directory? No / Yes
    -> 소스 코드의 루트 디렉토리로 src 폴더를 생성할 것인지 여부
  - Would you like to use App Router? (recommended) No / Yes
  - Would you like to customize the default import alias (@/\*)? No / Yes
    -> No : Next.js는 기본적으로 @/*를 src/*로 설정합니다. 이 설정을 유지하면 @를 사용하여 src 디렉토리의 파일들을 import할 수 있습니다.

### Next 특징

1. jsx 문법 도입

- 자바스크립트 파일에서 HTML구문 작성 가능
- 브라우저는 jsx를 이해할 수 없기 때문에 바벨, 웹팩, vite, swc 등의 툴로 js로의 컴파일이 필요하다.

2. 클래스 컴포넌트와 함수 컴포넌트 [권장]

- 함수 컴포넌트는 function과 Hooks를 사용

  ```TSX
    const App = () => {
      return (
        <div>
          <h1>리액트 시작!</h1>
        </div>
      )
    }
    export default App()  // App 컴포넌트를 모듈의 기본(default) 내보내기(export)로 설정하는 것을 의미
  ```

  ```TSX
  // App 컴포넌트 사용
    import App from './app'
    export default function Home() { // 방법 2
      return (
        <>
          <App/>
        </>
      )
    }
  ```

3. TypeScript

- 자바스크립트를 기반으로 정적 타입 문법을 추가한 프로그래밍 언어
- 자바스크립트 코드에 '타입'을 명시적으로 정의할 수 있는 기능을 추가함으로써, 코드의 오류를 컴파일 시점에 미리 잡아낼 수 있습니다

- 작성 방법 -> [ 변수명 : 타입 ]

```TSX
  let age: number;
    age = 30 ( O )
    age = '30' ( X )

  // Book 타입을 사용한 변수 선언
  type Book = {
    title: string,
    author: string,
    price?: number // price앞에 ? 가 붙은 선택적 속성은 해당 속성 타입을 갖거나 undefined 값을 갖는다
  };

  let myBook: Book = {
    title: "The Gatsby",
    author: "Fitzgerald",
    // price 속성이 선택적임을 나타내기 때문에, price를 생략할 수도 있습니다.
  };
```

4. CSS 종류

- Bootstrap, Tailwind CSS: 유틸리티 클래스 기반의 프레임워크
- Styled Components, Emotion (CSS-in-JS)
- SASS, SCSS (CSS 전처리기) : 중괄호({})와 세미콜론(;) 사용 유무 차이
- css module : 기본 CSS
  - global.css : 모든 파일에 적용되는 CSS
  - .module.css : 파일별로 import 하여 사용하는 CSS

5. App Router

- Next.js 13버전부터 출시
- 파일 시스템 기반의 라우팅을 지원하여 간편하게 페이지를 관리
- 기존에 사용하던 '페이지 라우터'는 사용안함 -> 앱 라우터 사용 [권장]
- 리액트 서버 컴포넌트 (RSC)
  - 서버에서 한 번만 실행되어 렌더링되어 HTML을 생성하고 렌더링된 HTML을 클라이언트로 전송
  - 재평가되어 다시 렌더링 X -> Hooks 사용 X -> Hooks을 사용하기 위해서는 최상단에 "use client" 작성하여 클라이언트 컴포넌트로 변경해야함

```TSX
  <Link href='/'>홈으로</Link>
  // 앱 라우터 : 최상위 app 폴더 / page.tsx 실행

  <Link href='/todos/add'>할 일 추가</Link>
  // 앱 라우터 : app 폴더 / todos 서브 폴더 / add 서브폴더 / page.tsx

  <Link href='/todos/:id'>변경</Link>
  // 앱 라우터 : app 폴더 / todos 서브 폴더 / [id] 서브 폴더 / page.tsx
  //  -> [id] 폴더명의 대괄호 안에 있는 URL 매개변수의 값을 읽음

  // a 태그 사용 시 - 새로고침 발생
  // Link 태그 사용 시 - 새로고침 없음
```

## Next 폴더 설명 - 폴더를 사용하여 경로를 정의하는 파일 시스템 기반 라우터

- public 폴더 (정적 이미지 폴더)

  - 모든 사람이 접근할 수 있는 사이트에서 쓰일 이미지 등을 넣는 것이 좋다.

- src 폴더

  - `src/app` 구조는 타입스크립트를 한번에 처리하기에 용이하다.
  - @를 사용하여 src 디렉토리의 파일들을 import할 수 있다

- app 폴더 (Root 폴더)

  - 최상위 폴더
  - 주소와 관련있는 파일들이 들어간다

- [폴더명] 폴더

  - 동적 경로 세그먼트 (Slug)
  - /movies/:id 를 생성하여 여러 페이지를 만들려면?
    -> movies 파일 아래 [id] 하위폴더를 생성하면 된다
    -> 이때 id는 동적이기에 '/movies/1' 또는 '/movies/2'... 처럼 만들어짐

- (폴더명) 폴더

  - 그룹을 만드는 폴더
  - 주소창(URL)의 영향을 미치지 않는다
    -> (home) 폴더 안에 page.tsx를 넣었다고 '/home'이 생기는 것이 아니다 그냥 '/' 로 생성됨

- \_component 폴더

  - 폴더 정리용
  - 프라이빗 폴더
  - 주소창(URL)의 영향을 미치지 않는다

- @modal (패러렐 폴더)

  - 하나의 화면에 두 개의 페이지를 보여줌
  - 주소창(URL)의 영향을 미치지 않는다

- (.)폴더명 (인터셉트 폴더)

  - (.)folder - 같은 수준의 파일을 가로채기
  - (..)folder - 한 단계 위를 가로채다

## Next 파일 설명 (타입스크립트 확장자 .tsx)

- layout.tsx

  - 최초로 실행되는 파일
  - 모든 파일들에 적용되는 파일
  - 네비게이션 및 footer 등을 모든 컴포넌트에 적용하려면 이 곳에만 두면 됨

- template.tsx

  - layout.tsx와 같은 기능의 파일이지만
  - 해당 파일을 실행할 때마다, 재랜더링

- page.tsx

  - Next는 폴더를 생성하고 page.tsx를 만들면 자동으로 하나의 페이지로 인식해서 Routes 해준다
  - about 폴더를 생성 후, page.tsx를 생성하면 자동으로 기본 페이지로 등록
    -> http://localhost:3000/about 을 입력하면 해당 페이지로 이동

- not-found.tsx : 잘못된 주소창으로 이동 시, 보여지는 페이지

- loading.tsx : 해당 페이지에 Loaging 화면 시, 보여지는 페이지

- error.tsx : 해당 페이지에 Error 발생 시, 보여지는 페이지

- default : 병렬 경로 대체 페이지, @modal 폴더에 작성
