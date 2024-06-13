import { useState } from 'react';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { selectCounter, increase, decrease, incrementByAmount, 
         incrementAsync } from './store/counterSlice';

const Counter = () => {
  const [amount, setAmount] = useState(3);
  const counter = useAppSelector(selectCounter);
  const dispatch = useAppDispatch();
  const handleIncrease = () => {
    dispatch(increase());
  };
  const handleDecrease = () => {
    dispatch(decrease());
  };
  const handleIncByAmount = () => {
    dispatch(incrementByAmount(amount));
  };
  const handleIncrementAsync = () => {
    dispatch(incrementAsync(amount));
  }
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
          <div>
            <input
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
            />
            <button
                onClick={handleIncByAmount}
              >
                +
            </button>
            <button
              onClick={handleIncrementAsync}
            >
              Async +
          </button>                           
          </div>
          <h4>{counter}</h4>
        </div>
    );
};

export default Counter;

