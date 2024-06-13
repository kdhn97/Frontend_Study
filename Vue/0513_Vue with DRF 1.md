### [ Vue와 DRF 간 기본적인 요청과 응답 ]

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/f2a10d7a-eb7f-46f7-8fe3-b57227163d28/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/9bdf74db-a3ed-42a3-933f-556cd71df8da/Untitled.png)

## < CORS Policy >

### [ SOP ( Same-origin policy ) ]

- 동일 출처 정책
- 어떤 출처에서 불러온 문서나 스크립트가 다른 출처에서 가져온 리소스와 상호 작용하는 것을 제한하는 보안 방식
- 웹 어플의 도메인이 다른 도메인의 리소스에 접근하는 것을 제어하여 사용자의 개인 정보와 데이터의 보안을 보호하고, 잠재적인 보안 위협 방지

### [ Origin - 출처 ]

- URL의 Protocol, Host, Port를 모두 출처라고 부름
    
    → 아래 **세 영역이 일치하는 경우에만 동일 출처(Same-origin)**로 인정
    

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/4276a61f-8158-47d8-8fcb-32a8131551ca/Untitled.png)

→ CORS는 웹 서버가 리소스에 대한 서로 다른 출처 간 접근을 허용하도록 선택할 수 있는 기능 제공

### [ CORS ( Cross-Origin Resource Sharing ) ]

- 교차 출처 리소스 공유
- 특정 출처에서 실행 중인 웹 어플이 **다른 출처의 자원에 접근할 수 있는 권한을 부여**하도록 브라우저에 알려주는 체제

### [ CORS Policy ]

- 교차 출처 리소스 공유 정책
- 다른 출처에서 온 리소스를 공유하는 것에 대한 정책
    
    → 다른 출처의 리소스를 불러오려면 그 다른 출처에서 올바른 **CORS header를 포함한 응답 반환**
    

---

## < CORS Headers 설정 >

- **Django**에서 django-cors-headers 라이브러리 활용

```html
$ pip install django-cors-headers
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/14798e54-fb08-414d-977e-214fc1b7f328/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/a3bff4a9-e181-444c-bf62-aa27a5bd8f5d/Untitled.png)

- 응답 객체에서 ‘Access-Control-Allow-Origin’ Header 확인

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/94756c5a-3809-42b0-ab33-051a66b6a1a3/Untitled.png)