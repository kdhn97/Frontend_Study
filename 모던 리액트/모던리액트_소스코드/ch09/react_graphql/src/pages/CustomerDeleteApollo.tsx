import { useState } from 'react';
import { gql, useMutation, useQuery } from "@apollo/client";

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
const DELETE_CUSTOMER = gql(`
  mutation deleteCustomer($id: ID!) {
    deleteCustomer(
        id: $id) {
            id
            name
            address
            email
    }
  }
`);
const CustomerDeleteApollo = () => {
    const [customer, setCustomer] = useState<Customer>(null!);
    const { loading, error, data } = useQuery(GET_CUSTOMERS);
    const [deleteCustomer] = useMutation(DELETE_CUSTOMER); 
    if (error) return `에러! ${error.message}`;
    if (loading) return "읽는 중입니다...";
    const customers = data?.customers;
    const handleChanged = (e: any) => {
        const id = e.target.value;
        deleteCustomer(
            {
                variables: {
                    id
                },
                onCompleted: (data) => {
                    setCustomer(data.deleteCustomer);
                }
            }
        );
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
                    <h3>삭제된 고객 정보</h3>
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
export default CustomerDeleteApollo;

