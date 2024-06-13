import { useEffect, useState } from 'react';

const url = 'http://localhost:3001/graphql';
const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
};
const CustomerUpdate = () => {
    const [customers, setCustomers] = useState<Customer[]>(null!);
    const [customer, setCustomer] = useState<Customer>(null!);
    const [customerUpdated, setCustomerUpdated] = useState<Customer>(null!);
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
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = e.currentTarget.elements["id"].value;
        const name = e.currentTarget.elements["name"].value;
        const address = e.currentTarget.elements["address"].value;
        const email = e.currentTarget.elements["email"].value
        const mutation = `
            mutation {
                updateCustomer(
                    id: "${id}"
                    name:"${name}"
                    address:"${address}"
                    email:"${email}") {
                        name
                        address
                        email
                        id
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
            setCustomerUpdated(json.data.updateCustomer)
        });
    }
    const handleChanged = (e: any) => {
        const id = e.target.value;
        const queryById = `
            query {
                customer(id: ${id}) {
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
                query: queryById
            })
        })
        .then(response => response.json())
        .then(json => {
            setCustomer(json.data.customer);
        });        
    }
    return (
        <>
            {customers && (
                <div>
                    <h3>변경할 고객 선택</h3>
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
                    <h3>고객 정보 변경</h3>
                    <form onSubmit={handleSubmit}>
                        <input name="id" defaultValue={customer.id} hidden/>
                        <label htmlFor='name'>이름: </label>
                        <input name="name" defaultValue={customer.name}/><br/>
                        <label htmlFor='name'>주소: </label>
                        <input name="address" defaultValue={customer.address}/><br/>
                        <label htmlFor='name'>이메일: </label>
                        <input name="email" defaultValue={customer.email}/><br/>
                        <button type="submit">저장</button>                        
                    </form>
                </div>
            )} 
            {customerUpdated && (
                <div>
                    <h3>변경된 고객 정보</h3>
                    <ul>
                        <li>ID : {customerUpdated.id}</li>
                        <li>이름 : {customerUpdated.name}</li>
                        <li>주소 : {customerUpdated.address}</li>
                        <li>이메일 : {customerUpdated.email}</li>                    
                    </ul>
                </div>
            )}
        </>
    );
}
export default CustomerUpdate;


