// import React from "react";
const App = (props) => {
    const isLoggedIn = false;
    const arr = [1, 2, 3, 4, 5];
    return (
      <>
        <h1>리액트 시작</h1>
        <p>안녕? {props.name}!</p>
        <div>도서명 : {props.book.title}</div>
        <div>저자 : {props.book.author}</div>
        <div>가격 : {props.book.price}원</div>
        {props.children}
        {isLoggedIn && <p>반값습니다!</p>}
        {isLoggedIn || <p>로그인 해주세요!</p>}
        <ul>
          {arr.map(a => {
            return <li key={a}>항목{a}</li>
          })}
        </ul>
        <button onClick="handleClick" className="btn">실행</button>
      </>
    );
}
App.defaultProps = {
  name: '리액트'
};
export default App;
// import PropTypes from 'prop-types';
// const App = ({title, author, price}) => {
//   return (
//     <>
//       <h1>리액트 시작</h1>
//       <div>도서명 : {title}</div>
//       <div>저자 : {author}</div>
//       <div>가격 : {price}원</div>
//     </>
//   );
// }
// App.propTypes = {
//   title: PropTypes.string,
//   author: PropTypes.string.isRequired,
//   price: PropTypes.number
// };
// export default App;