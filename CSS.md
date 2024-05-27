- CSS : 웹 페이지의 **디자인** 담당

[CSS 한번에 끝내기 CSS Full Tutorial](https://youtu.be/J3ef9c-sZ14?si=FXf1FzwjwXIph3XU)

[CSS 한번에 끝내기](https://www.notion.so/CSS-c4af7d87a8da44b6970e2d826e15d032?pvs=21)

---

## < CSS 개요 >

- W3C(World Wide Web Consortium)에서 만든  HTML 요소들의 스타일 시트 언어
- HTML만으로 웹 페이지를 만들 경우, 매우 많은 시간이 걸리며, 스타일의 변경 및 유지 보수가 매우 힘들다는 단점을 CSS를 통해서 해결
- CSS는 별도 파일로 웹 페이지의 스타일을 저장할 수 있고, 사이트의 전체 스타일을 쉽게 제어/변경 가능

## [ CSS 구성 요소 ]

- 선택자(p) { 속성명(color) : 속성 값(purple); }

```css
p {
  color: purple;
  text-align: center;
}
```

## [ CSS 적용 방법 ]

### **인라인 스타일 :** HTML 요소의 여는태그에 style 속성으로 지정

```html
<p style="color: red; background-color: yellow">인라인 스타일</p>
```

### **내부 스타일 :** 같은 HTML 문서 내부에 <style>태그를 사용하여 지정

```html
<!DOCTYPE html>
<html>
  <head>
    <title>내부 스타일</title>
    <style>
      p {
        color: blue;
        background-color: yellow;
      }
    </style>
  </head>
  <body>
    <p>내부 스타일</p>
  </body>
</html>
```

### **외부 스타일 :** HTML 문서와는 별개의 파일로 style을 지정

- **style.css**

```css
p {
  color: red;
}
```

- **index.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>외부 스타일<title>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
    <p>외부 스타일</p>
  </body>
</html>
```

## 주석 처리

```css
/* 주석 */
```

---

## < CSS 선택자 >

## [ 기본 선택자 ]

[기본 선택자 태그 (1)](https://www.notion.so/f1e70f8473004c1f90c018be1cebc346?pvs=21)

```css
<!DOCTYPE html>
<html>
  <head>
    <style>
      p {
        background-color: yellow;
      }
      #id1 {
        color: yellow;
        background-color: black;
      }
      .class1 {
        color: blue;
        background-color: yellow;
      }
      p.class1 {
        color: red;
        background-color: navy;
      }
      h1 {
        color: green;
      }
      h1[text] { /* [ ] : 특정 속성만 변경 */
        color: purple;
      }
      input[type="password"] { /* [type=" "] : 해당 타입만 변경 */
        background: yellow;
      }
    </style>
  </head>
  <body>
    <p>p</p>
    <p id="id1">id1인 p</p>
    <p class="class1">class1인 p</p>
    <p class="class2">class2인 p</p>
    <h1>h1</h1>
    <h1 text="h1_text">text 속성 h1</h1>
    <form>
      <input type="password">
    </form>
  </body>
</html>
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/ea82ba55-5fa4-42a2-8454-e415cadbc2db/Untitled.png)

## [ 반응 선택자 ]

```css
<!DOCTYPE html>
<html>
  <head>
    <style>
      a:link { color: blue; } /* 방문하지 않은 링크 */
      a:visited { color: purple; } /* 방문했던 링크 */
      a:hover { color: red; } /* 마우스를 올려놓는 순간 */
      a:active { color: black; } /* 클릭하는 순간 */
  
      div.d1:hover { background-color: yellow; }
    </style>
  </head>
  <body>
    <a href="http://www.google.com">구글 링크</a>
    <div class="d1">
      <p>div영역</p>
      <p>class=d1</p>
    </div>
  </body>
</html>
```

## [ 구조 선택자 ]

```css
<!DOCTYPE html>
<html>
<head>
    <style>
        p { background-color: lightsteelblue; }
        p:nth-child(1) { font-size: 400%; } /* 순서와 일치하는 p 태그 선택 */
        p:nth-child(2) { font-size: 100%; }
    </style>
</head>
<body>
    <p>Suan</p>
    <p>Suan</p>
</body>
</html>
```

## [ 상태 선택자 ]

```css
<!DOCTYPE html>
<html>
<head>
    <title>CSS3 Selector Basic</title>
    <style>
        input:enabled { background-color: skyblue; } /* 사용 가능한 form 생성 */
        input:disabled { background-color: darkgray; } /* 사용 불가능한 form 생성 */
        input:focus { background-color: yellow; } /* 마우스로 누르면 form 색상 변경 */
    </style>
</head>
<body>
    <input>
    <input disabled="disabled"/>
    <input>
</body>
</html>
```

## [ 기타 선택자 ]

```css
<!DOCTYPE html>
<html>
<head>
    <style>
        div::first-letter { font-size: 30px; } /* div 태그의 첫번째 문자 선택 */
        div::first-line { color: royalblue; } /* div 태그의 첫번째 줄 선택 */
        div::selection { background: yellow; color: red; } /* div 선택하면 색상 변경 */
    </style>
</head>
<body>
    <div>이수안 컴퓨터 연구소<br />
        SuanLab<br />
        이수안 컴퓨터 연구소
    </div>
</body>
</html>
```

## [ 선택자 조합 ]

```css
<!DOCTYPE html>
<html>
<head>
    <style>
        div h1 { color: red; }
        h1 + h2 { color: green; } /* A 선택자 바로 다음의 B 선택자 선택 */
        h2 ~ h3 { background-color: yellow; } /* A 선택자 다음에 인접해있는 모든 선택자 B 선택 */
        h4, h5 { font-size: 200% } /* 선택자 A와 선택자 B 선택 */
    </style>
</head>
<body>
    <div>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
				<h5>Heading 5</h5>
    </div>
</body>
</html>
```

---

## < CSS 스타일 >

## [ 박스 스타일 ]

- 박스 스타일
    - 웹 페이지에 다양한 요소를 배치하기 위해 사용
    - content - padding - border - margin
    - content : 실제 내용
    - padding : content와 테두리 사이 공간
    - border : 테두리 두께
    - margin : 테두리와 최종경계 사이 여백

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/d19f9ad3-44f2-4548-913d-7640fdb34526/550773bb-b140-4834-88db-a320f1b78fa5/Untitled.png)

## [ 테두리 스타일 ]

- border-style: solid; : 직선
- border-style: dotted; : 점선
- border-width : 1px 2px 3px 4px; : 각 테두리의 두께를 다르게 설정
- border-radius : 10px; : 곡선
- border-color : red; : 테두리 색상

## [ 배경 스타일 ]

- background-color: red; : 배경 색상
- background-image: url(” "); : 배경 전체 영역
- background-repeat: no-repeat; : 배경 일부 영역
- background-attachment: fixed; : 스크롤 내려도 고정
- background-position: top; : 위치 ( top, bottom, left, right )

## [ 글자 스타일 ]

- font-size : 30px; : 폰트 사이즈
- font-style: italic; : 폰트 스타일
- font-weight: bold; : 폰트 굵기
- text-align: center; : 텍스트 위치

---

## < CSS 속성 >

## [ 가시 속성 ]

- display: inline; : 옆으로 연결되어 출력됨
- display: block; : 한 줄 전체가 블록으로 잡힘
- display: none; : 삭제, 존재하지 않게 함
- visibility: hidden; : 눈에 보이지 않게 만듬
- opacity: 0.5 : 투명도

## [ 위치 속성 ]

- position: static; : 기본 위치
- position: relative; : top, bottom ,left, right만큼 위치 조정 (다른 물체와 겹치지 않음)
- position: absolute; : top, bottom ,left, right만큼 위치 조정 (다른 물체가 있어도 상관X)
- position: fixed; : 스크롤을 움직여도 화면에 고정됨
- position: sticky; : 일정한 위치에 고정시킴
- z-index : -1; : 숫자가 낮을수록 뒤로 , 숫자가 클수록 앞으로 겹침

## [ overflow 속성 ]

- overflow: scroll; : 화면을 벗어나면 스크롤 생성
- overflow: hidden; : 화면을 벗어나면 오버되는 부분이 삭제됨

## [ float 속성 ]

- float: right; : 이미지 오른쪽 생성
- float: left; : 이미지 왼쪽 생성