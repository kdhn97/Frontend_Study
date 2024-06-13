'use client';
import { useContext, useEffect, useState } from 'react';
import Link from "next/link";
import OrderContext from '../context/OrderContext';
import Info from './info';
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

const url = `http://localhost:8080/api/v1`;
const Order = () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/orders')
        }
    });
    const [ orders, setOrders ] = useState([]!);
    const { customer, setCustomer, products, setProducts } = useContext(OrderContext);
    const user: any = session?.user;
    const fetchOrders = async() => {
        const response = await fetch(`${url}/orders/customer/${customer.id}`, {
            method: "GET",
            headers: {
            authorization: `bearer ${user.accessToken}`,
            },
        });
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
    const fetchProducts = async () => {
        const response = await fetch(`${url}/products`, {
            method: "GET",
            headers: {
            authorization: `bearer ${user.accessToken}`,
            },
        });
        const products: Product[] = await response.json()
        setProducts(products);
    }
    const fetchCustomer = async () => {
        const response = await fetch(`${url}/customers/${user.id}`, {
            method: "GET",
            headers: {
            authorization: `bearer ${user.accessToken}`,
            },
        });
        const customer: Customer = await response.json();
        setCustomer(customer); 
    }
    useEffect(() => {
        fetchCustomer();
    }, [customer]);
    useEffect(() => {
        fetchProducts();
    }, [products]);
    useEffect(() => {
        if(customer !== null && products !== null)
            fetchOrders();
    }, [customer, products]);
    return (
        <>
            <div className="bg-white p-4 rounded-md w-full">
                <div className="flex items-center justify-between pb-6">
                    <div className="text-gray-600 text-3xl font-semibold">제품 주문 현황</div>
                    <div className="flex items-center justify-between">
                        <div className="lg:ml-40 ml-10 space-x-8">
                            <Link className="button" href="/orders/po">주문</Link>
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
    );
}

export default Order;

