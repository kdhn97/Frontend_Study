# Vue.js

- 웹 프론트엔드 프레임워크
    - 컴포넌트 기반의 SPA를 구축할 수 있게 해주는 프레임워크

- 컴포넌트
    - 웹 페이지 내의 다양한 UI 요소
    - 재사용 가능하도록 구조화 한 것

- SPA (Single Page Application)
    - 단일 페이지 어플리케이션
    - 하나의 페이지 안에서 필요한 영역 부분만 로딩되는 형태

- 장점 : 빠른 페이지 변환, 적은 트래픽 양

- 단점 : 최초 로딩 속도가 느림

---

- **VSCode 버젼 확인**
    1. 도움말 > 정보
    2. 버전 확인
- **Vue - Official 설치**
    - VSCode가 1.85 이하 버전인 경우
        
        <aside>
        📌 **v2.0.10은 Visual Studio Code 1.85 버전과 호환되지 않습니다.
        v.1.8.27을 설치해 주세요.**
        
        </aside>
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/0830383e-122e-4a6f-875a-265a2da027bc/Untitled.png)
        
        ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/61742685-0e8f-4e69-816f-78d340bb23be/Untitled.png)
        
    
    이름: Vue - Official
    버전: 1.8.27
    VS Marketplace 링크: https://marketplace.visualstudio.com/items?itemName=Vue.volar
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/72e776be-e3a4-422c-bcdf-a31359471870/Untitled.png)
    
- Vue VSCode Snippets 설치
    
    ![Screenshot 2023-07-03 at 10.22.10 AM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/92685d9c-36cc-4d64-8c9b-613a94d3a133/Screenshot_2023-07-03_at_10.22.10_AM.png)
    

## Chrome - Vue.js devtools 설치

1. [**https://chrome.google.com/webstore/category/extensions](https://chrome.google.com/webstore/category/extensions) 에 접속합니다.**
2. **Vue.js devtools를 검색 후 클릭합니다.**
3. **`Chrome에 추가`를 클릭해 설치합니다.**
4. **extension 아이콘 클릭 → `확장 프로그램 관리`를 클릭합니다.**
5. **extension 목록 중 Vue.js devtools의 `세부정보`를 클릭합니다.**
6. **`시크릿 모드에서 허용` 및 `파일 URL에 대한 액세스 허용` 을 활성화 합니다.**

---

< *.vue 자동완성 >

Ctrl + Shipt + P → Snippets 입력 → vue 입력 → 아래 코드 붙여넣기

```html
{	
	"Print to console": {
		"prefix": "vue",
		"body": [
		"<template>",
		"    <div>",
		"",
		"    </div>",
		"</template>",
		"",
		"<script setup>",
		"import { ref } from 'vue'",
		"$0"
		"</script>",
		"",
		"<style scoped>",
		"",
		"</style>",
		],
		"description": "Vue For SSAFY"
	}
}
```
→ 이후 *.vue 에서 vue만 입력해도 해당 코드 자동완성됨