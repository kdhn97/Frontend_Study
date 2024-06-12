import { useState } from 'react';
import CustomerInfo from './CustomerInfo';
import styles from '@/styles/Card.module.css';

const CustomerRow = (props) => {
    const [isEditable, setEditable] = useState(false);
    return (
        <li className={styles.card}>
            <CustomerInfo 
                customer={props.info} 
                update={props.update} 
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
                            onClick={() => props.delete(props.info.id)}>
                        삭제
                    </button>
                </li>
            </ul>
        </li>  
    )
}
export default CustomerRow;
