'use client';
import Link from 'next/link';
import Info from './info';
import { useSession } from "next-auth/react";
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const url = 'http://localhost:8080/api/v1/products';
const Products = () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/products')
        }
    });
    const [products, setProducts] = useState([]!);
    const user: any = session?.user;
    const featchProducts = async () => {
        const response = await fetch(url, {
            method: "GET",
            headers: {
            authorization: `bearer ${user.accessToken}`,
            },
        });
        const products: Products = await response.json();
        setProducts(products);
    };
    useEffect(() => {
        featchProducts();
    }, [session]);
    return (
        <>
            <div className="bg-white p-4 rounded-md w-full">
                <div className="flex items-center justify-between pb-6">
                    <div className="text-gray-600 text-3xl font-semibold">제품 목록</div>
                    <div className="flex items-center justify-between">
                        <div className="lg:ml-40 ml-10 space-x-8">
                            <Link className="button" href="/products/add">추가</Link>
                        </div>
                    </div>
                </div>
            </div>
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table className="min-w-full leading-normal">
						<thead>
							<tr>
								<th className='header'>제품명</th>
                                <th className='header'>제품 설명</th>
                                <th className='header'>가격</th>
                                <th className='header'></th>
                                <th className='header'></th>                                
							</tr>
						</thead> 
                        <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <Info product={product}/>
                                <td className="row">
                                    <Link className="button" href={`/products/${product.id}/update`}>변경</Link>
                                </td>
                                <td className="row">
                                    <Link className="button" href={`/products/${product.id}/delete`}>삭제</Link>    
                                </td>
                            </tr>
                            ))}
                        </tbody>
					</table>
				</div>
			</div>  
        </>
    );
}

export default Products;

