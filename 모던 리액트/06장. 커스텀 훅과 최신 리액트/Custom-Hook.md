# 커스텀 훅과 최신 리액트

### Custom Hook

- 조건
  1. 'use'로 시작
  2. JSX 코드를 반환하지 않는다

```JSX
// 카운터 프로그램에 사용되는 useCounter 커스텀 훅 만들기
// 파일명 : useCounter.js
import {useState} from 'react'

const useCounter = (init, inc, dec) => {
  const [counter, setCounter] = useState(init)
  const increase = () => {
    setCounter(prev => prev + inc)
  }
  const decrease = () => {
    setCounter(prev => prev - inc)
  }
  return {counter, increase, decrease}
}
export default useCounter;
```

```JSX
// 커스텀 훅을 사용하여 카운터 프로그램 만들기
import useCounter from './hooks/useCounter'

const CounterHook = () => {
  const [counter, increase, decrease] = useCounter(0, 1, 1)
  return (
    <>
      <h3>커스텀 카운터 훅</h3>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <h4>{counter}</h4>
    </>
  )
}
export default CounterHook;
```

### React Portal

- 포털(Portal) : 일반적으로 삽입되는 위치가 아닌 다른 위치에 DOM 요소를 삽입하도록 하는 기능
- <mark> ReactDOM.createPortal() </mark>
- 첫번쨰 인수 : ReactNode - 배치하고 싶은 컴포넌트
- 두번째 인수 : ReactNode를 배치하고자 하는 HTML 요소

```JSX
import ReactDOM from 'react-dom';

const Modal = (props) => {
  return ReactDOM.createPortal(
    <dialog open>
      <p>{props.children}</p>
      <button onClick={props.onClose}>확인</button>
    </dialog>
    ,document.getElementById('modal'))
}
```

### 새로운 React 기능

- React 18 버전 새로운 기능

  1. 자동 배치 처리(automatic batching)

  - 동시성 모드 : 여러 작업을 동시에 처리하여 UI가 빠르게 반응
  - 렌더링 과정을 여러 개의 작은 작업 단위로 분할하여 병렬로 독립적으로 실행
  - 우선 순위가 높은 작업을 우선적으로 처리
  - 서스펜스(Suspense) : 하위 컴포넌트 중 하나라도 지연된다면(렌더링X), 제공된 컴포넌트로 떨어짐(fall back)

  2. <mark> useId() </mark> : 고유한 ID 값 생성

  ```JSX
  // 파일명 : Id.js
  import {useId} from 'react'

  const IdComponent = () => {
    const id = useId('user')
    return (
      <>
        <div id={id}>안녕 {id}</div>
      </>
    )
  }
  export default IdComponent;
  ```

  3. <mark> useTransition() </mark> : 전환
    - 전환 : 긴급한 갱신과 긴급하지 않은 갱신 사이를 구별하는 새로운 개념
    - 긴급한 갱신 : 키보드 입력이나 마우스 클릭과 같은 직접적인 상호작용을 반영하는 것
    - 전환 갱신 : 긴급하지 않은 갱신으로 다른 긴급한 갱신이 필요한 뷰로 UI 이전시키는 것

  4. <mark> useDeferredValue() </mark> : 연기
    - 긴급하지 않은 부분을 다시 렌더링하는 작업을 연기하는 것