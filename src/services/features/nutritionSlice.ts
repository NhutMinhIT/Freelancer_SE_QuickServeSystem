import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INutrition, INutritionCreate, INutritionUpdateInfor } from "../../models/Nutrition";
import axiosInstance from "../api/axiosInstance";
import { changeImageNutritionEndpoint, createNutritionEndpoint, deleteNutritionEndpoint, getAllNutritionEndpoint, getNutritionByIdEndpoint, updateNutritionEndpoint } from "../api/apiConfig";
import { toast } from "react-toastify";

type NutritionState = {
    loading: boolean;
    nutritions: INutrition[] | null;
    nutrition: INutrition | null;
    createNutrition: INutritionCreate | null;
    error: string[] | unknown;
    success: boolean;
};

const initialState: NutritionState = {
    loading: false,
    nutritions: null,
    createNutrition: null,
    nutrition: null,
    error: null,
    success: false,
};

export const getAllNutritions = createAsyncThunk<INutrition[], void>(
    'nutritions/getAllNutritions',
    async (_, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.get(getAllNutritionEndpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error: any) {
            toast.error(`${error.response.data.errors[0].description}`);
            return thunkAPI.rejectWithValue(
                error.response?.data?.errorMessages || 'Unknown error',
            );
        }
    },
);

export const getNutrition = createAsyncThunk<INutrition[], { id: number }>(
    'nutritions/getNutrition',
    async (data, thunkAPI) => {
        const { id } = data;
        console.log(id);
        
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.get(`${getNutritionByIdEndpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error: any) {
            toast.error(`${error.response.data.errors[0].description}`);
            return thunkAPI.rejectWithValue(
                error.response?.data?.errorMessages || 'Unknown error',
            );
        }
    },
);

export const createNutrition = createAsyncThunk<INutritionCreate, FormData>(
    'nutritions/createNutrition',
    async (data, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.post(createNutritionEndpoint, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                toast.success(
                    'Tạo chất dinh dưỡng thành công ! Có thẻ sử dụng ngay !',
                );
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                toast.error(`${error.response.data.errors[0].description}`)
            );
        }
    },
);

export const deleteNutrition = createAsyncThunk<void, { id: number }>(
    'nutritions/deleteNutrition',
    async (data, thunkAPI) => {
        const { id } = data;
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.delete(`${deleteNutritionEndpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                toast.success('Xóa chất dinh dưỡng thành công !');
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                toast.error(`${error.response.data.errors[0].description}`)
            );
        }
    },
);

export const changeImageNutrition = createAsyncThunk<void, { id: number, formData: FormData }>(
    'nutritions/changeImageNutrition',
    async (data, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.put(`${changeImageNutritionEndpoint}/${data.id}/image`, data.formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                toast.success('Thay đổi ảnh chất dinh dưỡng thành công !');
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                toast.error(`${error.response.data.errors[0].description}`)
            );
        }
    },
);

export const updateInforNutrition = createAsyncThunk<INutrition, { id: number }>(
    'nutritions/renameNutrition',
    async (data, thunkAPI) => {
    
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.put(`${updateNutritionEndpoint}/${data.id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                toast.success('Cập nhật chất dinh dưỡng thành công !');
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                toast.error(`${error.response.data.errors[0].description}`)
            );
        }
    },
);

export const nutritionSlice = createSlice({
    name: 'nutritions',
    initialState,
    reducers: {
        clearNutrition: (state) => {
            state.nutrition = null;
        },
    },
    extraReducers: (builder) => {
        //View List Nutritions
        builder.addCase(getAllNutritions.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllNutritions.fulfilled, (state, action) => {
            state.loading = false;
            state.nutritions = action.payload;
        });
        builder.addCase(getAllNutritions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //Get 1 Nutrition
        builder.addCase(getNutrition.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getNutrition.fulfilled, (state, action) => {
            state.loading = false;
            state.nutrition = action.payload;
        });
        builder.addCase(getNutrition.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //Create Nutrition
        builder.addCase(createNutrition.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createNutrition.fulfilled, (state, action) => {
            state.loading = false;
            state.createNutrition = action.payload;
        });
        builder.addCase(createNutrition.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //update Nutrition
        builder.addCase(updateInforNutrition.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateInforNutrition.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(updateInforNutrition.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //Delete Nutrition
        builder.addCase(deleteNutrition.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteNutrition.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(deleteNutrition.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //Change Image Nutrition
        builder.addCase(changeImageNutrition.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(changeImageNutrition.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(changeImageNutrition.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearNutrition } = nutritionSlice.actions;
export default nutritionSlice.reducer;