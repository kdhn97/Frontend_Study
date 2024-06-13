'use client';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Products = () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/')
        }
    });
    const [products, setProducts] = useState([]!);

    const user: any = session?.user;
    const fetchProducts = async () => {
        const res = await fetch("http://localhost:8080/api/v1/products", {
          method: "GET",
          headers: {
            authorization: `bearer ${user.accessToken}`,
          },
        });
        const response = await res.json();
        setProducts(response);
    }
    useEffect(() => {
        fetchProducts();
    }, [session]);

    return (
        <>
            <div className="text-3xl font-bold text-center">제품 목록</div>
            <ul className="m-2 max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
                {products.map((product: any) => (
                    <li key={product.id}>{product.name}, {product.description}, {product.price}</li>
                    ))
                }
            </ul>
            <Link className="button" href="/">홈으로</Link>
        </>
    )
}

export default Products;