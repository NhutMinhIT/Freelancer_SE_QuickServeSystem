export interface IIngredientType {
    id: number;
    name: string;
    status: number;
    createdBy: string;
    created: Date | string;
    lastModifiedBy: string;
    lastModified: Date | string;
}

export interface IIngredient {
    id: number;
    name: string;
    price: number;
    calo: number;
    description: string;
    imageUrl: string;
    ingredientTypeId: number;
    status: number;
    ingredientType: IIngredientType;
    createdBy: string;
    created: Date | string;
    lastModifiedBy: string;
    lastModified: Date | string;
}

export interface IIngredientTypeCreate {
    name: string;
}
export interface IIngredientTypesRename {
    id: number;
    name: string;
}

export interface IIngredientCreate {
    name: string;
    price: number;
    calo: number;
    description: string;
    image: File;
    ingredientTypeId: number;
}