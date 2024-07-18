export interface INutritionFields {
    id: number,
    name: string,
    imageUrl: string,
    description: string,
    vitamin: string,
    healthValue: string
}

export interface IIngredientNutrition {
    id: number,
    name: string,
    nutritions: INutritionFields[]
}

interface IIgredientNutritionFieldCreate {
    id: number
}

export interface IIngredientNutritionCreate {
    ingredientId: number,
    nutritionIds: IIgredientNutritionFieldCreate[]
}