import { useState } from 'react'

const Counter = () => {
    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(0);
    const [counter3, setCounter3] = useState(0);
    console.log("재평가되었습니다!");
    const increase = () => {
      setCounter1(counter1 + 1);
      setCounter2(counter2 + 1);
      setCounter3(counter3 + 1);
    }
    const decrease = () => {
      setCounter1(counter1 - 1);
      setCounter2(counter2 - 1);
      setCounter3(counter3 - 1);
    }
    return (
        <div>
          <h3>카운터</h3>
          <button onClick={increase}>+</button>
          <button onClick={decrease}>-</button>
          <h4>{counter1}</h4>
          <h4>{counter2}</h4>
          <h4>{counter3}</h4>
        </div>
    );
}

export default Counter;