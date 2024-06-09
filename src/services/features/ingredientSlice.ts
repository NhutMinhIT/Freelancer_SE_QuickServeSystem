import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IIngredient, IIngredientCreate } from '../../models/Ingredient';
import { createIngredientEndpoint, deleteIngredientEndpoint, getAllIngredientEndpoint, getIngredientByIdEndpoint } from '../api/apiConfig';
import { toast } from 'react-toastify';

type IngredientState = {
    loading: boolean;
    ingredients: IIngredient[] | null;
    createIngredient: IIngredientCreate | null;
    error: string[] | unknown;
    success: boolean;
};

const initialState: IngredientState = {
    loading: false,
    ingredients: null,
    createIngredient: null,
    error: null,
    success: false,
};

export const getAllIngredients = createAsyncThunk<IIngredient[], void>(
    'ingredients/getAllIngredients',
    async (_, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axios.get(getAllIngredientEndpoint, {
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
export const getIngredientById = createAsyncThunk<IIngredient, { id: number }>(
    'ingredients/getIngredientById',
    async (data, thunkAPI) => {
        const { id } = data;
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axios.get(`${getIngredientByIdEndpoint}/${id}`, {
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

export const createIngredient = createAsyncThunk<IIngredientCreate, FormData>(
    'ingredients/createIngredient',
    async (data, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axios.post(createIngredientEndpoint, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                toast.success(
                    'Tạo tên loại nguyên liệu thành công ! Có thẻ sử dụng ngay !',
                );
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
            return response.data.data;
        } catch (error: any) {
            toast.error(`${error.response.data.errors[0].description}`)
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);
export const deleteIngredient = createAsyncThunk<void, { id: number }>(
    'ingredients/deleteIngredient',
    async ({ id }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axios.delete(`${deleteIngredientEndpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                toast.success('Xóa loại thành phần thành công !');
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                toast.error(`${error.response.data.errors[0].description}`)
            );
        }
    },
);

const ingredientSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        //action get all ingredient
        builder.addCase(getAllIngredients.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllIngredients.fulfilled, (state, action) => {
            state.loading = false;
            state.ingredients = action.payload;
        });
        builder.addCase(getAllIngredients.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });
        //action create ingredient
        builder.addCase(createIngredient.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createIngredient.fulfilled, (state, action) => {
            state.loading = false;
            state.createIngredient = action.payload;
        });
        builder.addCase(createIngredient.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });
        //action delete ingredient
        builder.addCase(deleteIngredient.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteIngredient.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(deleteIngredient.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });
    },
});

export const { setError } = ingredientSlice.actions;
export default ingredientSlice.reducer;
