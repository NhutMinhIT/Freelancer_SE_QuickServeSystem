import { FilterConfigByStore } from './../../models/constant/FilterConfig';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { IOrder } from "../../models/Order";
import { FilterConfigByBrand } from "../../models/constant/FilterConfig";
import { toast } from 'react-toastify';
import { getOrderListByStoreIdEndpoint, getOrderListEndpoint } from '../api/apiConfig';




type OrderState = {
    loading: boolean;
    orderByBrand: IOrder[] | null;
    orderByStore: IOrder[] | null;
    filterOrderByBrand: FilterConfigByBrand;
    filterOrderByStore: FilterConfigByStore;
    totalItems: number;
    totalPages: number;
    totalItemsStore: number;
    totalPagesStore: number;
    error: string[] | unknown;
    success: boolean;
};

const initialState: OrderState = {
    loading: false,
    orderByBrand: null,
    orderByStore: null,
    filterOrderByBrand: {
        pageNumber: 1,
        pageSize: 20,
        storeId: null,
        refOrderId: null,
        createdDate: '',
        last7Days: false,
        specificMonth: null,
        specificYear: null,
    },
    filterOrderByStore: {
        pageNumber: 1,
        pageSize: 20,
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

export const getOrder = createAsyncThunk<{ data: IOrder[], totalItems: number, totalPages: number }, FilterConfigByBrand>(
    'users/getOrder',
    async (filterConfig, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const params: any = {
                pageNumber: filterConfig.pageNumber,
                pageSize: filterConfig.pageSize,
            };

            if (filterConfig.storeId !== null) params.storeId = filterConfig.storeId;
            if (filterConfig.refOrderId !== null) params.refOrderId = filterConfig.refOrderId;
            if (filterConfig.last7Days) params.last7Days = filterConfig.last7Days;
            if (filterConfig.createdDate) params.createdDate = filterConfig.createdDate;
            if (filterConfig.specificMonth !== null) params.specificMonth = filterConfig.specificMonth;
            if (filterConfig.specificYear !== null) params.specificYear = filterConfig.specificYear;

            const response = await axiosInstance.get(getOrderListEndpoint, {
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
    }
);

export const getOrderStore = createAsyncThunk<{ data: IOrder[], totalItems: number, totalPages: number }, FilterConfigByStore>(
    'users/getOrderStore',
    async (filterConfig, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const params: any = {
                pageNumber: filterConfig.pageNumber,
                pageSize: filterConfig.pageSize,
            };

            if (filterConfig.refOrderId !== null) params.refOrderId = filterConfig.refOrderId;
            if (filterConfig.last7Days) params.last7Days = filterConfig.last7Days;
            if (filterConfig.createdDate) params.createdDate = filterConfig.createdDate;
            if (filterConfig.specificMonth !== null) params.specificMonth = filterConfig.specificMonth;
            if (filterConfig.specificYear !== null) params.specificYear = filterConfig.specificYear;

            const response = await axiosInstance.get(getOrderListByStoreIdEndpoint, {
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
    }
);


export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        setFilterOrdersConfig: (state, action) => {
            state.filterOrderByBrand = action.payload;
        },
        setFilterOrdersStoreConfig: (state, action) => {
            state.filterOrderByStore = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getOrder.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orderByBrand = action.payload.data;
            state.totalItems = action.payload.totalItems;
            state.totalPages = action.payload.totalPages;
            state.error = null;
        });
        builder.addCase(getOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Store
        builder.addCase(getOrderStore.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getOrderStore.fulfilled, (state, action) => {
            state.loading = false;
            state.orderByStore = action.payload.data;
            state.totalItemsStore = action.payload.totalItems;
            state.totalPagesStore = action.payload.totalPages;
            state.error = null;
        });
        builder.addCase(getOrderStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export const { setError, setFilterOrdersConfig, setFilterOrdersStoreConfig } = orderSlice.actions;
export default orderSlice.reducer;


