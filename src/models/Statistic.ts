import { IIngredientSold } from "./Ingredient";

// Purpose: Define the interface of Statistic model.
export interface IBestSellingOfStore {
    startDate: Date;
    endDate: Date;
    bestSellingProductTemplates: IBestSellingProductTemplates[]
}
export interface IBestSellingOfBrand {
    startDate: Date;
    endDate: Date;
    bestSellingProductTemplates: IBestSellingProductTemplates[];
    soldIngredients: IIngredientSold[];
}

export interface IBestSellingProductTemplates {
    id: number
    name: string;
    urlImage: string
    price: number;
    sellingQuantity: number;
    totalOrders: number;
    totalRevenue: number
}
export interface IMonthlyRevenues {
    month: number;
    orderCount: number;
    revenue: number
}
// Define the interface of IRevenueOfStore model.
export interface IRevenueOfStore {
    startDate: Date;
    endDate: Date;
    totalRevenue: number;
    specificRevenue: number;
    totalOrderCount: number;
    specificOrderCount: number
    monthlyRevenues: IMonthlyRevenues[]
}
export interface IRevenueOfAdmin {
    startDate: Date;
    endDate: Date;
    totalRevenue: number;
    specificRevenue: number;
    totalOrderCount: number;
    specificOrderCount: number
    monthlyRevenues: IMonthlyRevenues[]
}

