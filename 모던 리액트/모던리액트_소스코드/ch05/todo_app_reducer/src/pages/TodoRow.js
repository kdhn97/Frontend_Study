import { useState, useContext } from "react";
import TodoInfo from './TodoInfo';
import styles from '@/styles/Todo.module.css';
import TodoContext from './contexts/TodoContext';
import TodoActions from './reducers/action';

const TodoRow = (props) => {
  const [isEditable, setEditable] = useState(false);
  const context = useContext(TodoContext);
  const handleClick = (e) => {
    TodoActions.deleteTodo(props.todo.id, context.dispatch);
  }
  return (
    <li className={styles.card}>
      <TodoInfo
        todo={props.todo}
        isEditable={isEditable}
        setEditable={setEditable}
      />
      <ul className={styles.cardControls}>
        <li>
          <button className={styles.cardControl} 
                  onClick={() => setEditable(true)}>  
            변경
          </button>
        </li>
        <li>
          <button className={styles.cardControl}
                  onClick={handleClick}>
            삭제
          </button>
        </li>
      </ul>
    </li>
  );
}
export default TodoRow;

