export interface IOrder {
    id: number;
    amount: number | null
    status: number | null
    storeId: number | null,
    created: Date | string;
    platform: number
}

