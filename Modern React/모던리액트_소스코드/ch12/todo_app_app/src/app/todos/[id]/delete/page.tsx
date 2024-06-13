'use client';

import Link from 'next/link';

type Todo = {
    id: number,
    task: string
};
const url = "http://localhost:3000/api/todos";
const TodoDelete = async ({params}: {params: {id: number}}) => {
    const response = await fetch(`${url}/${params.id}`);
    const todo: Todo = await response.json();
    const handleDelete = async () => {
        const response = await fetch(`${url}/${todo.id}`, {
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

