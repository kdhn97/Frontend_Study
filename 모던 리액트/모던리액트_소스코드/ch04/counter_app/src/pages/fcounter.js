import { useEffect, useState } from "react";
export default function FCounter(props) {
    console.log("Counter 컴포넌트가 마운트되었습니다.")
    const [counter, setCounter] = useState(0);
    useEffect(() => {
      console.log("counter 상태가 업데이트되었습니다.");
    }, [counter]);
    const increase = () => {
      setCounter(counter + 1);
    }
    const decrease = () => {
      setCounter(counter - 1);
    }
    return (
        <div>
          <h1>{props.title}</h1>
          <button onClick={increase}>+</button>
          <button onClick={decrease}>-</button>
          <h2>{counter}</h2>
        </div>
    );
}


FCounter.defaultProps = {
  title: "함수형 컴포넌트"
};