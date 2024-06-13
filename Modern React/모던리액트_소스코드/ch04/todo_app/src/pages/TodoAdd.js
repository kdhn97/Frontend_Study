import ImageButton from './components/ImageButton';
import styles from '@/styles/Todo.module.css';

const TodoAdd = (props) => {
  const handleAddTodo = (e) => {
    e.preventDefault();
    props.insertTodo(e.target.task.value);
    e.target.reset();
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