import { useEffect, useState } from 'react';

const url = 'http://localhost:3001/graphql';
const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
};
const CustomerDelete = () => {
    const [customers, setCustomers] = useState<Customer[]>(null!);
    const [customer, setCustomer] = useState<Customer>(null!);
    useEffect(() => {
        const queryAll = `
            query {
                customers {
                id
                name
                }
            }
        `;
        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify({
                query: queryAll
            })
        })
        .then(response => response.json())
        .then(json => {
            setCustomers(json.data.customers);
        });
    }, []);
    const handleChanged = (e: any) => {
        const id = e.target.value;
        const mutation = `
            mutation {
                deleteCustomer(
                    id: ${id}) {
                        id
                        name
                        address
                        email
                }
            }
        `;
        fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify({
                query: mutation
            })
        })
        .then(response => response.json())
        .then(json => {
            setCustomer(json.data.deleteCustomer)
        });       
    }
    return (
        <>
            {customers && (
                <div>
                    <h3>삭제할 고객 선택</h3>
                    <select onChange={handleChanged}>
                        <option>선택하세요...</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                    </select>
                </div>
            )}
            {customer && (
                <div>
                    <h3>삭제된 고객 ID</h3>
                    <ul>
                        <li>ID : {customer.id}</li>
                        <li>이름 : {customer.name}</li>
                        <li>주소 : {customer.address}</li>
                        <li>이메일 : {customer.email}</li>                                          
                    </ul>
                </div>
            )}
        </>
    );
}
export default CustomerDelete;

