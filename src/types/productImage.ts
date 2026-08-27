import type { Product } from "./products";

export interface ProductImage {
    id:string,
    url:string,
    order:number,
    product:Product,
    productId:string,
    createdAt:string,
}