# 05장. 이펙트, 컨텍스트, 리듀서

### useEffect()

- Rest API를 호출하여 외부 리소스 요청
- 컴포넌트가 렌더링된 후에 실행될 코드를 정의 -> ex) 데이터 fetching, 직접 DOM 조작, 타이머 설정 등
- Effect : 특정한 환경에서 컴포넌트 안에서 실행되는 행위
- Side Effect : 컴포넌트의 렌더링과 관계 없는 외부의 요소에 접근하거나 영향을 주는 것

```JSX
// 기본 사용 방법
import {useEffect} from 'rect';

useEffect (() => {
  // 사이드 이펙트 수행
}, [의존성배열1, 의존성배열2])
```

- useEffect() 함수의 첫 번째 인수 : 사이드 이펙트를 수행하는 함수값 지정
- useEffect() 함수의 두 번째 인수 : 사이드 이펙트를 실행하는 조건
  - 의존성 배열이 비어있다면 [] - 컴포넌트가 처음 마운트될 때만 사이트 이펙트 실행
  - 두 번째 인수를 지정하지 않는다면 - 컴포넌트가 렌더링(재평가)될 떄마다 사이트 이펙트 실행

### useContext()

- 기존의 props 하향식 속성 전달 방식 단점 : 반드시 부모 - 자식 - 손자 순서로 전달해야 한다
- 그렇다면 부모 - 손자 순서로 바로 전달하기 위해서는? useContexnt() 사용

```JSX
// InheritanceContext.js
import {createContext} from 'react'

const InheritanceContext = createContext()
export default InheritanceContext;
```

```JSX
// Parent.js
import InheritanceContext from './InheritanceContext'
import Child from './Child'

const Parent = (props) => {
  const context = {
    Inheritance: props.Inheritance
  }
}
return (
  <InheritanceContext.Provider value={context}>
    <h3>Parent 자산</h3>
    <Child/>
  </InheritanceContext.Provider>
)
export default Parent;
```

```JSX
// Child.js
import GrandChild from './GrandChild'

const Child = () => {
  return (
    <>
      <h3>Child 자산</h3>
      <GrandChild/>
    </>
  )
}
export default Child;
```

```JSX
// GrandChild.js
import InheritanceContext form './InheritanceContext'
import {useContext} from 'react';

// 컨텍스트 객체에 접근하는 첫 번째 방법 - Consumer 컴포넌트 사용
const GrandChild = () {
  return (
    <InheritanceContext.Consumer>
      {context => {
        return (
          <>
            <h3>GrandChild 자산</h3>
            <ul>
              {context.inheritance.map(estate => (
                <li key={estate.id}>{estate.property}</li>
              ))}
            </ul>
          </>
        )}}
    </InheritanceContext.Consumer>
  )
}

// 컨텍스트 객체에 접근하는 두 번째 방법 - useContext() 사용
const GrandChild = () {
  const context = useContext(InheritanceContext)
  return (
    <>
      <h3>GrandChild 자산</h3>
      <ul>
        {context.inheritance.map(estate => (
          <li key={estate.id}>{estate.property}</li>
        ))}
      </ul>
    </>
  )
}
export default GrandChild
```

### useReducer()

- 복잡한 상태 객체 관리

```JSX
// 기본 사용 방법
import {useReducer} from 'react';

const [state, dispatch] = useReducer(reducer, {counter: 0})
```

- 첫 번째 요소 : useReducer()이 관리하는 상태
- 두 번째 요소 : dispatch 함수
  <-> useState()의 두 번째 요소는 세터 함수
  - Type 속성을 포함 ex) dispatch({type: 'INC'})
