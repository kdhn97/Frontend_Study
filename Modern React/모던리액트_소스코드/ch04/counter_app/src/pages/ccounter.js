import React from "react";
export default class CCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
    }
    increase = () => {
        this.setState({counter: this.state.counter + 1});
    }
    decrease = () => {
        this.setState({counter: this.state.counter - 1});
    }

    componentDidMount() {
        console.log("마운트를 완료했습니다.");
    }
    componentDidUpdate() {
        console.log("업데이트를 완료했습니다.");
    }
    render() {
        return (
            <>
                <h1>{this.props.title}</h1>
                <button onClick={this.increase}>+</button>
                <button onClick={this.decrease}>-</button>
                <h2>{this.state.counter}</h2>
            </>
        );
    }
}

CCounter.defaultProps = {
    title: "클래스 컴포넌트"
};



