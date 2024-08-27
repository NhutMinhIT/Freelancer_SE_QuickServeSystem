import { IIngredientSold } from "./Ingredient";

// Purpose: Define the interface of Statistic model.
export interface IBestSellingOfStore {
    startDate: Date;
    endDate: Date;
    bestSellingProductTemplates: IBestSellingProductTemplates[]
    soldIngredients: IIngredientSold[]
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
export interface IOrderStatusCount {
    Pending: number;
    Preparing: number;
    Success: number;
    Paided: number;
    Failed: number;
    Canceled: number;
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
    orderStatusCounts: IOrderStatusCount
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

export interface IAccountStatic {
    totalAccounts: number
    accountsByRole: {
        Staff: number
        Admin: number
        Customer: number
        Store_Manager: number
        Brand_Manager: number
    };
    totalEmployeeCount: number;
    employeeByStoreCount: number;
}

