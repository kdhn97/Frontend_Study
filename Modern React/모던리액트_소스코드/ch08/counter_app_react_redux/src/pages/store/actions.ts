import { createAction } from "@reduxjs/toolkit";
const increase = createAction<undefined>("INC");
const decrease = createAction<undefined>("DEC");
const incByAmount = createAction<number>("INCBYAMOUNT");
const actions = {
    increase,
    decrease,
    incByAmount,
}
export default actions;