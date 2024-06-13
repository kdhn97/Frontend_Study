type CounterState = {
    counter: number
}
type CounterAction = {
    type: string,
    payload: number
}
type CounterActions = {
    increase: (payload: number) => CounterAction;
    decrease: (payload: number) => CounterAction; 
}