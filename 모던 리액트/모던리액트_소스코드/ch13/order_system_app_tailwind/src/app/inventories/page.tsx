'use client';
import Link from 'next/link';
import Info from './info';
const url = 'http://localhost:8080/api/v1/inventories';
const Inventories = async () => {
    const response = await fetch(url);
    const inventories: Inventories = await response.json();
    return (
        <>
            <div className="bg-white p-4 rounded-md w-full">
                <div className="flex items-center justify-between pb-6">
                    <div className="text-gray-600 text-3xl font-semibold">재고 목록</div>
                </div>
            </div>
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table className="min-w-full leading-normal">
						<thead>
							<tr>
								<th className='header'>제품명</th>
                                <th className='header'>재고 수량</th>
                                <th className='header'></th>                                
							</tr>
						</thead> 
                        <tbody>
                        {inventories.map(inventory => (
                            <tr key={inventory.id}>
                                <Info inventory={inventory}/>
                                <td className="row">
                                    <Link className="button" href={`/inventories/${inventory.id}`}>입고</Link>
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
export default Inventories;

