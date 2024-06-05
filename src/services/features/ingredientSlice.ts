import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { IIngredient } from '../../models/Ingredient';
import { getAllIngredientEndpoint } from '../api/apiConfig';

type IngredientState = {
    loading: boolean;
    ingredients: IIngredient[] | null;
    error: string[] | unknown;
    success: boolean;
};

const initialState: IngredientState = {
    loading: false,
    ingredients: null,
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

const ingredientSlice = createSlice({
    name: 'ingredientTypes',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
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
    },
});

export const { setError } = ingredientSlice.actions;
export default ingredientSlice.reducer;
