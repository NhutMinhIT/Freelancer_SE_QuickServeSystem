export interface INutrition {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    vitamin: string;
    healthValue: string;
    status: number;
    createdBy: string;
    created: Date | string;
    lastModifiedBy: string;
    lastModified: Date | string;
}

export interface INutritionCreate {
    name: string;
    description: string;
    image: string;
    vitamin: string;
    healthValue: string;
}
export interface INutritionUpdateInfor {
    id: string;
    name: string;
    description: string;
    vitamin: string;
    healthValue: string;
}
