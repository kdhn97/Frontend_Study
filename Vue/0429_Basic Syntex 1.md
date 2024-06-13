## < Template Syntax >

- DOM을 기본 구성 요소 인스턴스의 데이터에 **선언적으로 바인딩(Vue Instance와 DOM 연결)**할 수 있는 HTML 기반 **템플릿 구문(확장된 문법 제공)**을 사용

### [ Text Interpolation ]

- 데이터 바인딩의 가장 기본적인 형태
- 이중 중괄호 구문을 사용
- msg 속성이 변경될 때마다 업데이트됨

```html
<p> Message : {{ msg }} </p>
```

### [ Raw HTML ]

- 콧수염 구문은 데이터를 일반 텍스트로 해석하기 때문에 실제 HTML을 출력하려면 v-html을 사용해야함

```html
<div v-html='rawHtml'></div>
const rawHtml = ref('<span style="color:red">This should be red.</span>')
```

### [ Attribute Bindings ]

- 콧수염 구문은 HTML 속성 내에서 사용할 수 없기 때문에 v-bind를 사용

```html
<div v-bind:id="dynamicId"></div>
const dynamicId = ref('my-id')
```

### [ JavaScript Expressions ]

- Vue는 모든 데이터바인딩 내에서 JavaScript 표현식의 모든 기능을 지원
- 사용할 수 있는 위치
    - 콧수염 구문 내부
    - 모든 directive의 속성값 (” v- ”)

```html
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div :id="`list-${id}`"></div>
```

→ Expressions 주의사항

- 각 바인딩에는 하나의 단일 표현식만 포함될 수 있음 (return 뒤에 사용할 수 있는 코드만)
    - 작동하지 않는 경우 —————>

```html
<!-- 표현식이 아닌 선언식 -->
{{ const number = 1 }}
<!-- 제어문은 삼항 표현식을 사용해야 함 -->
{{ if (ok) { return message } }}
```

### [ Directive ]

- ‘ v- ’ 접두사가 있는 특수 속성
- Directive의 속성 값은 단일 JavaScript 표현식이어야 함 (v-for, v-on 제외)
- 표현식 값이 변경될 때 DOM에 반응적으로 업데이트 적용
- Directive - “Arguments”
    - 일부 directive는 뒤에 콜론( : )을 사용할 수 있음
    
    ```html
    <!-- href는 HTML <a>요소의 href 속성 값을 myUrl 값에 바인딩하도록 하는 v-bind인자 -->
    <a v-bind:href="myUrl"> Link </a>
    
    <!-- click은 이벤트 수신할 이벤트 이름을 작성하는 v-on 인지 -->
    <button v-on:click="doSomething"> Button </button>
    ```
    
- Directive - “Modifiers”
    - “ . ”으로 표시되는 특수 접미사로, directive가 특별한 방식으로 바인딩되어야 함
    
    ```html
    <!-- .prevent는 발생한 이벤트에서 event.preventDefault()를 호출하도록 v-on에 지시 -->
    <form @submit.prevent="onSubmit">...</form>
    ```
    

---

## < Dynamically data binding >

### **[ v-bind ]**

- 하나 이상의 속성 또는 Vue 인스턴스를 표현식에 동적으로 바인딩
- 약어 → “ : “ 세미콜론

### [ Attribute Bindings ]

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/ee7c5c42-1ce7-4860-af9a-d1dcc75ac574/Untitled.png)

### [ Class and Style Bindings ]

- class와 style은 모두 HTML 속성이므로 다른 속성과 마찬가지로 v-bind를 사용하여 동적으로 문자열 값을 할당할 수 있음
- Vue는 class 및 style 속성 값을 v-bind로 사용할 때 **객체** 또는 **배열**을 활용하여 작성할 수 있음
- Binding HTML Classes - Binding to Object
    - 객체를 :class에 전달하여 클래스를 동적으로 전환할 수 있음

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/6f8a6749-9bd8-44ea-8348-054627cf41dc/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/a9484fba-a3ee-4bfc-b090-81534e10ff92/Untitled.png)

- Binding Inline Styles - Binding to Objects
    - :style은 JavaScript 객체 값에 대한 바인딩을 지원

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/c70a3087-4973-45b8-ab53-d7003f4bd207/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/03b2c43e-7869-4959-95d4-e3c205f8fd0f/Untitled.png)

---

## < Event Handling >

### [ v-on ]

- DOM 요소에 이벤트 리스너를 연결 및 수신

```html
[구문] v-on:event="handler"
[약어] @event="handler"
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/e20cc679-0a72-4b18-8c64-3d62e69296ed/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/b8a96e15-0b13-4859-bd4c-10db0040ff4a/Untitled.png)

---

## < Form Input Bindings >

### [ v-model ]

- form을 처리할 때 사용자가 input에 입력하는 값을 실시간으로 JavaScript 상태에 동기화해야 하는 경우 **(양방향 바인딩)**
- input : Text
    - IME가 필요한 언어 (한국어)의 경우 v-model이 제대로 업데이트되지 않음
        
        → 올바르게 응답하려면 v-bind와 v-on 방법을 사용해야 함
        

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/9d0596a9-396d-400b-bfae-de23ee7ca60a/Untitled.png)

- input : Checkbox

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/1464107d-8781-4e5a-8bca-17ffab9b3f4a/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/14f1f6cf-9fa0-4150-ab47-8cd051913229/Untitled.png)

---

- 참조
    - ‘ $ ‘ 접두어가 붙은 변수 : 사용자가 지정한 반응형 변수나 메서드와 구분하기 위함
    - IME (Input Method Editor)
        - 사용자가 입력 장치에서 기본적으로 사용할 수 없는 문자를 입력할 수 있도록 운영 체제 구성 프로그램
        - 일반적으로 키보드 키보다 자모가 더 많은 언어에서 사용해야 함
        
        → IME가 동작하는 방식과 Vue의 양방향 바인딩 동작 방식이 상충하기 때문에 한국어 입력 시 예상대로 동작하지 않았던 것