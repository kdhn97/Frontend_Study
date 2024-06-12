import { useContext } from 'react';
import CustomerContext from '@/pages/contexts/CustomerContext';
import ImageButton from '../commons/ImageButton';
import styles from '@/styles/Card.module.css';

const CustomerAdd = (props) => {
  const context = useContext(CustomerContext)
  const handleCustomerAdd = (e) => {
    e.preventDefault();
    const customer = {
      id: Math.floor(Math.random() * 1000) + 2, 
      name: e.target.name.value, 
      address: e.target.address.value, 
      email: e.target.email.value
    };
    context.insertCustomer(customer); 
    e.target.reset();
  }
  return (
      <li className={styles.card}>
        <header className={`${styles.cardHeader} ${styles.cardHeaderNew}`}>
          <form className={styles.cardTitleForm} onSubmit={handleCustomerAdd}>
            <input
              className={`${styles.cardTitle} ${styles.cardTitleInput}`}
              placeholder="이름"
              name="name"
            />
            <input
              className={`${styles.cardTitle} ${styles.cardTitleInput}`}
              placeholder="주소"
              name="address"
            />
            <input
              className={`${styles.cardTitle} ${styles.cardTitleInput}`}
              placeholder="이메일"
              name="email"
            />            
            <ImageButton icon="plus" label="고객 추가" />
          </form>
        </header>
      </li>
    );
}

export default CustomerAdd;

