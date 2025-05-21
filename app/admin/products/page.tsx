'use client'
import React, { useEffect, useState } from 'react'

const AdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/product');
                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.error || 'Failed to fetch products');
                }

                setProducts(result.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    return (
        <div>
            <h2>Product List</h2>
            {products.length == 0 && <p>No products</p>}
            {products.map((product) => (
                <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                    <h3>Name: {product.name}</h3>
                    <p>Description: {product.description_primary}</p>
                    <p>Price: ₹{product.price}</p>
                </div>
            ))}
        </div>
    )
}

export default AdminProducts

interface ProductCategory {
    id: number;
    name: string;
}

interface BusinessInfo {
    id: number;
    name: string;
    tagline: string;
    about: string;
    address: string;
    pincode: string;
    mobile: string;
    email: string;
    color_primary: string;
    color_secondary: string;
    logo_link: string;
    map_link: string;
    posters: string[];
    updated_at: string;
}

interface Product {
    id: number;
    name: string;
    description_primary?: string;
    description_secondary?: string;
    price: number;
    is_visible: boolean;
    created_at: string;
    updated_at: string;
    product_category: ProductCategory;
    business_info: BusinessInfo;
}