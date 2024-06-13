'use client';
import { useContext, useEffect, useState } from 'react';
import Link from "next/link";
import OrderContext from '../context/OrderContext';
import Login from '../components/commons/Login';
import Modal from '../components/commons/Modal';
import Info from './info';

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
        const response = await fetch(`${url}/login`, {
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
                <div className="bg-white p-4 rounded-md w-full">
                    <div className="flex items-center justify-between pb-6">
                        <div className="text-gray-600 text-3xl font-semibold">제품 주문 현황</div>
                        <div className="flex items-center justify-between">
                            <div className="lg:ml-40 ml-10 space-x-8">
                                <Link className="button" href="/orders/po">주문</Link>
                            </div>
                            <div className="lg:ml-40 ml-10 space-x-8">
                                <Link className="button" href="/" onClick={() => setCustomer(null)}>로그아웃</Link>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    {orders && orders.map((order) => (
                    <div key={order.id}>
                        <div className='flex gap-8 text-lg font-semibold text-gray-600 px-5 py-5'>
                            <div>주문 ID: {order.id}</div>
                            <div>주문 일자: {order.date}</div>
                        </div>
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className='header'>제품명</th>
                                    <th className='header'>가격</th>
                                    <th className='header'>주문 수량</th>                              
                                </tr>
                            </thead> 
                            <tbody>
                            {order.items.map((item) => (
                                <tr key={item.id}>
                                    <Info item={item}/>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    ))}
                    </div>
                </div>
            </>
        </>
    );
}

export default Order;

