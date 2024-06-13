import { useState } from "react";
import TodoInfo from './TodoInfo';
import styles from '@/styles/Todo.module.css';

const TodoRow = (props) => {
  const [isEditable, setEditable] = useState(false);
  return (
    <li className={styles.card}>
      <TodoInfo
        todo={props.todo}
        isEditable={isEditable}
        setEditable={setEditable}
        updateTodo={props.updateTodo}
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
                  onClick={() => props.deleteTodo(props.todo.id)}>
            삭제
          </button>
        </li>
      </ul>
    </li>
  );
}
export default TodoRow;

