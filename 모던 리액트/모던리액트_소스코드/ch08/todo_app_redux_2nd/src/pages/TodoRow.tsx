import { useState, useContext, MouseEventHandler } from "react";
import TodoInfo from './TodoInfo';
import styles from '@/styles/Todo.module.css';
import { useAppDispatch } from './store/hooks';
import actions from './store/actions';

const TodoRow = (props: TodoProps) => {
  const dispatch = useAppDispatch();
  const [isEditable, setEditable] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    dispatch(actions.removeTodo(props.todo.id));
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


