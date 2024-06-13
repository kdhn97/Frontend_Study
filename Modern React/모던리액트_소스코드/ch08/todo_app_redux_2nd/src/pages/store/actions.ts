import { createAsyncThunk } from "@reduxjs/toolkit";
import services from "../services/service";

export const getTodos = createAsyncThunk(
    "todos/getTodos",
    async () => {
        return await services.get();
    }
);
export const insertTodo = createAsyncThunk(
    "todos/insertTodo",
    async (todo: Todo, {rejectWithValue}) => {
        try {
            const response = await services.insert(todo); 
            return {data: todo};
        } catch(error) {
            return rejectWithValue(error.message);
        }
    }
);
export const updateTodo = createAsyncThunk(
    "todos/updateTodo",
    async (todo: Todo, {rejectWithValue}) => {
        try {
            const response = await services.update(todo.id, todo); 
            return {id: todo.id, data: todo};
        } catch(error) {
            return rejectWithValue(error.message);
        }
    }
);
export const removeTodo = createAsyncThunk(
    "todos/removeTodo",
    async (id: number, {rejectWithValue}) => {
        try {
            const response = await services.remove(id); 
            return {id};
        } catch(error) {
            return rejectWithValue(error.message);
        }
    }
);
const actions = {
    getTodos,
    insertTodo,
    updateTodo,
    removeTodo
};
export default actions;