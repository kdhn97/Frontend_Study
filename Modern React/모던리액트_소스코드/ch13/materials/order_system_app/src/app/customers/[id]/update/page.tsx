'use client';
import { FormEvent } from "react";
import Link from 'next/link';

const url = 'http://localhost:8080/api/v1/customers';
const Update = async ({params: {id}}) => {
    const response = await fetch(`${url}/${id}`);
    const customer: Customer = await response.json();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const id = event.currentTarget.elements["id"].value;
        const name = event.currentTarget.elements["name"].value;
        const address =  event.currentTarget.elements["address"].value;
        const email =  event.currentTarget.elements["email"].value;        
        const customer = {id, name, address ,email};
        const response = await fetch(`${url}/${customer.id}`, {
            method: 'PUT',
            body: JSON.stringify(customer),
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
            <h3>고객 정보 변경</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">ID: </label>
                <input name="id" defaultValue={id} readOnly/><br/>
                <label htmlFor="name">이름: </label>
                <input name="name" defaultValue={customer.name}/><br/>
                <label htmlFor="address">주소: </label>
                <input name="address" defaultValue={customer.address}/><br/>
                <label htmlFor="email">이메일: </label>
                <input name="email" defaultValue={customer.email}/><br/>                        
                <button type="submit">변경</button>           
            </form>
            <Link href="/customers">고객 정보 목록으로 돌아가기</Link>
        </>
    );
}

export default Update;

