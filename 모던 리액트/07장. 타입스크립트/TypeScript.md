# 07장. 타입스크립트

### 타입스크립트 개요

- 자바스크립트를 기반으로 구축된 강력한 타입 언어
- 사전에 초기 에러 방지

- 타입스크립트 코드를 컴파일하려면? 타입스크립트 컴파일러 or 트랜스파일러 필요
- 타입스크린트 컴파일러 설정

  1. 프로젝트 단위 설치 -> npm install typescript --save-dev
  2. 전역적으로 설치 -> npm install -g typescipt

- 타입스크립트 코드 .ts 확장자
- 코드 실행 시 명령어

  - index.ts 파일을 컴파일 하려면? tsc ./index.ts
  - 컴파일 이후 index.js 파일 생성됨 -> node ./index.js 실행

- 타입 시스템

  - 변수나 표현식, 함수, 모듈과 같은 다양한 프로그램 구조에 타입 속성을 부여
  - ex) number, string, boolean, null, undefined, built-in type, class, function

  - 작성 방법 - [ 변수명 : 타입 ]

    - ex) let age: number / type Book = {title: string, author: string, price?: number}
    - price앞에 ? 가 붙은 선택적 속성은 해당 속성 타입을 갖거나 undefined 값을 갖는다

  - 정적 타입 시스템
    - 컴파일 시에 모든 변수의 타입이 결정되고 부정확한 사용이 발견되면 에러 발생
    - 대규모 애플리케이션 개발에서 코드의 안정성을 쉽게 얻음
  - 동적 타입 시스템
    - 변수의 타입이 실행 시에 결정되며 에러가 발생할 때 적절하게 처리되지 않으면 프로그램 중단됨
    - 대규모의 타입 테스트를 통해서만 코드의 안정성 확보

### 리액트 타입스크립트

```JSX
import React, {useRef} from 'react';
import ReactDOM from 'react-dom';

type ModalTodoProps = {
  children: React.ReactNode
  onClose: React.MouseEventHandler<HTMLButtonElement>
}
const modalRoot = document.getElementById('modal')as HTMLDivElement
const Modal = {props: ModalTodoProps} => {
  // 생략
}
export default Modal
```

| 인터페이스 타입        | 설명                             |
| ---------------------- | -------------------------------- |
| React                  | JSX 안에서 렌더링할 수 있는 요소 |
| Component              | 클래스 컴포넌트 기초 클래스      |
| FunctionComponent = FC | 함수 컴포넌트 인터페이스         |
| CSSProperties          | CSS 속성                         |

| 이벤트 타입    | 설명                                             |
| -------------- | ------------------------------------------------ |
| ChangeEvent    | input, select, textarea 태그 요소 값이 변경될 때 |
| DragEvent      | 마우스로 드래그 드롭할 때                        |
| FocusEvent     | 요소가 포커스를 얻거나 잃을 때                   |
| FormEvent      | 폼 요소 값이 변경될 때                           |
| KeyboardEvent  | 키보드 입력할 때                                 |
| MouseEvent     | 마우스 클릭할 때                                 |
| SyntheticEvent | 기초 이벤트                                      |

| ReactDOM 요소 타입  | 요소     | HTML DOM            |
| ------------------- | -------- | ------------------- |
| ButtonHTMLElement   | button   | HTMLButtonElement   |
| FormHTMLElement     | form     | HTMLFormElement     |
| InputHTMLElement    | input    | HTMLInputElement    |
| LabelHTMLElement    | label    | HTMLLabelElement    |
| SelectHTMLElement   | select   | HTMLSelectElement   |
| StyleHTMLElement    | style    | HTMLStyleElement    |
| TableHTMLElement    | table    | HTMLTableElement    |
| TextareaHTMLElement | textarea | HTMLTextAreaElement |
