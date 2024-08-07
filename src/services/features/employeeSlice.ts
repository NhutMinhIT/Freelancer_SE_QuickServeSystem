import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IEmployee } from "../../models/Employee";
import axiosInstance from "../api/axiosInstance";
import { getAllEmployeeEndpoint } from "../api/apiConfig";
import { toast } from "react-toastify";

export interface FilterConfig {
    pageNumber: number;
    pageSize: number;
    name: string;
    roles: string;
}

type EmployeeState = {
    loading: boolean;
    employees: IEmployee[] | null;
    error: string[] | unknown;
    success: boolean;
    filterConfig: FilterConfig;
    totalItems: number;
    totalPages: number; 
};

const initialState: EmployeeState = {
    loading: false,
    employees: null,
    error: null,
    success: false,
    filterConfig: {
        pageNumber: 1,
        pageSize: 20,
        name: '',
        roles: '',
    },
    totalItems: 0,
    totalPages: 0,
};

export const getAllEmployees = createAsyncThunk<{ data: IEmployee[], totalItems: number, totalPages: number }, FilterConfig>(
    'employees/getAllEmployees',
    async (filterConfig, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');

            const params: any = {
                pageNumber: filterConfig.pageNumber,
                pageSize: filterConfig.pageSize,
                name: filterConfig.name,
            };

            if (filterConfig.roles) {
                params.roles = filterConfig.roles;
            }

            const response = await axiosInstance.get(getAllEmployeeEndpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params
            });
            const { data, totalItems, totalPages } = response.data;
            return { data, totalItems, totalPages };
        } catch (error: any) {
            toast.error(`${error.response.data.errors[0].description}`);
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
        setFilterConfig: (state, action) => {
            state.filterConfig = action.payload;
        }
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
            state.employees = action.payload.data;
            state.totalItems = action.payload.totalItems;
            state.totalPages = action.payload.totalPages;
            state.error = null;
        });
        builder.addCase(getAllEmployees.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        });
    },
});

export const { setError, setFilterConfig } = employeeSlice.actions;
export default employeeSlice.reducer;