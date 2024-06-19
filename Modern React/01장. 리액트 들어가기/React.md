# 01장. 리액트 들어가기

### React란?

- 웹과 모바일용 사용자 인터페이스 라이브러리
- 페이스북에서 개발하여 오픈 소스로 제공한 자바스크립트 라이브러리

### React 특징

1. 단일 페이지 애플리케이션(SPA)을 위한 라이브러리

- Single Page Application

  - 웹 서버가 HTML을 전송하는 경우는 웹 클라이언트가 맨 처음 웹 서버에게 요청을 했을 때 뿐
  - 맨 처음 웹 서버에게 HTML을 요청하면 해당 파일 안에 모든 CSS, JavaScript 파일을 한꺼번에 전송
  - 새로운 데이터가 필요하다면, 웹 서버에 요청하여 데이터를 가져와 렌더링하여 표시
  - 페이지 이동 요청이 있으면 자체적으로 라우팅하여 페이지 이동

- SPA 장점

  - 사용자 경험 향상 : 전체 페이지를 다시 로드할 필요가 없어 빠르고 원할한 사용자 경험 제공
  - 서버 부하 감소 : 페이지의 일부만 동적으로 갱신되기에 페이지 로드 시간을 단축하고 확장성 향상
  - 코드를 효율적으로 구성 : 컴포넌트 기반으로 어플을 구조화하기에 유지보수가 쉽다

- 상위 컴포넌트로부터 하위 컴포넌트로 단방향 데이터 바인딩을 하기에 데이터 변화 성능에 영향 X

2. 사용자 인터페이스 라이브러리

- JSX : 자바스크립트에 XML을 확장한 문법을 사용하여 자바스크립트 파일에서 HTML구문 작성 가능
- 트랜스파일러(Transpiler) : JSX 코드를 자바스크립트 코드로 변환시키는 도구 -> 바벨(Babel)

3. 함수형 컴포넌트

- 컴포넌트(Component) : 사용자 인터페이스를 구성하는 재사용할 수 있는 빌딩 블럭(Building Block)
- 하나의 화면을 여러 개의 컴포넌트로 분할함으로써 컴포넌트가 담당하는 작업을 분리하여 재사용
- 선언적 방식(Declarative Approach) : 목표 상태를 정의하면 자바스크립트 DOM 명령을 생성하고 실행

4. 가상 DOM (Virtual Document Object Model)

- 트리 구조로 된 DOM이 렌더링될 때, 가상 DOM에서 연산을 수행한 후, 실제 DOM으로 넘기는 방식
  -> 연산의 효율성 + 실행 반응속도 향상

5. 동시성 렌더링

- 한 번에 둘 이상의 작업이 동시에 수행되는 것
  -> 다중 스레드 X
  -> 단일 스레드 안에서 여러 렌더링 작업의 우선 순위를 정하고 번갈아 수행하는 형식

### React 프로젝트 생성

1. 최신 Node.js 다운로드

- 패키지 관리자 (Package Manager)

  - npm : 표준 패키지 관리자

    - 개발자가 서드파티 패키지의 의존성을 관리할 수 있도록 하는 것
    - package.json 파일에서 npm 관리

  - yarn : 2016년 페이스북에서 개발한 패키지 관리자

  - pnpm : npm보다 2배 더 빠르다고 주장

2. Next 프로젝트 생성 : <mark> npx create-next-app@latest </mark>

- npx : 패키지에 포함되어 있는 코드를 실행하는 노드 명령

  - 패키지명 다음에 클론(:)으로 패키지 버전 구분 ex) "react": "18.2.0"
  - 버전 앞에 ^ 이 붙으면 두번째 이후 마이너 버전이 다르더라도 허용
  - 버전 앞에 ~ 가 붙으면 세번째 이후 패치 버전이 다르더라도 허용
  - 버전 앞에 * 가 붙으면 어떤 버전이라도 허용

- Next 옵션 설정
  - What is your project named? my-app
    -> 프로젝트 이름 변경
  - Would you like to use TypeScript? No / Yes
    -> TypeScript 사용 여부
  - Would you like to use ESLint? No / Yes
    -> ESLint : 자바스크립트 코드에서 발견되는 문제를 식별하기 위한 정적 코드 분석 도구
    -> "/_ eslint-disable react/prop-types _/" 를 맨 위에 추가하면 ESLint 사용 X
  - Would you like to use Tailwind CSS? No / Yes
    -> Tailwind CSS 사용 여부
  - Would you like to use `src/` directory? No / Yes
    -> 소스 코드의 루트 디렉토리로 src 폴더를 생성할 것인지 여부
  - Would you like to use App Router? (recommended) No / Yes
    -> App Router 사용 여부
  - Would you like to customize the default import alias (@/\*)? No / Yes
    -> No : 기본 설정을 사용하겠다는 의미입니다. Next.js는 기본적으로 @/*를 src/*로 설정합니다. 이 설정을 유지하면 @를 사용하여 src 디렉토리의 파일들을 import할 수 있습니다.
