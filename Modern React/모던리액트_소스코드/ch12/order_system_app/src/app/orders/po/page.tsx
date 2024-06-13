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
            <h3>제품 주문</h3>
            <form onSubmit={(event) => handleSubmit(event, products) }>
                <select value={id} onChange={(event) => setId(Number(event.currentTarget.value))}>
                    {products.map((product) => (
                            <option value={product.id} key={product.id}>{product.name}</option>
                        ))
                    }
                </select>
                <label htmlFor={"quantity"}>수량</label>
                <input type="number" name="quantity"  min="1" defaultValue={1}/><br/>
                <button type="submit">장바구니에 추가</button>
            </form>
            <Link href="/orders/cart">장바구니 보기</Link><br/>
            <Link href="/orders" onClick={() => setItems([])}>주문 취소</Link>
        </>
    )
}

export default PurchaseOrder;

