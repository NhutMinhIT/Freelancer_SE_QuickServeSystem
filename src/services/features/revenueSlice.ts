import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBestSellingOfStore, IRevenueOfStore } from "../../models/Statistic";
import axiosInstance from "../api/axiosInstance";
import { getBestSellingReportOfStoreEndpoint, getRevenueReportOfStoreEndpoint } from "../api/apiConfig";

type RevenueState = {
    loading: boolean;
    revenueOfStore: IRevenueOfStore | null;
    bestSellingOfStore: IBestSellingOfStore | null;
    error: string[] | unknown;
    success: boolean;
};

const initialState: RevenueState = {
    loading: false,
    revenueOfStore: null,
    bestSellingOfStore: null,
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
        // Add the reducers for getBestSellingOfStore
        builder.addCase(getBestSellingOfStore.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getBestSellingOfStore.fulfilled, (state, action) => {
            state.loading = false;
            state.bestSellingOfStore = action.payload;
        });
        builder.addCase(getBestSellingOfStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });
    }
});

export const { setError } = revenueSlice.actions;
export default revenueSlice.reducer;


