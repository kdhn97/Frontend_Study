import { useState, useEffect } from 'react';
import TodoRow from './TodoRow';
import TodoAdd from './TodoAdd';
import TodoService from './TodoService';
import TodoContext from './contexts/TodoContext';

// const initialState = [
//   { id: 1, task: "리액트 마스터 하기" },
// ];
const TodoList = () => {
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
    insertTodo,
    updateTodo,
    deleteTodo
  };
  return (
    <TodoContext.Provider value={context}>
      <ol className="lane">
        <TodoAdd />
        {todos.map(todo => (
            <TodoRow key={todo.id} 
                     todo={todo} 
            />
          ))
        }
      </ol>
    </TodoContext.Provider>    
  );
}
  
export default TodoList;

