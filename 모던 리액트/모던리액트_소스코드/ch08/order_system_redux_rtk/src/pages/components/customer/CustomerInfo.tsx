import ImageButton from '../commons/ImageButton';
import styles from '@/styles/Card.module.css';
import { useUpdateCustomerMutation } from '@/pages/store/customerSlice';

const CustomerInfo = (props: CustomerProps) => {
  const [updateCustomer] = useUpdateCustomerMutation();
  const handleEditCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const customer = {
      id: props.customer.id, 
      name: e.currentTarget.elements["name"].value, 
      address: e.currentTarget.elements["address"].value, 
      email: e.currentTarget.elements["email"].value
    };
    props.setEditable(false);
    e.currentTarget.reset();
    await updateCustomer(customer); 
  }
  if(props.isEditable) {
    return (
      <header className={`${styles.cardHeader} ${styles.cardHeaderNew}`}>
        <form className={styles.cardTitleForm} onSubmit={handleEditCustomer}>
          <input
            className={`${styles.cardTitle} ${styles.cardTitleInput}`}
            defaultValue={props.customer.name}
            name="name"
          />
          <input
            className={`${styles.cardTitle} ${styles.cardTitleInput}`}
            defaultValue={props.customer.address}
            name="address"
          />
          <input
            className={`${styles.cardTitle} ${styles.cardTitleInput}`}
            defaultValue={props.customer.email}
            name="email"
          />            
          <ImageButton icon="check" label="고객 편집" />
        </form>
      </header>
    );
  }
  return (
      <header className={styles.cardHeader}>
        <div className={styles.cardTitle}>
          <div>이름: {props.customer.name}</div>
          <div>주소: {props.customer.address}</div>
          <div>이메일: {props.customer.email}</div>
        </div>
      </header>    
  );
}

export default CustomerInfo;

