import { createAsyncThunk } from "@reduxjs/toolkit"
import { ITemplateStep, ITemplateStepCreate, ITemplateStepRename } from "../../models/TemplateStep"
import { createTemplateStepEndpoint, deleteTemplateStepEndpoint, getAllTemplateStepsEndpoint, getTemplateStepByIdEndpoint, renameTemplateStepEndpoint } from "../api/apiConfig"
import axios from "axios"
import { toast } from "react-toastify"

type TemplateStep = {
    loading: boolean
    templateSteps: ITemplateStep[] | null
    createTemplateStep: ITemplateStepCreate | null
    error: string[] | unknown
    success: boolean
}
const initialState: TemplateStep = {
    loading: false,
    templateSteps: null,
    createTemplateStep: null,
    error: null,
    success: false
}

export const getAllTemplateSteps = createAsyncThunk<ITemplateStep[], void>(
    'templateSteps/getAllTemplateSteps',
    async (_, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken')
            const response = await axios.get(getAllTemplateStepsEndpoint, {
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
            const response = await axios.get(`${getTemplateStepByIdEndpoint}/${id}`, {
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
            const response = await axios.post(
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
            const response = await axios.delete(`${deleteTemplateStepEndpoint}/${id}`, {
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
            const response = await axios.put(
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
