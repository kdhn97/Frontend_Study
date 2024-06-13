import { useEffect } from 'react';
import TodoRow from './TodoRow';
import TodoAdd from './TodoAdd';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { selectAllTodos } from './store/todoSlice';
import actions from './store/actions';

const TodoList = () => {
  const todos = useAppSelector(selectAllTodos);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actions.getTodos());
  }, []);
  return (
      <ol className="lane">
        <TodoAdd />
        {todos.map(todo => (
            <TodoRow key={todo.id} 
                     todo={todo} 
            />
          ))
        }
      </ol> 
  );
}
  
export default TodoList;

