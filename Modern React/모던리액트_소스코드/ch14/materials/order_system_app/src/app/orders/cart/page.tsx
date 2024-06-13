'use client';
import { useContext, useState } from "react";
import Link from "next/link";
import OrderContext from "@/app/context/OrderContext";
import Info from "./info";

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
        } else {
            console.log("Error1");
        }
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
            <div className="bg-white p-4 rounded-md w-full">
                <div className="flex items-center justify-between pb-6">
                    <div className="text-gray-600 text-3xl font-semibold">장바구니</div>
                    <div className="flex items-center justify-between">
                        <div className="lg:ml-40 ml-10 space-x-8">
                            <Link className="button" href="/orders/po" >제품 선택 계속하기</Link>
                            <Link className="button" href="/orders" onClick={() => setItems([])}>주문 취소</Link>
                            <Link className="button" href="/orders">제품 주문으로 돌아가기</Link>
                        </div>                  
                    </div>
                </div>
            </div>
            {(items.length) !== 0 &&
                <>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <form onSubmit={handleSubmit}>
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className='header'>제품명</th>
                                    <th className='header'>가격</th>
                                    <th className='header'>주문 수량</th>
                                    <th className='header'>선택</th>                            
                                </tr>
                            </thead> 
                            <tbody>
                            {items.map(item => (
                                <tr key={item.id}>
                                    <Info item={item}/>
                                    <td className="row">
                                        <input 
                                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-800 checked:bg-gray-800 checked:before:bg-gray-800 hover:before:opacity-10"
                                            type="checkbox" name={`item${item.id}`} 
                                            onChange={(event) => handleCheck(event, item)}>
                                        </input>
                                    </td>
                                </tr>
                                ))}
                                <tr>
                                    <td>
                                        <button className="button" type="submit">주문</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
				</div>
			</div>  
            </>
        }  
        </>
    )
}

export default Cart;

