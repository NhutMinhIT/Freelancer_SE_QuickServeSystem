export interface IIngredientTypeTemplateSteps {
    id: number;
    name: string;
    templates?: ITemplates[];
}
interface ITemplates {
    templateStepId: number;
    name: string;
    ingredientTypes?: IIngredientTypesTemplate[]
}
interface IIngredientTypesTemplate {
    ingredientTypeId?: number;
    name?: string;
    quantityMin?: number;
    quantityMax?: number;
}

export interface IIngredientTypeTemplateStepCreate {
    templateStepId: number;
    ingredientType: IIngredientTypesTemplate[]
}
