import Info from './info';
import Link from 'next/link';
import type {InferGetServerSidePropsType, GetServerSideProps} from 'next';

const url = 'http://localhost:8080/api/v1/inventories';
export const getServerSideProps: GetServerSideProps = async(context) => {
    const response = await fetch(url);
    const inventories: Inventories = await response.json();
    return {
        props: { 
            inventories
        }
    };
}
const Inventories = ({inventories}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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