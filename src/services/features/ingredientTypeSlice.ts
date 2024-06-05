import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IIngredientType } from '../../models/Ingredient';
import axios from 'axios';
import { getAllIngredientTypesEndpoint } from '../api/apiConfig';

type IngredientTypeState = {
    loading: boolean;
    ingredientTypes: IIngredientType[] | null;
    // createIngredientType: IIngredientTypeCreate | null;
    error: string[] | unknown;
    success: boolean;
};
const initialState: IngredientTypeState = {
    loading: false,
    ingredientTypes: null,
    // createIngredientType: null,
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
    },
});

export const { setError } = ingredientTypeSlice.actions;
export default ingredientTypeSlice.reducer;
