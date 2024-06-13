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
            <div className="bg-white p-4 rounded-md w-full">
                <div className="flex items-center justify-between pb-6">
                    <div className="text-gray-600 text-3xl font-semibold">고객 정보 변경</div>
                    <div className="flex items-center justify-between">
                        <div className="lg:ml-40 ml-10 space-x-8">
                        <Link className="button" href="/customers">고객 관리 홈</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="id">ID: </label>
                            <input name="id" defaultValue={id} readOnly/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="name">이름: </label>
                            <input name="name" defaultValue={customer.name}/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="address">주소: </label>
                            <input name="address" defaultValue={customer.address}/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email">이메일: </label>
                            <input name="email" defaultValue={customer.email}/>
                        </div>                        
                        <button className="button" type="submit">변경</button>           
                    </form>
                </div>
            </div>
        </>
    );
}

export default Update;

