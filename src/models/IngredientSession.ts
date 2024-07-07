export interface IIngredientSession {
    id: number,
    name: string,
    startTime: string,
    endTime: string
    ingredients: IIngredientSold[]
}

export interface IIngredientSold{
    id: number,
    name: string,
    imageUrl: string,
    quantity: number,
    soldQuantity: number,
}

export interface IIngredientSessionCreate {
    sessionId: number,
    ingredients: IIngredientSessionFieldsCreate[],
}

export interface IIngredientSessionFieldsCreate{
    id: number,
    quantity: number,
}