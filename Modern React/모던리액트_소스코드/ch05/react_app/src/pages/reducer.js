import { useReducer } from 'react';
const reducer = (state, action) => {
    switch(action.type) {
        case "INC":
            return {...state, counter: state.counter + 1};
        case "DEC":
            return {...state, counter: state.counter - 1};
        default:
            return state;
    };
}

const Counter = () => {
    const [state, dispatch] = useReducer(reducer, {counter: 0});
    const increase = () => {
      dispatch({
        type: "INC"
      })
    }
    const decrease = () => {
      dispatch({
        type: "DEC"
      })     
    }
    return (
        <div>
          <h1>카운터</h1>
          <button onClick={increase}>+</button>
          <button onClick={decrease}>-</button>
          <h2>{state.counter}</h2>
        </div>
    );
}

export default Counter;

