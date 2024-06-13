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
            name
            address
            email
    }
  }
`);
const CustomerAddApollo = () => {
    const [createCustomer, {data, error}] = useMutation(CREATE_CUSTOMER); 
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    }
    if (error) return `에러! ${error.message}`;
    return (
        <>
            <div>
                <h3>고객 정보 입력</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>이름: </label>
                    <input name="name"/><br/>
                    <label htmlFor='name'>주소: </label>
                    <input name="address"/><br/>
                    <label htmlFor='name'>이메일: </label>
                    <input name="email"/><br/>
                    <button type="submit">저장</button>                        
                </form>
            </div>
            {data && (
                <div>
                    <h3>저장된 고객 정보</h3>
                    <ul>
                        <li>ID : {data.createCustomer.id}</li>
                        <li>이름 : {data.createCustomer.name}</li>
                        <li>주소 : {data.createCustomer.address}</li>
                        <li>이메일 : {data.createCustomer.email}</li>                    
                    </ul>
                </div>
            )}
        </>
    );
}
export default CustomerAddApollo;

