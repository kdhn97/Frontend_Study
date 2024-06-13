## < Computed Property >

- **computed()** - ‘**계산된 속성**’을 정의하는 함수
    
    → 미리 계산된 속성을 사용하여 템플릿에서 표현식을 단순하게 하고 불필요한 반복 연산을 줄임
    
    - 반환되는 값은 computed ref이며, .value로 참조 가능
    - computed 속성은 의존된 반응형 데이터를 **자동 추적**
    - **todos가 변경될 때만 restOfTodos가 업데이트**

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/274edf45-60e5-4780-9e9b-991d861412d2/Untitled.png)

- Computed

- Methods

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/209923aa-6216-497c-9ca2-b1e080f77650/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/324425ef-2952-4c2f-b6b5-dcdf5007b473/Untitled.png)

- Computed와 method 차이
    - Computed 속성은 **의존된 반응형 데이터를 기반으로 캐시**된다
    - 의존된 반응형 데이터가 변경되지 않는 한 이미 계산된 결과에 대한 여러 참조는 다시 평가할 필요없이 이전에 계산된 결과를 즉시 반환
        
        → 반면 Method 호출은 다시 렌더링이 발생할 때마다 항상 함수를 실행
        
- **Cache (캐시)**
    - 데이터나 결과를 일시적으로 저장해두는 임시 저장소
    - 이후 같은 데이터나 결과를 다시 계산하지 않고 빠르게 접근할 수 있도록 함
- **Computed**
    - 의존하는 데이터에 따라 결과가 바뀌는 계산된 속성을 만들 때 유용
    - 동일한 의존성을 가진 여러 곳에서 사용할 때 계산 결과를 캐싱하여 중복 계산 방지
    - 의존된 데이터가 변경되면 자동으로 업데이트
- **Method**
    - 단순히 특정 동작을 수행하는 함수를 정의할 때 사용
    - 데이터에 의존하는지 여부와 관계없이 항상 동일한 결과를 반환하는 함수
    - 호출해야만 실행됨

---

## < Conditional Rendering >

- **v-if** : 표현식 값의 true / false를 기반으로 요소를 조건부로 렌더링
    - 초기 조건이 false인 경우, 아무 작업도 수행하지 않음
    - 토글 비용이 높음

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/b73fa2bb-9cd2-4692-b332-eb45e8948d35/Untitled.png)

- HTML **<template>** element
    - 페이지가 로드 될 때 렌더링 되지 않지만 JavaScript를 사용하여 나중에 문서에서 사용할 수 있도록 하는 HTML을 보유하기 위한 메커니즘
    - 보이지 않는 wrapper 역할

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/80a12475-6912-401c-b6b4-3f79bb241e8b/Untitled.png)

- **v-show** : 표현식 값의 true / false를 기반으로 요소의 가시성을 전환
    - 초기 조건에 관계 없이 항상 렌더링
    - 초기 렌더링 비용이 높음

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/4557411d-ecaf-45ab-922f-782997a2bec0/Untitled.png)

- **v-for** : 소스 데이터를 기반으로 요소 또는 템플릿 블록을 여러 번 렌더링

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/0405c5e4-c859-410a-afe6-462094e50428/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/96d1f8b3-5b34-419e-a73d-eb090532c98c/Untitled.png)

- **v-for with key**
    - 반드시 v-for와 key를 함께 사용한다 → 내부 컴포넌트의 상태를 일관 되게 하여 데이터의 예측 가능한 행동을 유지하기 위함
    - key는 반드시 각 요소에 대한 **고유한 값을 나타낼 수 있는 식별자**여야 함
    - 내장 특수 속성 key
        - number 혹은 string으로만 사용해야 함
        - Vue의 내부 가상 DOM 알고리즘이 이전 목록과 새 노드 목록을 비교할 때 각 node를 식별하는 용도로 사용

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/ed5f638e-9dce-4fdc-a3c1-58cfd9013922/Untitled.png)

- **v-for with v-if**
    - 동일 요소에 v-for와 v-if를 함께 사용하지 않는다 → v-if가  v-for보다 우선순위가 높다
    - 해결 방법
        - Computed : **computed를 활용해 필터링 된 목록을 반환하여 반복**하도록 설정
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/1b6dfff9-9899-4b75-887f-128ed78ca9cd/Untitled.png)
        
        - v-for와 <template> : **v-if 위치 이동**
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/79c10e9f-755d-41a4-835d-6add67856619/Untitled.png)
        

---

## < Watchers >

- **watch(감시하는 값, (콜백함수) ⇒ { 출력값 })**
    - 하나 이상의 반응형 데이터를 감시하고, 감시하는 데이터가 변경되면 콜백 함수 호출

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/fc2ce182-5c66-4b6b-83b2-2a1321fb2864/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/5f6faba6-b7ad-4f3b-ba0a-ea36de286603/Untitled.png)

- **computed와 watch 모두 의존하는 원본 데이터를 직접 변경하지 않음**

---

## < Lifecycle Hooks >

- Vue 인스턴스의 생애주기 동안 특정 시점에 실행되는 함수
    - Vue는 Lifecycle Hooks에 등록된 콜백 함수들을 인스턴스와 자동으로 연결함

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/79748206-ab15-436e-8468-b48e20901f3a/Untitled.png)

---

- 참조
    - 주의 사항
        - computed의 반환 값은 변경하지 말 것
        - computed 사용 시 원본 배열 변경하지 말 것
        - 배열의 인덱스를 v-for의 key로 사용하지 말 것