import { useEffect, useReducer } from 'react';
const reducer = (state, action) => {
    switch(action.type) {
      case "ADD":
        return [...state, action.payload];
      case "GET":
          return [...action.payload]
        break;
      default:
        return state;
    };
}

const Todo = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const getTodos = async () => {
    const url = 'http://localhost:8000/api/v1/todos';
    const response = await fetch(url);
    const todos = await response.json();
    dispatch({
      type: "GET", 
      payload: todos
    });
  };
  useEffect(() => {
    getTodos();
  }, []);
    
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 1000) + 2;
    const task = e.target.task.value;
    const todo = {id, task};
    dispatch({
      type: "ADD",
      payload: todo
    });
  }
  return (
      <section>
        <h1>할 일 관리</h1>
        <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor='task'>할 일: </label>
              <input id="task" />
              <button type="submit">저장</button>
            </form>
        </div>
        <div>
          <ul>목록</ul>
          { todos.map(todo => (
            <li key={todo.id}>{todo.task}</li>
          ))}
        </div>
      </section>
  );
}

export default Todo;


