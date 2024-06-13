import { useContext } from 'react';
import CustomerContext from '@/pages/contexts/CustomerContext';
import ImageButton from '../commons/ImageButton';
import styles from '@/styles/Card.module.css';
import { gql, useMutation } from "@apollo/client";
const CREATE_CUSTOMER = gql(`
  mutation createCustomer(
    $name: String!, 
    $address: String!, 
    $email: String!) {
    createCustomer(
        name: $name
        address: $address
        email: $email) {
            id
    }
  }
`);
const CustomerAdd = () => {
  const context = useContext(CustomerContext);
  const [createCustomer, {data, error}] = useMutation(CREATE_CUSTOMER); 
  const handleCustomerAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = e.currentTarget.elements["name"].value;
    const address = e.currentTarget.elements["address"].value;
    const email = e.currentTarget.elements["email"].value;
    e.currentTarget.reset();
    createCustomer(
      {
        variables: {
            name, 
            address, 
            email
        }
      }
    );
    context.setFetched((prev: boolean) => !prev);
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

