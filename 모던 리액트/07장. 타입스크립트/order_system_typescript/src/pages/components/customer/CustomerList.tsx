import { useEffect, useReducer } from 'react';
import CustomerAdd from './CustomerAdd';
import CustomerRow from './CustomerRow';
import CustomerContext from '@/pages/contexts/CustomerContext';
import useFetcher from '@/pages/hooks/useFetcher';

const url = 'http://localhost:8080/api/v1/customers';

const CustomerList = () => {
    const [customers, actions] = useFetcher(url);
    const context: Context = {
        actions
    };
    return (
        <CustomerContext.Provider value={context}>
            <main>
                <h1>고객 관리</h1>
            </main>
            <ol className="lane">
                <CustomerAdd />
                {customers.map(customer => {
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
