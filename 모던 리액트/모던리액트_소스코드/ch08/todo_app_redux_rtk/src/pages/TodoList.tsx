import TodoRow from './TodoRow';
import TodoAdd from './TodoAdd';
import { useGetTodosQuery } from './store/apiSlice';

const TodoList = () => {
  const {data = []} = useGetTodosQuery(); 
  return (
      <ol className="lane">
        <TodoAdd />
        {data.map(todo => (
            <TodoRow key={todo.id} 
                     todo={todo} 
            />
          ))
        }
      </ol> 
  );
}
  
export default TodoList;

