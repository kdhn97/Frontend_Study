'use client';
import Link from 'next/link';

const url = 'http://localhost:8080/api/v1/products';
const Delete = async ({params: {id}}) => {
    const response = await fetch(`${url}/${id}`);
    const product: Product = await response.json();
    const handleDelete = async () => {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
        if(!response.ok) {
            console.log("Error");
        }
    }

    return (
        <>
            <div className="bg-white p-4 rounded-md w-full">
                <div className="flex items-center justify-between pb-6">
                    <div className="text-gray-600 text-3xl font-semibold">제품 정보 삭제</div>
                    <div className="flex items-center justify-between">
                        <div className="lg:ml-40 ml-10 space-x-8">
                        <Link className="button" href="/products">제품 관리 홈</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">
                    <div className="mb-5 block text-base font-medium text-gray-500">
                        <li> ID: {id} </li>
                    </div>
                    <div className="mb-5 block text-base font-medium text-gray-500">
                        <li> 제품명: {product.name} </li> 
                    </div>
                    <div className="mb-5 block text-base font-medium text-gray-500">
                        <li> 제품 설명: {product.description} </li> 
                    </div>
                    <div className="mb-5 block text-base font-medium text-gray-500">
                        <li> 가격: {product.price} </li> 
                    </div>
                    <div className="mb-5 block text-base font-medium text-gray-500">
                        삭제하시겠습니까?
                    </div>                                         
                    <button className="button"  onClick={handleDelete}>삭제</button>           
                </div>
            </div>
        </>
    );
}

export default Delete;

