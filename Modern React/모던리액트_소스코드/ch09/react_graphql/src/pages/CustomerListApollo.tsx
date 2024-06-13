import { gql, useQuery } from "@apollo/client";

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

const CustomerListApollo = () => {
    const { loading, error, data } = useQuery(GET_CUSTOMERS);
    if (error) return `에러! ${error.message}`;
    if (loading) return "읽는 중입니다...";
    const customers = data?.customers;
    return (
        <>
            <h3>고객 목록</h3>
            <ul>
                {customers && customers.map(customer => (
                    <li key={customer!.id}>
                      {customer!.name}, {customer!.address}, {customer!.email}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default CustomerListApollo;

