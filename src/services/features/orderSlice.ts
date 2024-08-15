import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";


type OrderState = {
    loading: boolean;
   
    error: string[] | unknown;
    success: boolean;
};

const initialState: OrderState = {
    loading: false,
    
    error: null,
    success: false,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add the reducers for getRevenueOfStore and getBestSellingOfStore
       
    }
});

export const { setError } = orderSlice.actions;
export default orderSlice.reducer;


