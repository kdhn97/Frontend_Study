import { useEffect, useReducer } from 'react';
import TodoRow from './TodoRow';
import TodoAdd from './TodoAdd';
// import TodoService from './TodoService';
import TodoActions from './reducers/action';
import { reducer } from './reducers/reducer';
import TodoContext from './contexts/TodoContext';


const initialState = [
  { id: 1, task: "리액트 마스터 하기" },
];
const TodoList = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  // const getTodos = async () => {
  //   const json = TodoService.getTodos();
  //   Promise.resolve(json).then(todos => dispatch({
  //     type: "GET",
  //     payload : todos
  //   }));
  // }
  // useEffect(() => {
  //   getTodos();
  // }, []);
  useEffect(() => {
    TodoActions.getTodos(dispatch);
  }, []);
  const context = {
    dispatch
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

