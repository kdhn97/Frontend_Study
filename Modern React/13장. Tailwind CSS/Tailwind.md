# 13장. Tailwind CSS

### Tailwind CSS 개요

- 유틸리티 클래스(Utility Class) + CSS 사전처리기(Preprocessor)

  - 유틸리티 클래스 : 단 하나의 목적을 갖는 작은 클래스, 미리 정의된 CSS 규칙에 따라 스타일 생성

  ```TSX
    <button className='bg-blue-500 text-white py-2 px-4 rounded'>클릭하세요</button>
  ```

| 분류     | 클래스          | 설명                                                      |
| -------- | --------------- | --------------------------------------------------------- |
| 레이아웃 | container       | 요소를 화면 크기의 최대 폭으로 설정하고 중앙 정렬         |
|          | mx-auto         | 부모 요소 안에서 중앙 정렬 + 수평 바깥 여백을 auto로 설정 |
|          | flex            | 요소를 플렉스 컨테이너로 설정                             |
|          | justify-center  | justify-content 애트리뷰트를 center로 설정                |
|          | items-center    | align-items 애트리뷰트를 center로 설정                    |
| 글꼴     | text-center     | 텍스트를 수평으로 중앙 정렬                               |
|          | font-bold       | 글꼴을 굵은체로 지정                                      |
| 색       | bg-gray-100     | 배경색을 회색으로 지정                                    |
|          | text-gray-500   | 텍스트 색을 회색으로 지정                                 |
|          | border-gray-500 | 경계색을 회색으로 지정                                    |
| 간격     | m-2             | 바깥 여백을 2 단위로 설정                                 |
|          | p-2             | 안쪽 여백을 2 단위로 설정                                 |
|          | mx-2            | 수평 바깥 여백을 2 단위로 설정                            |
|          | my-2            | 수직 바깥 여백을 2 단위로 설정                            |
| 그리드   | grid-cols-2     | 2개의 동일한 크기 열로 그리드 생성                        |
|          | grid-rows-2     | 2개의 동일한 크기 행으로 그리드 생성                      |
|          | grid-flow-col   | 그리드에 열로 자동 배치                                   |
|          | grid-flow-row   | 그리드에 행으로 자동 배치                                 |

- 반응형 웹 페이지
  | 중단점 접두어 | 최소 폭 | CSS |
  | sm | 640px | @medial (min-width: 640px) |
  | md | 768px | @medial (min-width: 768px) |
  | lg | 1024px | @medial (min-width: 1024px) |
  | xl | 1280px | @medial (min-width: 1280px) |
  | 2xl | 1536px | @medial (min-width: 1536px) |

  ```TSX
    <div className='bg-gray-500 sm:bg-blue-500 md:bg-green-500 lg:bg-red-500'>반응형 디자인</div>
  ```

- Tailwind 생성

  - create-next-app 프로젝트 생성 시 Tailwind CSS 옵션을 Yes로 선택
  - global.css 파일에 @tailwind 지시어 추가

- Tailwind 지시어

  - @tailwind base;

    - 사전 작업 : Tailwind CSS의 재설정 스타일시트 포함
      -> 최소한의 스타일 애트리뷰트로, 모든 기본적인 HTML 요소를 다시 스타일링한다
      -> 각 웹 브라우저는 기본 스타일로 설정되어 있기 때문에, 기본 스타일로 초기화

  - @tailwind components;

    - 컨테이터 CSS 클래스 정의, 페이지의 최상위 수준에서 전체 페이지가 그려지는 상자 정의

  - <mark> @tailwind utilities; </mark>
    - 모든 유틸리티와 접두어를 갖는 변형 정의

  ```TSX
  // Tailwind CSS 중복 사용 관리 (클래스 셀렉터)
    @layer components {
      .title {@apply text-6xl font-bold}
      .subtitle {@apply text-4xl font-semi-bold}
    }
  // 위와 같이 정의하면 중복 사용 가능
  // 하지만 utilities가 나중에 적용되기에 .title에 정의된 text-6xl 대신 text-3xl 적용
  <h1 className='title text-3xl'>헤더</h1>
  ```

  ```TSX
  // Tailwind CSS 중복 사용 관리 (태그)
    @layer base {
      h1 {@apply text-4xl font-bold}
      h2 {@apply text-2xl font-semi-bold}
    }
  // 위와 같이 정의하면 중복 사용 가능
  <h1>헤더</h1>
  ```

### 텍스트

### 사각형

### 레이아웃
