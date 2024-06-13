import { useEffect, useReducer } from 'react';
import CustomerAdd from './CustomerAdd';
import CustomerRow from './CustomerRow';
// import CustomerService from '../services/CustomerService';
import CustomerActions from '@/pages/reducers/action';
import { reducer } from '@/pages/reducers/reducer';
import CustomerContext from '@/pages/contexts/CustomerContext';

const CustomerList = () => {
    const [customers, dispatch] = useReducer(reducer, []);
    useEffect(() => {
        CustomerActions.getCustomers(dispatch);
    }, []);
    const context = {
        dispatch
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
