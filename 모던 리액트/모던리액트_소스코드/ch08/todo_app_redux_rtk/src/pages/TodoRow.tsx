import { useState } from "react";
import TodoInfo from './TodoInfo';
import styles from '@/styles/Todo.module.css';
import { useDeleteTodoMutation } from './store/apiSlice';

const TodoRow = (props: TodoProps) => {
  const [isEditable, setEditable] = useState(false);
  const [deleteTodo] = useDeleteTodoMutation();
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await deleteTodo(props.todo.id);
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


