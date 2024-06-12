import { useState, useContext } from 'react';
import CustomerInfo from './CustomerInfo';
import CustomerContext from '@/pages/contexts/CustomerContext';
import styles from '@/styles/Card.module.css';

const CustomerRow = (props) => {
    const [isEditable, setEditable] = useState(false);
    const context = useContext(CustomerContext);
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
                            onClick={() => context.deleteCustomer(props.info.id)}>
                        삭제
                    </button>
                </li>
            </ul>
        </li>  
    )
}
export default CustomerRow;
