'use client';
import Link from 'next/link';
import Info from './info';

const url = 'http://localhost:8080/api/v1/products';
const Products = async () => {
    const response = await fetch(url);
    const products: Products = await response.json();
    return (
        <>
            <h3>제품 목록</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <Info product={product}/>
                        <ul>
                            <li><Link href={`/products/${product.id}/update`}>변경</Link></li>
                            <li><Link href={`/products/${product.id}/delete`}>삭제</Link></li>                       
                        </ul>
                    </li>
                ))}
            </ul>
            <Link href="/products/add">제품 정보 추가</Link><br/>
        </>
    );
}

export default Products;