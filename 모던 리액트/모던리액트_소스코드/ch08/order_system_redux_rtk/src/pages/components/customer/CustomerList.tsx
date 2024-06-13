import CustomerAdd from './CustomerAdd';
import CustomerRow from './CustomerRow';
import { useGetCustomersQuery } from '@/pages/store/customerSlice';

const CustomerList = () => {
    const {data = []} = useGetCustomersQuery();
    return (
        <>
            <main>
                <h1>고객 관리</h1>
            </main>
            <ol className="lane">
                <CustomerAdd />
                {data.map(customer => {
                    return <CustomerRow key={customer.id}
                            info={customer}
                            />                          
                    })
                }
            </ol>
        </>
    );
}
export default CustomerList;
