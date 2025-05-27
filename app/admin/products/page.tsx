'use client'
import { fetchProducts } from '@/functions/product-actions';
import { uploadFileOnDB } from '@/functions/storage-actions';
import { Product } from '@/types/global';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

const AdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [descriptionPrimary, setDescriptionPrimary] = useState<string>('');
    const [descriptionSecondary, setDescriptionSecondary] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<number>(1);

    // fetch products
    useEffect(() => {
        fetchProducts(setProducts, setError, setLoading);
    }, []);


    return (
        <div className='flex justify-center w-full m-2'>

            <div className='border border-gray-500 p-2'>
                <div>
                    <form className='flex flex-col'>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='border border-b-teal-700 m-1' placeholder='name' />
                        <input type='text' value={descriptionPrimary} onChange={(e) => setDescriptionPrimary(e.target.value)} className='border border-b-teal-700 m-1' placeholder='description primary' />
                        <input type='text' value={descriptionSecondary} onChange={(e) => setDescriptionSecondary(e.target.value)} className='border border-b-teal-700 m-1' placeholder='description secondary' />
                        <label htmlFor='price'>Price</label>
                        <input id='price' type='number' value={price} onChange={(e) => setPrice(e.target.valueAsNumber)} className='border border-b-teal-700 m-1' placeholder='price' />
                        <label htmlFor='catID'>Category ID</label>
                        <input id='catID' type='number' value={categoryId} onChange={(e) => setCategoryId(e.target.valueAsNumber)} className='border border-b-teal-700 m-1' placeholder='price' />
                    </form>
                </div>
                <button className='bg-green-400 p-2 rounded-md' onClick={() => { addProduct(name, descriptionPrimary, descriptionSecondary, price, categoryId, setLoading) }}>{loading ? "loading.." : "Add Product"}</button>
            </div>

            <div className='bg-gray-200 p-2 max-h-96 overflow-y-scroll'>
                <h2>Products ({products?.length})</h2>
                {(products.length == 0 && !loading) && <p>No products</p>}
                {loading ? <p className='text-red-500'>Loading..</p>
                    : products.map((product) => (
                        <div key={product.id} className='bg-blue-500 m-1 px-2 rounded-md text-white'>
                            <p>Id: {product.id}</p>
                            <p>Name: {product.name}</p>
                            <p>Description: {product.description_primary}</p>
                            <p>Category: {product.product_category.name}</p>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default AdminProducts


async function addProduct(
    name: string,
    descriptionPrimary: string,
    descriptionSecondary: string,
    price: number,
    categoryId: number,
    setLoading: Dispatch<SetStateAction<boolean>>
) {
    const productData = {
        name: name,
        // images: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
        description_primary: descriptionPrimary,
        description_secondary: descriptionSecondary,
        price: price,
        is_visible: true,
        category_id: categoryId,
        business_id: 1,
    };

    try {
        const response = await fetch('/api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Product added successfully:', result.product);
        } else {
            console.error('Failed to add product:', result.message);
        }
    } catch (error) {
        console.error('Error calling API:', error);
    }
}
