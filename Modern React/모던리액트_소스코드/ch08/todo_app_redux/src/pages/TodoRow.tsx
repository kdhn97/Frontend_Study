import { useState } from "react";
import actions from './store/actions';
import TodoInfo from './TodoInfo';
import styles from '@/styles/Todo.module.css';
import { useAppDispatch } from './store/hooks';

const TodoRow = (props: Props) => {
  const [isEditable, setEditable] = useState(false);
  const dispatch = useAppDispatch();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    dispatch(actions.removeTodo(props.todo.id));
  }
  return (
    <>
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
    </>
  );
}
export default TodoRow;


