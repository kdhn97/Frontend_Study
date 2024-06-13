import useCounter from "./hooks/useCounter";
const CounterHook = () => {
    const [ counter, increase, decrease ] = useCounter(0, 1, 1);
    return (
        <>
            <h3>커스텀 카운터 훅</h3>
            <button onClick={increase}>+</button>
            <button onClick={decrease}>-</button>
            <h4>{counter}</h4>
        </>
    );
}
export default CounterHook;