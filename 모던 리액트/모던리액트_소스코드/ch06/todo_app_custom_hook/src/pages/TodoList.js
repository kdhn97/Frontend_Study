import TodoRow from './TodoRow';
import TodoAdd from './TodoAdd';
import TodoContext from './contexts/Todocontext';
import useFetcher from './hooks/useFetcher';
const url = 'http://localhost:8000/api/v1/todos';
const TodoList = () => {
  const [todos, actions] = useFetcher(url);
  const context = {
    actions
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

