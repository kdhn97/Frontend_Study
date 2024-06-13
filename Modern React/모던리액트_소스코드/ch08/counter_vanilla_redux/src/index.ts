import { configureStore } from '@reduxjs/toolkit';

type CounterAction = {
    type: string,
    payload: number
}
type CounterState = {
    counter: number
}

const increase = (payload: number): CounterAction => {
    return {type: "INC", payload};
};
const decrease = (payload: number): CounterAction => {
    return {type: "DEC", payload};
};

const initialState: CounterState = {
    counter: 0
};
const reducer = (state = initialState, action: CounterAction) => {
    switch(action.type) {
        case "INC":
            return {
                ...state,
                counter: state.counter + action.payload
            };
        case "DEC":
            return {
                ...state,
                counter: state.counter - action.payload
            }
        default:
            return state;
    }
}
const store = configureStore({
    reducer
});
const selectCounter = (state: CounterState) => state.counter;
const listener = () => {
    const counter = selectCounter(store.getState());
    console.log(counter);
}
const unsubscribe = store.subscribe(listener);

store.dispatch(increase(10));
store.dispatch(increase(5));
store.dispatch(increase(1));
store.dispatch(decrease(10));

unsubscribe();
