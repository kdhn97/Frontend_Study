## < Routing >

- 네트워크에서 경로를 선택하는 프로세스
    
    → 웹 애플리케이션에서 다른 페이지 간의 전환과 경로를 관리하는 기술
    
- CSR에서의 Routing
    - **CSR ( Client Side Rendering ) - 브라우저에서 직접 페이지를 렌더링 ( 화면을 그리는 방식, 새로고침 X )**
    - CSR에서 routing은 **클라이언트 측**에서 수행
    - 클라이언트 측 JavaScript가 새 데이터를 동적으로 가져와 전체 페이지를  재로드하지 않음

---

## < Vue Router >

- 사전 준비

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/b820739c-3ecd-45f9-9bf9-2ad061b0d13b/Untitled.png)

- Vue 프로젝트 구조 변화
    - App.vue 코드 변화
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/efe7b5b1-aca3-4967-b3aa-36827c1364d4/Untitled.png)
        
    - router 폴더 > index.js 신규 생성
        - 라우팅에 관련된 정보 및 설정이 작성되는 곳
        - router에 URL과 컴포넌트 매핑
    - views 폴더 > HomeView.vue, AboutView.vue 신규 생성
        - RouterView 위치에 렌더링 할 컴포넌트를 배치 <RouterView />
        - **일반 컴포넌트와 구분하기 위해 컴포넌트 이름을 View로 끝나도록 작성을 권장**

### [ Basic Routing ]

1. router 폴더 > index.js에 라우터 관련 설정 작성 (주소, 이름, 컴포넌트)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/89b6eceb-dfce-42c1-aa56-27ff28e450b5/Untitled.png)

1. RouterLink의 ‘to’ 속성으로 index.js에서 정의한 주소 값(path)을 사용

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/5edefbf9-c3d9-4d8d-b873-ae5b3912e92f/Untitled.png)

1. RouterLink 클릭 시 경로와 일치하는 컴포넌트가 RouterView에서 렌더링 됨

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/02b37785-00ea-4f10-8cb3-4e98aee83098/Untitled.png)

### [ Named Routes ]

- name 속성 값에 경로에 대한 이름을 지정
- 경로 연결하려면 RouterLink에 v-bind를 사용해 ‘to’ props 객체로 전달

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/571bc3f4-da61-4dc9-838a-3c376c4cc851/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/1055066e-bd48-4629-9df4-c3beb8226f91/Untitled.png)

- 장점
    - 하드 코딩 된 URL을 사용하지 않아도 됨
    - URL 입력 시 오타 방지

### [ Dynamic Route Matching ]

- URL의 일부를 변수로 사용하여 경로를 동적으로 매칭
- 주어진 패턴 경로를 동일한 컴포넌트에 매핑해야 하는 경우 활용

1. views 폴더 내 UserView.vue 컴포넌트 작성

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/1540a3db-1044-48d0-8f93-33349fde2c21/Untitled.png)

1. UserView 컴포넌트 라우트 등록
    - 매개변수는 콜론 ( : )으로 표시
    - path의 :id가 params가 된다

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/764f391a-c536-4728-99d3-4220a220d299/Untitled.png)

1. UserView 컴포넌트로 이동하기 위한 RouterLink 작성
    - 매개변수는 객체의 params 속성의 객체 타입으로 전달

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/a393c32e-62a1-46c3-9546-b176ca55b763/Untitled.png)

1. 현재 사용자의 id를 출력하기
    - ~~경로가 일치하면 라우트의 매개변수는 컴포넌트에서 **$route.params**로 참조 가능~~

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/7274f6e0-9c69-45b5-8516-0af4cf3e8fb4/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/60354c2d-abc7-441b-868f-eb3b65e950a6/Untitled.png)

- **useRoute() 함수를 사용**해 스크립트 내에서 반응형 변수에 할당 후 템플릿에 출력하는 것을 권장

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/1e0d48fa-4e63-4c59-9a25-94c4e42ba4e9/Untitled.png)

### [ Nested Routes ]

- 중첩된 라우팅
- 애플리케이션의 UI는 여러 레벨 깊이로 중첩된 컴포넌트로 구성되기도 함

1. 컴포넌트 생성 → components 폴더 작성 ⇒ 직접적으로 Route 주소와 등록되지 않기 때문에

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/ce5c1a9a-b8f7-4485-97d2-eda1822c90b8/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/daa0021f-07c6-4039-b41e-cf460d6700c5/Untitled.png)

1. 라우터 등록 → index.js에 두 컴포넌트를 import

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/510b5ccb-99fc-4dfe-a6da-659c4bfb1f41/Untitled.png)

1. children 옵션을 사용해 중첩된 라우터에 컴포넌트를 등록 → children 옵션 : 배열 형태로 필요한 만큼 중첩 관계를 표현

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/81ee937c-c57e-48a7-8a57-e5dde5938555/Untitled.png)

1. 두 컴포넌트에 대한 RouterLink 및 RouterView 작성

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/3165b173-7434-4b74-8ac4-656d191cc701/Untitled.png)

1. 중첩된 Named Routes를 다룰 때는 일반적으로 하위경로에만 이름을 지정

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/a3a00bde-a150-48bc-bfe2-28a8b99005f8/Untitled.png)

1. UserHome 컴포넌트 생성

1. /user/:id 접속 시 중첩된 경로가 표시

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/1850f8b1-9f0e-4763-9ca3-566b1f138f13/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/ec64926a-963d-4579-89fe-c8d461068c62/Untitled.png)

- 주의 : 컴포넌트 간 부모-자식 관계가 아닌 URL의 중첩된 관계를 표현하는 관점으로 바라보기

### [ Programmatic Navigation ]

- RouterLink 대신 JavaScript를 사용해 페이지를 이동하는 것
- 프로그래밍으로 URL 이동하기
- RouterLink로 <a> 태그를 만드는 것처럼 프로그래밍으로 네비게이션 관련 작업을 수행

### - router.push() - 다른 위치로 이동하기

- 새 항목을 history stack에 push하므로 사용자가 브라우저 뒤로 가기 버튼을 클릭하면 이전 URL로 이동할 수 있음

- UserView 컴포넌트에서 HomeView 컴포넌트로 이동하는 버튼 만들기
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/cbbc8d12-6f50-402f-a37d-6ebefe2ef8f1/Untitled.png)
    

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/ef850056-f435-428d-bd25-ad02603134eb/Untitled.png)

### - router.replace() - 현재 위치 바꾸기

- push 메서드와 달리 history stack에 새로운 항목을 push 하지 않고 다른 URL로 이동 ( 이동 전 URL로 뒤로 가기 불가 ) ⇒ ex. 로그인 후 뒤로가기 누르면 로그인이 풀리는 현상에서 사용

- UserView 컴포넌트에서 HomeView 컴포넌트로 이동하는 버튼 만들기

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/f4749867-9119-41a9-b49e-3627b38f59bb/Untitled.png)

---

## < Navigation Guard >

- Vue router를 통해 특정 URL에 접근할 때 다른 URL로 redirect를 하거나 취소하여 내비게이션 보호 → 라우트 전환 전/후 자동으로 실행되는 Hook
- Navigation Guard
    - Globally (전역 가드)
    - Per-route (라우터 가드)
    - In-component (컴포넌트 가드)

### [ Globally Guard ]

- 애플리케이션 **전역**에서 동작하는 가드 / 작성위치 : **index.js**

### **- router.beforeEach() - 다른 URL로 이동하기 직전에 실행되는 함수**

- to : 이동할 URL 정보가 담긴 Route 객체
- from : 현재 URL 정보가 담긴 Route 객체
- false : 현재 내비게이션 취소, URL이 변경된 경우 ‘from’ 경로의 URL로 재설정
- Route Location : return이 없다면 자동으로 ‘to’ URL Route 객체로 이동

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/2ccbdc93-a755-4772-acc5-c78fcba6b52c/Untitled.png)

- 활용 예시
    - 만약 로그인이 되어있지 않고, 이동하는 주소명이 login이 아니라면 login 페이지로 redirect

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/51b5aef4-c763-410e-a663-af367adbfa7a/Untitled.png)

### [ Per-route Guard ]

- **특정 라우터**에서만 동작하는 가드 / 작성위치 : **index.js의 각 routes**

### - router.beforeenter() - 특정 route에 진입했을 때만 실행되는 함수

→ URL의 매개변수나 쿼리 값이 변경될 때는 실행되지 않고 다른 URL에서 탐색해 올 때만 실행됨

- 활용 예시
    - 로그인 한 상태라면 HomeView로 이동시키기
    - 로그인 상태가 아니라면 LoginView로 이동
    

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/56cb5bab-1df6-4d8f-954b-8dd07443a3f5/Untitled.png)

### [ In-component Guard ]

- **특정 컴포넌트** 내에서만 동작하는 가드 / 작성위치 : **각 컴포넌트의 script**

- **onBeforeRouteLeave()**
    - 현재 라우트에서 다른 라우트로 이동하기 전에 실행
    - 사용자가 UserView를 떠날 시 팝업 창 출력하기

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/4624e0ff-03a2-46b9-b7e3-c10c1d9fd588/Untitled.png)

- **onBeforeRouteUpdate()**
    - 렌더링 된 컴포넌트가 라우트 내에서 업데이트 되기 전 실행
    - UserView 페이지에서 다른 id를 가진 User의 UserView 페이지로 이동하기

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/8ef26dd2-a9c0-4851-9c78-f0caf4f2d4f6/Untitled.png)

---

- 참고
    
    ### [ Lazy Loading Routes ]
    
    - Vue 애플리케이션 첫 빌드 시 해당 컴포넌트를 로드 하지 않고, 해당 경로를 처음으로 방문할 때 컴포넌트를 로드하는 것
        
        → 앱을 빌드할 때 처음부터 모든 컴포넌트를 준비하면 컴포넌트의 크기에 따라 페이지 로드 시간이 길어질 수 있기 때문
        
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/670d55cb-2f99-46a3-aab5-392a6f94dfd7/Untitled.png)