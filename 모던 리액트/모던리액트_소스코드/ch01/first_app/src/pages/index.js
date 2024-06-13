import App from './app2';
export default function Home() {
  let book = {
    title: '리액트 & 넥스트 프로그래밍',
    author: '전병선',
    price: 39000
  };
  return (
    <>
      <App book={book}>
        <p>내용: 리액트와 넥스트 프레임워크를 사용하는
          단일 페이지 애플리케이션 웹 프로그래밍을 설명한다.
        </p>
      </App>
    </>
  )
}
