import styles from '@/styles/Todo.module.css';

const TodoInfo = (props) => {
    return (
      <li className={styles.card}>
        <header className={styles.cardHeader}>
          <p className={styles.cardTitle}>{props.children}</p>
        </header>
        <ul className={styles.cardControls}>
          <li>
            <button className={styles.cardControl}변경</button>
          </li>
          <li>
            <button className={styles.cardControl}>삭제</button>
          </li>
        </ul>
      </li>
    );
}
export default TodoInfo;

