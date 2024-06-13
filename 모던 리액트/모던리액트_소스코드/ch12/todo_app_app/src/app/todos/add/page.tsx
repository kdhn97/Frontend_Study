'use client';
import Link from "next/link";
import { FormEvent } from "react";

const url = "http://localhost:3000/api/todos";
const TodoAdd = () => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const id =  event.currentTarget.elements["id"].value;
        const task = event.currentTarget.elements["task"].value;
        const todo = {id: Number(id), task};
        const response = await fetch(url, {
                method: 'POST',
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
            <h3>할 일 입력</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">ID: </label>
                <input name="id"/><br/>
                <label htmlFor="task">할 일: </label>
                <input name="task"/><br/> 
                <button type="submit">저장</button>           
            </form>
            <Link href="/">홈으로 돌아가기</Link>
        </>
    );
}

export default TodoAdd;

