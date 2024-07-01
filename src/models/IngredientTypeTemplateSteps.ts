export interface IIngredientTypeTemplateSteps {
  id: number;
  name: string;
  templates?: ITemplates[];
}
export interface ITemplates {
  templateStepId: number;
  name: string;
  ingredientTypes?: IIngredientTypesTemplate[];
}
export interface IIngredientTypesTemplate {
  ingredientTypeId?: number;
  quantityMin?: number;
  quantityMax?: number;
}

export interface IIngredientTypeTemplateStepCreate {
  productTemplateId: number;
  name: string;
  ingredientType: IIngredientTypesTemplate[];
}
