## < Frontend Development >

- 웹사이트와 웹 어플의 사용자 인터페이스(UI)와 사용자 경험(UX)을 만들고 디자인하는 것

→ HTML, CSS, Javascript 등을 활용하여 사용자가 직접 상호작용하는 부분을 개발

### [ Client-side frameworks ]

- 클라이언트 측에서 UI와 상호작용을 개발하기 위해 사용되는 JavaScript 기반 프레임워크

### [ Single Page Application ( SPA ) ]

- **단일 페이지**로 구성된 애플리케이션
- 하나의 HTML 파일로 시작하여 사용자가 상호작용할 때마다 페이지 전체를 새로 로드하지 않고 화면의 필요한 부분만 동적으로 갱신
- JavaScript 프레임워크를 사용하여 클라이언트 측에서 UI와 렌더링을 관리 → CSR 방식 사용

### [ Client-side Rendering ( CSR ) ]

- **클라이언트에서 화면을 렌더링** 하는 방식 → 새로고침이 없는 이유
- 장점 : 빠른 페이지 전환 / 사용자 경험 / Frontend와 Backend의 명확한 분리
- 단점 : 느린 초기 로드 속도 / SEO (검색엔진최적화) 문제

---

## < Vue 3 >

- 사용자 인터페이스를 구축하기 위한 **JavaScript 프레임워크**
- Evan You에 의해 발표 (2014년)
- Vue를 학습하는 이유 : 쉬운 학습 곡선 / 확장성과 생태계 / 유연성 및 성능
- Vue의 핵심 기능 : 선언적 렌더링 / 반응성

### [ Vue 튜토리얼 ]

- CDN 방식

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

- **ref ( )** : 실시간 반응형 상태를 선언하는 함수

- **v-on** : DOM 요소에 v-on을 통해 Event Listener를 연결 및 수신할 수 있으며, 약어는 아래와 같이 @로 표현됩니다.

```html
v-on:event = "handler"
@event = "handler"
```

### [ 기본 구조 ]

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp, ref } = Vue
  const app = createApp ({
    setup() {
      const message = ref('Hello vue!')
      return {
        message
      }
    }
  })
  app.mount('#app')
</script>
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/b38f7bf0-0540-40be-a704-68ba1048fa95/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/f2d05a8a-6c8a-458d-a65b-5d31250ba7d8/Untitled.png)

### [ 핸들러 ]

- **인라인 핸들러:** 이벤트가 트리거될 때 실행되는 인라인 JavaScript

- **메서드 핸들러:** 컴포넌트에 정의된 메서드 이름 또는 메서드를 가리키는 경로

```html
<div>
	<button @click="count++">1 추가</button>
	<p>숫자 값은: {{ count }}</p>
</div>
...
<script>
	const count = ref(0)
</script>
```

```html
<div>
	<button @click="greet">환영하기</button>
</div>
...
<script>
	const name = ref('Vue.js')
	function greet(event) {
	  alert(`안녕 ${name.value}!`)
	  if (event) {
	    alert(event.target.tagName)
	  }}
</script>
```

---

- 참고
    
    ### [ Ref Unwrap 주의사항 ]
    
    - 템플릿에서의 unwrap은 ref가 최상위 속성인 경우에만 적용 가능
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/482b3c97-cd75-4037-b575-fc5eccdcba31/Untitled.png)
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/2016fe17-2411-452e-844f-4262a60d3b9c/Untitled.png)
    
    - object는 최상위 속성이지만 object.id는 그렇지 않음
    - 이를 해결하기 위해서는 ‘id를 최상위 속성으로 분해’해야함
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/06cb47e2-1cae-438c-ab23-56f498e4bf2b/Untitled.png)
    
    ### [ SEO (Search Engine Optimization) ]
    
    - 검색 엔진 등에 내 서비스나 제품 등이 효율적으로 검색 엔진에 노출되도록 개선하는 작업
    - SPA ( CSR 방식 )으로 구성된 서비스 비중 증가 → 검색 대상을 넓히기 위해 발전 중
    - SSR : 서버에서 화면을 렌더링 하는 방식
        - 모든 데이터가 담긴 HTML을 서버에서 완성 후 클라이언트에게 전달
        - SPA 서비스 **( Vue )** + SSR 지원하기 위한 프레임워크 **( Nuxt.js )**