import ImageButton from '../commons/ImageButton';
import styles from '@/styles/Card.module.css';
import { useInsertCustomerMutation } from '@/pages/store/customerSlice';

const CustomerAdd = () => {
  const [insertCustomer] = useInsertCustomerMutation();
  const handleCustomerAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const customer = {
      id: Math.floor(Math.random() * 1000) + 2, 
      name: e.currentTarget.elements["name"].value, 
      address: e.currentTarget.elements["address"].value, 
      email: e.currentTarget.elements["email"].value
    };
    e.currentTarget.reset();
    await insertCustomer(customer); 
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

