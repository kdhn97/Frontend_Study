import ImageButton from './components/ImageButton';
import styles from '@/styles/Todo.module.css';
import { useInsertTodoMutation } from './store/apiSlice';
const TodoAdd = () => {
  const [insertTodo] = useInsertTodoMutation();
  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 1000) + 2;
    const todo = {id, task: e.currentTarget.elements["task"].value};
    e.currentTarget.reset();
    await insertTodo(todo);
  }
  return (
      <li className={styles.card}>
        <header className={`${styles.cardHeader} ${styles.cardHeaderNew}`}>
          <form className={styles.cardTitleForm} onSubmit={handleAddTodo}>
            <input
              className={`${styles.cardTitle} ${styles.cardTitleInput}`}
              placeholder="새로운 할 일을 입력하세요"
              name="task"
            />
            <ImageButton icon="plus" label="추가" />
          </form>
        </header>
      </li>
    );
}

export default TodoAdd;

