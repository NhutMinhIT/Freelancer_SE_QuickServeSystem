import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    IIngredientType,
    IIngredientTypeCreate,
} from '../../models/Ingredient';
import axios from 'axios';
import {
    createIngredientTypeEndpoint,
    getAllIngredientTypesEndpoint,
} from '../api/apiConfig';
import { toast } from 'react-toastify';

type IngredientTypeState = {
    loading: boolean;
    ingredientTypes: IIngredientType[] | null;
    createIngredientType: IIngredientTypeCreate | null;
    error: string[] | unknown;
    success: boolean;
};
const initialState: IngredientTypeState = {
    loading: false,
    ingredientTypes: null,
    createIngredientType: null,
    error: null,
    success: false,
};

export const getAllIngredientTypes = createAsyncThunk<IIngredientType[], void>(
    'ingredientTypes/getAllIngredientTypes',
    async (_, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axios.get(getAllIngredientTypesEndpoint, {
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
export const createIngredientType = createAsyncThunk<
    IIngredientTypeCreate,
    Object
>('ingredientTypes/createIngredientType', async (ingredientType, thunkAPI) => {
    try {
        const token = sessionStorage.getItem('quickServeToken');
        const response = await axios.post(
            createIngredientTypeEndpoint,
            ingredientType,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        if (response.data.success) {
            toast.success(
                'Tạo tên loại nguyên liệu thành công ! Có thẻ sử dụng ngay !',
            );
        } else {
            toast.error('Tạo tên loại nguyên liệu không thành công !');
        }
        return response.data.data;
    } catch (error: any) {
        toast.error('Tạo tên loại nguyên liệu thất bại !');
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const ingredientTypeSlice = createSlice({
    name: 'ingredientTypes',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllIngredientTypes.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllIngredientTypes.fulfilled, (state, action) => {
            state.loading = false;
            state.ingredientTypes = action.payload;
        });
        builder.addCase(getAllIngredientTypes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });
        builder.addCase(createIngredientType.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createIngredientType.fulfilled, (state, action) => {
            state.loading = false;
            state.createIngredientType = action.payload;
            state.success = true;
        });
        builder.addCase(createIngredientType.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });
    },
});

export const { setError } = ingredientTypeSlice.actions;
export default ingredientTypeSlice.reducer;
