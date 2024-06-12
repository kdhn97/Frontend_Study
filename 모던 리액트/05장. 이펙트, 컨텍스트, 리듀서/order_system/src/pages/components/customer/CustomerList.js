import { useState, useEffect } from 'react';
import CustomerAdd from './CustomerAdd';
import CustomerRow from './CustomerRow';
import CustomerService from '../services/CustomerService';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [fetched, setFetched] = useState(true);
    useEffect(() => {
        CustomerService.getCustomers().then(customers => {
          setCustomers(customers);
        });
      }, [fetched]);
    const insertCustomer = (customer) => {
        CustomerService.insertCustomer(customer);
        setFetched(prev => !prev);
    }
    const updateCustomer = (id, customer) => {
        CustomerService.updateCustomer(id, customer);
        setFetched(prev => !prev);
    }
    const deleteCustomer = (id) => {
        CustomerService.deleteCustomer(id);
        setFetched(prev => !prev);
    }
    return (
        <>
            <main>
                <h1>고객 관리</h1>
            </main>
            <ol className="lane">
                <CustomerAdd insert={insertCustomer}/>
                {customers.map(customer => {
                    return <CustomerRow key={customer.id}
                            info={customer}
                            update={updateCustomer}
                            delete={deleteCustomer}/>                            
                    })
                }
            </ol>
        </>
    );
}
export default CustomerList;
