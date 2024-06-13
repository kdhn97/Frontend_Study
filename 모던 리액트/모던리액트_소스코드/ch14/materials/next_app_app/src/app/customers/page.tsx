'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

const Customers = () => {
    const [customers, setCustomers] = useState([]!);
    const fetchCustomers = async () => {
        const res = await fetch("http://localhost:8080/api/v1/customers");
        const response = await res.json();
        setCustomers(response);
    }
    useEffect(() => {
        fetchCustomers();
    }, []);
    return (
        <>
            <div className="text-3xl font-bold text-center">고객 목록</div>
            <ul className="m-4 max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
                {customers.map((customer: any) => (
                    <li key={customer.id}>{customer.name}, {customer.address}, {customer.email}</li>
                    ))
                }
            </ul>
            <Link className="button" href="/">홈으로</Link>
        </>
    )
}

export default Customers;