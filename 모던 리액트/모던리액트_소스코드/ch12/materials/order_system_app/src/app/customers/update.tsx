import { FormEvent } from "react";

const url = 'http://localhost:8080/api/v1/customers';

const Update = ({customer}) => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    return (
        <>
            <h3>고객 정보 변경</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">ID: </label>
                <input name="id" defaultValue={customer.id} readOnly/><br/>
                <label htmlFor="name">이름: </label>
                <input name="name" defaultValue={customer.name}/><br/>
                <label htmlFor="address">주소: </label>
                <input name="address" defaultValue={customer.address}/><br/>
                <label htmlFor="email">이메일: </label>
                <input name="email" defaultValue={customer.email}/><br/>                        
                <button type="submit">변경</button>           
            </form>
            <a href="/customers">고객 정보 목록으로 돌아가기</a>
        </>
    );
}

export default Update;