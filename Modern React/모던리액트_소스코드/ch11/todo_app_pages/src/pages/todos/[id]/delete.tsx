import type {InferGetServerSidePropsType, GetServerSideProps} from 'next';
import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from "next/router";
import Link from 'next/link';

type Todo = {
    id: number,
    task: string
};
// const url = 'http://localhost:8000/api/v1/todos';
// export const getStaticPaths:GetStaticPaths = async () => {
//     const response = await fetch(url);
//     const todos: Todo[] = await response.json();
//     const paths = todos.map((todo) => ({
//         params: {id: todo.id.toString()}
//     }));
//     return {
//         paths,
//         fallback: false
//     };
// }
// export const getStaticProps:GetStaticProps = async ({params}) => {
//     const response = await fetch(`${url}/${params.id}`);
//     const todo: Todo = await response.json();
//     if(!todo) {
//         return {
//             notFound: true
//         }
//     }
//     return {
//         props: { 
//             todo
//         }
//     };
// }
// const TodoDelete = ({todo}: InferGetStaticPropsType<typeof getStaticProps>) => {
export const getServerSideProps: GetServerSideProps = async(context) => {
    const { params } = context;
    const { id } = params;
    const response = await fetch(`http://localhost:3000/api/db/todos/${id}`);
    const todo: Todo = await response.json();
    return {
        props: { 
            todo
        }
    };
}
const TodoDelete = ({todo}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const handleDelete = async () => {
        const response = await fetch(`/api/db/todos/${todo.id}`, {
            method: 'DELETE'
        });
        if(!response.ok) {
            console.log("Error");
        }
    }

    return (
        <>
            <h3>할 일 삭제</h3>
            <div>ID: {todo.id}</div><br/>
            <div>할 일: {todo.task}</div><br/>
            <div>삭제하시겠습니까?</div><br/>
            <button onClick={handleDelete}>삭제</button><br/>
            <Link href="/todos">목록으로 돌아가기</Link>
        </>
    );
}

export default TodoDelete;

