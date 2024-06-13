'use client';
import Link from "next/link";
import { FormEvent } from "react";
const url = 'http://localhost:8080/api/v1/inventories';
const productUrl = 'http://localhost:8080/api/v1/products';
const Store = async ({params: {id}}) => {
    const response = await fetch(`${url}/${id}`);
    const inventory: Inventory = await response.json();
    const resProd = await fetch(`${productUrl}/${id}`);
    const product: Product = await resProd.json();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const id = event.currentTarget.elements["id"].value;
        const quantity =  Number(event.currentTarget.elements["quantity"].value);        
        const newInventory = {id, quantity: inventory.quantity + quantity};
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(newInventory),
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
            <div className="bg-white p-4 rounded-md w-full">
                <div className="flex items-center justify-between pb-6">
                    <div className="text-gray-600 text-3xl font-semibold">제품 입고</div>
                    <div className="flex items-center justify-between">
                        <div className="lg:ml-40 ml-10 space-x-8">
                        <Link className="button" href="/inventories">입고 관리 홈</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="id">ID: </label>
                            <input name="id" defaultValue={id} readOnly/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="name">제품명: </label>
                            <input name="name" defaultValue={product.name}/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="quantity">재고 수량: </label>
                            <input name="quantity" defaultValue={inventory.quantity}/>
                        </div>                      
                        <button className="button" type="submit">입고</button>           
                    </form>
                </div>
            </div>
        </>
    );
}
export default Store;
