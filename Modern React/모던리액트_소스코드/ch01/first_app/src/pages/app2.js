import React from "react";
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.book = props.book;
    }
    render() {
        // const {title, author, price} = this.props.book;
        return (
            <>
              <h1>리액트 시작</h1>
              <div>도서명 : {this.book.title}</div>
              <div>저자 : {this.book.author}</div>
              <div>가격 : {this.book.price}원</div>
              {this.props.children}
            </>
          );
    }
}