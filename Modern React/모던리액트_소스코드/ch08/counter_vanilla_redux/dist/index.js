"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const increase = (payload) => {
    return { type: "INC", payload };
};
const decrease = (payload) => {
    return { type: "DEC", payload };
};
const initialState = {
    counter: 0
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "INC":
            return Object.assign(Object.assign({}, state), { counter: state.counter + action.payload });
        case "DEC":
            return Object.assign(Object.assign({}, state), { counter: state.counter - action.payload });
        default:
            return state;
    }
};
const store = (0, toolkit_1.configureStore)({
    reducer
});
const selectCounter = (state) => state.counter;
const listener = () => {
    const counter = selectCounter(store.getState());
    console.log(counter);
};
const unsubscribe = store.subscribe(listener);
store.dispatch(increase(10));
store.dispatch(increase(5));
store.dispatch(increase(1));
store.dispatch(decrease(10));
unsubscribe();
