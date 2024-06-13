# 08장. 리액트 리덕스

### Redux

- Flux

  - MVC(Model-View-Controller) 패턴의 대안으로 개발된 아키텍처 패턴
  - 단반향성으로 데이터 흐름을 바꾸어, 모든 상태의 변경이 단 하나의 경로를 따르도록 하는 패턴
  - 패턴 : Action -> Dispatcher -> Store -> View 반복
    - Action : 애플리케이션에서 발생하는 이벤트를 기술하는 객체
    - Dispatcher : 모든 액션을 받아들여서 등록되어 있는 각 Store에 보내는 기능
    - Store : 애플리케이션 안에서 하나의 도메인의 상태를 관리
    - View : Store 상태가 변경되면, 모든 View에게 새로운 상태를 사용하여 갱신하게 함

- <mark> Redux </mark>

  - Flux 아키텍처 패턴을 구현한 라이브러리
  - JavaScript 애플리케이션을 위한 예측가능한 상태 컨테이너
  - 데이터의 일관성과 예측가능성을 가져다 주는 것

  - Redux와 Flux 차이점

    - Flux는 여러 개의 Store를 가지지만, Redux는 하나의 Store만 갖는다
    - Flux는 여러 개의 Dispatcher를 가지지만, Redux에서 Dispatcher는 Store의 일부분이다
    - Flux는 Reducer가 선택적으로 사용되지만, Redux에서 Reducer는 필수 요소이다

  - Redux 윈칙
    1. 상태는 단일 진실 공급원에 의해 표현된다 -> 하나의 객체로 저장
    2. 상태는 읽기 전용이다 -> 불변 객체
    3. 상태는 순수한 함수에 의해서만 변경된다 -> 같은 입력이면 같은 결과를 산출하는 함수

- Reducer : 액션에 반응하여 상태를 변경시키는 함수

  - 첫번째 매개변수 state : 현재 상태가 인수로 전달
  - 두번째 매개변수 action : 액션 객체

  ```TSX
  // 파일명 : reducer.ts
    const reducer = (state, action) => {
      switch(action.type) {
        case 'INC':
          return {
            ...state,
            counter: state.counter + action.payload
          }
        case 'DEC':
          return {
            ...state,
            counter: state.counter - action.payload
          }
          default: return state;
      }
    }
    export default reducer;
  ```

- Store

  - 액션에 반응하여 변경된 상태를 저장하고 관리한다
  - 주요 기능
    - 애플리케이션 상태 저장
    - 상태에 접근할 수 있는 방법 제공
    - 상태를 변경할 수 있는 방법 제공 -> 액션을 디스패치하는 방법 제공
    - 다른 객체가 상태의 변경 이벤트를 구독할 수 있게 하며 이벤트 출판

### React Redux

- React와 Redux는 완전히 분리된 라이브러리이기 떄문에, 이를 연결시켜주는 React Redux 사용
- Redux를 위한 React UI 바인딩 레이어 제공
  -> React 컴포넌트가 Redux Store에서 Data를 읽고 Dispetch하여 Store에 데이터 갱신
- 라이브러리 설치 : npm install react-redux

- <mark> configureStore() </mark>

  - Redux Store를 생성하는 표준적인 방법
  - Slice Reducer를 Root Reducer에 결합
  - MiddleWare 추가 적용
  - Redux DevTools 확장 연결 설정
    -> 웹 브라우저에서 실행되고 있는 Redux Store의 상태와 액션 등을 검사하는 개발 도구 제공

  ```TSX
  // 파일명 : store.ts
    import {configureStore} from '@reduxjs/toolkit'
    import reducer from './reducer'

    const store = configureStore ({
      reducer
    })
    export default store;
  ```

  ```TSX
  // 파일명 : index.tsx
  import {Provider} from 'react-redux'
  import store from './store/store'
  import Counter from './counter'

  export default function Home() {
    return (
      // <Provider> 컴포넌트 : React 애플리케이션 전체에 Redux Store 사용 가능
      <Provider store={store}><Counter/></Provider>
    )
  }
  ```

- <mark> useSelector() </mark>

  - Store를 구독하여 Store의 상태 변경 이벤트를 받고 상태로부터 값을 읽어오는 기능 제공

- <mark> useDispatch() </mark>

  - Action을 Dispatch할 수 있도록 Store의 Dispatch() 메서드를 반환

### Action 생성

- <mark> createAction() </mark>

  - const 액션생성자함수 = createAciont <Payload 타입> (Action 타입);
  - 타입 매개변수에는 Action의 Payload에 저장할 값의 타입을 지정
  - 매개변수에는 Action 타입 지정

  ```TSX
    import {createAction} from '@reduxjs/toolkit'

    const increase = createAction<undefined>("INC")
    const decrease = createAction<undefined>("DEC")
    const IncByAmount = createAction<number>("INCBYAMOUNT")
    const actions = {
      increase, decrease, IncByAmount
    }
    export default actions;
  ```

### 비동기 MiddleWare

- Action이 Dispatch 되었을 때, Action이나 상태를 로깅하는 것과 같은 부가적인 로직 실행
- Dispatch된 Action을 잠깐 멈추거나 수정, 지연, 대체, 중단 시킴
- Dispatcher와 상태에 접근하는 부가적인 코드 작성
- 일반적인 Action 객체 외에 다른 값을 가로채기하여 실제 Action 객체에 Dispatch하는 방법 제공

- <mark> redux-thunk 라이브러리 </mark>

  - 비동기 로직을 직접 포함하는 일반적인 함수 작성

- <mark> configureStore() </mark>

  - default로 thunk 미들웨어를 설정하고 Redux로 비동기 로직을 작성할 때 표준적인 방법 사용

- Thunk 함수는 항상 (dispatch, getState) 매개변수를 갖는다

  ```TSX
    const asyncFunc = (dispatch, getState) => {}
  ```

- ThunkAction 타입 정의

  ```TSX
    export type ThunkAction<
      R, // Thunk 함수의 반환 타입
      S, // getState가 사용하는 상태 타입
      E, // Thunk에 추가되는 부가적인 인수 타입
      A extends Aciont // Dispatch될 수 있는 Action 타입
      > = (dispatch: ThunkDispatch<S,E,A>, getState: () => S, extraArgument: E) => R
  ```

### Redux 슬라이스
- 애플리케이션에서 하나의 기능에 대한 리듀서 로직과 액션의 집합
- 하나의 슬라이스는 하나의 파일에 정의

### RTX 질의
- 강력한 데이터 가져오기 및 캐싱 도구로 리액트 툴킷 패키지 안에 포함되어 있는 부가적인 애드온 도구
- API 슬라이스를 생성해야 사용 가능

### React 질의와 SWR
- SWR
- React Query