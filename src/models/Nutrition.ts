export interface INutrition {
    id: number;
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
    image: File;
    vitamin: string;
    healthValue: string;
}
export interface INutritionUpdateInfor {
    id: number;
    name: string;
    description: string;
    vitamin: string;
    healthValue: string;
}
