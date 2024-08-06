import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserInfo } from '../../models/UserInfor';
import { getAllUsersEndpoint, getUserByIdEndpoint } from '../api/apiConfig';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';
export interface FilterConfig {
    pageNumber: number;
    pageSize: number;
    name: string;
    roles: string | null;
}
interface UserState {
    loading: boolean;
    users: IUserInfo[] | null;
    user: IUserInfo | null;
    error: string | null;
    filterConfig: FilterConfig;
    totalItems: number;
    totalPages: number; 
}

const initialState: UserState = {
    loading: false,
    users: null,
    user: null,
    error: null,
    filterConfig: {
        pageNumber: 1,
        pageSize: 20,
        name: '',
        roles: null,
    },
    totalItems: 0,
    totalPages: 0,
};

export const getAllUser = createAsyncThunk<{ data: IUserInfo[], totalItems: number, totalPages: number }, FilterConfig>(
    'users/getAllUser',
    async (filterConfig, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.get(getAllUsersEndpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    pageNumber: filterConfig.pageNumber,
                    pageSize: filterConfig.pageSize,
                    name: filterConfig.name,
                    roles: filterConfig.roles,
                },
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

export const getUserById = createAsyncThunk<IUserInfo, { id: string }>(
    'users/getUserById',
    async (data, thunkAPI) => {
        const { id } = data;
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.get(
                `${getUserByIdEndpoint}/id=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return response.data.data;
        } catch (error: any) {
            toast.error(`${error.response.data.errors[0].description}`);
            return thunkAPI.rejectWithValue(
                error.response?.data?.errorMessages || 'Unknown error',
            );
        }
    },
);

export const usersSlice = createSlice({
    name: 'users',
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
        builder.addCase(getAllUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.data;
            state.totalItems = action.payload.totalItems;
            state.totalPages = action.payload.totalPages;
            state.error = null;
        });
        builder.addCase(getAllUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        //User profile
        builder.addCase(getUserById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserById.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        });
        builder.addCase(getUserById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { setError, setFilterConfig } = usersSlice.actions;
export default usersSlice.reducer;
