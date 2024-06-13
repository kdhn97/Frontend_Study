import Link from "next/link";
import { FormEvent } from "react";
const url = 'http://localhost:8080/api/v1/customers';
const Add = () => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = event.currentTarget.elements["name"].value;
        const address =  event.currentTarget.elements["address"].value;
        const email =  event.currentTarget.elements["email"].value;        
        const customer = {name, address ,email};
        const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(customer),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
            }
        );
        if(!response.ok) {
            console.log("Error");
        }
    }
    return (
        <>
            <h3>고객 정보</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">이름: </label>
                <input name="name"/><br/>
                <label htmlFor="address">주소: </label>
                <input name="address"/><br/>
                <label htmlFor="email">이메일: </label>
                <input name="email"/><br/>                     
                <button type="submit">저장</button>           
            </form>
            <Link href="/customers">고객 관리 홈으로 가기</Link>            
        </>
    );
}

export default Add;

