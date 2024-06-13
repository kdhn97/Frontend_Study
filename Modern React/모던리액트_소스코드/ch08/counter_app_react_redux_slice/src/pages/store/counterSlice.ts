import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
const initialState = {
    counter: 0
}
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increase: (state) => {
            state.counter++;
        },
        decrease: (state) => {
            state.counter--;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.counter += action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(incrementAsync.pending, (state, action) => {
            console.log('작업 중입니다.');
          })        
        .addCase(incrementAsync.fulfilled, (state, action) => {
            console.log('작업을 완료했습니다.');
            state.counter += action.payload
        })
        .addCase(incrementAsync.rejected, (state, action) => {
            console.log('에러가 발생했습니다.');
        })        
      },  
});
export const { increase, decrease, incrementByAmount } = counterSlice.actions;
export const selectCounter = (state: RootState) => state.counter.counter;

export const incrementAsync = createAsyncThunk(
    "counter/incrementAsync",
    async (amount: number) => {
        setTimeout(() => {
            // console.log(amount);
        }, 1000);   
        return amount;   
    }
);
export default counterSlice.reducer;

