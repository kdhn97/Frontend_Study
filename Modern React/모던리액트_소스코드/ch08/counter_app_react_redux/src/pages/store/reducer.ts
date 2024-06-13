import {createReducer, createAsyncThunk, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store'
import actions from './actions';
const initialState: CounterState = {
    counter: 0
};
const {increase, decrease, incByAmount} = actions;
const isNumberPayload = (
    action: AnyAction
  ): action is PayloadAction<number> => {
    return typeof action.payload === 'number'
}
const reducer = createReducer(
    initialState,
    (builder) => {
        builder
        .addCase(increase, (state, action) => {
            state.counter += 1
        })
        .addCase(decrease, (state, action) => {
            state.counter -= 1
        })   
        .addCase(incByAmount, (state, action) => {
            state.counter += action.payload
        })
        .addMatcher(isNumberPayload, (state, action) => {
            state.counter += action.payload
        })        
        .addDefaultCase((state, action) => state)
   }
);
export const incrementAsync = createAsyncThunk(
    "INCBYAMOUNT",
    async (amount: number) => {
        setTimeout(() => {
            console.log(amount);
        }, 1000);   
        return amount;   
    }
);
export const selectCounter = (state: RootState) => state.counter;
export default reducer;