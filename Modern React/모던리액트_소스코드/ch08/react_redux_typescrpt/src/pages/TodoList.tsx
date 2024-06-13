import { useTodosQuery, useInsertMutation } from './createApi';

const TodoList = () => {
    const { data, isLoading, isError, isSuccess } = useTodosQuery();
    const [ insert ] = useInsertMutation();
    if(isLoading)
        return <p>기다려주세요...</p>
    if(isError)
        return <p>에러가 발생했습니다.</p>
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = Math.floor(Math.random() * 1000) + 2;
        const todo: Todo = {id, task: e.currentTarget.elements["task"].value};
        e.currentTarget.reset();
        await insert(todo);
    }
    if(isSuccess) {
        return (
            <>
                <h3>할 일 목록</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='task'>할 일: </label>
                    <input name="task"/>
                    <button type="submit">저장</button>
                </form>
                <ul>
                    {data.map((todo: Todo) => (
                        <li key={todo.id}>{todo.task}</li>
                    )
                    )}
                </ul>
            </>
        );
    }
}
export default TodoList;

