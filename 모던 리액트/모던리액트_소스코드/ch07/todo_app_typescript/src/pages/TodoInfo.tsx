import { useContext } from 'react';
import TodoContext from './contexts/TodoContext';
import ImageButton from './components/ImageButton';
import styles from '@/styles/Todo.module.css';
const TodoInfo = (props: TodoProps) => {
    const context = useContext(TodoContext);
    const todo = props.todo;
    const handleEditTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const todo = {
            id: props.todo.id, 
            task: e.currentTarget.elements["task"].value
        };
        context.actions.update(todo.id, todo);
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

