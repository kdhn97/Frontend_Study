'use client';
import { useContext, useState } from "react";
import Link from "next/link";
import OrderContext from "@/app/context/OrderContext";

const url = "http://localhost:8080/api/v1/orders"
const Cart = () => {
    const {items, setItems, customer} = useContext(OrderContext);
    const [orderItems, setOrderItems] = useState([]);
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if(orderItems.length === 0) {
            setItems([]);
            return;
        }
        const order = {
            customer : customer.id,
            items : orderItems.map((item) => {
                return {product : item.id, quantity : item.quantity}
            })
        };
        const response = await fetch(`${url}`, {
            method : "POST",
            body : JSON.stringify(order),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
        if(response.ok) {
            setItems([]);
        } else ;
    }
    const handleCheck = (event, item) => {
        if(event.target.checked) {
            setOrderItems((prev) => [...prev, {id: item.id, quantity: item.quantity}]);
        } else {
            setOrderItems(orderItems.filter((check) => check !== item.id));
        }
    }
    return (
        <>
            {(items.length) !== 0 ?
                <>
                    <h3>장바구니</h3>
                    <form onSubmit={handleSubmit}>
                        {items.map((item) => (
                                <li key={item.id}>제품명: {item.name}, 가격: {item.price}원, 주문 수량: {item.quantity}개,
                                    선택: <input type="checkbox" name={`item${item.id}`} 
                                        onChange={(event) => handleCheck(event, item)}></input>
                                </li>
                            ))
                        }
                        <button type="submit">주문</button>
                    </form>
                    <div>
                        <Link href="/orders/po" >제품 선택 계속하기</Link><br/> 
                        <Link href="/orders" onClick={() => setItems([])}>주문 취소</Link>
                    </div>
                </>
            :
            <Link href="/orders">제품 주문으로 돌아가기</Link>  
        }  
        </>
    )
}

export default Cart;