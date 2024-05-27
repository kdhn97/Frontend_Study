- HTML : 웹 페이지의 **기본 구조, 문서** 담당
- VScode → 파일 생성 [ .html ] → ! 누르면 자동 생성

[HTML 한번에 끝내기 HTML Full Tutorial](https://www.youtube.com/watch?v=VozMYcCYvtg)

---

## [ HTML 문서 기본 구조 ]

```html
<!DOCTYPE html>
<html lang="en">
  <head>
		<meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML 문서 제목</title>
  </head>
  <body>
    <h1>제목</h1>
    <p>단락</p>
  </body>
</html>
```

- `<!DOCTYPE>`: 현재 문서의 HTML 타입을 정의하며 HTML5 의 경우 `<!DOCTYPE html>`로 명시함
- `<html>`: HTML 문서의 시작과 끝을 표시
- `<head>`: 웹 페이지 문서에 대한 정보로 메타데이터(metadata)를 정의
    - `<style>`, `<meta>`, `<link>`, `<script>`, `<base>` 태그 등 정의
    - `<title>`: HTML 문서 제목 정의
- `<body>`: 내부에 웹 페이지의 실제적인 내용을 작성
    - `<h1>`~`<h6>`: 제목 정의
    - `<p>`: 단락

## [ 문서 요소 ]

```jsx
<p class="value">단락</p>

- 태그 이름 : p
- 속성명 : class
- 속성값 : value
```

## [ 속성 ]

```jsx
<a href="링크주소">링크</a>
- 시작 태그에 `속성이름 = 값` 형태로 사용됨
- `<a>` 태그에 `href` 속성으로 `링크주소`의 값을 설정
```

## [ 주석 ]

```jsx
<!-- 주석 -->
```

---

## < 기본 태그 >

- 제목 태그 : <h> </h>
    - `<h>` 태그 : 제목 표시
    - `<h1>` 부터 `<h6>` 까지 단계별로 사용 ( h1이 가장 크고, h6가 가장 작다 )
- 단락 태그 : <p> </p>
    - `<p>`  : 문단을 나타낼 때 사용
    - 문단 전 후로 줄 빈 줄이 추가됨
- 줄 나누기 태그 : <br>
    - `<br>`  : 강제로 줄 바꿈을 할 때 사용
    - 종료 태그가 없음
- 미리 정의된 서식 태그 : <pre> </pre>
    - `<pre>`  : preformatted text로 입력한 텍스트 그대로 화면에 표시할 때 사용
- 수평선 태그 : <hr>
    - `<hr>` : 수평선을 표시하는 태그

## [ 텍스트 서식 태그 ]

| 태그 | 설명 |
| --- | --- |
| <b> ~ </b> | 굵게(bold) |
| <i> ~ </i> | 이텔릭(italic) |
| <small> ~ <small> | 작게 |
| <ins> ~ </ins> | 밑줄(insert) |
| <del> ~ </del> | 가운데 선 |
| <mark> ~ </mark> | 하이라이트 |
| <strong> ~ </strong> | 강조 |
| <code> ~ </code> | 코드 |
| <em> ~ </em> | 강조(emphasized text) |
| <sup> ~ </sup> | 위 첨자(superscript) |
| <sub> ~ </sub> | 아래 첨자(subscript) |

## [ 인용 태그 ]

- 인용구 : 짧은 인라인으로 사용, 큰 따옴표 붙음

```html
<q>인용구</q>
<!-- "인용구" -->
```

- 약어 : HTML 글자에 마우스 올리면 하이퍼텍스트 생성

```html
<abbr title="HyperText Markup Language">HTML</abbr>
```

## [ 앵커 태그 ]

```html
<a href="http://www.google.com" target="_blank">구글</a>
```

- `<a>`는 다른 사이트로 통하는 링크나 같은 페이지의 다른 위치로 이동하는 링크를 만들 때 사용
- `href` 속성에 값을 설정하여 이동할 곳 지정
- `target` 속성을 통해 새로운 페이지가 열릴 곳을 지정
    - `_blank` : 새로운 창
    - `_self` : 현재 창

## [ 리스트 태그 ]

### - 순서가 없는 리스트 <ul>

```html
<ul>
    <li>HTML</li> <!-- 검은 동그라미 ● -->
</ul>
<ul style="list-style-type: circle"> <!-- circle : 빈 동그라미 ○ -->
    <li>HTML</li>
</ul>
<ul style="list-style-type: square"> <!-- square : 검정 네모 ■ -->
    <li>HTML</li>
</ul>
```

- `<ul>` : 태그를 사용하여 전체 리스트 표현
- `<li>` : 태그를 사용하여 각 항목을 입력

### - 순서가 있는 리스트 <ol>

```html
<ol>
    <li>HTML</li> <!-- 1. 2. 3. -->
</ol>
<ol type="i"> <!-- i. ii. iii. -->
    <li>HTML</li>
</ol>
<ol type="A"> <!-- A. B. C. -->
    <li>HTML</li>
</ol>
<ol type="I"> <!-- I. II. III. -->
    <li>HTML</li>
</ol>
<ol type="a"> <!-- a. b. c. -->
    <li>HTML</li>
</ol>
```

- `<ol>` 태그를 사용하여 전체 리스트 표현
- `<li>` 태그를 사용하여 각 항목을 입력

## [ 테이블 태그 ]

```html
<table border="1"> <!-- 테이블 외곽선 두께 -->
  <caption>테이블 1</caption> <!-- 테이블 상단, 가운데정렬로 작성됨 -->
  <tr> <!-- <tr> : 열 추가 -->
    <th>이름</th> <!-- <th> : 행추가 -->
    <th>성별</th> <!-- <th> : table head, 굵은 폰트 -->
  </tr>
  <tr>
    <td>이수안</td>
    <td>남자</td>
  </tr>
</table>
```

- `<table>` ~ `</table>`: 테이블 생성
- `<tr>` ~ `</tr>`: 테이블의 행(row) 생성
- `<th>` ~ `</th>`: 테이블의 헤드(head) 생성
- `<td>` ~ `</td>`: 테이블의 열(column) 생성
- `<caption>` ~ `</caption>`: 테이블의 캡션 설정
- `<rowspan>`: 셀을 세로로 병합, 병합하고 싶은 행의 수를 설정
- `<colspan>`: 셀을 가로로 병합, 병합하고 싶은 열의 수를 설

---

## < 멀티미디어 태그 >

## [ 이미지 태그 ]

```html
<img src="dog.jpg" alt="강아지 사진" width="200" height="100">
<img src="cat.jpg" title="고양이 사진" style="float : right; width : 200px; height : 100px;">
```

- `src` : 이미지 파일 경로
- `title` : 이미지 제목
- `width` : 이미지 가로 크기
- `height` : 이미지 세로 크기
- `alt` : 이미지 대체 텍스트
- `style` : 이미지 스타일 정의
- `border` : 이미지 테두리 두

## [ 오디오 태그 ]

```html
<audio src="audio.mp3" conrols autoplay></audio>
```

- `src` : 오디오 파일의 경로
- `controls` : 오디오 파일의 재생 제어기 표시
- `autoplay` : 자동 재생
- `loop` : 반복 재생
- `muted` : 초기에 음소거 상태
- `preload` : 오디오 파일 미리 다운로드

## [ 비디오 태그 ]

```html
<video src="video.mp4" controls width="500" height="400"></video>
```

- `src` : 비디오 파일의 경로
- `controls` : 비디오 파일의 재생 제어기 표시
- `autoplay` : 자동 재생
- `width` : 비디오의 가로크기
- `height` : 비디오의 세로크기
- `loop` : 반복 재생
- `muted` : 초기에 음소거 상태
- `preload` : 비디오 파일 미리 다운로드
- `poster` : 비디오의 썸네일

---

## < 공간분할 태그 >

## [ 블록 분할 태그 ]

```html
<div style="border: 1px solid black">Block</div>
```

- `<div>` : 웹 문서의 전체 공간을 block 형식으로 분할

## [ 인라인 분할 태그 ]

```html
<span style="background-color: aqua">Inline</span>
```

- `<span>` : 웹 문서의 한 줄에 대해서만 inline 형식으로 분할

## [ 아이프레임 태그 ]

- `<iframe>` : 웹 문서 내에 다른 웹 문서를 표시할 때 사용

---

## < 입력 양식 태그 >

## [ 폼 태그 ]

웹에서 폼을 만드는 데 사용

```html
<form name="이름" action="sign.jsp" method="post">
    <input type="text" name="name1" value="value1">
</form>
```

- 속성
    - `name` : form 이름
    - `action` : 입력 데이터를 처리하는 웹 프로그램(JSP, PHP 등)
    - `method` : 전송 방식
    - `type` : 입력 양식 모양
- `method` 속성: 입력양식의 `method` 속성에는 입력한 데이터의 전송방식(GET/POST) 설정
    - GET 방식
        - URL의 뒷부분에 파라미터를 추가하여 데이터를 전달함
        - URL에 어떤 데이터가 전송되는지 표현되어 있으므로 보안에 취약 (검색 등에 사용)
        - 최대 글자 수: 2048
    - POST 방식
        - HTTP Request 헤더에 파라미터를 추가하여 데이터 전송
        - 어떤 데이터가 전송되는지 표면상에 보이지 않기 때문에 GET 방식보다 보안성이 높음 (로그인 등)
        - 글자 수 제한 없음

## [ 폼 요소 ]

[폼 관련 태그 (1)](https://www.notion.so/9f2e23a257854a53b2bb28a955e23c7b?pvs=21)

---

## < 입력 형식 >

- `<input>` 태그를 `<form>` ~ `</form>` 내부에서 사용되며, `type` 속성에 데이터 입력 양식 지정
- 주요 공통 속성
    - `readonly` : 읽기 전용
    - `disabled` : 비활성화
    - `autocomplete` : 자동 완성
    - `autofocus` : 웹 페이지 로드시 초기에 포커싱 설정
    - `placeholder` : 입력 폼에 희미하게 설명을 보여줌
    - `required` : 필수 속성
    - `spellcheck` : 오타 점검

### **text** 타입

```html
<input type="text" name="text" size="20" placeholder="이름">
<!-- placeholder : 희미하게 글자 표시 -->
```

### **password 타입**

```html
<input type="password" name="password" required>
<!-- required : 반드시 입력해야하는 속성 -->
```

### button 타입

```html
<input type="button" value="Button">
```

### **radio 타입 :** 여러 개의 항목 중에서 하나를 선택

```html
<input type="radio" name="gender" value="male">남자
<input type="radio" name="gender" value="female">여자
<!-- ○ 남자 ○ 여자 -->
```

### **checkbox 타입 :** 여러 개의 항목 중에서 여러개를 선택

```html
<input type="checkbox" name="food" value="pizza">피자<br>
<input type="checkbox" name="food" value="hamburger">햄버거<br>
<input type="checkbox" name="food" value="pasta">파스타<br>
<!-- □ 피자 □ 햄버거 □ 파스타 -->
```

### **date 타입**

```html
<input type="date" name="date" min="2020-01-01" max="2020-12-31">
<!-- mm/dd/yyyy -->
```

### **time 타입**

```html
<input type="time" id="time" name="time">
<!-- --:-- AM -->
```

### **color 타입**

```html
<input type="color" name="color">
```

### **number 타입**

```html
<input type="number" name="num" min="0" max="1000">
<!-- 0부터 1000까지 -->
```

### **range 타입**

```html
<input type="range" name="point" min="0" max="100">
```

### **email 타입 :** 이메일 형식을 자동 체킹

```html
<input type="email" name="email">
```

### **url 타입 :** url 형식을 자동 체킹

```html
<input type="url" name="myUrl">
```

### **tel 타입 :** 전화번호 입력

```html
<input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}">
```

### **file 타입 :** 파일 선택

```html
<input type="file" id="myfile" name="myfile">
```

### **submit과 reset 타입 :** 입력 양식의 전송과 초기화에 사용

```html
<form>
  <input type="submit" value="전송">
  <input type="reset" value="초기화">
</form>
```

---

## < class와 id >

### class 속성

- 여러 태그들을 하나의 그룹으로 그룹핑
- 태그에 `class="클래스명"` 으로 지정
- `.클래스이름`으로 선택

### id 속성

- 하나의 태그에 고유 `id` 부여
- 태그에 `id="고유id값"` 으로 지정
- `#id값`으로 선택

```html
<p id="paragraph1">첫번째 문단</p>
<p class="content1">컨텐츠 1</p>
<p class="content2">컨텐츠 2</p>
```

---

## < 시맨틱 요소 >

[시맨틱 관련 태그 (1)](https://www.notion.so/de22e0fad96c4544a3e2e99fc4971cef?pvs=21)

!https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/cf203995-5226-45a1-aae6-4c2797d867bb/semantic.png