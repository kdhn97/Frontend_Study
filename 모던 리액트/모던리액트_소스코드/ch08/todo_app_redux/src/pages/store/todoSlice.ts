import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from './store'
import services from '../services/service';

const initialState: Todos = [];
export const todoSlice = createSlice({
    name: 'todos',
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
    },
    extraReducers: (builder) => {
        builder
        .addCase(getTodos.pending, (state, action) => {
            console.log('작업 중입니다.');
        })        
        .addCase(getTodos.fulfilled, (state, action) => {
            console.log('작업을 완료했습니다.');
            return [...action.payload];
        })
        .addCase(getTodos.rejected, (state, action) => {
            console.log('에러가 발생했습니다.');
        })
        .addCase(insertTodo.fulfilled, (state, action) => {
            console.log('insertTodo 작업을 완료했습니다.');
            return [...state, action.payload.data];
        }) 
        .addCase(insertTodo.rejected, (state, action) => {
            console.log('insertTodo 에러가 발생했습니다.');
        })                       
    },      
});
export const { get, insert, update, remove } = todoSlice.actions;
export const selectAllTodos = (state: RootState) => state.todos;
// export const getTodos = () => async (dispatch:AppDispatch) => {
//     const todos = await services.get();
//     dispatch(get({data: todos}));
// }
export const getTodos = createAsyncThunk(
    "todos/getTodos",
    async () => {
        return await services.get();
    }
);
export const insertTodo = createAsyncThunk(
    "todos/insertTodo",
    async (todo: Todo, { rejectWithValue }) => {
        try {
        const response = await services.insert(todo);
        if(!response.ok) throw Error("dfsafdsaf");
        return {data: todo};
        }  catch(err) {
            return rejectWithValue({data: todo});
        }
    }
)
export default todoSlice.reducer;