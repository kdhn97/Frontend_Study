import { useContext } from 'react';
import TodoRow from './TodoRow';
import TodoAdd from './TodoAdd';
import TodoContext from './contexts/TodoContext';

const TodoList = () => {
  const context = useContext(TodoContext);
  return (
    <ol className="lane">
      <TodoAdd />
      {context.todos.map(todo => (
          <TodoRow key={todo.id} 
                todo={todo} 
          />
        ))
      }
    </ol>
  );
}
  
export default TodoList;

