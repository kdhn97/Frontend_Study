import type {InferGetServerSidePropsType, GetServerSideProps} from 'next';
import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getTodos } from '@/lib/tododb';

type Todo = {
    id: number,
    task: string
};
// export const getStaticProps:GetStaticProps = async () => {
//     const response = await fetch('http://localhost:8000/api/v1/todos');
//     const todos: Todo[] = await response.json();
//     return {
//         props: { 
//             todos
//         }
//     };
// }
// const TodoList = ({todos}: InferGetStaticPropsType<typeof getStaticProps>) => {
export const getServerSideProps: GetServerSideProps = async(context) => {
    const response = await fetch('http://localhost:3000/api/db/todos');
    const todos: Todo[] = await response.json();
    // const todos: Todo[] = await getTodos();
    return {
        props: { 
            todos
        }
    };
}
const TodoList = ({todos}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    return (
        <>
            <h3>할 일 목록</h3>
            <ul>
                {todos.map((todo: Todo) => (
                    <li key={todo.id}>{todo.task} : &nbsp;
                        <Link href={`/todos/${todo.id}/update`}>변경</Link>&nbsp;&nbsp;
                        <Link href={`/todos/${todo.id}/delete`}>삭제</Link>
                        {/* <button onClick={() => router.push({
                            pathname: '/todos/[id]/update',
                            query: {id: todo.id}
                        })}>변경</button> */}
                    </li>
                ))}
            </ul>
            <Link href="/">홈으로 가기</Link> 
        </>
    )
}
export default TodoList;


