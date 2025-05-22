export interface ProductCategory {
    id: number;
    name: string;
}

export interface BusinessInfo {
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

export interface Product {
    id: number;
    name: string;
    images: string[];
    description_primary?: string;
    description_secondary?: string;
    price: number;
    is_visible: boolean;
    product_category: ProductCategory;
    business_info: BusinessInfo;
    created_at: string;
    updated_at: string;
}