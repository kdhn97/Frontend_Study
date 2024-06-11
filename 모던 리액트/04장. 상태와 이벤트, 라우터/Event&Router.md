# 04장. 상태와 이벤트, 라우터

### 클래스 컴포넌트 상태와 이벤트

- props 속성 : 부모 컴포넌트가 자식 컴포넌트에게 데이터를 전달하는 방법
- 그러나 props 속성은 '읽기 전용 속성'이라 변경 불가

  - 속성 값을 변경하면 TypeError: Cannot assign to read only property 'title' of object 출력
  - 읽기 전용 속성인 props.title 속성에 값을 대입할 수 없다는 의미

- 클래스 컴포넌트 방법은 생략

### 함수 컴포넌트 상태와 useState() Hook

- Hook

  - 'use'로 시작하는 이름을 갖는 함수
  - 리액트 컴포넌트 안에서만 사용할 수 있는 특별한 기능을 제공하는 함수

- <mark> useState() </mark>
  - import { useState } from 'react';
  - ex) const [counter, setCouter] = useState(0)
  - 훅 인수에는 초기값을 지정 useState(0)
  - 첫 번째 요소에는 상태값을 반환하는 변수 counter
  - 두 번째 요소에는 상태값을 저장하는 변수 setCounter

```JSX
// 카운터 숫자를 +증가, -감소 시키는 프로그램
import { useState } from 'react';

export default funtion Counter(props) {
  const [counter, setCouter] = useState(0);
  const increase = () => {
    setCounter(counter + 1)
  }
  const decrease = () => {
    setCounter(counter - 1)
  }
  return (
    <div>
      <h1>{props.title}</h1>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <h2>{counter}</h2>
    </div>
  )
}
```

```JSX
// 이름과 이메일을 입력하면, 즉시 출력되는 프로그램 (양방향 바인딩)
import { useState } from 'react';

const MultiState = () => {
  const [user, setUser] = useState({name: '', email: ''});
  const handleChangeName = (e) => {
    setUser(prevUser => ({
      name: e.target.value,
      email: prevUser.email
    }))
  }
  const handleChangeEmail = (e) => {
    setUser(prevUser => ({
      name: prevUser.name,
      email: e.target.value
    }))
  }
  const handleReset = () => {
    setUser({name: '', email: ''})
  }
  return (
    <>
      <div>
        이름 : <input value={user.name} onChange={handleChangeName}/>
        이메일 : <input value={user.email} onChange={handleChangeEmail}/>
      </div>
      <div>
        <button onClick={handleReset}>초기화</button>
      </div>
    </>
  )
}
```

### 입력 폼과 useRef() Hook

- <mark> useRef() </mark>
  - 함수형 컴포넌트에서 DOM 요소나 어떤 값을 저장할 수 있는 "참조"를 만들 때 사용
  - 컴포넌트가 다시 렌더링될 때마다 새로운 객체를 생성하지 않고, 동일한 참조를 계속해서 사용
  - import { useRef } from 'react';

```JSX
import { useState, useRef } from 'react'

const MultiState = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const nameRef = useRef();
  const emailRef = useRef();

  const handleChangeName = () => {
    setName(nameRef.current.value)
  }
  const handleChangeEmail = () => {
    setEmail(emailRef.current.value)
  }
  const handleReset = () => {
    setName('')
    setEmail('')
    nameRef.current.focus() // 입력 필드로 포커스 이동
  }
  return (
    <>
      <div>
        이름 : <input ref={nameRef} value={name} onChange={handleChangeName}/>
        이메일 : <input ref={emailRef} value={email} onChange={handleChangeEmail}/>
      </div>
      <div>
        <button onClick={handleReset}>초기화</button>
      </div>
    </>
  )
}
export default MultiState;
```

- <mark> forwardRef() </mark>
  - 자식 컴포넌트에서 부모 컴포넌트로 상태에 저장할 데이터를 끌어올리는 방법
  - import { forwardRef } from 'react';

```JSX
// EmailRef
import { useState, forwardRef } from 'react'

const EmailRef = forwardRef((props, ref) => {
    const [email, setEmail] = useState();
    const handleChangeEmail = (e) => {
    setEmail(e.current.value)
  }
  return (
    <div>
      <label htmlFor='email'>이메일 : </label>
      <input id='email' ref={ref} type='email' onChange={handleChangeEmail}/>
    </div>
  )
})
export default EmailRef;
```

```JSX
import { useRef } from 'react';
import EmailRef from './EmailRef';

const Form = (props) => {
  const emailRef = useRef({})
  const handleSubmit = (e) => {
    e.preventDefault()
    props.insertUser({
      name: e.target.name.value,
      email: emailRef.current.email
    })
    e.target.reset()
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>이름 : </label>
          <input id='name'/>
        </div>
        <div>
          <EmailRef ref={emailRef}/>
          <button type='submit'>저장</button>
        </div>
      </form>
    </>
  )
}
export default Form;
```

### 목록 및 조건부 컨텐츠 렌더링

- 목록 렌더링

```JSX
// 방법 1. 배열에 렌더링할 JSX 코드를 저장하고 렌더링 사용
const [users, setUsers] = useState([])
const userElems = []
for(const user of users) {
  userElems.push((
    <li key={user.name}>
      <div>이름 : {user.name}</div>
      <div>이메일 : {user.email}</div>
    </li>
  ))
}
return (
  <>
    <ul>{userElems}</ul>
  </>
)
```

```JSX
// 방법 2. 배열의 map() 메서드 사용
const [users, setUsers] = useState([]);
return (
  <>
    <ul>
      {users.map(user => (
        <li key={user.name}>
          <div>이름 : {user.name}</div>
          <div>이메일 : {user.email}</div>
        </li>
      ))}
    </ul>
  </>
);

```

- 조건부 컨텐츠 렌더링
  - 특정한 조건에서만 컨텐츠를 렌더링하는 것
  - ex) 에러 표시, 추가 정보 입력폼 구현, 클릭할 때 나타나는 사이드 메뉴 구현 등

```JSX
// 우편번호 검색 단추를 클릭할 떄 목록이 나타나고 사라지는 프로그램
const [isShowPost, setIsShowPost] = useState(false)

const searchPostNo = (e) => {
  e.preventDefault()
  setIsShowPost(prev => !prev)
  postNoRef.current.focus()
}
return (
  <>
    <div>
      <label htmlFor='post'>우편번호</label>
      <input id='post' ref={postNoRef}/>
      <button onClick={searchPostNo}>검색</button>
    </div>
  </>
)
```

### React Router
167p