import Link from 'next/link';

export default function Home() {
    return (
        <>
            <h3>할 일 프로그램</h3>
            <Link href="/todos/add">할 일 추가</Link><br/>  
            <Link href="/todos">할 일 목록</Link><br/>  
            <Link href="/client">할 일 목록(클라이언트)</Link>
        </>
    );
}
