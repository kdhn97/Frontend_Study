# 12장. 앱 라우터

### 앱 라우팅

- app 폴더가 루트(Root)가 된다

- app 폴더 안에 page.tsx 파일이 '/' URL 경로 매핑
  -> page.tsx 파일은 상위 폴더의 이름과 동일한 URL 경로 매핑
  -> ex) about 폴더 안에 page.tsx 파일은 '/about' URL 경로 매핑

- 동적 라우트 (Dynamic route)도 지원

  - [id]와 같이 대괄호 안에 파일을 감싸서 동적 세그먼트 (Dynamic Segment) 생성
  - customers 폴더 안에 [id] 서브 폴더를 지정하면 '/customers/:id' URL 경로 매핑

  ```TSX
    const CustomersId = ({params}: {params: {id: number}}) => {
      return (
        <>
          <div>고객 ID: {params.id}</div>
        </>
      )
    }
    export default CustomersId
  ```

### 리액트 서버 컴포넌트 (RSC)

- 서버에서 렌더링되는 사용자 인터페이스를 작성
- 앱 라우터에서 모든 컴포넌트는 디폴트로 리액트 서버 컴포넌트를 사용
- 서버에서 한 번만 실행되어 렌더링된 컨텐츠 생성
- 재평가되어 다시 렌더링 x -> useState(), useEffect() 훅 사용 X

- 세 가지 서버 렌더링 방식 사용

  1. 정적 렌더링 (Static Rendering)

  - 빌드 시 렌더링
  - 데이터를 가져올 때 디폴트로 캐시를 사용하기 떄문에, 빌드 시에 확정되는 변경되지 않는 데이터를 포함하는 라우트에 유용

  2. 동적 렌더링

  - 요청 시 렌더링
  - 요청 시에만 확정되는 데이터를 포함하는 라우트에 유용

  - 정적 렌더링 -> 동적 렌더링 하는 경우

    1. 캐시에 저장하지 않는 경우
    2. 동적 함수에 호출한 경우
    3. const dynamic = 'force-dynamic'이 설정된 경우

  - fetch 옵션
    - 캐시 사용 옵션 설정 -> fetch(url, {cache: 'force-cache' | 'no-cache'})
      - force-cache 옵션이 디폴트로, 넥스트는 데이터 캐시에서 매칭되는 요청을 찾음
        -> 매칭되는 요청이 있으면 캐시에서 데이터를 가져오고, 없으면 원격 서버에서 데이터를 가져와 캐시에 저장
      - no-cache 옵션은 요청 시마다 캐시에서 매칭되는 요청을 찾지 않고, 원격에서 데이터를 가져옴 -> 동적 렌더링 전환

  3. 스트리밍

  - 서버에서 렌더링할 때 여러 개의 작은 조각으로 나누어 점진적으로 렌더링하고 준비가 되면 클라이언트에 스트리밍하는 방식
  - 사용자는 전체 렌더링 작업이 끝나기 전에 페이지의 일부분을 즉시 볼 수 있다

```TSX
// TodoList 컴포넌트를 동적 렌더링 지원
  import Link from 'next/link'

  type Todo = {
    id: number,
    task: string
  }
  export const dynamic = 'force-dynamic'
  const url = 'http://localhost:8000/api/1/todos'
  const TodoList = async () => {
    const response = await fetch(url)
    const todos: Todo[] = await response.json()
    return (
      // 생략...
    )
  }
  export default TodoList
```

### 클라이언트 컴포넌트

- 최상단 지시어 추가 : <mark> 'use client' </mark>
- 처음 요청될 때 서버에서 정적인 페이지 렌더링
  -> 이후 클라이언트, 웹 브라우저에 전송
  -> 다시 클라이언트 컴포넌트가 요청되면 클라이언트에서만 완전히 렌더링
- useState(), useEffect() 훅, 이벤트 핸들러 사용 가능

```TSX
// TodoAdd 컴포넌트를 클라이언트 컴포넌트로 지정하고 폼 제출 이벤트 핸들러 구현
'use client'
import {FormEvent} from 'react'

const url = 'http://localhost:8000/api/v1/todos'
const TodoAdd = () => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const id = event.currentTarget.elements['id'].value
    const task = event.currentTarget.elements['task'].value
    const todo = {id: Number(id), task}
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(todo),
      heanders: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    if(!respnse.ok) {
      console.log('Error')
    }
  }
// 생략...
}
```

### 라우트 핸들러

- 페이지 라우터에서 API 라우트를 구현하고 사용 -> 앱 라우터에서는 라우트 핸들러로 대체
- 파일명 : route.ts
- HTTP 메서드 : GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS 등

```TSX
  export async function GET (request: NextRequest) {
    // 생략
    return NextResponse.json(todos)
  }
```

- Request와 Response에서 쿠키를 편리하게 사용할 수 있도록 API에서 확장된 NextRequst와 NextResponse 사용
- NextRequest 타입의 요청 객체에 전송된 데이터를 json() 메서드를 사용하여 객체로 변환

```TSX
  const todo = await request.json
```

- NextResponse의 json() 메서드를 사용하여 응답 객체로 JSON 전송

```TSX
  return NextResponse.json(todos)
```

- 동적 렌더링 : export const dynamic = 'force-dynamic'

```TSX
// 라우터 핸들러에서 데이터베이스 엑세스
  import { NextRequest, NextResponse } from 'next/server';
  import { getTodo, updateTodo, deleteTodo } from '@/lib/tododb';

  export const dynamic = 'force-dynamic';

  export async function GET(request: NextRequest, {params}: {params: {id: number}}) {
    const id = Number(params.id);
    const todo = await getTodo(id);
    return NextResponse.json(todo);
  }
  export async function PUT(request: NextRequest, {params}: {params: {id: number}}) {
    const id = Number(params.id);
    const todo = await request.json();
    await updateTodo(id, todo);
    return NextResponse.json({state: 200});
  }
  export async function DELETE(request: NextRequest, {params}: {params: {id: number}}) {
    const id = Number(params.id);
    await deleteTodo(id);
    return NextResponse.json({state: 200});
  }
```
