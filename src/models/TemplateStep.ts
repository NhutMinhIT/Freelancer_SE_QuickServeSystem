export interface ITemplateStep {
    id: number;
    productTemplateId: number;
    name: string;
    status: number;
    createdBy: string;
    created: Date | string;
    lastModifiedBy: string;
    lastModified: Date | string;
    productTemplate: string;
}
interface IIngredientTypesTemplate {
    ingredientTypeId?: number;
    quantityMin?: number;
    quantityMax?: number;
}

export interface ITemplateStepCreate {
    productTemplateId: number;
    name: string;
    ingredientTypes: IIngredientTypesTemplate[];
}

export interface ITemplateStepRename {
    id: number;
    name: string;
}