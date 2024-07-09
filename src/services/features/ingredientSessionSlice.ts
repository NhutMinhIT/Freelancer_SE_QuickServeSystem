import axiosInstance from "../api/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IIngredientSession, IIngredientSessionCreate } from "../../models/IngredientSession";
import { createIngredientSessionEndpoint, deleteIngredientSessionEndpoint, getIngredientSessionEndpoint, updateIngredientSessionEndpoint } from './../api/apiConfig';

type SessionState = {
    loading: boolean;
    ingredientSessionById: IIngredientSession | null;
    createIngredientSession: IIngredientSessionCreate | null;
    error: string[] | unknown;
    success: boolean;
};
const initialState: SessionState = {
    loading: false,
    ingredientSessionById: null,
    createIngredientSession: null,
    error: null,
    success: false,
};

export const getIngredientSessionBySessionId = createAsyncThunk<IIngredientSession, {sessionId : number | null}>(
'ingredientSession/getIngredientSessionBySessionId',
async (data, thunkAPI) => {
        const { sessionId } = data;
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.get(`${getIngredientSessionEndpoint}/${sessionId}`, {
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

export const createIngredientSession = createAsyncThunk<IIngredientSessionCreate, Object>(
    'ingredientSession/createIngredientSession',
    async (data, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.post(
                createIngredientSessionEndpoint,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (response.data.success) {
                toast.success('Tạo nguyên liệu cho ca thành công!');
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

export const updateIngredientSession = createAsyncThunk<IIngredientSessionCreate, { sessionId: number, data: Object }>(
    'ingredientSession/updateIngredientSession',
    async ({sessionId, data}, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.put(
                `${updateIngredientSessionEndpoint}/${sessionId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (response.data.success) {
                toast.success('Cập nhật nguyên liệu cho ca thành công!');
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

export const deleteIngredientSessionBySessionId = createAsyncThunk<void, { sessionId: number }>(
    'ingredientSession/deleteIngredientBySessionId',
    async ({ sessionId }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.delete(
                `${deleteIngredientSessionEndpoint}/${sessionId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (response.data.success) {
                toast.success('Xoá tất cả nguyên loại trong ca thành công !');
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


export const deleteIngredientSessionByIngredientId = createAsyncThunk<void, { sessionId: number, ingredientId: number }>(
    'ingredientSession/deleteIngredientSessionByIngredientId',
    async ({ sessionId, ingredientId }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.delete(
                `${deleteIngredientSessionEndpoint}/${sessionId}/ingredient`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: { ingredientId }
                },
            );
            if (response.data.success) {
                toast.success('Xoá nguyên liệu thành công !');
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

export const ingredientSessionSlice = createSlice({
    name: 'ingredientSession',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getIngredientSessionBySessionId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getIngredientSessionBySessionId.fulfilled, (state, action) => {
            state.loading = false;
            state.ingredientSessionById = action.payload;
        });
        builder.addCase(getIngredientSessionBySessionId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //create ingredient session
        builder.addCase(createIngredientSession.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createIngredientSession.fulfilled, (state, action) => {
            state.loading = false;
            state.createIngredientSession = action.payload;
        });
        builder.addCase(createIngredientSession.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // //update ingredient session
        builder.addCase(updateIngredientSession.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateIngredientSession.fulfilled, (state, action) => {
            state.loading = false;
            state.createIngredientSession = action.payload;
        });
        builder.addCase(updateIngredientSession.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //delete ingredient session id
        builder.addCase(deleteIngredientSessionBySessionId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteIngredientSessionBySessionId.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(deleteIngredientSessionBySessionId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //delete ingredient id
          builder.addCase(deleteIngredientSessionByIngredientId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteIngredientSessionByIngredientId.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(deleteIngredientSessionByIngredientId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setError } = ingredientSessionSlice.actions;
export default ingredientSessionSlice.reducer;