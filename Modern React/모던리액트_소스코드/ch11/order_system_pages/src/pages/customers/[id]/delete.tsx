import Link from "next/link";
import type {InferGetServerSidePropsType, GetServerSideProps} from 'next';
import { useRouter } from "next/router";

const url = 'http://localhost:8080/api/v1/customers';
export const getServerSideProps: GetServerSideProps = async(context) => {
    const { params } = context;
    const { id } = params;
    const response = await fetch(`${url}/${id}`);
    const customer: Customer = await response.json();
    return {
        props: { 
            customer
        }
    };
}
const Delete = ({customer}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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

