import Link from 'next/link';
import useSWR, { Fetcher } from 'swr'; // npm install swr
type Todo = {
    id: number,
    task: string
};
const fetcher: Fetcher<Todo[], string> = (...args) => fetch(...args).then((res) => res.json())

const ClientRendering = () => {
    const { data, error } = useSWR('http://localhost:3000/api/todos', fetcher);
    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;
    return (
        <>
            <h3>할 일 목록</h3>
            <ul>
                {data.map((todo: Todo) => (
                    <li key={todo.id}>{todo.task}</li>
                ))}
            </ul>     
            <Link href="/">홈으로 가기</Link> 
        </>
    );
}

export default ClientRendering;
