import { useState, useContext } from 'react';
import CustomerInfo from './CustomerInfo';
import CustomerContext from '@/pages/contexts/CustomerContext';
import styles from '@/styles/Card.module.css';

const CustomerRow = (props: CustomerProps) => {
    const [isEditable, setEditable] = useState(false);
    const context = useContext(CustomerContext);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        context.actions.remove(props.info.id);
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
