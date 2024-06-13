## < State Management ( 상태 관리 ) >

- Vue 컴포넌트는 이미 반응형 상태를 관리하고 있음 → [ 상태 === 데이터 ]

- 컴포넌트 구조의 단순화
    - 상태 - 앱 구동에 필요한 기본 데이터
    - 뷰 - 상태를 선언적으로 매핑하여 시각화
    - 기능 - 뷰에서 사용자 입력에 대해 반응적으로 상태를 변경할 수 있게 정의된 동작
        
        → 단방향 데이터 흐름
        

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/31dd7263-ad32-4722-9962-bead22be348a/Untitled.png)

- 상태 관리의 단순성이 무너지는 시점 → 여러 컴포넌트가 상태를 공유할 때
    1. 여러 뷰가 동일한 상태에 종속되는 경우
    2. 서로 다른 뷰의 기능이 동일한 상태를 변경시켜야 하는 경우

## < Pinia 🍍>

- Vue 공식 상태 관리 라이브러리

- 사전 준비

- stores 폴더 신규 생성

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/d1d3773b-81cb-4fbe-bf8c-055fb28c25de/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/79a0863a-08e7-4a98-b6d1-a48ffa8a1944/Untitled.png)

### [ Pinia 구조 ]

- **store** ⇒ export const store = defineStore()
    - 중앙 저장소
    - 모든 컴포넌트가 공유하는 상태, 기능 등이 작성됨
    - defineStore()의 반환 값의 이름은 use와 store를 권장
    - defineStore()의 첫번째 인자는 어플 전체에 걸쳐 사용하는 store의 고유 ID

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/f0ad8041-bf6e-4318-8ca0-596030bfe7d5/Untitled.png)

- **state ( 반응형 상태 ) ⇒** const state = ref()
- **getters ( 계산된 값 ) ⇒** const getters = computed()
- **actions ( 메서드 ) ⇒** const actions = function()
- pinia 상태를 사용하려면 반드시 return 해야함
- **store에서는 공유하지 않는 private한 상태 속성을 가지지 않음**
- **plugin**
    - 어플의 상태 관리에 필요한 추가 기능을 제공하거나 확장하는 도구나 모듈
    - 어플의 상태 관리를 더욱 간편하고 유연하게 만들어주며 패키지 매니저로 설치 이후 별도 설정을 통해 추가됨

### [ Pinia 구성 요소 활용 ]

- **State**
    - 각 컴포넌트 깊이에 관계 없이 store 인스턴스로 state에 접근하여 직접 읽고 쓸 수 있음
    - 만약 store에 state를 정의하지 않았다면 컴포넌트에서 새로 추가할 수 없음

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/73e4d56e-61c3-498d-88fe-0a7e51ead569/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/6afb22d0-aa5a-4e38-bdba-09f39a29abe4/Untitled.png)

- **Getters**
    - store의 모든 getters 또한 state처럼 직접 접근할 수 있음

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/2e83db02-235e-453a-a5ba-621b9e4252c7/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/4dbe5d37-c969-44c0-a96a-e21c0f367d37/Untitled.png)

- **Actions**
    - store의 모든 actions 또한 직접 접근 및 호출할 수 있음
    - getters와 달리 state 조작, 비동기, API 호출이나 다른 로직을 진행할 수 있음

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/dab41a12-2b59-4830-9007-f47b97c84281/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/a8dfca17-e038-4883-9a81-8a37e7441bcb/Untitled.png)

- Vue devtools로 Pinia 구성 요소 확인하기
    - 중앙 저장소 state가 변경될 때마다 getters도 변경됨

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/b37053b8-f8d9-4e46-b461-b5a68aa81499/Untitled.png)

---

## < Pinia 실습 >

- Pinia를 활용한 Todo 프로젝트 구현

### [ 사전 준비 ]

1. 초기 생성된 컴포넌트 + src/assets 내부 파일 + main.js의 css 모두 삭제 (App.vue 제외)

1. TodoListItem.vue 컴포넌트 작성

1. TodoList.vue 컴포넌트 작성

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/2ea622d6-63c7-4648-9a20-cd1995c36afe/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/f40927d2-12eb-4398-abd1-c73b02e0d2c5/Untitled.png)

1. TodoForm 컴포넌트 작성

1. App 컴포넌트에 TodoList, TodoForm 컴포넌트 등록

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/d1641be0-d22b-44cb-b85a-8e7df3ca3068/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/7159c063-38b2-48c2-a768-e2855f7bc2ed/Untitled.png)

### [ Todo 조회 ]

1. store에 임시 todos 목록 state 정의

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/8eda1abc-f92e-45ef-b697-96994146fde3/Untitled.png)

1. 하위 컴포넌트인 TodoListItem을 반복하면서 개별 todo를 props로 전달

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/adff5fdd-82bd-40b9-babd-2b0812801081/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/6ab3eb4a-8d89-4224-ad63-c4b31967bbf2/Untitled.png)

1. props 정의 후 데이터 출력 확인

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/0d031aea-45be-4455-9937-6e6b15896a48/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/ba3b835c-8cd0-40b2-90fe-4c416023e5e5/Untitled.png)

### [ Todo 생성 ]

1. todos 목록에 todo를 생성 및 추가하는 addTodo 액션 정의

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/4b696033-f946-485e-956a-1423f2990141/Untitled.png)

1. TodoForm에서 실시간으로 입력되는 사용자 데이터를 양방향 바인딩하여 반응형 변수로 할당

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/fa226857-5f58-4f24-8383-be25e2fe7eb6/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/70372316-4f36-4a2b-8f9f-3be2d0496d49/Untitled.png)

1. submit 이벤트가 발생했을 때 사용자 입력 텍스트를 인자로 전달하여 store에 정의한 addTodo 액션 메서드를 호출

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/bbce7ff9-6312-4b0c-8584-9c119325db4a/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/23b7100b-9e35-4c4b-8842-a7a86f1881d4/Untitled.png)

1. form 요소를 선택하여 todo 입력 후 input 데이터를 초기화 할 수 있도록 처리

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/37b99d3f-dbaf-41ba-b049-d2b1e8d06c04/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/52a7d6a7-a586-4e0f-b01d-d1a62468ee7e/Untitled.png)

1. 결과 확인

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/2db2e558-fd07-4353-bb37-9f98d94af0b3/Untitled.png)

### [ Todo 삭제 ]

1. todos 목록에서 특정 todo를 삭제하는 deleteTodo 액션 정의

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/cb7df8a3-5b16-4f30-8f9a-2577781cc20f/Untitled.png)

1. 버튼을 클릭하면 선택된 todo의 id를 인자로 전달해 deleteTodo 메서드 호출

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/5076c910-81c4-4c0d-bae8-9c24b6c9576c/Untitled.png)

1. 전달받은 todo의 id 값을 활용해 선택된 todo의 인덱스를 구함 → 특정 인덱스 todo를 삭제 후 todos 배열을 재설정

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/5c28947b-07d0-49a4-89f3-e76acead9e15/Untitled.png)

1. 결과 확인

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/f6f1352e-84ce-42d8-82c3-03b70e19a103/Untitled.png)

### [ Todo 수정 ]

1. 완료된 todo에는 취소선 스타일 적용하기

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/b011cc76-b088-4f23-8e7b-0e2111bec651/Untitled.png)

1. todo 내용을 클릭하면 선택된 todo의 id를 인자로 전달해 updateTodo 메서드 호출

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/32e521a7-e208-4e36-add4-938f480e7cfb/Untitled.png)

1. 전달받은 todo의 id 값을 활용해 선택된 todo와 동일 todo를 목록에서 검색

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/a76ad41e-f15d-4c28-be33-644c8ad5e0ab/Untitled.png)

1. todo 객체의 isDone 속성 값에 따라 스타일 바인딩 적용하기

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/8785e9d9-c45f-4abb-b3f0-750e605d9574/Untitled.png)

1. 결과 확인

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/1d3fbb3e-6253-481e-b6cd-e2f657c847bb/Untitled.png)

### [ 완료된 todo 개수 계산 ]

1. todos 배열의 길이 값을 반환하는 함수 doneTodosCount 작성 (getters)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/860a26bf-ba10-474b-b0bd-688abc679149/Untitled.png)

1. App 컴포넌트에서 doneTodosCount getter를 참조

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/3eb732e9-9ab6-4a9f-9a6e-83308c8511a2/Untitled.png)

---

## < Local Storage >

- 브라우저 내에 key-value 쌍을 저장하는 웹 스토리지 객체
- 특징
    - 페이지를 새로 고침하고 브라우저를 다시 실행해도 데이터가 유지
    - 쿠키와 다르게 네트워크 요청 시 서버로 전송되지 않음
    - 여러 탭이나 창 간에 데이터를 공유할 수 있음
- 사용 목적 : 웹 어플에서 사용자 설정, 상태 정보, 캐시 데이터 등을 클라이언트 측에서 보관하여 웹 사이트의 성능을 향상시키고 사용자 경험을 개선하기 위함

### [ pinia-plugin-persistedstate ]

- Pinia의 플러그인 중 하나
- 웹 어플의 상태를 브라우저의 local storage나 session storage에 영구적으로 저장하고 복원하는 기능을 제공
- 새로고침을 해도 값이 사라지지 않고 영구적으로 저장되어 있게 됨
1. 설치 및 등록

```html
$ npm i pinia-plugin-persistedstate
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/972e434c-8de4-4ed0-bfd9-952a243fda77/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/fbf776ca-b49f-40ea-9325-8e00ea99d515/Untitled.png)

1. 적용 결과 - 브라우저의 Local Storage에 저장되는 todos state 확인

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/e1233fac-7305-43a0-88cf-c03b4ca51e3a/Untitled.png)

---

- 참고
    - Pinia 언제 사용해야 할까?
        - Pinia는 공유된 상태를 관리하는데 유용하지만, 구조적인 개념에 대한 이해와 시작하는 비용이 큼
        - 중대형 규모의 SPA를 구축하는 경우 Pinia는 자연스럽게 선택할 수 있는 단계

---