import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IEmployee } from "../../models/Employee";
import axiosInstance from "../api/axiosInstance";
import { getAllEmployeeEndpoint } from "../api/apiConfig";

type EmployeeState = {
    loading: boolean;
    employees: IEmployee[] | null;
    error: string[] | unknown;
    success: boolean;
};
const initialState: EmployeeState = {
    loading: false,
    employees: null,
    error: null,
    success: false,
};

export const getAllEmployees = createAsyncThunk<IEmployee[], void>(
    'employees/getAllEmployees',
    async (_, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.get(getAllEmployeeEndpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllEmployees.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        });
        builder.addCase(getAllEmployees.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.employees = action.payload;
        });
        builder.addCase(getAllEmployees.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        });
    },
});

export const { setError } = employeeSlice.actions;
export default employeeSlice.reducer;