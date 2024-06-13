import useSWR from 'swr';

const fetcher = (url) => {
    return fetch(url)
            .then(response => response.json());
}
const TodoList = () => {
    const {data, error} = useSWR('http://localhost:8000/api/v1/todos', fetcher);
    if(error)
        return <div>에러가 발생했습니다.</div>;
    if(!data)
        return <div>읽는 중...</div>
    return (
        <>
            <h3>할 일 목록</h3>
            <ul>
                {data.map(todo => (
                    <li key={todo.id}>{todo.task}</li>
                ))}
            </ul>
        </>
    );
}

export default TodoList; 

