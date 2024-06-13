import { useState } from 'react';
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client";

const GET_CUSTOMERS = gql(`
  query customers {
    customers {
      id
      name
      address
      email
    }
  }
`);
const UPDATE_CUSTOMER = gql(`
  mutation updateCustomer(
    $id: ID!, 
    $name: String!, 
    $address: String!, 
    $email: String!) {
    updateCustomer(
        id: $id
        name: $name
        address: $address
        email: $email) {
            id
            name
            address
            email
    }
  }
`);
const GET_CUSTOMER_BY_ID = gql(`
  query customer($id: ID!) {
    customer(id: $id) {
      id
      name
      address
      email
    }
  }
`);
const CustomerUpdateApollo = () => {
    const [customer, setCustomer] = useState<Customer>(null!);
    const [customerUpdated, setCustomerUpdated] = useState<Customer>(null!);
    const { loading, error, data } = useQuery(GET_CUSTOMERS);
    const [updateCustomer] = useMutation(UPDATE_CUSTOMER); 
    const [getCustomer] = useLazyQuery(GET_CUSTOMER_BY_ID, {
        onCompleted: (data) => {
            setCustomer(data.customer);
        }
    });
    if (error) return `에러! ${error.message}`;
    if (loading) return "읽는 중입니다...";
    const customers = data?.customers;
    const handleChanged = (e: any) => {
        const id = e.target.value;
        getCustomer(
            {
                variables: {
                    id
                }
            }
        );
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = e.currentTarget.elements["id"].value;
        const name = e.currentTarget.elements["name"].value;
        const address = e.currentTarget.elements["address"].value;
        const email = e.currentTarget.elements["email"].value
        e.currentTarget.reset();
        updateCustomer(
            {
                variables: {
                    id,
                    name, 
                    address, 
                    email
                },
                onCompleted: (data) => {
                    setCustomerUpdated(data.updateCustomer)
                }
            }
        )
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
export default CustomerUpdateApollo;

