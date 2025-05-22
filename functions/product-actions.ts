import { Product } from "@/types/global";
import { Dispatch, SetStateAction } from "react";

export const fetchProducts = async (
    setProducts: Dispatch<SetStateAction<Product[]>>,
    setError: Dispatch<SetStateAction<string | null>>,
    setLoading: Dispatch<SetStateAction<boolean>>
) => {
    setLoading(true);
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