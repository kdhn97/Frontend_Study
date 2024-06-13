import { useState, useCallback, useEffect } from "react";

const MultiStates = () => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState('');
    const getTodos = useCallback(async () => {
        setError('');
        try {
            const url = 'http://localhost:8000/api/v1/todos';
            const response = await fetch(url);
            if(!response.ok) {
                throw new Error('Failed!');
            }
            const todos = await response.json();
            setTodos(todos);
            setError('');
        }
        catch(error) {
            setTodos(null);
            setError(error.message)
        }
    }, []);
    useEffect(() => {
        getTodos();
    }, [getTodos]);      
    return (
        <div>
            <ul>목록</ul>
            { todos.map(todo => (
            <li key={todo.id}>{todo.task}</li>
            ))}
        </div>
    );
}
export  default MultiStates;