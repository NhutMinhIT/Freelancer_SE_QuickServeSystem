import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISession, ISessionCreate, ISessionUpdate } from "../../models/Session";
import axiosInstance from "../api/axiosInstance";
import { createSessionEndpoint, deleteSessionEndpoint, getAllSessionsEndpoint, getSessionByIdEndpoint, updateSessionEndpoint } from "../api/apiConfig";
import { toast } from "react-toastify";

type SessionState = {
    loading: boolean;
    sessions: ISession[] | null;
    createSession: ISessionCreate | null;
    error: string[] | unknown;
    success: boolean;
};
const initialState: SessionState = {
    loading: false,
    sessions: null,
    createSession: null,
    error: null,
    success: false,
};

export const getAllSessions = createAsyncThunk<ISession[], void>(
    'sessions/getAllSessions',
    async (_, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.get(getAllSessionsEndpoint, {
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

export const getSessionById = createAsyncThunk<ISession, { id: number }>(
    'sessions/getSessionById',
    async (data, thunkAPI) => {
        const { id } = data;
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.get(
                `${getSessionByIdEndpoint}/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const createSesstion = createAsyncThunk<ISessionCreate, Object>(
    'sessions/createSession',
    async (session, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.post(
                createSessionEndpoint,
                session,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (response.data.success) {
                toast.success('Tạo khung thời gian thành công!');
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateSession = createAsyncThunk<ISession, ISessionUpdate>(
    'sessions/updateSession',
    async ({ id, name, startTime, endTime }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.put(
                `${updateSessionEndpoint}/${id}`,
                { id, name, startTime, endTime },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (response.data.success) {
                toast.success('Cập nhật khung thời gian thành công!');
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteSession = createAsyncThunk<void, { id: number }>(
    'sessions/deleteSession',
    async ({ id }, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.delete(`${deleteSessionEndpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                toast.success('Xóa khung thời gian thành công!');
            } else {
                toast.error(`${response.data.errors[0].description}`);
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const sessionSlice = createSlice({
    name: 'sessions',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllSessions.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllSessions.fulfilled, (state, action) => {
            state.loading = false;
            state.sessions = action.payload;
        });
        builder.addCase(getAllSessions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //get session by id
        builder.addCase(getSessionById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getSessionById.fulfilled, (state, action) => {
            state.loading = false;
            state.createSession = action.payload;
        });
        builder.addCase(getSessionById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //create session
        builder.addCase(createSesstion.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createSesstion.fulfilled, (state, action) => {
            state.loading = false;
            state.createSession = action.payload;
        });
        builder.addCase(createSesstion.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //update session
        builder.addCase(updateSession.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateSession.fulfilled, (state, action) => {
            state.loading = false;
            state.createSession = action.payload;
        });
        builder.addCase(updateSession.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //delete session
        builder.addCase(deleteSession.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteSession.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(deleteSession.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setError } = sessionSlice.actions;
export default sessionSlice.reducer;