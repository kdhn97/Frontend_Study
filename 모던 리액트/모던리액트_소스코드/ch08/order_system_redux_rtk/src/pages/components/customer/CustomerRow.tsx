import { useState } from 'react';
import CustomerInfo from './CustomerInfo';
import styles from '@/styles/Card.module.css';
import { useDeleteCustomerMutation } from '@/pages/store/customerSlice';

const CustomerRow = (props: CustomerProps) => {
    const [isEditable, setEditable] = useState(false);
    const [deleteCustomer] = useDeleteCustomerMutation(); 
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        await deleteCustomer(props.info.id);
    }
    return (
        <li className={styles.card}>
            <CustomerInfo 
                customer={props.info} 
                isEditable={isEditable} 
                setEditable={setEditable}/>
            <ul className={styles.cardControls}>
                <li>
                    <button className={styles.cardControl} 
                    onClick={() => setEditable(true)}>  
                        변경
                    </button>
                </li>
                <li>
                    <button className={styles.cardControl} 
                            onClick={handleClick}>
                        삭제
                    </button>
                </li>
            </ul>
        </li>  
    )
}
export default CustomerRow;
