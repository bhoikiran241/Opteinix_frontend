// src/utils/productStore.ts
import { baseProducts } from "../data/ProductsData";
import { Product } from "../types/Product";

const STORAGE_KEY = "admin_products";

export function getAllProducts(): Product[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  const adminProducts: Product[] = stored ? JSON.parse(stored) : [];
  return [...baseProducts, ...adminProducts];
}

export function getAdminProducts(): Product[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveAdminProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}
