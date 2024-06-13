import { useState } from 'react';

const useCounter = (init, inc, dec) => {
    const [counter, setCounter] = useState(init);
    const increase = () => {
        setCounter(prev => prev + inc);
    }
    const decrease = () => {
        setCounter(prev => prev - dec);
    }
    return [ counter, increase, decrease ];
}

export default useCounter;
