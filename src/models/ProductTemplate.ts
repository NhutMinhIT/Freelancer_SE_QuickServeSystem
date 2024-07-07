export interface ICategory {
    id: number;
    name: string;
    status: number;
}
export interface IProductTemplate {
    id: number;
    categoryId: number;
    name: string;
    quantity: number;
    size: string;
    status: number;
    imageUrl: string;
    price: number;
    description: string;
    createdBy: string;
    created: string;
    lastModifiedBy: string;
    lastModified: string;
    category: ICategory;
}
export interface IProductTemplateCreate {
    categoryId: number;
    name: string;
    size: string;
    image: File;
    description: string;
    data: number;
}
export interface IProductTemplateUpdate {
    name: string;
    categoryId: number
    size: string
    price: number
    description: string
}