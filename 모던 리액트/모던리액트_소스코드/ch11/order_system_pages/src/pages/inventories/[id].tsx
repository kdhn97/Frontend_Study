import { FormEvent } from "react";
import Link from "next/link";
import type {InferGetServerSidePropsType, GetServerSideProps} from 'next';

const url = 'http://localhost:8080/api/v1/inventories';
const productUrl = 'http://localhost:8080/api/v1/products';
export const getServerSideProps: GetServerSideProps = async(context) => {
    const { params } = context;
    const { id } = params;
    const resInvtry = await fetch(`${url}/${id}`);
    const inventory: Inventory = await resInvtry.json();
    const resProd = await fetch(`${productUrl}/${id}`);
    const product: Product = await resProd.json();
    return {
        props: { 
            inventory: {id: inventory.id, name: product.name, quantity: inventory.quantity} as Inventory
        }
    };
}
const Store = ({inventory}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const id = event.currentTarget.elements["id"].value;
        const quantity =  Number(event.currentTarget.elements["quantity"].value);        
        const newInventory = {id, quantity: inventory.quantity + quantity};
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(newInventory),
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
            <h3>제품 입고</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">ID: </label>
                <input name="id" defaultValue={inventory.id} readOnly/><br/>
                <label htmlFor="name">제품명: </label>
                <input name="name" defaultValue={inventory.name}/><br/>
                <label htmlFor="quantity">수량: </label>
                <input type="nubmer" name="quantity"/><br/>                        
                <button type="submit">입고</button>           
            </form>
            <Link href="/inventories">재고 정보 목록으로 돌아가기</Link>
        </>
    );
}

export default Store;

