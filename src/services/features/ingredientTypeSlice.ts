import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    IIngredientType,
    IIngredientTypeCreate,
} from '../../models/Ingredient';
import {
    createIngredientTypeEndpoint,
    deleteIngredientTypeEndpoint,
    getAllIngredientTypesEndpoint,
    getIngredientTypeByIdEndpoint,
    renameIngredientTypeEndpoint,
    updateStatusIngredientType,
} from '../api/apiConfig';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';

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
            const response = await axiosInstance.get(getAllIngredientTypesEndpoint, {
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
export const getIngredientTypeById = createAsyncThunk<IIngredientType, { id: number }>(
    'ingredientTypes/getIngredientTypeById',
    async ({ id }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.get(`${getIngredientTypeByIdEndpoint}/${id}`, {
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
    }
);

export const createIngredientType = createAsyncThunk<
    IIngredientTypeCreate,
    Object
>('ingredientTypes/createIngredientType', async (ingredientType, thunkAPI) => {
    try {
        const token = sessionStorage.getItem('quickServeToken');
        const response = await axiosInstance.post(
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
            toast.error(`${response.data.errors[0].description}`);
        }
        return response.data.data;
    } catch (error: any) {
        toast.error(`${error.response.data.errors[0].description}`)
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const updateStatusIngredientTypeById = createAsyncThunk<IIngredientType, { id: number }>(
    'ingredientTypes/updateStatusIngredientTypeById',
    async ({ id }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.put(
                `${updateStatusIngredientType}/${id}/status`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (response.data.success) {
                toast.success('Cập nhật trạng thái loại thành phần thành công !');
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                toast.error(`${error.response.data.errors[0].description}`)
            );
        }
    }
);

export const deleteIngredientTypeById = createAsyncThunk<void, { id: number }>(
    'ingredientTypes/deleteIngredientTypeById',
    async ({ id }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.delete(`${deleteIngredientTypeEndpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                toast.success('Xóa loại thành phần thành công !');
            }else{
                toast.error(response.data.errors[0].description);
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                toast.error(`${error.response.data.errors[0].description}`)
            );
        }
    }
);
export const renameIngredientType = createAsyncThunk<IIngredientType, { id: number, name: string }>(
    'ingredientTypes/renameIngredientType',
    async ({ id, name }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.put(
                `${renameIngredientTypeEndpoint}/${id}`,
                { id, name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (response.data.success) {
                toast.success('Đổi tên loại thành phần thành công !');
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                toast.error(`${error.response.data.errors[0].description}`)
            );
        }
    }
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
        //handled get all ingredient types
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

        //handled create ingredient type
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

        //hanlded update status ingredient type by id
        builder.addCase(updateStatusIngredientTypeById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateStatusIngredientTypeById.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(updateStatusIngredientTypeById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string[];
        });

        //hanlded delete ingredient type by id
        builder.addCase(deleteIngredientTypeById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteIngredientTypeById.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(deleteIngredientTypeById.rejected, (
            state,
            action,
        ) => {
            state.loading = false;
            state.error = action.payload as string[];
        });

        //hanlded rename ingredient type by id
        builder.addCase(renameIngredientType.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(renameIngredientType.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(renameIngredientType.rejected, (
            state,
            action,
        ) => {
            state.loading = false;
            state.error = action.payload as string[];
        });

    },
});

export const { setError } = ingredientTypeSlice.actions;
export default ingredientTypeSlice.reducer;