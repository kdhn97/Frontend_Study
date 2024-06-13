'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

const Products = () => {
    const [products, setProducts] = useState([]!);
    const fetchProducts = async () => {
        const res = await fetch("http://localhost:8080/api/v1/products");
        const response = await res.json();
        setProducts(response);
    }
    useEffect(() => {
        fetchProducts();
    }, []);

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