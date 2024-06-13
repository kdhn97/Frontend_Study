# React
- SPA ( Single Page Application )
- Component로 HTML 재사용
- 데이터가 HTML에 자동 반영

# Node.js 최신 버전 설치

# React 설치 시 에러
- $ npx create-react-app 프로젝트명
- 만약 ERR! 가 뜬다면
1. $ npm unistall -g create-reate-app
1. $ npm istall -g create-reate-app

# React 파일 설명
- node_modules : 라이브러리 코드 보관함
- public : static + 이미지 파일 보관함
- src : 소스 코드 보관함
  - App.js : 메인페이지 -> JSX (.js파일에서 쓰는 HTML 대용품)
- package.json : 프로젝트 정보

# JSX 문법
- class -> className
- 변수 넣을 땐 { 중괄호 } = 데이터바인딩
- style = {{이름:'값'}}
- useState() : HTML 자동 재렌더링

# 터미널 창에서 Waring 끄는 법
- /* eslint-disable */

# 컴포넌트 만드는 법
1. function 만들고
2. return() 안에 HTML 담기
3. <함수명></함수명> 쓰기

---

# VITE
- Vue.js의 창시자인 Evan You가 작성 
- Vue 및 React 프로젝트 템플릿에 기본적으로 사용되는 로컬 개발 서버
- TypeScript 및 JSX를 지원
- 번들링을 위해 내부적으로 Rollup과 esbuild를 사용

### VITE 시작하기 
- npm create vite@latest

# VScode 확장 팩 설치
- ES7+ React/Redux/React-Native snippets