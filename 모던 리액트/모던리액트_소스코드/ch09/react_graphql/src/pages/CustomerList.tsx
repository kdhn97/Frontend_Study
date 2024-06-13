import { useState, useEffect } from 'react';

const CustomerList = () => {
    const [customers, setCustomers] = useState<Customer[]>(null!);
    useEffect(() => {
        const query = `
          query {
            customers {
              id
              name
              address
              email
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
                query
            })
        })
        .then(response => response.json())
        .then(json => {
            setCustomers(json.data.customers);
        });
    }, []);
  
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

export default CustomerList;

