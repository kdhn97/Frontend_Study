const increase = (payload: number): CounterAction => {
    return {type: "INC", payload};
};
const decrease = (payload: number): CounterAction => {
    return {type: "DEC", payload};
};
const actions: CounterActions = {
    increase,
    decrease
}
export default actions;