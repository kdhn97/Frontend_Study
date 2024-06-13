## < Passing Props ( 전달 ) >

- Component : 재사용이 가능한 코드 블럭
- **Props** : 부모 컴포넌트로부터 자식 컴포넌트로 데이터를 전달하는데 사용되는 속성
    - 부모 속성이 업데이트되면 자식으로 전달되지만 반대는 안됨
    - 부모는 자식에게 데이터 전달 → Pass Props
    - 자식은 자신에게 일어난 일을 부모에게 알림 → Emit event
- One-Way Data Flow : 모든 props는 자식 속성과 부모 속성 사이에 **하향식 단방향 바인딩** 형성
    - 단방향인 이유 : 데이터 흐름의 일관성 및 단순화

### [ Props 선언 ]

- 사전 준비
    1. Vue 프로젝트 생성
    2. 컴포넌트 모두 삭제 (App.vue 제외 → 내부 코드만 삭제)
    3. src / assets 내부 파일 모두 삭제
    4. main.js의 css 코드 삭제
    5. App > Parent > ParentChild 컴포넌트 관계 작성

- App 컴포넌트 작성

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/11bae984-4b85-4689-85a8-73edcad5c716/Untitled.png)

- Parent 컴포넌트 작성
    - **my-msg** : props 이름
    - **‘message’** : props 값

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/b97676cd-f064-4901-8143-cbff3c141820/Untitled.png)

- ParentChild 컴포넌츠 작성
    - **defineProps()** : props 선언
    1. 문자열 배열 선언
    
    ```python
    defineProps(['myMsg'])
    ```
    
    1. **객체를 사용한 선언 - 유효성 검사**
    
    ```python
    defineProps({ myMsg: String })
    defineProps({ myNum: Number })
    ```
    

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/d1129ba3-634e-4022-82af-b2de0ab464ba/Untitled.png)

---

- 한 단계 더 props 내려 보내기

- ParentChild

- ParentGrandChild

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/a4b5d33a-7847-4f23-b041-36553ca22880/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/aed609f7-0d07-4886-8900-cbbf6ee52208/Untitled.png)

### [ Props 세부사항 ]

1. Props Name Casing
    - 자식 컴포넌트로 전달 시 ( Kebab-case ) → ex. my-msg
    - 선언 및 템플릿 참조 시 ( camelCase ) → ex. myMsg
2. Static props & Dynamic props

- Dynamic props 정의
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/0430935e-d178-4bd9-9d17-79a687ab5fa1/Untitled.png)
    

- Dynamic props 선언 및 출력
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/cb908442-a7ed-4199-a967-e954c673d943/Untitled.png)
    

### [ Props 활용 ]

1. v-for와 함께 사용하여 반복되는 요소를 props로 전달하기

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/6fee8422-51ae-4a51-87d0-8268207772e0/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/dd0c9801-efcf-4d06-8764-81fee721b2ed/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/ee157ccf-ac00-4ed8-a20d-92964bb6d99a/Untitled.png)

1. props 선언 및 출력 결과 확인

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/e74fe584-9f99-4c98-94c8-1ce98db51826/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/4c45e743-15e9-48b2-862c-8a13b279cee8/Untitled.png)

---

## < Component Events >

- **$emit()** : 자식 컴포넌트가 이벤트를 발생시켜 부모 컴포넌트로 데이터를 전달하는 메서드

### [ 이벤트 발신 및 수신 ]

- 부모는 v-on을 사용하여 수신할 수 있음

- $emit을 사용하여 템플릿 표현식에서 직접 사용자 정의 이벤트를 발신

```html
<!-- Parent.vue -->
<ParentChild @some-event="someCallback"/>

<script setup>
const someCallback = function () {
    console.log('이벤트 수신');
}
</script>
```

```html
<!-- ParentChild.vue -->
<button @click="$emit('someEvent')">
	클릭
</button>
```

### [ 이벤트 선언 ]

- defineEmits()를 사용하여 발신할 이벤트 선언

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/4278eb12-cc4c-4024-98a5-f8cfc8e94c2b/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/e7d53912-497a-4af1-b4ba-71271852b31f/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/c1b37188-b6c6-44bb-8de6-e2d7bedd37b8/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/854db0c7-5e88-462f-b80a-bcde490dcd38/Untitled.png)

### [ 이벤트 전달 ]

- 이벤트 발신 시 추가 인자를 전달하여 값을 제공할 수 있음

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/37cf67c2-c8ec-48fe-a18f-a96c01950186/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/57d3d21d-c2e7-434b-b31e-4b63be166098/Untitled.png)

### [ 이벤트 세부사항 ]

- 선언 및 발신 시 ( camelCase ) → ex. someEvent
- 부모 컴포넌트에서 수신 시 ( kebab-case ) → ex. @some-event

### [ emit 이벤트 활용 ]

- ParentGrandChild에서 이름 변경을 요청하는 이벤트 발신

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/37045c0d-a9fe-47e4-878c-ae9b083607c1/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/d37a8ad6-2ee4-43cc-98ee-3338955cea13/Untitled.png)

- 이벤트 수신 후 이름 변경을 요청하는 이벤트 발신

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/a2fd01e7-6a84-4f83-aa4b-5362c1bffdc5/Untitled.png)

- 이벤트 수신 후 이름 변수 변경 메서드 호출

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/31e109ad-07e1-4571-87dc-9b87634f4b29/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/e80f6be3-5c38-4063-ae21-f7c1fc97528f/Untitled.png)

---

- 참고
    - 정적 props로 문자열 ‘1’ 전달
    
    ```html
    <SomeComponent num-props='1'>
    ```
    
    - 동적 props로 숫자 1을 전달
    
    ```html
    <SomeComponent :num-props='1'>
    ```