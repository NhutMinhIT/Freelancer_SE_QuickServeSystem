import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IIngredientNutrition, IIngredientNutritionCreate } from "../../models/Ingredientutrition";
import axiosInstance from "../api/axiosInstance";
import { createIngredientNutritionEndpoint, deleteIngredientNutritionEndpoint, getIngredientNutritionEndpoint, updateIngredientNutritionEndpoint } from "../api/apiConfig";
import { toast } from "react-toastify";

type IngredientNutritionState = {
    loading: boolean;
    ingredientNutritionById: IIngredientNutrition | null;
    createIngredientNutrition: IIngredientNutritionCreate | null;
    error: string[] | unknown;
    success: boolean;
};
const initialState: IngredientNutritionState = {
    loading: false,
    ingredientNutritionById: null,
    createIngredientNutrition: null,
    error: null,
    success: false,
};

export const getNutritionByIngredientId = createAsyncThunk<IIngredientNutrition, { ingredientId: number | null }>(
    'ingredientNutrition/getIngredientNutritionByIngredientId',
    async (data, thunkAPI) => {
        const { ingredientId } = data;
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.get(`${getIngredientNutritionEndpoint}/${ingredientId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const createIngredientNutrition = createAsyncThunk<IIngredientNutritionCreate, Object>(
    'ingredientNutrition/createIngredientNutrition',
    async (data, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.post(
                createIngredientNutritionEndpoint,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (response.data.success) {
                toast.success('Tạo dinh dưỡng cho nguyên liệu thành công!');
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
            return response.data.data;
        } catch (error: any) {
            toast.error(`${error.response.data.errors[0].description}`);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateIngredientNutrition = createAsyncThunk<IIngredientNutritionCreate, { ingredietId: number, data: Object }>(
    'ingredientNutrition/updateIngredientNutrition',
    async ({ ingredietId, data }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.put(
                `${updateIngredientNutritionEndpoint}/${ingredietId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (response.data.success) {
                toast.success('Cập nhật dinh dưỡng cho nguyên liệu thành công!');
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
            return response.data.data;
        } catch (error: any) {
            toast.error(`${error.response.data.errors[0].description}`);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const clearIngredietNutritionByNutritionId = createAsyncThunk<void, { ingredientId: number }>(
    'ingredientNutrition/deleteIngredientNutritionbIngredientId',
    async ({ ingredientId }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.delete(
                `${deleteIngredientNutritionEndpoint}/${ingredientId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (response.data.success) {
                toast.success('Xóa tất cả dinh dưỡng của nguyên liệu thành công!');
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
            return response.data;
        } catch (error: any) {
            toast.error(`${error.response.data.errors[0].description}`);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteNutritionByIngredientId = createAsyncThunk<void, { ingredientId: number, nutritionId: number }>(
    'ingredientNutrition/clearIngredietNutritionByNutritionId',
    async ({ ingredientId, nutritionId }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.delete(
                `${deleteIngredientNutritionEndpoint}/${ingredientId}/nutrition`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: { nutritionId }
                },
            );
            if (response.data.success) {
                toast.success('Xóa dinh dưỡng cho nguyên liệu thành công!');
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
            return response.data;
        } catch (error: any) {
            toast.error(`${error.response.data.errors[0].description}`);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const ingredientNutritionSlice = createSlice({
    name: 'ingredientNutrition',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getNutritionByIngredientId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getNutritionByIngredientId.fulfilled, (state, action) => {
            state.loading = false;
            state.ingredientNutritionById = action.payload;
        });
        builder.addCase(getNutritionByIngredientId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //create ingredient nutrition
        builder.addCase(createIngredientNutrition.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createIngredientNutrition.fulfilled, (state, action) => {
            state.loading = false;
            state.createIngredientNutrition = action.payload;
        });
        builder.addCase(createIngredientNutrition.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //update ingredient nutrition
        builder.addCase(updateIngredientNutrition.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateIngredientNutrition.fulfilled, (state, action) => {
            state.loading = false;
            state.createIngredientNutrition = action.payload;
        });
        builder.addCase(updateIngredientNutrition.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //delete ingredient nutrition
        builder.addCase(deleteNutritionByIngredientId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteNutritionByIngredientId.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(deleteNutritionByIngredientId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //clear ingredient nutrition
        builder.addCase(clearIngredietNutritionByNutritionId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(clearIngredietNutritionByNutritionId.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(clearIngredietNutritionByNutritionId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const { setError } = ingredientNutritionSlice.actions;
export default ingredientNutritionSlice.reducer;