import useCounter from "./hooks/useCounter";
const CounterHook2 = () => {
    const [ counter, increase, decrease ] = useCounter(100, 10, 20);
    return (
        <>
            <h3>커스텀 카운터 훅 2</h3>
            <button onClick={increase}>+</button>
            <button onClick={decrease}>-</button>
            <h3>{counter}</h3>
        </>
    );
}
export default CounterHook2;