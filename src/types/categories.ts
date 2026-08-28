import type { Product } from "./products"

export type Category = {
    id:string,
    name:string,
    description:string|null,
    products: Product[],
    createdAt:string,
    updatedAt:string,
}

export type CreateCategory = Pick<Category, "name" | "description">;

export type EditCategory = {
    name?:string,
    description?:string
}