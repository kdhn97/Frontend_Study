import { createContext } from "react";
import { useState, useEffect } from 'react';
import TodoService from '../TodoService';

const TodoContext = createContext({
    todos: [],
    insertTodo : () => {},
    UpdateTodo : () => {},
    deleteTodo : () => {}
});

export const TodoContextProvider = ({children}) => {
    const [todos, setTodos] = useState([]);
    const [fetched, setFetched] = useState(true);
    useEffect(() => {
        TodoService.getTodos().then(todos => {
        setTodos(todos);
        });
    }, [fetched]);
    const insertTodo = (task) => {
        const id = Math.floor(Math.random() * 1000) + 2;
        const todo = {id, task};
        TodoService.insertTodo(todo);
        setFetched(prev => !prev);
    }
    const updateTodo = (id, task) => {
        const todo = {id, task};
        TodoService.updateTodo(id, todo);
        setFetched(prev => !prev);
    }
    const deleteTodo = (id) => {
        TodoService.deleteTodo(id);
        setFetched(prev => !prev);
    }
    const context = {
        todos,
        insertTodo,
        updateTodo,
        deleteTodo
    };  
    return (
        <TodoContext.Provider value={context}>
            {children}
        </TodoContext.Provider>
    )
}
export default TodoContext;

