import { useState, useContext } from "react";
import TodoInfo from './TodoInfo';
import styles from '@/styles/Todo.module.css';
import TodoContext from './contexts/Todocontext';
import TodoActions from './hooks/reducers/action';

const TodoRow = (props) => {
  const [isEditable, setEditable] = useState(false);
  const context = useContext(TodoContext);
  const handleClick = (e) => {
    context.actions.remove(props.todo.id);
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


