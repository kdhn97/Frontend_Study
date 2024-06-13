import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";
import actions from "./actions";

const initialState: Todos = [];
export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        // get: (state: Todos, action: PayloadAction<Get>) => {
        //     return [...action.payload.data];
        // },
        // insert: (state: Todos, action: PayloadAction<Insert>) => {
        //     return [...state, action.payload.data];
        // },
        // update: (state, action: PayloadAction<Update>) => {
        //     state = state.filter(data => data.id != action.payload.id);
        //     return [...state, action.payload.data];          
        // },
        // remove: (state, action: PayloadAction<Remove>) => {
        //     return state.filter(data => data.id != action.payload.id);
        // }       
    },
    extraReducers: (builder) => {
        builder
        .addCase(actions.getTodos.pending, (state, action) => {
            console.log('작업 중입니다.');
        })        
        .addCase(actions.getTodos.fulfilled, (state, action) => {
            console.log('작업을 완료했습니다.');
            return [...action.payload];
        })
        .addCase(actions.getTodos.rejected, (state, action) => {
            console.log('읽는 중 에러가 발생했습니다.');
        })
        .addCase(actions.insertTodo.fulfilled, (state, action) => {
            return [...state, action.payload.data];
        })
        .addCase(actions.insertTodo.rejected, (state, action) => {
            console.log(action.payload);
        })  
        .addCase(actions.updateTodo.fulfilled, (state, action) => {
            state = state.filter(data => data.id != action.payload.id);
            return [...state, action.payload.data]; 
        })
        .addCase(actions.updateTodo.rejected, (state, action) => {
            console.log(action.payload);
        }) 
        .addCase(actions.removeTodo.fulfilled, (state, action) => {
            return state.filter(data => data.id != action.payload.id);
        })
        .addCase(actions.removeTodo.rejected, (state, action) => {
            console.log(action.payload);
        })                                                   
    }     
});
// export const { get, insert, update, remove } = todoSlice.actions;
export const selectAllTodos = (state: RootState) => state.todos;
// export const getTodos = () => async (dispatch:AppDispatch) => {
//     const todos = await services.get();
//     dispatch(get({data: todos}));
// }

export default todoSlice.reducer;

