'use client';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const ProductList = () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/products')
        }
    })
    const [products, setProducts] = useState([]!);

    const user: any = session?.user;
    const fetchProducts = async () => {
        const res = await fetch("http://localhost:8080/api/v1/products");
        const response = await res.json();
        setProducts(response);
    }
    useEffect(() => {
        fetchProducts();
    }, [session]);

    return (
        <>
            <div className="text-2xl font-bold text-center">제품 목록</div>
            <ul className="m-2 max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
                {products.map((product: any) => (
                    <li key={product.id}>{product.name}, {product.description}, {product.price}</li>
                    ))
                }
            </ul>
            <div className="mt-4 mb-4 flex gap-4">
                <p>이메일 : {user && user.email}</p>
                <p>권한: {user && user.role}</p>
            </div>
            <Link className="button" href="/">홈으로</Link>            
        </>
    )
}

export default ProductList;