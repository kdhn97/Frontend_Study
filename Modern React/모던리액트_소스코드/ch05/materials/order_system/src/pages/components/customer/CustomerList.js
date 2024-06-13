import { useState } from 'react';
import CustomerAdd from './CustomerAdd';
import CustomerRow from './CustomerRow';
const initCustomers = [
    {id: 1, name: '김일', address: '서울시', email: 'kim1@gmail.com'},
];
const CustomerList = () => {
    const [customers, setCustomers] = useState(initCustomers);
    const insertCustomer = (customer) => {
        setCustomers(prevCustomers => [...prevCustomers, customer]);
    }
    const updateCustomer = (id, customer) => {
        setCustomers(prevCustomers =>
            prevCustomers.map(cust => (cust.id === id ? customer : cust))
        );
    }
    const deleteCustomer = (id) => {
        setCustomers(prevCustomers => prevCustomers.filter(cust => cust.id !== id));
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


