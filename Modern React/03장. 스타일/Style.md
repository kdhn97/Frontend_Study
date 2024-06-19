# 03장. 스타일

### CSS 셀렉터

- CSS (Cascading Style Sheets)

  - HTML과 JavaScript와 함께 웹 표준을 구성하는 언어
  - 마크업 언어가 실제로 표시되는 방법을 기술하는 언어

- CSS 클래스 중복 방지

  1. \_app.js 파일에서만 전역 CSS를 import할 수 있도록 제한
  2. CSS 모듈을 사용 app.module.css
  3. 전체 페이지 CSS 적용 style/global.css

- CSS 클래스 사용 시 -> className=""

### 인라인 스타일 (권장 X)

- 속성명은 '-'를 제거하고 카멜 케이스(첫 문자를 제외한 각 단어의 첫 글자는 대문자)로 작성
  ex) align-item -> alignItem
- 속성값은 문자열 ''로 감싸줘야 함
  ex) alignItem: 'center'

### CSS 모듈(Module)

- <mark> 파일명.module.css </mark>
- CSS 클래스명 : 카멜 케이스

```JSX
// 파일명 : Todo.module.css
  .card {
    display: flex;
  }
  .cardTitle {
    margin: 0;
    font-size: 1.2em;
  }
```

```JSX
  import styles from './Todo.module.css';

  const TodoRow = (props) => {
    return (
      <div className={styles.card}>
        <p className={styles.cardTitle}>{props.children}</p>
      </div>
    )
  }
  export default TodoRow
```

## CSS-in-JS

- 자바스크립트 파일 안에 스타일을 선언하는 것
- 대표적인 CSS-in-JS : styled components, Emotion

### 이모션(Emotion)

- 라이브러리 설치 : npm install @emotion/react
- JSX 트랜스파일링 : /** @jsxImportSource @emotion/react */
- CSS 애트리뷰트 : 태그 템플릿 리터럴 -> css``에 둘러쌓인 문자열
- 장점 : 조건적인 스타일 구현 가능 ex) color: ${props.important ? 'red' : 'black'};

```JSX
// 파일명 : TodoRow.js
  /** @jsxImportSource @emotion/react */
  import { css } from '@emotion/react'

  const TodoRow = (props) => {
    return (
      <div>
        <p css={css`
          margin: 0;
          font-size: 1.2em;
          {/* TodoList 컴포넌트에서 TodoRow 컴포넌트를 important 속성과 함께 사용 */}
          color: ${props.important ? 'red' : 'black'};
        `}>{props.children}</p>
      </div>
    )
  }
  export default TodoRow;
```

```JSX
// 파일명 : TodoList.js
  import TodoRow from './TodoRow'

  const TodoList = () => {
    return (
      <TodoRow important>
          리액트 마스터 하기
      </TodoRow>
    )
  }
  export default TodoList;
```

### 스타일 컴포넌트(styled components)

- 라이브러리 설치 : npm install styled-components
- CSS 애트리뷰트 : 태그 템플릿 리터럴 -> styled.[태그명]``에 둘러쌓인 문자열

```JSX
// 단추(button)을 스타일링하는 StyledButton 컴포넌트 구현
// 파일명 : StyledButton.js
import styled, { css } from 'styled-components';

  const StyledButton = styled.button`
    border: none;
    color: ${props => props.color || '#09c'};
    &:hover { // 자기 자신을 선택하는 & 문자
        text-decoration: underline;
    }
    ${props => props.important &&
        css`
            color: red;
            &:hover {
                background: red;
                color: white;
            }`
    }`
  export default StyledButton;
```

```JSX
// 파일명 : TodoRow.js
  import StyledButton from './StyledButton'

  const TodoRow = (props) => {
    return (
      <div>
        <StyledButton>버튼</StyledButton>
      </div>
    )
  }
  export default TodoRow;
```
