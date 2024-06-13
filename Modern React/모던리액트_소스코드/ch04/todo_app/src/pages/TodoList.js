import { useState } from 'react';
import TodoRow from './TodoRow';
import TodoAdd from './TodoAdd';

const initialState = [
  { id: 1, task: "리액트 마스터 하기" },
];

const TodoList = () => {
  const [todos, setTodos] = useState(initialState);
  const insertTodo = (task) => {
    setTodos(prevTodos => (
      [ ...prevTodos, 
        { id: Math.floor(Math.random() * 100) + 2, task }
      ]));
  }
  const updateTodo = (id, task) => {
    setTodos(prevTodos => (
      prevTodos.map(prev => 
        prev.id === id ? { ...prev, task } : prev)));
  }
  const deleteTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.filter(prev => prev.id !== id));
  }
  return (
    <ol className="lane">
      <TodoAdd insertTodo={insertTodo} />
      {todos.map(todo => (
        <TodoRow key={todo.id} 
              todo={todo} 
              updateTodo={updateTodo} 
              deleteTodo={deleteTodo}/>
      ))}
    </ol>
  );
}
  
export default TodoList;

