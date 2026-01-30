// src/types/Product.ts
export interface Product {
  id?: string;
  name: string;
  image: string;
  images: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  discount?: string;
  description: string;
  specifications: string[];
}
