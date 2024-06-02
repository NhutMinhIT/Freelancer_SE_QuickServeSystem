import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICategory, ICategoryCreate } from '../../models/Categoty';
import axios from 'axios';
import {
    createCategoryEndpoint,
    deleteCategoryEndpoint,
    getAllCategoriesEndpoint,
    updateStatusCategoryEndpoint,
} from '../api/apiConfig';
import { toast } from 'react-toastify';

type CategoryState = {
    loading: boolean;
    categories: ICategory[] | null;
    createCategory: ICategoryCreate | null;
    error: string[] | unknown;
    success: boolean;
};
const initialState: CategoryState = {
    loading: false,
    categories: null,
    createCategory: null,
    error: null,
    success: false,
};

export const getAllCategories = createAsyncThunk<ICategory[], void>(
    'categories/getAllCategories',
    async (_, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axios.get(getAllCategoriesEndpoint, {
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
export const createCategory = createAsyncThunk<ICategoryCreate, Object>(
    'categories/createCategory',
    async (category, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axios.post(
                createCategoryEndpoint,
                category,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            toast.success('Tạo thể loại thành công ! Có thể sử dụng ngay.');
            return response.data.data;
        } catch (error: any) {
            toast.error('Tạo thể loại thất bại !');
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const updateStatusCategoryById = createAsyncThunk<
    ICategory,
    { id: number }
>('users/updateStatusCategoryById', async ({ id }, thunkAPI) => {
    try {
        const token = sessionStorage.getItem('quickServeToken');
        const response = await axios.put(
            `${updateStatusCategoryEndpoint}`,
            { id },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        toast.success('Cập nhật trạng thái thể loại thành công !');
        return response.data;
    } catch (error: any) {
        toast.error('Cập nhật trạng thái thể loại không thành công!');
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const deleteCategoryById = createAsyncThunk<void, { id: number }>(
    'users/deleteCategoryById',
    async ({ id }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axios.delete(
                `${deleteCategoryEndpoint}?Id=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            toast.success('Cập nhật trạng thái thể loại thành công !');
            return response.data;
        } catch (error: any) {
            toast.error('Cập nhật trạng thái thể loại không thành công!');
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        });
        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });
        builder.addCase(createCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.createCategory = action.payload;
            state.success = true;
        });
        builder.addCase(createCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });
        builder.addCase(updateStatusCategoryById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateStatusCategoryById.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(updateStatusCategoryById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });

        builder.addCase(deleteCategoryById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteCategoryById.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(deleteCategoryById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });
    },
});
export const { setError } = categorySlice.actions;
export default categorySlice.reducer;
