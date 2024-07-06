import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllEmployeeEndpoint, createEmployeeEndpoint } from '../api/apiConfig';
import axiosInstance from '../api/axiosInstance';
import { ICreateEmployee, IEmployee } from '../../models/Employee';
import { toast } from 'react-toastify';

type EmployeeState = {
    loading: boolean;
    employees: IEmployee[] | null;
    employee: IEmployee | null;
    createEmployee: ICreateEmployee | null;
    error: string[] | unknown;
    success: boolean;
}

const initialState: EmployeeState = {
    loading: false,
    employees: null,
    employee: null,
    createEmployee: null,
    error: null,
    success: false,
};

export const getAllEmployee = createAsyncThunk<IEmployee[], void>(
    'employee/getAllEmployee',
    async (_, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.get(`${getAllEmployeeEndpoint}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.errorMessages || 'Unknown error',
            );
        }
    },
);

export const createEmployee = createAsyncThunk<IEmployee, Object>(
    'employee/createEmployee',
    async (employee, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.post(
                createEmployeeEndpoint,
                employee,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (response.data.success) {
                toast.success(
                    'Tạo nhân viên thành công !',
                );
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
            return response.data.data;
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
    },
    extraReducers: (builder) => {
        builder.addCase(getAllEmployee.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllEmployee.fulfilled, (state, action) => {
            state.loading = false;
            state.employees = action.payload;
            state.error = null;
        });
        builder.addCase(getAllEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(createEmployee.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createEmployee.fulfilled, (state, action) => {
            state.loading = false;
            state.createEmployee = action.payload;
            state.success = true;
        });
        builder.addCase(createEmployee.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });
    },
});

export const { setError } = employeeSlice.actions;
export default employeeSlice.reducer;
