import type { Category } from "./categories";
import type  { ProductImage } from "./productImage";
export interface Product {
    id:string,
    name:string,
    description:string|null,
    price:number,
    stock:number,
    category:Category,
    categoryID:string,
    images:ProductImage[],
    createdAt:string,
    updatedAt:string,

}