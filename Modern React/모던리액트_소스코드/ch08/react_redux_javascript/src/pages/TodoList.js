import { useTodosQuery } from './createApi';

const TodoList = () => {
    const { data, isLoading, isError, isSuccess } = useTodosQuery();
    if(isLoading)
        return <p>기다려주세요...</p>
    if(isError)
        return <p>에러가 발생했습니다.</p>
    if(isSuccess) {
        return (
            <>
                <h3>할 일 목록</h3>
                <ul>
                    {data.map((todo) => (
                        <li key={todo.id}>{todo.task}</li>
                    )
                    )}
                </ul>
            </>
        );
    }
}
export default TodoList;