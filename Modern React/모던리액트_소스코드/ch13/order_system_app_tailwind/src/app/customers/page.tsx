'use client';
import Link from 'next/link';
import Info from './info';

const url = 'http://localhost:8080/api/v1/customers';
const Customers = async () => {
    const response = await fetch(url);
    const customers: Customers = await response.json();
    return (
        <>
            <div className="bg-white p-4 rounded-md w-full">
                <div className="flex items-center justify-between pb-6">
                    <div className="text-gray-600 text-3xl font-semibold">고객 목록</div>
                    <div className="flex items-center justify-between">
                        <div className="lg:ml-40 ml-10 space-x-8">
                            <Link className="button" href="/customers/add">추가</Link>
                        </div>
                    </div>
                </div>
            </div>
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table className="min-w-full leading-normal">
						<thead>
							<tr>
								<th className='header'>이름</th>
                                <th className='header'>주소</th>
                                <th className='header'>이메일</th>
                                <th className='header'></th>
                                <th className='header'></th>                                
							</tr>
						</thead> 
                        <tbody>
                        {customers.map(customer => (
                            <tr key={customer.id}>
                                <Info customer={customer}/>
                                <td className="row">
                                    <Link className="button" href={`/customers/${customer.id}/update`}>변경</Link>
                                </td>
                                <td className="row">
                                    <Link className="button" href={`/customers/${customer.id}/delete`}>삭제</Link>    
                                </td>
                            </tr>
                        ))}
            			</tbody>
					</table>
				</div>
			</div>  
        </>
    );
}

export default Customers;


