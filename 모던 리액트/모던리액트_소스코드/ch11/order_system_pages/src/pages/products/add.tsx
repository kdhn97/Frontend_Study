import Link from "next/link";
import { FormEvent } from "react";
const url = 'http://localhost:8080/api/v1/products';
const Add = () => {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = event.currentTarget.elements["name"].value;
        const description =  event.currentTarget.elements["description"].value;
        const price =  Number(event.currentTarget.elements["price"].value);        
        const product = {name, description ,price};
        const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(product),
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
            <h3>제품 정보</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">제품명: </label>
                <input name="name"/><br/>
                <label htmlFor="description">제품 설명: </label>
                <input name="description"/><br/>
                <label htmlFor="price">가격: </label>
                <input type="nubmer" name="price"/><br/>                                        
                <button type="submit">저장</button>           
            </form>
            <Link href="/products">제품 관리 홈으로 가기</Link>            
        </>
    );
}

export default Add;

