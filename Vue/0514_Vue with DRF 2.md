### [ 인증과 권한 ]

## < Authentication with DRF >

- Authentication (인증) - 수신된 요청을 해당 요청의 사용자 또는 자격 증명과 연결하는 메커니즘
- Permissions (권한) - 요청에 대한 접근 허용 또는 거부 여부를 결정
- DRF에서의 인증 - **단순히 요청에 사용된 자격 증명만 식별**
- 승인되지 않은 응답 및 금지된 응답
    - **HTTP 401 Unauthorized** - 유효한 인증 자격 증명이 없는 경우
    - **HTTP 403 Forbidden** - 권한이 없어 거절되는 경우

### [ 인증 체계 설정 ]

1. 전역 설정 - **DEFAULT_AUTHENTIZATION_CLASSES**

1. View 함수 별 설정 - **authentication_classes**

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/a041051e-656d-4e10-9051-de568a8b212f/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/641260e4-bf9a-4ae5-baa4-f951a3dab4a5/Untitled.png)

- DRF가 제공하는 인증 체계 - **TokenAuthentication**
    - token 기반 HTTP 인증 체계
    - 기본 데스크탑 및 모바일 클라이언트와 같은 클라이언트-서버 설정에 적합
        
        → 서버가 인증된 사용자에게 토큰을 발급하고 사용자는 매 요청마다 발급받은 토큰을 요청과 함께 보내 인증 과정을 거침
        

### [ Token 인증 설정 ]

1. 인증 클래스 설정 → 모든 view 함수가 토큰 기반 인증이 진행될 수 있도록 설정

1. INSTALLED_APPS 추가

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/35976d93-46c0-4637-a485-462d8a1e2237/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/9b821692-c808-4583-901e-6b6fab1b45b7/Untitled.png)

1. Migrate 진행 
    
    → $ python manage.py migrate
    

1. 토큰 생성 코드 작성 → 인증된 사용자에게 자동으로 토큰을 생성해주는 역할

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/5d7c274b-057e-49cd-9425-cc96c89f0e92/Untitled.png)

### [ Dj-Rest-Auth 설치 및 적용 ]

- 회원가입, 인증, 비밀번호 재설정 등 다양한 인증 관련 기능을 제공하는 라이브러리

```html
$ pip install dj-rest-auth
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/b5f98b71-406b-4386-af88-20274a40b413/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/89d7d95f-bb45-4792-9dae-e5167153dac4/Untitled.png)

### **[ Dj-Rest-Auth의 Registration 기능 추가 ]**

```html
$ pip install 'dj-rest-auth[with_social]'
```

1. 추가 App 등록

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/a784da4c-07f7-43f9-b47e-909494a73dc0/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/5826470e-f111-40a5-aebd-2c00d75133f4/Untitled.png)

1. 추가 URL 등록

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/a6d1e7d1-047b-4588-838c-432271a1f1d4/Untitled.png)

1. Migrate 진행 → $ python manage.py migrate

### [ Token 발급 및 활용 ]

- 회원가입 및 로그인을 진행하여 토큰 발급 테스트하기

- 로그인 성공 후 DRF로 부터 발급 받은 Token 확인
    
    → 이제 **이 Token을 Vue에서 별도로 저장하여 매 요청마다 함께 보내야함**
    

- Headers에 발급받은 Token 작성 후 요청 성공 확인
    
    - Key : **Authorization**
    
    - Value: **Token 토큰값**
    

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/05406e1a-9d35-4878-af9a-312890f978e6/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/324cee0d-45f5-4135-ab6a-c5f6ce94731c/Untitled.png)

- **클라이언트가 Token으로 인증 받는 방법**
1. Key - **Authorization** HTTP Header 포함
2. Value - 문자열 **Token**이 와야 하며 **공백으로 두 문자열을 구분해야 함**

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/4d0fbf66-5f0c-4489-abb2-9edcc1c51e0c/Untitled.png)

### [ 권한 정책 설정 ]

1. 전역 설정 - **DEFAULT_PERMISSION_CLASSES**

1. **permission_classes** 데코레이터 사용

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/2cc3eab5-000a-484d-91fe-00b5cc91663d/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/9cdd6d84-2874-4e70-8215-1b1a6f1b4569/Untitled.png)

- DRF가 제공하는 권한 정책 - **IsAuthenticated**
    - 인증되지 않은 사용자에 대한 권한을 거부하고 그렇지 않은 경우 권한을 허용
    
    → 등록된 사용자만 API에 액세스할 수 있도록 하려는 경우에 적합
    

### [ IsAuthenticated 권한 설정 ]

1. DEFAULT_PERMISSION_CLASSES - 기본적으로 모든 View 함수에 대한 접근 허용

1. permission_classes - 전체 게시글 조회 및 생성 시에만 인증된 사용자만 진행하도록 권한 설정

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/94b1b205-9c50-4584-9e8d-2bc9597d1514/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/4d2dc580-3d13-4f6b-a80b-e77ab3f2cf93/Untitled.png)

---

## < Authentication with Vue >

- 인증과 권한 설정 이후에는 게시글 전체 조회가 작동하지 않음 - 401 status code
    
    →  게시글 조회 요청 시 인증에 필요한 수단을 보내지 않고 있으므로 조회 불가능
    

### [ 회원가입 구현 ]

1. index.js에 주소 작성

1. App 컴포넌트에 SignView 컴포넌트로 이동하는 RouterLink 작성

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/2cac6b36-f8de-4d2b-bcb3-4d578722c051/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/fbc78e93-44a8-4825-a372-df42916c1537/Untitled.png)

1. 회원가입 form 작성

1. 사용자 입력 데이터와 바인딩 될 반응형 변수 작성

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/19e502db-5a08-43c2-8299-679d9a420b80/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/b767422e-b5f0-488f-9f1a-c1f0eab68d44/Untitled.png)

1. SignUpView 컴포넌트 출력 확인

1. 회원가입 요청을 보내기 위한 signUp 함수가 해야 할 일

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/a1f3e7f8-1828-473b-a70e-e114806d2ff7/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/20ea296a-49cb-48a6-8aeb-74642a1705e3/Untitled.png)

1. 컴포넌트에 사용자 입력 데이터를 저장 후 store의 signUp 함수를 호출하는 함수 작성

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/d402d57a-6297-4a6e-809a-1dc50ccc70b8/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/763cf640-f77b-4bf7-9f71-81939d7b08ff/Untitled.png)

1. 실제 회원가입 요청을 보내는 store의 signUp 함수 작성

1. 회원가입 테스트

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/e131711b-61aa-410f-ad61-d128b39e02c6/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/b1a5837b-20cb-4975-b97b-8e733feff39f/Untitled.png)

### [ 로그인 구현 ]

1. LoginView route

1. App 컴포넌트에 LoginView 컴포넌트로 이동하는 RouterLink 작성

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/fdd1e26f-8f8a-453a-99b9-7b455c8649c9/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/bf96009b-b73f-4ff9-b4f8-30b616a5bced/Untitled.png)

1. 로그인 form 작성

1. 사용자 입력 데이터와 바인딩 될 반응형 변수 작성

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/6174c0af-47ac-40f0-8619-959f8a9342bb/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/decdb3a2-b0ed-4810-8d1d-69af27279ddc/Untitled.png)

1. LoginView 컴포넌트 출력 확인

1. 로그인 요청을 보내기 위한 Login 함수가 해야 할 일

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/abfdde79-e650-4d2b-8438-d3ac76977637/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/f1ac8ef9-fbce-4928-b52a-60004cac9f63/Untitled.png)

1. 컴포넌트에 사용자 입력 데이터를 저장 후 store의 Login 함수를 호출하는 함수 작성

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/2a390acd-ac14-42c5-bd18-b25048cee328/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/d6c1bc44-1c3c-4eea-92dd-d82e66599b5c/Untitled.png)

1. 실제 로그인 요청을 보내는 store의 Login 함수 작성

1. 로그인 테스트

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/0a42bea4-325f-4ce1-abec-6a23bb1f87d5/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/3d6bf179-83ad-4e66-adf3-b46b709ae1ab/Untitled.png)

### [ 토큰 저장 ]

- Token을 store에 저장하여 인증이 필요한 요청마다 함께 보낸다

1. 반응형 변수 token 선언 및 토큰 저장

1. 다시 로그인 요청 후 store에 저장된 토큰 확인

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/afb19123-4199-46a4-b8a3-fada67f533f7/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/2e1a243e-6d6b-4e4e-8911-608d12ff5426/Untitled.png)

### [ 게시글 전체 목록 조회 ]

1. 게시글 전체 목록 조회 요청 함수 getArticles에 token 추가

1. 401 상태 코드가 사라지고 게시글이 정상적으로 출력되는 것을 확인

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/750b3e24-4e95-4543-b439-f87ecdce4dff/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/0c8ef602-74e8-46f2-bdc7-405d70e9cee8/Untitled.png)

### [ 게시글 작성 ]

1. 게시글 전체 목록 조회 요청 함수 getArticles에 token 추가

1. 게시글 작성 확인

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/e4b76a4d-f521-41d1-b524-fec2e9d33005/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/b2b3dcbe-26ff-44af-a6c6-c27fd650f1da/Untitled.png)

---

## < 인증 여부 확인 >

- 사용자의 인증 여부에 따른 추가 기능 구현
1. 인증 되지 않은 사용자 → 메인 페이지 접근 제한
2. 인증된 사용자 → 회원가입 및 로그인 페이지에 접근 제한

### [ 인증 상태 여부를 나타낼 속성 값 지정 ]

- token 소유 여부에 따라 로그인 상태를 나타낼 isLogin 변수 작성
- computed를 활용해 token 값이 변할 때만 상태를 계산하도록 함

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/ef926818-98b3-4581-9fa5-ab7232f92446/Untitled.png)

### [ 인증 되지 않은 사용자는 메인 페이지 접근 제한 ]

1. 전역 네비게이션 가드 beforeEach를 활용해 다른 주소에서 메인 페이지로 이동 시 인증 되지 않은 사용자라면 로그인 페이지로 이동시키기

1. 브라우저 local storage에서 token을 삭제 후 메인 페이지 접속 시도

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/4c4502f3-d268-4de3-ad5e-852bab2b7bbd/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/34196404-b76c-4735-9aae-39e9be0cf70c/Untitled.png)

### [ 인증된 사용자는 회원가입과 로그인 페이지에 접근 제한 ]

1. 다른 주소에서 회원가입 또는 로그인 페이지로 이동 시 이미 인증된 사용자라면 메인페이지로 이동 시키기

1. 로그인 후 회원가입, 로그인 페이지 접속 시도

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/73ea7b8c-47c7-4db0-8aad-5ee4ff05ef54/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/42b3648a-c38a-4384-978e-f9e62f1e322f/Untitled.png)

---

### [ 기타 기능 구현 ]

1. 로그인 성공 후 자동으로 메인 페이지로 이동하기

1. 회원가입 성공 후 자동으로 로그인까지 진행하기

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/0f2c5580-333d-46e4-89c5-b1e347584046/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/7d65232c-1602-40e7-a93d-368e377691a4/Untitled.png)

---

- 참고
    
    ### [ 환경 변수 ]
    
    - 애플리케이션의 설정이나 동작을 제어하기 위해 사용되는 변수
    - 목적
        - 개발, 테스트 및 프로덕션 환경에서 다르게 설정되어야 하는 설정 값이나 정보 포함
        - 보안적인 이슈를 피하고, 어플의 다양한 환경에 대응하기 쉽게 만들어줌
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/4b4074bb-5a03-4898-b91c-36e7e17eb524/Untitled.png)
        
    
    ### [ 유용한 자료 ]
    
    - Awesome Vue.js
        - Vue와 관련하여 선별된 유용한 자료를 아카이빙 및 관리하는 프로젝트
        - https://github.com/vuejs/awesome-vue
        - https://awesome-vue.js.org
    - Vuetify
        - Vue를 위한 UI 라이브러리
        - https://vuetifyjs.com/en/