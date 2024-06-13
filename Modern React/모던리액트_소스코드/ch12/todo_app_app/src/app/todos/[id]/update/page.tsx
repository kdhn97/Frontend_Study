'use client';
import { FormEvent } from "react";
import Link from 'next/link';

type Todo = {
    id: number,
    task: string
};

const url = "http://localhost:3000/api/todos";
const TodoUpdate = async ({params}: {params: {id: number}}) => {
    const response = await fetch(`${url}/${params.id}`);
    const todo: Todo = await response.json();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const task = event.currentTarget.elements["task"].value;
        const todo = {id: Number(params.id), task};
        const response = await fetch(`${url}/${todo.id}`, {
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
            <Link href="/todos">목록으로 돌아가기</Link>
        </>
    );
}

export default TodoUpdate;

