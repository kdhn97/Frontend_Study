'use client';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const url = 'http://localhost:8080/api/v1/customers';
const Delete = ({params: {id}}) => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/customers')
        }
    });
    const [customer, setCustomer] = useState(null!);
    const user: any = session?.user;
    const fetchCustomer = async () => {
        const response = await fetch(`${url}/${id}`, {
            method: "GET",
            headers: {
            authorization: `bearer ${user.accessToken}`,
            },
        });
        const customer: Customer = await response.json();
        setCustomer(customer);
    };
    useEffect(() => {
        fetchCustomer();
    }, [session]);
    const handleDelete = async () => {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
              authorization: `bearer ${user.accessToken}`,
            },
        });
        if(!response.ok) {
            console.log("Error");
        }
    }

    return (
        <>
            <div className="bg-white p-4 rounded-md w-full">
                <div className="flex items-center justify-between pb-6">
                    <div className="text-gray-600 text-3xl font-semibold">고객 정보 삭제</div>
                    <div className="flex items-center justify-between">
                        <div className="lg:ml-40 ml-10 space-x-8">
                        <Link className="button" href="/customers">고객 관리 홈</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">
                    <div className="mb-5 block text-base font-medium text-gray-500">
                        <li> ID: {id} </li>
                    </div>
                    <div className="mb-5 block text-base font-medium text-gray-500">
                        <li> 이름: {customer && customer.name} </li> 
                    </div>
                    <div className="mb-5 block text-base font-medium text-gray-500">
                        <li> 주소: {customer && customer.address} </li> 
                    </div>
                    <div className="mb-5 block text-base font-medium text-gray-500">
                        <li> 이메일: {customer && customer.email} </li> 
                    </div>
                    <div className="mb-5 block text-base font-medium text-gray-500">
                        삭제하시겠습니까?
                    </div>                                         
                    <button className="button" onClick={handleDelete}>삭제</button>           
                </div>
            </div>
        </>
    );
}

export default Delete;

