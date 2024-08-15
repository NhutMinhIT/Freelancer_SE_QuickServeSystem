export interface IPayment {
    id: number;
    created: Date | string;
    paymentType: string,
    refOrderId: number | null,
    amount: number | null,
    storeId: number | null,
    status: number | null
}