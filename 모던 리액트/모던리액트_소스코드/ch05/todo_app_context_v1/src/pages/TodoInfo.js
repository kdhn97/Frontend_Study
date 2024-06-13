import { useContext } from 'react';
import TodoContext from './contexts/TodoContext';
import ImageButton from './components/ImageButton';
import styles from '@/styles/Todo.module.css';
const TodoInfo = (props) => {
    const context = useContext(TodoContext);
    const todo = props.todo;
    const handleEditTodo = (e) => {
        e.preventDefault();
        context.updateTodo(todo.id, e.target.task.value);
        props.setEditable(false);
    }
    if(props.isEditable) {
        return (
            <header className={styles.cardHeader}>
                <form className={styles.cardTitleForm} onSubmit={handleEditTodo}>
                    <input
                        className={`${styles.cardTitle} ${styles.cardTitleInput}`}
                        defaultValue={todo.task}
                        name="task"
                    />
                    <ImageButton icon="check" label="변경" />
                </form>
            </header>
        );
    }
    return (
        <header className={styles.cardHeader}>
          <p className={styles.cardTitle}>{todo.task}</p>
        </header>
    );
}
export default TodoInfo;

