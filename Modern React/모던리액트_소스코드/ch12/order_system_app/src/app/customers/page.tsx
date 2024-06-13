'use client';
import Link from 'next/link';
import Info from './info';

const url = 'http://localhost:8080/api/v1/customers';
const Customers = async () => {
    const response = await fetch(url);
    const customers: Customers = await response.json();
    return (
        <>
            <h3>고객 목록</h3>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>
                        <Info customer={customer}/>
                        <ul>
                            <li><Link href={`/customers/${customer.id}/update`}>변경</Link></li>
                            <li><Link href={`/customers/${customer.id}/delete`}>삭제</Link></li>                       
                        </ul>
                    </li>
                ))}
            </ul>
            <Link href="/customers/add">고객 정보 추가</Link><br/>
        </>
    );
}

export default Customers;