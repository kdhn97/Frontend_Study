import Info from './info';

const url = 'http://localhost:8080/api/v1/customers';

const Customers = ({customers}) => {
    return (
        <>
            <h3>고객 목록</h3>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>
                        <Info customer={customer}/>
                        <ul>
                            <li><a href={`/customers/${customer.id}/update`}>변경</a></li>
                            <li><a href={`/customers/${customer.id}/delete`}>삭제</a></li>                       
                        </ul>
                    </li>
                ))}
            </ul>
            <a href="/customers/add">고객 정보 추가</a><br/>
        </>
    );
}

export default Customers;