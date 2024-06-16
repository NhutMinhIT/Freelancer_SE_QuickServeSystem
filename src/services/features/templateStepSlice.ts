import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ITemplateStep, ITemplateStepCreate, ITemplateStepRename } from "../../models/TemplateStep"
import { createTemplateStepEndpoint, deleteTemplateStepEndpoint, getAllTemplateStepsEndpoint, getTemplateStepByIdEndpoint, renameTemplateStepEndpoint } from "../api/apiConfig"
import { toast } from "react-toastify"
import axiosInstance from "../api/axiosInstance"

type TemplateStep = {
    loading: boolean
    templateSteps: ITemplateStep[] | null
    templateStep: ITemplateStep | null
    createTemplateStep: ITemplateStepCreate | null
    error: string[] | unknown
    success: boolean
}
const initialState: TemplateStep = {
    loading: false,
    templateSteps: null,
    templateStep: null,
    createTemplateStep: null,
    error: null,
    success: false
}

export const getAllTemplateSteps = createAsyncThunk<ITemplateStep[], { id: number }>(
    'templateSteps/getAllTemplateSteps',
    async ({ id }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken')
            const response = await axiosInstance.get(`${getAllTemplateStepsEndpoint}?ProductTemplateId=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
);

export const getTemplateStep = createAsyncThunk<ITemplateStep, { id: number }>(
    'templateSteps/getTemplateStep',
    async (data, thunkAPI) => {
        const { id } = data;
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.get(`${getTemplateStepByIdEndpoint}/${id}`, {
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

export const createTemplateStep = createAsyncThunk<ITemplateStepCreate, Object>(
    'templateSteps/createTemplateStep',
    async (templateStep, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.post(
                createTemplateStepEndpoint,
                templateStep,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (response.data.success) {
                toast.success(
                    'Tạo mẫu bước thành công ! Có thẻ sử dụng ngay !',
                );
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
            return response.data.data;
        } catch (error: any) {
            toast.error(`${error.response.data.errors[0].description}`);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);
export const deleteTemplateStep = createAsyncThunk<void, { id: number }>(
    'templateSteps/deleteTemplateStep',
    async ({ id }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.delete(`${deleteTemplateStepEndpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                toast.success('Xóa mẫu bước thành công !');
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
            return response.data;
        } catch (error: any) {
            toast.error(`${error.response.data.errors[0].description}`);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const renameTemplateStep = createAsyncThunk<ITemplateStep, ITemplateStepRename>(
    'templateSteps/renameTemplateStep',
    async ({ id, name }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.put(
                `${renameTemplateStepEndpoint}/${id}`,
                { id, name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (response.data.success) {
                toast.success('Đổi tên mẫu sản phẩm thành công !');
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
            return response.data;
        } catch (error: any) {
            toast.error(`${error.response.data.errors[0].description}`);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

const templateStepSlice = createSlice({
    name: 'templateSteps',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload
        }
    },
    extraReducers: (builder) => {
        //handle get all template steps
        builder.addCase(getAllTemplateSteps.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getAllTemplateSteps.fulfilled, (state, action) => {
            state.loading = false
            state.templateSteps = action.payload
        });
        builder.addCase(getAllTemplateSteps.rejected, (state, action) => { // Corrected here
            state.error = action.payload
        });
        //handle get template step by id
        builder.addCase(getTemplateStep.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getTemplateStep.fulfilled, (state, action) => {
            state.loading = false
            state.templateStep = action.payload
        });
        builder.addCase(getTemplateStep.rejected, (state, action) => {
            state.error = action.payload
        });
        //handle create template step
        builder.addCase(createTemplateStep.pending, (state) => {
            state.loading = true
        });
        builder.addCase(createTemplateStep.fulfilled, (state, action) => {
            state.loading = false
            state.createTemplateStep = action.payload
            state.success = true
        });
        builder.addCase(createTemplateStep.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        });
        //handle delete template step
        builder.addCase(deleteTemplateStep.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteTemplateStep.fulfilled, (state) => {
            state.loading = false
            state.success = true
        });
        builder.addCase(deleteTemplateStep.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        });
        //handle rename template step
        builder.addCase(renameTemplateStep.pending, (state) => {
            state.loading = true
        });
        builder.addCase(renameTemplateStep.fulfilled, (state) => {
            state.loading = false
            state.success = true
        });
        builder.addCase(renameTemplateStep.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        });
    }
});

export const { setError } = templateStepSlice.actions
export default templateStepSlice.reducer






