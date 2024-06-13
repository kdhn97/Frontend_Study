'use client';
import Link from 'next/link';
import Info from './info';
const url = 'http://localhost:8080/api/v1/inventories';
const Inventories = async () => {
    const response = await fetch(url);
    const inventories: Inventories = await response.json();
    return (
        <>
            <h3>재고 목록</h3>
            <ul>
                {inventories.map(inventory => (
                    <li key={inventory.id}>
                        <Info inventory={inventory}/>
                        <ul>
                            <li><Link href={`/inventories/${inventory.id}`}>입고</Link></li>                  
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    );
}
export default Inventories;