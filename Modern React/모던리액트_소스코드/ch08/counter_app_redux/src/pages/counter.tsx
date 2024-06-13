import { useState, useEffect } from 'react';
import store from './store';
import actions from './actions';

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const dispatch = store.dispatch;
  const selectCounter = (state: CounterState) => state.counter;
  const listener = () => {
    const counter = selectCounter(store.getState());
    setCounter(counter);
  }
  useEffect(() => {
    const unsubscribe = store.subscribe(listener);
    return unsubscribe;
  }, []);
  const {increase, decrease} = actions;
  const handleIncrease = () => {
    dispatch(increase(10));
  };
  const handleDecrease = () => {
    dispatch(decrease(5));
  };
  return (
        <div>
          <h3>카운터</h3>
          <div>
            <button
              onClick={handleIncrease}
            >
              +
            </button>
            <button
              onClick={handleDecrease}
            >
              -
            </button>
          </div>
          <h4>{counter}</h4>
        </div>
    );
};

export default Counter;

