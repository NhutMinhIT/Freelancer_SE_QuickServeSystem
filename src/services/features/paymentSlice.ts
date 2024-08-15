import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { IPayment } from "../../models/Payment";
import { getPaymentsByStoreEndpoint, getPaymentsEndpoint } from "../api/apiConfig";
import { toast } from "react-toastify";

export interface FilterPaymentsConfig {
    pageNumber: number;
    pageSize: number;
    storeId: number | null;
    refOrderId: number | null;
    createdDate: string;
    last7Days: boolean;
    specificMonth: number | null;
    specificYear: number | null;
}

type PaymentState = {
    loading: boolean;
    payments: IPayment[] | null; 
    paymentsStore: IPayment[] | null; 
    filterPaymentsConfig: FilterPaymentsConfig;
    filterPaymentsStoreConfig: FilterPaymentsConfig;
    totalItems: number;
    totalPages: number; 
    totalItemsStore: number;
    totalPagesStore: number; 
    error: string[] | unknown;
    success: boolean;
};

const initialState: PaymentState = {
    loading: false,
    payments: null,
    paymentsStore: null,
    filterPaymentsConfig: {
        pageNumber: 1,
        pageSize: 20,
        storeId: null,
        refOrderId: null,
        createdDate: '',
        last7Days: false,
        specificMonth: null,
        specificYear: null,
    },
    filterPaymentsStoreConfig: {
        pageNumber: 1,
        pageSize: 20,
        storeId: null,
        refOrderId: null,
        createdDate: '',
        last7Days: false,
        specificMonth: null,
        specificYear: null,
    },
    totalItems: 0,
    totalPages: 0,
    totalItemsStore: 0,
    totalPagesStore: 0,
    error: null,
    success: false,
};

export const getPayments = createAsyncThunk<{ data: IPayment[], totalItems: number, totalPages: number }, FilterPaymentsConfig>(
    'users/getPayments',
    async (filterConfig, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const params: any = {
                pageNumber: filterConfig.pageNumber,
                pageSize: filterConfig.pageSize,
            };

            if (filterConfig.storeId !== null)  params.storeId = filterConfig.storeId;
            if (filterConfig.refOrderId !== null) params.refOrderId = filterConfig.refOrderId;
            if (filterConfig.last7Days) params.last7Days = filterConfig.last7Days;
            if (filterConfig.createdDate) params.createdDate = filterConfig.createdDate;
            if (filterConfig.specificMonth !==null) params.specificMonth = filterConfig.specificMonth;
            if (filterConfig.specificYear !==null) params.specificYear = filterConfig.specificYear;
            
            const response = await axiosInstance.get(getPaymentsEndpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params,
            });
            const { data, totalItems, totalPages } = response.data;
            return { data, totalItems, totalPages };
        } catch (error: any) {
            toast.error(`${error.response.data.errors[0].description}`);
            return thunkAPI.rejectWithValue(
                error.response?.data?.errorMessages || 'Unknown error',
            );
        }
    },
);

export const getPaymentsStore = createAsyncThunk<{ data: IPayment[], totalItemsStore: number, totalPagesStore: number }, FilterPaymentsConfig>(
    'users/getPaymentsStore',
    async (filterConfig, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const params: any = {
                pageNumber: filterConfig.pageNumber,
                pageSize: filterConfig.pageSize,
            };

            if (filterConfig.storeId !== null)  params.storeId = filterConfig.storeId;
            if (filterConfig.refOrderId !== null) params.refOrderId = filterConfig.refOrderId;
            if (filterConfig.last7Days) params.last7Days = filterConfig.last7Days;
            if (filterConfig.createdDate) params.createdDate = filterConfig.createdDate;
            if (filterConfig.specificMonth !==null) params.specificMonth = filterConfig.specificMonth;
            if (filterConfig.specificYear !==null) params.specificYear = filterConfig.specificYear;
            
            const response = await axiosInstance.get(getPaymentsByStoreEndpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params,
            });
            const { data, totalItemsStore, totalPagesStore } = response.data;
            return { data, totalItemsStore, totalPagesStore };
        } catch (error: any) {
            toast.error(`${error.response.data.errors[0].description}`);
            return thunkAPI.rejectWithValue(
                error.response?.data?.errorMessages || 'Unknown error',
            );
        }
    },
);

export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        setFilterPaymentsConfig: (state, action) => {
            state.filterPaymentsConfig = action.payload;
        },
        setFilterPaymentsStoreConfig: (state, action) => {
            state.filterPaymentsStoreConfig = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPayments.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPayments.fulfilled, (state, action) => {
            state.loading = false;
            state.payments = action.payload.data;
            state.totalItems = action.payload.totalItems;
            state.totalPages = action.payload.totalPages;
            state.error = null;
        });
        builder.addCase(getPayments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(getPaymentsStore.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPaymentsStore.fulfilled, (state, action) => {
            state.loading = false;
            state.paymentsStore = action.payload.data;
            state.totalItemsStore = action.payload.totalItemsStore;
            state.totalPagesStore = action.payload.totalPagesStore;
            state.error = null;
        });
        builder.addCase(getPaymentsStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export const { setError, setFilterPaymentsConfig,setFilterPaymentsStoreConfig } = paymentSlice.actions;
export default paymentSlice.reducer;


