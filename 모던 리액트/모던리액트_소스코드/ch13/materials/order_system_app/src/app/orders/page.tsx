'use client';
import { useContext, useEffect, useState } from 'react';
import Link from "next/link";
import OrderContext from '../context/OrderContext';
import Login from '../components/commons/Login';
import Modal from '../components/commons/Modal';

const url = `http://localhost:8080/api/v1`;
const Order = () => {
    const [ products, setProducts] = useState([]!);
    const [ orders, setOrders ] = useState([]!);
    const { customer, setCustomer } = useContext(OrderContext);
    const [ errorMessage, setErrorMessage] = useState<string>("");
    const handleLogin = async (event) => {
        event.preventDefault();
        const email = event.currentTarget.elements["email"].value;
        const password = event.currentTarget.elements["password"].value
        const response = await fetch(`${url}/auth`, {
            method : "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
        });
        if(response.ok) {
            const customer: Customer = await response.json();
            setCustomer(customer);
        } else {
            setErrorMessage("아이디와 패스워드를 다시 확인해주세요.");
        }
    }
    const getOrders = async() => {
        const response = await fetch(`${url}/orders/customer/${customer.id}`);
        const orders: Order[] = await response.json();
        const ordrs = orders.map(order => {
            const items = order.items.map(item => {
                const product = products.find(p => p.id === item.product);
                if(typeof product === 'undefined')
                    return {id: item.id, name: 'unknown', price: 0, quantity: item.quantity};
                return {id: item.id, name: product.name, price: product.price, quantity: item.quantity};
            });
            return {id: order.id, customer: order.customer, date: order.date, items};
        })
        setOrders(ordrs);
    }
    const getProducts = async () => {
        const response = await fetch(`${url}/products`);
        const products: Products[] = await response.json()
        setProducts(products);
    }
    useEffect(() => {
        getProducts();
        if(customer !== null)
            getOrders();
    }, [customer, products]);

    return (
        <>
           {customer === null &&
                <Modal>
                    <Login 
                        errorMessage={errorMessage}
                        handleLogin={handleLogin}
                    />
                </Modal>
            }
            <>
                <h3>제품 주문 현황</h3>
                <ul>
                {orders && orders.map((order) => (
                    <li key={order.id}>
                        주문 ID: {order.id}, 주문 일자: {order.date}
                        <ul>
                            {order.items.map((item) => (
                                <li key={item.id}>
                                    제품명: {item.name}, 가격: {item.price}원, 주문 수량: {item.quantity}개
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
                </ul>
                <Link href="/orders/po">주문</Link><br/>
                <Link href="/" onClick={() => setCustomer(null)}>로그아웃</Link>
            </>
        </>
    );
}

export default Order;

