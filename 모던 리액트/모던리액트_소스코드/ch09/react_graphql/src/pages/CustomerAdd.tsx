import { useState } from 'react';

const CustomerAdd = () => {
    const [customer, setCustomer] = useState<Customer>(null!);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = e.currentTarget.elements["name"].value;
        const address = e.currentTarget.elements["address"].value;
        const email = e.currentTarget.elements["email"].value
        const mutation = `
            mutation {
                createCustomer(
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
        fetch('http://localhost:3001/graphql', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                query: mutation
            })
        })
        .then(response => response.json())
        .then(json => {
            setCustomer(json.data.createCustomer)
            }
        );
    }
    return (
        <>
            <div>
                <h3>고객 정보 입력</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>이름: </label>
                    <input name="name"/><br/>
                    <label htmlFor='name'>주소: </label>
                    <input name="address"/><br/>
                    <label htmlFor='name'>이메일: </label>
                    <input name="email"/><br/>
                    <button type="submit">저장</button>                        
                </form>
            </div>
            {customer && (
                <div>
                    <h3>저장된 고객 정보</h3>
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
export default CustomerAdd;

