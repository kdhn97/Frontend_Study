import { useState, useEffect } from 'react';
const Counter = (props) => {
    const [counter, setCounter] = useState(0);

    const increase = () => {  
        setCounter(prev => {
            console.log("카운터 : " + prev);
            return prev + 1;
        });
    };
    useEffect(() => {
        const interval = setInterval(increase, 1000);
        return () => {
            console.log("clearInterval()이 호출됨...");
            clearInterval(interval);
        }
    }, []);

    return (
        <>
            <h3>카운터</h3>
            <div>{counter}</div>
            <button onClick={() => { props.setEffect(false); }}>종료</button>
        </>
    );
}
export default Counter;


