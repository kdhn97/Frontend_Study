const TodoComponent = (props) => {
    const todos = props.todos.get();
    return (
        <>
            {todos.map(todo => (
                <li key={todo.id} >
                    {todo.task}
                </li>
            ))}
        </>
    );
}
export default TodoComponent;