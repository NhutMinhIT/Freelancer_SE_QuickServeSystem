import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProductTemplate, IProductTemplateCreate, IProductTemplateUpdate } from "../../models/ProductTemplate";
import axios from "axios";
import { getAllProductTemplatesEndpoint, getProductTemplateByIdEndpoint, createProductTemplateEndpoint, deleteProductTemplateEndpoint, changeImageProductTemplateEndpoint, updateProductTemplateEndpoint } from "../api/apiConfig";
import { toast } from "react-toastify";

type ProductTemplateSate = {
    loading: boolean;
    productTemplates: IProductTemplate[] | null;
    productTemplate: IProductTemplate | null;
    createProductTemplate: IProductTemplateCreate | null;
    error: string[] | unknown;
    success: boolean;
};
const initialState: ProductTemplateSate = {
    loading: false,
    productTemplates: null,
    createProductTemplate: null,
    productTemplate: null,
    error: null,
    success: false,
};
export const getAllProductTemplates = createAsyncThunk<IProductTemplate[], void>(
    'productTemplates/getAllProductTemplates',
    async (_, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axios.get(getAllProductTemplatesEndpoint, {
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
export const getProductTemplateById = createAsyncThunk<IProductTemplate, { id: number }>(
    'productTemplates/getProductTemplateById',
    async (data, thunkAPI) => {
        const { id } = data;
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axios.get(`${getProductTemplateByIdEndpoint}/${id}`, {
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
export const createProductTemplate = createAsyncThunk<IProductTemplateCreate, FormData>(
    'productTemplates/createProductTemplate',
    async (data, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axios.post(createProductTemplateEndpoint, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                toast.success(
                    'Tạo mẫu sản phẩm ! Có thẻ sử dụng ngay !',
                );
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
export const deleteProductTemplate = createAsyncThunk<void, { id: number }>(
    'productTemplates/deleteProductTemplate',
    async (data, thunkAPI) => {
        const { id } = data;
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axios.delete(`${deleteProductTemplateEndpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                toast.success('Xóa loại mẫu sản phẩm thành công !');
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
export const changeImageProductTempalte = createAsyncThunk<void, { id: number, formData: FormData }>(
    'productTemplates/changeImageProductTempalte',
    async (data, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axios.put(`${changeImageProductTemplateEndpoint}/${data.id}/image`, data.formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                toast.success('Cập nhật hình ảnh mẫu sản phẩm thành công !');
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

export const updateProductTemplateById = createAsyncThunk<IProductTemplateUpdate, { id: number, data: Object }>(
    'productTemplates/updateProductTemplateById',
    async ({ id, data }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axios.put(`${updateProductTemplateEndpoint}/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                toast.success(
                    'Cập nhật mẫu sản phẩm thành công thành công!'
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


const productTemplateSlice = createSlice({
    name: 'productTemplates',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        //action get all product templates
        builder.addCase(getAllProductTemplates.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllProductTemplates.fulfilled, (state, action) => {
            state.loading = false;
            state.productTemplates = action.payload;
        });
        builder.addCase(getAllProductTemplates.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //action get product template by id
        builder.addCase(getProductTemplateById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProductTemplateById.fulfilled, (state, action) => {
            state.loading = false;
            state.productTemplate = action.payload;
        });
        builder.addCase(getProductTemplateById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //action create product template
        builder.addCase(createProductTemplate.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createProductTemplate.fulfilled, (state, action) => {
            state.loading = false;
            state.createProductTemplate = action.payload;
        });
        builder.addCase(createProductTemplate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //action delete product template
        builder.addCase(deleteProductTemplate.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteProductTemplate.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(deleteProductTemplate.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //action change image product template
        builder.addCase(changeImageProductTempalte.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(changeImageProductTempalte.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(changeImageProductTempalte.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //action update product template
        builder.addCase(updateProductTemplateById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateProductTemplateById.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(updateProductTemplateById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});
export const { setError } = productTemplateSlice.actions;
export default productTemplateSlice.reducer;
