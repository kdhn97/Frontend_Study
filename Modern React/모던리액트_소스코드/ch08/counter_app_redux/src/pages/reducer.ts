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
export default reducer;