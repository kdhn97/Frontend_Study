### [ Component ]

- 재사용 가능한 코드 블록
- UI를 독립적이고 재사용 가능한 일부분으로 분할하고 각 부분을 개별적으로 다룰 수 있음
    
    → 자연스럽게 어플은 중첩된 Component의 트리 형태로 구성됨
    

### [ Single-File Components ( SFC ) ]

- 컴포넌트의 템플릿, 로직 및 스타일을 하나의 파일로 묶어낸 특수한 파일 형식 ( ***.vue** 파일 )
- Vue SFC는 HTML, CSS 및 JavaScript를 단일 파일로 합친 것

---

## < SFC 문법 >

- *.vue 파일 생성 → **v-base3-setup** 선택 → lang="scss" 삭제
- [ template → script → style ] 순서로 작성
- Vue SFC은 컴파일러를 통해 빌드해야 함
    
    → **Vite**와 같은 공식 빌드 도구를 사용
    

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/fa1a9842-9aaa-4d1f-83ba-434a95540704/Untitled.png)

---

## < SFC build Tool >

### [ Vite ]

- 프론트엔드 개발 도구 → 빠른 개발 환경을 위한 빌드 도구와 개발 서버 제공
- **Build**
    - 프로젝트의 소스 코드를 최적화하고 번들링하여 배포할 수 있는 형식으로 변환하는 과정
    - 개발 중에 사용되는 여러 소스 파일 및 리소스를 최적화된 형태로 조합하여 생성하는 것
        
        → Vite는 이러한 빌드 프로세스를 수행하는데 사용하는 도구
        

### [ Vite 튜토리얼 ]

```html
<!-- node 버전 확인 -->
$ node -v
<!-- Vue 프로젝트 생성 -->
$ npm create vue@latest
<!-- 프로젝트 폴더 이동 -->
$ cd vue-project
<!-- 패키지 설치 -->
$ npm install
<!-- Vue프로젝트 서버실행 -->
$ npm run dev
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/8349a275-aed2-4f97-b9fd-07bec66816ba/Untitled.png)

### [ NPM ]

- Node Package Manager ( NPM ) - Node.js의 기본 패키지 관리자
- **Node.js** : Chrome의 V8 JavaScript 엔진을 기반으로 하는 Server-Side 실행 환경
    - JavaScript를 브라우저가 아닌 서버 측에서도 실행할 수 있게 함
    - NPM을 활용해 수많은 오픈 소스 패키지와 라이브러리를 제공하여 개발자들이 손쉽게 코드를 공유하고 재사용할 수 있게 함

### [ 모듈과 번들러 ]

- **Module** : 프로그램을 구성하는 독립적인 코드 블록 ( *.js 파일 )
    - 파일을 여러 개로 분리하여 관리하게 되었고, 이때 분리된 각 파일 → Module
    - 이후 복잡하고 깊은 모듈 간 의존성 문제를 해결하기 위한 도구 → Bundler
- **Bundler** : 여러 모듈과 파일을 묶어 최적화하여 어플에서 사용할 수 있도록 만드는 도구
    - 의존성 관리, 코드 최적화, 리소스 관리

---

## < Vue 프로젝트 >

- **node_modules** : Node.js 프로젝트에서 사용되는 외부 패키지들이 저장되는 디렉토리 (.gitignore)
- **package-lock.json** : 패키지 설치에 필요한 모든 정보를 포함 (Django의 requirement.txt와 같음)
    - npm install 명령을 통해 패키지를 설치, 명시된 버전과 의존성을 기반으로 설치
    - package-json : 프로젝트의 메타 정보와 의존성 패키지 목록 포함
- **public** : 정적 파일을 위치 (소스코드에서 참조X, 항상 같은 이름을 갖는, import 할 필요X)
    - root 절대 경로를 사용하여 참조 - [ public / icon.png ]
- **src** : 프로젝트의 소스 코드 관리 (컴포넌드, 스타일, 라우팅)
    - src / assets : ‘이미지, 폰트, 스타일 시트’ 관리
    - src / commponents : Vue 컴포넌트를 작성하는 곳
    - src / App.vue : 어플 전체의 레이아웃과 공통 요소 정의
    - src / main.js : Vue 인스턴스를 생성, 어플 초기화 역할
- jsconfig.json : 컴파일 옵션, 모듈 시스템 설정
- vite.confing.js : Vite 프로젝트 설정 파일 (플러그인, 빌드 옵션, 개발 서버 설정 등)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/b45c6d54-a71f-4382-b150-4115f368fd86/Untitled.png)

---

### [ Vue Component ]

- 사전 준비
    - 초기에 생성된 모든 컴포넌트 ( src/components )삭제 ( App.vue 제외 )
    - App.vue 코드 초기화

- 컴포넌트 파일 생성 및 등록 - **@**는 **src/** 경로를 뜻하는 약어

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/3e046dd6-8e00-464d-82d0-20d563d06095/Untitled.png)

---

### [ Virtual DOM ]

- 가상의 DOM을 메모리에 저장하고 실제 DOM과 동기화하는 프로그래밍 개념
- 실제 DOM과의 변경 사항 비교를 통해 변경된 부분만 실제 DOM에 적용하는 방식
- 웹 애플리케이션의 성능을 향상시키기 위한 Vue의 내부 렌더링 기술
- 장점 : 효율성, 반응성, 추상화
- 주의사항 : 실제 DOM에 직접 접근하지 말 것 → **ref()**와 **Lifecycle Hooks 함수**를 사용

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/99b56635-cbd1-4a61-a041-09387bba9fb4/Untitled.png)

---

## < Vue 작성 스타일 >

- **Composition API** : import해서 가져온 API함수들을 사용하여 컴포넌트의 로직 정의
- ~~Option API : 객체를 사용하여 컴포넌트의 로직 정의~~

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/256a20ef-978f-4bb3-a024-a5400b5257e6/Untitled.png)

---

- 참고
    - 모든 컴포넌트에는 최상단 HTML 요소가 작성되는 것이 권장 (Single Root Element)
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/b4fc6e5b-fc31-4ab5-9c72-e2a32ecf182a/Untitled.png)
    
    - SFC의 CSS 기능 - **<style scoped></style>**
        - scoped 속성을 사용하면 해당 CSS는 현재 컴포넌트의 요소에만 적용됨
        - 그러나 자식 컴포넌트의 최상위 요소는 모두에게서 영향을 받음
            
            → 이는 부모가 레이아웃 목적으로 자식 컴포넌트 최상위 요소의 스타일을 지정할 수 있도록 의도적으로 설계된 것
            
        - **MyComponent(자식)의 최상위 요소(div)는 부모와 본인의 CSS 모두의 영향을 받기 때문**에 부모 컴포넌트에 지정한 스타일이 적용됨
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/2418e404-5f8f-4efd-ba0f-f1dfdbaa1c24/Untitled.png)
        
    - Scaffolding
        - 새로운 프로젝트나 모듈을 시작하기 위해 초기 구조와 기본 코드를 자동으로 생성
        - 개발자들이 프로젝트를 시작하는데 도움을 주는 틀이나 기반을 제공하는 작업