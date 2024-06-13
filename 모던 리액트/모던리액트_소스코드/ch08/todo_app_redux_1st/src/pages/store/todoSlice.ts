import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import services from "../services/service";

const initialState: Todos = [];
export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        get: (state: Todos, action: PayloadAction<Get>) => {
            return [...action.payload.data];
        },
        insert: (state: Todos, action: PayloadAction<Insert>) => {
            return [...state, action.payload.data];
        },
        update: (state, action: PayloadAction<Update>) => {
            state = state.filter(data => data.id != action.payload.id);
            return [...state, action.payload.data];          
        },
        remove: (state, action: PayloadAction<Remove>) => {
            return state.filter(data => data.id != action.payload.id);
        }       
    }
});
export const { get, insert, update, remove } = todoSlice.actions;
export const selectAllTodos = (state: RootState) => state.todos;
export const getTodos = () => async (dispatch:AppDispatch) => {
    const todos = await services.get();
    dispatch(get({data: todos}));
}
export default todoSlice.reducer;