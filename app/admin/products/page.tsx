'use client'
import { fetchProducts } from '@/functions/product-actions';
import { uploadFileOnDB } from '@/functions/storage-actions';
import { Product } from '@/types/global';
import React, { useEffect, useState } from 'react'

const AdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [files, setFiles] = useState<FileList | null>(null);

    // fetch products
    useEffect(() => {
        fetchProducts(setProducts, setError, setLoading);
    }, []);


    // upload an image
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setFiles(files)
    };

    const upload = async () => {
        if (!files || files.length === 0) {
            setError("No files selected");
            return;
        }
        if (files.length > 5) {
            setError("max files limit reached")
            return
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const filePath = `upload/${Date.now()}-${file.name}`

            const { data, error } = await uploadFileOnDB(filePath, file)

            if (error) {
                setError("upload file failed")
            } else {
                setMessage("file uploaded")
            }
        }
        setMessage(files.length + " files uploaded")
    }


    return (
        <div>
            <div className='mb-1'>
                <p>Upload file</p>
                <input
                    type="file"
                    multiple
                    accept="image/png, image/jpeg"
                    onChange={handleFileChange} disabled={uploading}
                />
                {uploading && <p>Uploading...</p>}
                <button onClick={() => upload()}>Upload file</button>
                {message && <p>{message}</p>}
            </div>
            <hr />

            <div className='bg-gray-200 p-2'>
                <h2>Product List</h2>
                {(products.length == 0 && !loading) && <p>No products</p>}
                {loading ? <p className='text-red-500'>Loading..</p>
                    : products.map((product, i) => (
                        <div key={product.id} className='bg-blue-500 m-1 px-2 rounded-md text-white'>
                            <h3>{i + 1}. Name: {product.name}</h3>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default AdminProducts