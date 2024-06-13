import Link from "next/link";
import type {InferGetServerSidePropsType, GetServerSideProps} from 'next';
import { useRouter } from "next/router";

const url = 'http://localhost:8080/api/v1/products';
export const getServerSideProps: GetServerSideProps = async(context) => {
    const { params } = context;
    const { id } = params;
    const response = await fetch(`${url}/${id}`);
    const product: Product = await response.json();
    return {
        props: { 
            product
        }
    };
}
const Delete = ({product}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const handleDelete = async () => {
        const response = await fetch(`${url}/${router.query.id}`, {
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

