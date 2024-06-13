# 02장. JSX 컴포넌트

### JSX 컴포넌트 개요

- 컴포넌트 : 사용자 인터페이스를 구성하는 재사용할 수 있는 빌딩 블럭
- React는 함수 컴포넌트 사용 권장 -> ( 클래스 컴포넌트 X )

  - 함수 컴포넌트는 JSX와 HTML을 제어하는 자바스크립트 코드를 포함하는 함수로 구현
  - 함수명 - 파스칼 케이스(PascalCase) : 첫 문자는 대문자로 표기

  ```JSX
  function App() {
    return (
      <div>
        <h1>리액트 시작!</h1>
        <p>안녕 리액트!</p>
      </div>
    )
  }
  ```

### JSX 구문

- JSX : 페이스북에서 개발한 자바스크립트 파일 안에서 HTML 구문을 제공하는 자바스크립트 구문 확장
- JSX는 반드시 단일 루트 요소만 반환 -> return 안에 <></>로 감싸줘야함
- 동적인 컨텐츠 출력하는 표현식

  ```JSX
  const App = (props) => {
    return (
      <div>
        <h1>리액트 시작!</h1>
        <p>안녕 {props.name}!</p>
      </div>
    )
  }
  ```

- 다른 컴포넌트에 자바스크립트 모듈을 사용하려면?
  -> <mark> export default App() </mark>

  ```JSX
  import App from './app'
  export default function Home() {
    return (
      <>
        <App/>
      </>
    )
  }
  ```

### 속성(Props)

- 부모 컴포넌트에서 자식 컴포넌트로 하향식 데이터 전달

  ```JSX
  import App from './app'
  export default function Home() {
    return (
      <>
        <App
          title='리액트 & 넥스트'
          author='라이언'
          price='39000'
        />
      </>
    )
  }
  ```

- 방법 1

  ```JSX
  const App = (props) => {
    return (
      <>
        <h1>리액트 시작!</h1>
        <div>도서명 : {props.title}</div>
        <div>저자 : {props.author}</div>
        <div>가격 : {props.price}</div>
      </>
    )
  }
  export default App;
  ```

- 방법 2

  ```JSX
  const App = ({title, author, price}) => {
    return (
      <>
        <h1>리액트 시작!</h1>
        <div>도서명 : {title}</div>
        <div>저자 : {author}</div>
        <div>가격 : {price}</div>
      </>
    )
  }
  export default App;
  ```

- export default App;
  - App 컴포넌트를 모듈의 기본(default) 내보내기(export)로 설정하는 것을 의미합니다.
  - 이 구문을 통해 다른 파일에서 App 컴포넌트를 쉽게 가져올 수 있습니다.
