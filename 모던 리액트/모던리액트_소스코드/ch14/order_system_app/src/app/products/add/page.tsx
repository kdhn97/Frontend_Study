'use client';
import Link from "next/link";
import { FormEvent } from "react";
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';

const url = 'http://localhost:8080/api/v1/products';
const Add = () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/products')
        }
    });
    const user: any = session?.user;
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = event.currentTarget.elements["name"].value;
        const description =  event.currentTarget.elements["description"].value;
        const price =  event.currentTarget.elements["price"].value;        
        const product = {name, description ,price};
        const response = await fetch(url, {
                method: 'POST',
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
                <div className="text-gray-600 text-3xl font-semibold">제품 정보</div>
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
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label htmlFor="name">제품명: </label>
                                <input type="text" name="name" />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="description">제품 설명: </label>
                                <input type="text" name="description"
                                />
                            </div>
                            <div className="mb-5">
                                <label htmlFor="price">가격: </label>
                                <input type="text" name="price" />
                            </div>                                                       
                            <div className="mb-5">
                                <button className="button" type="submit">저장</button> 
                            </div>
                        </div>
                    </div>
                </form>
            </div>  
        </div>             
        </>
    );
}

export default Add;

