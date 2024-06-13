import { FormEvent } from "react";
import { useRouter } from "next/router";
import type {InferGetServerSidePropsType, GetServerSideProps} from 'next';
import type { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from 'next'

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
// const TodoUpdate = ({todo}: InferGetStaticPropsType<typeof getStaticProps>) => {
export const getServerSideProps: GetServerSideProps = async(context) => {
    // const { params } = context;
    // const { id } = params;
    const id = context.params.id;
    console.log(id);
    const response = await fetch(`http://localhost:3000/api/db/todos/${id}`);
    const todo: Todo = await response.json();
    return {
        props: { 
            todo
        }
    };
}
const TodoUpdate = ({todo}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const task = event.currentTarget.elements["task"].value;
        const todo = {id: Number(router.query.id), task};
        const response = await fetch(`/api/db/todos/${todo.id}`, {
            method: 'PUT',
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
            }
        );
        if(!response.ok) {
            console.log("Error");
        }
    }

    return (
        <>
            <h3>할 일 변경</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">ID: </label>
                <input name="id" defaultValue={todo.id} readOnly/><br/>
                <label htmlFor="task">할 일: </label>
                <input name="task" defaultValue={todo.task}/><br/> 
                <button type="submit">변경</button>
            </form>
            <Link href="/todos">목록으로 돌아가기</Link><br/>
            {/* <button onClick={() => router.push('/')}>홈으로</button> */}
        </>
    );
}

export default TodoUpdate;
