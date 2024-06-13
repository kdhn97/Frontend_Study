import { useState, useEffect } from 'react';
import CustomerAdd from './CustomerAdd';
import CustomerRow from './CustomerRow';
import CustomerContext from '@/pages/contexts/CustomerContext';
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

const CustomerList = () => {
    const {loading, error, data, refetch} = useQuery(GET_CUSTOMERS, {
        notifyOnNetworkStatusChange: true
    });
    const [fetched, setFetched] = useState<boolean>(true);
    const context: Context = {
        setFetched
    };
    useEffect(() => {
        refetch();
    }, [fetched, refetch]);
    
    if (error) return `에러! ${error.message}`;
    if (loading) return "읽는 중입니다...";
    const customers = data?.customers;
    return (
        <CustomerContext.Provider value={context}>
            <main>
                <h1>고객 관리</h1>
            </main>
            <ol className="lane">
                <CustomerAdd />
                {customers && customers.map(customer => {
                    return <CustomerRow key={customer.id}
                            info={customer}
                            />                          
                    })
                }
            </ol>
        </CustomerContext.Provider>
    );
}
export default CustomerList;
