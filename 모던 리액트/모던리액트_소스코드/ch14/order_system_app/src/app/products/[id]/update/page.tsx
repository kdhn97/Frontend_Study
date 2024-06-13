'use client';
import { FormEvent, useEffect, useState } from "react";
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

const url = 'http://localhost:8080/api/v1/products';
const Update = ({params: {id}}) => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/products')
        }
    });
    const [product, setProduct] = useState(null!);
    const user: any = session?.user;
    const fetchProduct = async () => {
        const response = await fetch(`${url}/${id}`, {
            method: "GET",
            headers: {
            authorization: `bearer ${user.accessToken}`,
            }
        });
        const product: Product = await response.json();
        setProduct(product);
    };
    useEffect(() => {
        fetchProduct();
    }, [session]);
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const id = event.currentTarget.elements["id"].value;
        const name = event.currentTarget.elements["name"].value;
        const description =  event.currentTarget.elements["description"].value;
        const price =  event.currentTarget.elements["price"].value;        
        const product = {id, name, description, price};
        const response = await fetch(`${url}/${product.id}`, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
                authorization: `bearer ${user.accessToken}`,
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
                    <div className="text-gray-600 text-3xl font-semibold">제품 정보 변경</div>
                    <div className="flex items-center justify-between">
                        <div className="lg:ml-40 ml-10 space-x-8">
                        <Link className="button" href="/products">제품 관리 홈</Link>
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
                            <input name="name" defaultValue={product && product.name}/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="description">제품 설명: </label>
                            <input name="description" defaultValue={product && product.description}/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="price">가격: </label>
                            <input name="price" defaultValue={product && product.price}/>
                        </div>                        
                        <button className="button" type="submit">변경</button>           
                    </form>
                </div>
            </div>
        </>
    );
}

export default Update;


