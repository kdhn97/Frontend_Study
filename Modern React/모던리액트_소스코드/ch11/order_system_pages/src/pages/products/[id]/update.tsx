import { FormEvent } from "react";
import Link from "next/link";
import type {InferGetServerSidePropsType, GetServerSideProps} from 'next';

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
const Update = ({product}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const id = event.currentTarget.elements["id"].value;
        const name = event.currentTarget.elements["name"].value;
        const description =  event.currentTarget.elements["description"].value;
        const price =  Number(event.currentTarget.elements["price"].value);        
        const product = {id, name, description ,price};
        const response = await fetch(`${url}/${product.id}`, {
            method: 'PUT',
            body: JSON.stringify(product),
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
            <h3>제품 정보 변경</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">ID: </label>
                <input name="id" defaultValue={product.id} readOnly/><br/>
                <label htmlFor="name">제품명: </label>
                <input name="name" defaultValue={product.name}/><br/>
                <label htmlFor="description">제품 설명: </label>
                <input name="description" defaultValue={product.description}/><br/>
                <label htmlFor="price">가격: </label>
                <input type="nubmer" name="price" defaultValue={product.price}/><br/>                        
                <button type="submit">변경</button>           
            </form>
            <Link href="/products">제품 정보 목록으로 돌아가기</Link>
        </>
    );
}

export default Update;
