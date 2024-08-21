import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAccountStatic, IBestSellingOfBrand, IBestSellingOfStore, IRevenueOfAdmin, IRevenueOfStore } from "../../models/Statistic";
import axiosInstance from "../api/axiosInstance";
import { getAccountReportEndpoint, getBestSellingReportOfBrandEndpoint, getBestSellingReportOfStoreEndpoint, getRevenueReportOfAdminEndpoint, getRevenueReportOfStoreEndpoint } from "../api/apiConfig";

type RevenueState = {
    loading: boolean;
    loadingBestSelling: boolean;
    loadingAcc: boolean;
    revenueOfStore: IRevenueOfStore | null;
    bestSellingOfStore: IBestSellingOfStore | null;
    bestSellingOfBrand: IBestSellingOfBrand | null;
    revenueOfAdmin: IRevenueOfAdmin | null;
    accountStatics: IAccountStatic | null;
    error: string[] | unknown;
    success: boolean;
};

const initialState: RevenueState = {
    loading: false,
    loadingBestSelling: false,
    loadingAcc: false,
    revenueOfStore: null,
    bestSellingOfStore: null,
    bestSellingOfBrand: null,
    revenueOfAdmin: null,
    accountStatics: null,
    error: null,
    success: false,
};

export const getRevenueOfStore = createAsyncThunk<IRevenueOfStore, { data: any }>(
    'revenue/getRevenueOfStore',
    async (params, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            // Format the URL with query parameters including Month and Year
            const formattedURL = `${getRevenueReportOfStoreEndpoint}?${params.data}`;
            const response = await axiosInstance.get(
                formattedURL,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getRevenueOfAdmin = createAsyncThunk<IRevenueOfAdmin, { data: any }>(
    'revenue/getRevenueOfAdmin',
    async (params, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            // Format the URL with query parameters including Month and Year
            const formattedURL = `${getRevenueReportOfAdminEndpoint}?${params.data}`;
            const response = await axiosInstance.get(
                formattedURL,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getBestSellingOfStore = createAsyncThunk<IBestSellingOfStore, { data: any }>(
    'revenue/getBestSellingOfStore',
    async (params, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            // Format the URL with query parameters including Month and Year
            const formattedURL = `${getBestSellingReportOfStoreEndpoint}?${params.data}`;
            const response = await axiosInstance.get(
                formattedURL,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const getBestSellingOfBrand = createAsyncThunk<IBestSellingOfBrand, { data: any }>(
    'revenue/getBestSellingOfBrand',
    async (params, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            // Format the URL with query parameters including Month and Year
            const formattedURL = `${getBestSellingReportOfBrandEndpoint}?${params.data}`;
            const response = await axiosInstance.get(
                formattedURL,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );            
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getAccountStatic = createAsyncThunk<IAccountStatic, { data: any }>(
    'static/getAccountStatic',
    async (params, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            // Format the URL with query parameters including Month and Year
            const formattedURL = `${getAccountReportEndpoint}?${params.data}`;
            const response = await axiosInstance.get(
                formattedURL,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const revenueSlice = createSlice({
    name: 'revenues',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add the reducers for getRevenueOfStore and getBestSellingOfStore
        builder.addCase(getRevenueOfStore.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getRevenueOfStore.fulfilled, (state, action) => {
            state.loading = false;
            state.revenueOfStore = action.payload;
        });
        builder.addCase(getRevenueOfStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });
        // Add the reducers for getRevenueOfAdmin
        builder.addCase(getRevenueOfAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getRevenueOfAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.revenueOfAdmin = action.payload;
        });
        builder.addCase(getRevenueOfAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });
        // Add the reducers for getBestSellingOfBrand
        builder.addCase(getBestSellingOfBrand.pending, (state) => {
            state.loadingBestSelling = true;
        });
        builder.addCase(getBestSellingOfBrand.fulfilled, (state, action) => {
            state.loadingBestSelling = false;
            state.bestSellingOfBrand = action.payload;
        });
        builder.addCase(getBestSellingOfBrand.rejected, (state, action) => {
            state.loadingBestSelling = false;
            state.error = action.payload as string[];
        });
        // Add the reducers for getBestSellingOfStore
        builder.addCase(getBestSellingOfStore.pending, (state) => {
            state.loadingBestSelling = true;
        });
        builder.addCase(getBestSellingOfStore.fulfilled, (state, action) => {
            state.loadingBestSelling = false;
            state.bestSellingOfStore = action.payload;
        });
        builder.addCase(getBestSellingOfStore.rejected, (state, action) => {
            state.loadingBestSelling = false;
            state.error = action.payload as string[];
        });
        builder.addCase(getAccountStatic.pending, (state) => {
            state.loadingAcc = true;
        });
        builder.addCase(getAccountStatic.fulfilled, (state, action) => {
            state.loadingAcc = false;
            state.accountStatics = action.payload;
        });
        builder.addCase(getAccountStatic.rejected, (state, action) => {
            state.loadingAcc = false;
            state.error = action.payload as string[];
        });
    }
});

export const { setError } = revenueSlice.actions;
export default revenueSlice.reducer;


