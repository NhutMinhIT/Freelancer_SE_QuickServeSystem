import axiosInstance from "../api/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IIngredientSession, IIngredientSessionCreate } from "../../models/IngredientSession";
import { createIngredientSessionEndpoint, deleteIngredientSessionEndpoint, getIngredientSessionEndpoint } from './../api/apiConfig';

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
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// export const updateSession = createAsyncThunk<ISession, ISessionUpdate>(
//     'sessions/updateSession',
//     async ({ id, name, startTime, endTime }, thunkAPI) => {
//         try {
//             const token = sessionStorage.getItem('quickServeToken');
//             const response = await axiosInstance.put(
//                 `${updateSessionEndpoint}/${id}`,
//                 { id, name, startTime, endTime },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 },
//             );
//             if (response.data.success) {
//                 toast.success('Cập nhật khung thời gian thành công!');
//             } else {
//                 toast.error(`${response.data.errors[0].description}`);
//             }
//             return response.data.data;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         }
//     }
// );

// export const deleteSession = createAsyncThunk<void, { id: number }>(
//     'sessions/deleteSession',
//     async ({ id }, thunkAPI) => {
//         try {
//             const token = sessionStorage.getItem('quickServeToken');
//             const response = await axiosInstance.delete(`${deleteSessionEndpoint}/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             if (response.data.success) {
//                 toast.success('Xóa khung thời gian thành công!');
//             } else {
//                 toast.error(`${response.data.errors[0].description}`);
//             }
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         }
//     }
// )

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
                `${deleteIngredientSessionEndpoint}/${sessionId}/ingredient?ingredientId=${ingredientId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (response.data.success) {
                toast.success('Xoá nguyên li thành công !');
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
        //create session
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
        // //update session
        // builder.addCase(updateSession.pending, (state) => {
        //     state.loading = true;
        // });
        // builder.addCase(updateSession.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.createSession = action.payload;
        // });
        // builder.addCase(updateSession.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // });
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