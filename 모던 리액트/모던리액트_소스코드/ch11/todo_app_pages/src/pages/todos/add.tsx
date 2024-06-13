import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent } from "react";

const TodoAdd = () => {
    const router = useRouter();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const task = event.currentTarget.elements["task"].value;
        const id =  event.currentTarget.elements["id"].value;
        const todo = {id: Number(id), task};
        const response = await fetch('/api/db/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
        });
    }

    return (
        <>
            <h3>할 일 입력</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">ID: </label>
                <input name="id"/><br/>
                <label htmlFor="task">할 일: </label>
                <input name="task"/>    
                <button type="submit">저장</button>           
            </form>
            <Link href="/">홈으로 가기</Link>            
        </>
    );
}

export default TodoAdd;

