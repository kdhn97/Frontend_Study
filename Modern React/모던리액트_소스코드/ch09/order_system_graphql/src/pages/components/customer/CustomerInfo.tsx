import { useContext } from 'react';
import CustomerContext from '@/pages/contexts/CustomerContext';
import ImageButton from '../commons/ImageButton';
import styles from '@/styles/Card.module.css';
import { gql, useMutation } from "@apollo/client";
const UPDATE_CUSTOMER = gql(`
  mutation updateCustomer(
    $id: ID!, 
    $name: String!, 
    $address: String!, 
    $email: String!) {
    updateCustomer(
        id: $id
        name: $name
        address: $address
        email: $email) {
            id
    }
  }
`);
const CustomerInfo = (props: CustomerProps) => {
  const [updateCustomer] = useMutation(UPDATE_CUSTOMER); 
  const context = useContext(CustomerContext);
  const handleEditCustomer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = props.customer.id;
    const name = e.currentTarget.elements["name"].value;
    const address = e.currentTarget.elements["address"].value;
    const email = e.currentTarget.elements["email"].value 
    props.setEditable(false);
    e.currentTarget.reset();
    updateCustomer(
      {
          variables: {
              id,
              name, 
              address, 
              email
          }
      }
    );
    context.setFetched((prev: boolean) => !prev);
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

