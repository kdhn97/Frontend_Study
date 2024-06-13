import { useState, useEffect } from 'react';
import TodoRow from './TodoRow';
import TodoAdd from './TodoAdd';
import TodoService from './TodoService';

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
  // useEffect(() => {
  //   fetch('http://localhost:8000/api/v1/todos')
  //     .then(response => response.json())
  //     .then(todos => setTodos(todos));
  // }, [fetched]);
  // useEffect(async () => {
  //   const response = await fetch('http://localhost:8000/api/v1/todos');
  //   const todos = await response.json();
  //   setTodos(todos);
  // }, []);
  const insertTodo = (task) => {
    const id = Math.floor(Math.random() * 1000) + 2;
    const todo = {id, task};
    TodoService.insertTodo(todo);
    // fetch('http://localhost:8000/api/v1/todos', {
    //   method: 'POST',
    //   headers: {'content-type': 'application/json'},
    //   body: JSON.stringify(todo)
    // });
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
  return (
    <ol className="lane">
      <TodoAdd insertTodo={insertTodo} />
      {todos.map(todo => (
          <TodoRow key={todo.id} 
                todo={todo} 
                updateTodo={updateTodo} 
                deleteTodo={deleteTodo}/>
        ))
      }
    </ol> 
  );
}
  
export default TodoList;

