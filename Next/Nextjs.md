# [ Next.js ]

### 수동 설치

1. $ mkdir learn-nextjs14 -> 폴더 생성
2. $ cd learn-nextjs14/ -> 폴더 이동
3. $ npm init -y

- Node.js 프로젝트를 시작할 때 사용되는 초기화 명령어
- npm 패키지의 package.json 파일을 생성
- -y 옵션은 "yes"의 축약형으로, 사용자 입력을 요구하지 않고 모든 기본값을 자동으로 선택

4. $ npm install react@latest next@latest react-dom@latest

- react-dom : 브라우저의 Document Object Model (DOM) 에 렌더하는 역할

5. package.json에서 "scripts" : { "dev": "next dev" }로 변경 -> dev 명령어 실행 시 Next.js로 실행
6. app폴더 + page.tsx 파일 생성
7. page.tsx에 export default function 함수명() { return 명령문 } 작성 후 실행하면, 자동 TypeScript 설치 (에러 사라짐)
8. <mark> layout.tsx </mark>

- Rendering 실행 시, <Layout><Layout/>을 최초로 실행
- Navigation + Footer를 모든 컴포넌트에 복사 붙어넣기 할 필요가 없다

### Routes -> <mark> page.tsx </mark>

1. 기본

- react-router는 URL과 <Home/>을 작성해줘야 하지만
- Next는 폴더를 생성하고 page.tsx를 만들면 자동으로 하나의 페이지로 인식해서 Routes 해준다
- about-us 폴더를 생성 후, http://localhost:3000/about-us을 입력하면 해당 페이지로 이동
- 이때 about-us 폴더 안에 page.tsx를 생성하면 자동으로 기본 페이지로 등록

2. 응용

- about-us/company/sales 폴더 안에 page.tsx를 생성하면
- http://localhost:3000/about-us/company/sales을 입력 했을 때 해당 페이지로 이동하지만
- company 안에는 page.tsx가 없기에 http://localhost:3000/about-us/company는 에러 발생

3. 심화

- app/company/avatar.tsx를 생성하면 page.tsx가 아니기에 URL 페이지로 인식하지 않지만
- 하나의 컴포넌트이기에 다른 page에 import 해주고 <Avatar/>하면 해당 내용을 가져올 수 있다

### Error URL -> <mark> not-found.tsx </mark>

- app/not-found.tsx 파일 생성 하면 잘못된 주소창으로 이동 시 해당 파일의 내용을 보여준다

### Navication

- import Link from "next/link";를 통하여 <Link href="/">Home</Link>한다
- 다른 페이지에 import Navigation from "../components/navigation";를 통하여 함수명 </Navication>를 불러온다

### Hooks 사용

- Hooks는 React 16.8 버전에서 도입된 기능으로, 함수형 컴포넌트에서 상태와 라이프사이클 관련 기능을 사용할 수 있게 해줍니다
- 기존에는 클래스형 컴포넌트에서만 사용할 수 있었던 기능들을 함수형 컴포넌트에서도 사용할 수 있도록 도와줍니다

- 예시) usePathname -> 현재 경로(pathname)를 가져오는 데 사용
- 클라이언트 전용 훅인 usePathname를 사용하려면 "use client" 필수 기입

```
"use client"
import { usePathname } from "next/navigation";
const path = usePathname()
<Link href="/">Home</Link> {path === "/" ? "❤" : ""}
```

해당 페이지를 선택 했을 경우, 현재 페이지인 Home 글자 옆에 ❤가 출력된다

- use client를 쓰지 않는 이상 기본적으로 모든 컴포넌트는 서버 컴포넌트

### Route Groups -> (폴더명)

- route들을 그룹화하여 logical groups으로 만드는 기능
- 폴더 이름은 (괄호)로 묶어야 한다
- 괄호로 묶은 폴더는 URL의 영향을 미치지 않는다
  -> (home) 폴더 안에 page.tsx를 넣었다고 /home이 생기는 것이 아니다

### layout.tsx -> Metadata

- Metadata = { title: "Next.js" } -> <title>Next.js</title>
- 해당 페이지의 이름이 된다

### Dynamic Routes -> [폴더명]

- /movies/:id 를 생성하여 여러 페이지를 만들려면?
- movies 파일 아래 [id] 하위폴더를 생성하면 된다
- http://localhost:3000/movies/121212?region=kr&page=2 의 경우
  -> { params: { id: '121212' }, searchParams: { region: 'kr', page: '2' } }

### Fetch 하는 첫번째 방법 - client component

- fetch는 서버 및 클라이언트 사이에서 데이터를 가져오는 데 사용되는 JavaScript API
- API Key 필요함 -> 보안 위험
- use client에서만 사용 가능
- Loading 시에 다른 component 화면 보여짐
- useEffect, useState 사용해야함

```
"use client"
import { useEffect, useState } from "react";

export default function Page() {
  const [movies, setMovies] = useState()
  const getMovies = async() => {
    const response = await fetch("https://nomad-movies.nomadcoders.workers.dev/movies")
    const json = await response.json()
    setMovies(json)
  }
  useEffect(() => { getMovies() }, [])
  return <div> {JSON.stringify(movies)} </div>
}
```

### Fetch 하는 두번째 방법 - server component (권장)

- Backend에서 Json을 연결해줘서 API Key가 노출되지 않음 -> 안정성
- Loading 중에는 Rendering 안됨 -> 화면 UI 안 보임 -> loading.tsx로 해결

```
import { json } from "stream/consumers";

const URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
  const response = await fetch(URL);
  const json = await response.json();
  return json;
}

export default async function HomePage() {
  const movies = await getMovies();
  return <div> {JSON.stringify(movies)} </div>;
}
```

### loading.tsx
- 해당 페이지에 Loaging 화면 시, 보여지는 페이지
- fetch 시에도 UI가 보여지게 됨

### error.tsx
- 해당 페이지에 Error 발생 시, 보여지는 페이지

---

### CSS style
- 모든 페이지에 공통된 css style 주는 법
  1. 최상단에 styles 폴더 생성
  2. global.css 파일 생성
  3. app/layout.tsx 파일에 css파일을 import 해주기

- 세부 페이지에 css style 주는 법
  1. styles 폴더에 [파일명.module.css] 작성
  2. 스타일을 적용할 파일에 import 해준다
  예시) navigation.tsx