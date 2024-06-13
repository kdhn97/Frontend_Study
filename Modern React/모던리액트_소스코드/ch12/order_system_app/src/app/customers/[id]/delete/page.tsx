'use client';
import Link from 'next/link';

const url = 'http://localhost:8080/api/v1/customers';
const Delete = async ({params: {id}}) => {
    const response = await fetch(`${url}/${id}`);
    const customer: Customer = await response.json();
    const handleDelete = async () => {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
        if(!response.ok) {
            console.log("Error");
        }
    }

    return (
        <>
            <h3>고객 정보 삭제</h3>
            <ul>
                <li>ID: {customer.id}</li>
                <li>이름: {customer.name}</li>
                <li>주소: {customer.address}</li>
                <li>이메일: {customer.email}</li>            
            </ul>
            <div>삭제하시겠습니까?</div><br/>
            <button onClick={handleDelete}>삭제</button><br/>
            <Link href="/customers">고객 정보 목록으로 돌아가기</Link>
        </>
    );
}

export default Delete;

