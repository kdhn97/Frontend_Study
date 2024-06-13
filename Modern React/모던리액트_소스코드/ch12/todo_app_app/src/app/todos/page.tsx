import Link from 'next/link';
import { Suspense } from 'react';
import Loading from './loading';
// import { PrismaClient } from '@prisma/client';

type Todo = {
    id: number,
    task: string
};

export const dynamic = 'force-dynamic';

const url = "http://localhost:3000/api/todos";
const TodoList = async () => {
    const response = await fetch(url); //, 
        // { cache: 'no-store'});
    const todos: Todo[] = await response.json();
    // const prisma = new PrismaClient();
    // const todos = await prisma.todo.findMany();
    return (
        <Suspense fallback={<Loading/>}>
            <h3>할 일 목록</h3>
            <ul>
                {todos.map((todo: Todo) => (
                    <li key={todo.id}>{todo.task} : &nbsp;
                        <Link href={`/todos/${todo.id}/update`}>변경</Link>&nbsp;&nbsp;
                        <Link href={`/todos/${todo.id}/delete`}>삭제</Link>
                    </li>
                ))}
            </ul>
            <Link href="/">홈으로 가기</Link>
        </Suspense>
    )
}
export default TodoList;
