import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const url = 'http://localhost:8000/api/v1/todos'
const fetcher = () => {
    return fetch(url)
            .then(response => response.json());
}
const post = (todo) => {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
        }
    );
}
const TodoList = () => {
    const query = useQuery({
        queryKey: ["todos"], 
        queryFn: fetcher
    });
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: post,
        onSuccess: () => {
            console.log("Success")
            queryClient.invalidateQueries({queryKey: ["todos"]})
        }
    });    
    if(query.error)
        return <div>에러가 발생했습니다.</div>;
    if(query.isLoading)
        return <div>읽는 중...</div>
        const handleSubmit = async (event) => {
            event.preventDefault();
            const id = Math.floor(Math.random() * 1000) + 2;
            const task = event.target.task.value;
            const todo = {id, task};
            mutation.mutate(todo);
        }
    return (
        <>
            <h3>할 일 관리</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="task">할 일: </label>
                <input name="task"/>    
                <button type="submit">저장</button>           
            </form>
            <ul>
                {query.data.map(todo => (
                    <li key={todo.id}>{todo.task}</li>
                ))}
            </ul>
        </>
    );
}

export default TodoList;

  