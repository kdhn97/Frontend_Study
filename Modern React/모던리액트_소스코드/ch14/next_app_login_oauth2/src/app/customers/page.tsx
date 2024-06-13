'use client';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerList = () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/customers')
        }
    });
    const [customers, setCustomers] = useState([]!);
    const user: any = session?.user;
    const fetchCustomers = async () => {
        const res = await fetch("http://localhost:8080/api/v1/customers");
        const response = await res.json();
        setCustomers(response);
    }
    useEffect(() => {
        fetchCustomers();
    }, [session]);
    return (
        <>
            <div className="text-2xl font-bold text-center">고객 목록</div>
            <ul className="m-2 max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
                {customers.map((customer: any) => (
                    <li key={customer.id}>{customer.name}, {customer.address}, {customer.email}</li>
                    ))
                }
            </ul>
            <div className="mt-4 mb-4 flex gap-4">
                <p>이메일 : {user && user.email}</p>
                <p>권한: {user && user.role}</p>
            </div>
            <Link className="button" href="/">홈으로</Link>            
        </>
    )
}

export default CustomerList;