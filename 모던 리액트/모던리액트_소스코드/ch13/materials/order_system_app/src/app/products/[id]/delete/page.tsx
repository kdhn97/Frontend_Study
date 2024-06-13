'use client';
import Link from 'next/link';

const url = 'http://localhost:8080/api/v1/products';
const Delete = async ({params: {id}}) => {
    const response = await fetch(`${url}/${id}`);
    const product: Product = await response.json();
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
            <h3>제품 정보 삭제</h3>
            <ul>
                <li>ID: {product.id}</li>
                <li>제품명: {product.name}</li>
                <li>제품 설명: {product.description}</li>
                <li>가격: {product.price}</li>            
            </ul>
            <div>삭제하시겠습니까?</div><br/>
            <button onClick={handleDelete}>삭제</button><br/>
            <Link href="/products">제품 정보 목록으로 돌아가기</Link>
        </>
    );
}

export default Delete;

