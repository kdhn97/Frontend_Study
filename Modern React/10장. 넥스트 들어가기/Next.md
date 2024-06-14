# 10장. 넥스트 들어가기

### 페이지 라우터와 앱 라우터

- Next.js : 풀 스택 웹 애플리케이션을 구축하는데 사용되는 리액트 프레임워크
- Next 기본 언어 : 타입스크립트

- 라우팅(Routing)

  - 페이지 라우터 : 서버 측 렌더링 리액트 애플리케이션을 구현하는데 필요한 기능 제공

    - 페이지 디렉터리 안에 리액트 컴포넌트 파일을 구성하는 파일 구조
    - 페이지 디렉터리가 URL 루트가 되는 파일 시스템 기반의 라우팅 제공
    - 클라이언트 측 렌더링을 중심으로 서버 측 렌더링을 부가적으로 제공하는 라우터

  - 앱 라우터 : 서버 컴포넌트와 스트리밍과 같은 리액트의 최신 기능을 사용할 수 있는 라우터

    - 앱 디렉터리 파일 구조
    - 엡 디렉터리가 루트가 되는 라우팅 제공
    - 서버 측 렌더링을 중심으로 하는 라우터

### 라우팅

```TSX
  <Link href='/'>홈으로</Link>
  // 페이지 라우터 : 최상위 pages 폴더의 index.tsx 실행
  // 앱 라우터 : 최상위 app 폴더의 page.tsx 실행

  <Link href='/todos/add'>할 일 추가</Link>
  // 페이지 라우터 : pages 폴더 / todos 서브 폴더 / add.tsx
  // 앱 라우터 : app 폴더 / todos 서브 폴더 / add 서브폴더 / page.tsx

  <Link href={`/todos/${todo.id}/update`}>변경</Link>
  // 페이지 라우터 : pages 폴더 / todos 서브 폴더 / [id] 서브 폴더 / update.tsx
  // 앱 라우터 : app 폴더 / todos 서브 폴더 / [id] 서브 폴더 / update 서브 폴더 / page.tsx
  //  -> [id] 폴더명의 대괄호 안에 있는 URL 매개변수의 값을 읽음
```

### 렌더링

- 페이지 라우터

  - 하이드레이션 : 미리 렌더링하여 HTML을 생성하고 서버에 캐싱한 다음, 자바스크립트와 함께 클라이언트에 전송되어 연결

  - 미리 렌더링하는 방식
    1. 정적 사이트 생성(SSG, Static-Site Generation) : 빌드 시에 한번만 생성되어 요청할 때마다 재사용
    2. 서버 측 렌더링(SSR, Server-Side Rendering) : 요청할 때마다 HTML 재생성
  - 미리 렌더링하는 이유
    1. 성능 문제 : 리액트의 클라이언트 측 렌더링(CSR, Client-Side Rendering)은 렌더링 완료될 때까지 화면에 표시 X
    2. 검색 엔진 최적화 : CSR은 빈 HTML을 웹 브라우저에 전송하기 떄문에 검색 엔진에 노출되지 않는다

- 앱 라우터

  - 리액트 서버 컴포넌트 : 서버에서 한 번 완전히 렌더링되어 HTML을 생성하고 렌더링된 HTML을 클라이언트로 전송

### 데이터 가져오기

- 페이지 라우터

  - getServerSideProps() : 서버 측 렌더링 모드에서 리액트 컴포넌트가 실행될 때마다 서버 측 렌더링에 필요한 데이터를 가져올 때 사용
  - getStaticProps() : 정적 사이트 생성 모드에서 빌드 시에 정적 페이지를 생성할 때 필요한 데이터를 가져오기 위해 사용

    ```TSX
      import type {InferGetServerSidePropsType, GetServerSideProps} from 'next'
      import Link from 'next/link'

      type Todo = {
        id: number,
        task: string
      }
      export const getServerSideProps: GetServerSideProps = async(context: any) => {
        const response = await fetch('http://localhost:3000/api/todos')
        const todos: Todo[] = await response.json()
        return {
          props: {
            todos
          }}}
      const TodoList = ({todos}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
        return (
          <>
            <h3>할 일 목록</h3>
            <ul>
              {todos.map((todo: Todo) => (
                <li key={todo.id}>{todo.task} : &nbsp;
                  <Link href={`/todos/${todo.id}/update`}>변경</Link>
                  <Link href={`/todos/${todo.id}/delete`}>삭제</Link>
                </li>
              ))}
            </ul>
          </>
        )
      }
      export default TodoList;
    ```

- 앱 라우터

  - REST API를 호출하거나 데이터베이스와 같은 서버의 리소스에 접근하여 데이터를 가져옴

    ```TSX
      import Link from 'next/link'
      import {Suspense} from 'react'
      import Loading from './loading'

      type Todo = {
        id: number,
        task: string
      }
      export const dynamic = 'force-dynamic'
      const TodoList = async () => {
        const response = await fetch('http://localhost:3000/api/todos', {cache: 'no-store'})
        const todos: Todo[] = await response.json()
        return (
          <Suspense fallback = {<Loading/>}>
            <h3>할 일 목록</h3>
            <ul>
              {todos.map((todo: Todo) => (
                <li key={todo.id}>{todo.task} : &nbsp;
                  <Link href={`/todos/${todo.id}/update`}>변경</Link>
                  <Link href={`/todos/${todo.id}/delete`}>삭제</Link>
                </li>
              ))}
            </ul>
          </Suspense>
        )
      }
      export default TodoList;
    ```

### API 라우트와 라우트 핸들러

- 페이지 라우터

  - 최상위 pages/api 폴더 안에 있는 어떤 파일이든 /api/\*URL에 매핑되어 REST API 엔드포인트로 사용된다

  <!-- 494 페이지 -->

- 앱 라우터

  - API 라우트가 라우트 핸들러로 대체됨
  - route.tsx 파일명을 가지며 최상위 app 폴더 어느 위치에 있어도 상관없음 -> app/api 폴더 안에 권장

  ```TSX
  // 프리즈마 ORM 프레임워크를 사용하여 데이터베이스에 직접 접근하는 라우트 핸들러
    import {NextRequest, NextResponse} from 'next/server'
    impoort {PrismaClient} from '@prisma/client'

    export async function GET(request: NextRequest) {
      const prisma = new PrismaClient()
      const todos = await prisma.todo.findMany()
      return NextResponse.json(todos)
    }
    export async function POST(request: NextRequest) {
      const todos = await request.json()
      const prisma = new PrismaClient()
      const insert = await prisma.todo.create({
        data: {
          id: todo.id,
          task: todo.task
        }
      })
      return NextResponse.json({state: 200})
    }
  ```

### Next 프로젝트 생성

- 프로젝트 생성 : npx create-next-app@latest
- 넥스트는 1차 언어로 타입스크립트 사용
- 러스트(Rust) 언어 기반의 SWC(Speed Web Compiler)를 타입스크립트 컴파일러로 채택
- 번들링 도구 : 웹 팩(WebPack) 대신 터보팩(TurboPack) 채택
