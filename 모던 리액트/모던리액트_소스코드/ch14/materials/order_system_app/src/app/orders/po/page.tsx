'use client';
import { useContext, useState, useEffect } from "react";
import OrderContext from "@/app/context/OrderContext";
import Link from "next/link";

const url = 'http://localhost:8080/api/v1/products';
const PurchaseOrder = () => {
    const { items, setItems } = useContext(OrderContext);
    const [ products, setProducts] = useState([]!);
    const [id, setId] = useState(1);
    const handleSubmit = (event, products : Product[]) => {
        event.preventDefault();
        const quantity = Number(event.currentTarget.elements["quantity"].value);
        const product = products.find((prod) => prod.id === id);
        const item = items.find((item) => item.id === id);
        if(typeof item === 'undefined') {
            setItems([...items, {
                id : product.id,
                name : product.name,
                price : product.price,
                quantity : quantity
            }]);
        } else {
            const output = items.map((item) => {
                if(item.id === id) {
                    return {
                        id : product.id,
                        name : product.name,
                        price : product.price,
                        quantity : quantity + item.quantity
                    }
                } else return item;
            });
            setItems(output);
        }
    }
    const getProducts = async () => {
        const response = await fetch(url);
        const products: Products[] = await response.json()
        setProducts(products);
    }
    useEffect(() => {
        getProducts();
    }, []);
    return (
        <>
        <div className="bg-white p-4 rounded-md w-full">
            <div className="flex items-center justify-between pb-6">
                <div className="text-gray-600 text-3xl font-semibold">제품 주문</div>
                <div className="flex items-center justify-between">
                    <div className="lg:ml-40 ml-10 space-x-8">
                        <Link className="button" href="/orders/cart">장바구니 보기</Link>
                        <Link className="button" href="/orders" onClick={() => setItems([])}>주문 취소</Link>
                    </div>                  
                </div>
            </div>
        </div>
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
                <form onSubmit={(event) => handleSubmit(event, products) }>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label >제품 선택: </label>
                                <select 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={id} onChange={(event) => setId(Number(event.currentTarget.value))}
                                >
                                {products.map((product) => (
                                    <option value={product.id} key={product.id}>{product.name}: {product.price}</option>
                                    ))
                                }
                                </select>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="quantity">수량</label>
                                <input type="number" name="quantity"  min="1" defaultValue={1}/>
                            </div>                                                    
                            <div className="mb-5">
                                <button className="button" type="submit">장바구니 추가</button> 
                            </div>
                        </div>
                    </div>
                </form>
            </div>  
        </div>  
        </>
    )
}

export default PurchaseOrder;

