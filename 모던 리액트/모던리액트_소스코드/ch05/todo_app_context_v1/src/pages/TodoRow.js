import { useState, useContext } from "react";
import TodoInfo from './TodoInfo';
import styles from '@/styles/Todo.module.css';
import TodoContext from './contexts/TodoContext';

const TodoRow = (props) => {
  const [isEditable, setEditable] = useState(false);
  const context = useContext(TodoContext);
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
                  onClick={() => context.deleteTodo(props.todo.id)}>
            삭제
          </button>
        </li>
      </ul>
    </li>
  );
}
export default TodoRow;

