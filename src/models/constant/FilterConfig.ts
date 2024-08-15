export type FilterConfigByBrand = {
    pageNumber: number;
    pageSize: number;
    storeId: number | null;
    refOrderId: number | null;
    createdDate: string;
    last7Days: boolean;
    specificMonth: number | null;
    specificYear: number | null;
}

export type FilterConfigByStore = {
    pageNumber: number;
    pageSize: number;
    refOrderId: number | null;
    createdDate: string;
    last7Days: boolean;
    specificMonth: number | null;
    specificYear: number | null;
}