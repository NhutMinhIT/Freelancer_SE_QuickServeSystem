import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    loginEndpoint,
    refreshTokenEndpoint,
    registerAccountByAdminEndpoint,
} from '../api/apiConfig';
import { toast } from 'react-toastify';
import { ILogin, ILoginResponse, IRegister, IUser } from '../../models/Auth';
import axiosInstance from '../api/axiosInstance';

type AccountState = {
    loading: boolean;
    account: IUser | null;
    registerUser: IRegister | null;
    error: string[] | unknown;
    success: boolean;
};

const initialState: AccountState = {
    loading: false,
    account: null,
    registerUser: null,
    error: null,
    success: false,
};

export const registerAccountByAdmin = createAsyncThunk<IRegister, Object>(
    'auth/registerAccountByAdmin',
    async (data, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.post(
                registerAccountByAdminEndpoint,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            if (response.data.success === false) {
                toast.error(response.data.errors[0].description);
            }
            if (response.data.success === true) {
                toast.success('Đăng ký tài khoản thành công!');
            }
            return response.data;
        } catch (error: any) {
            toast.error('Đăng ký tài khoản thất bại!');
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const loginUser = createAsyncThunk<ILoginResponse, ILogin>(
    'auth/loginUser',
    async (data, thunkAPI) => {
        try {
            const response = await axiosInstance.post(loginEndpoint, data);
            const token = response.data.data.accessToken;
            const refreshToken = response.data.data.refreshToken;
            sessionStorage.setItem('quickServeToken', token);
            sessionStorage.setItem('refreshToken', refreshToken);
            if (response.data.success === false) {
                toast.error(response.data.errors[0].description);
            }
            if (response.data.success === true) {
                toast.success('Đăng nhập thành công!');
            }
            return response.data;
        } catch (error: any) {
            toast.error('Đăng nhập thất bại!');
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const logoutUser = createAsyncThunk<ILoginResponse | null, void>(
    'auth/logout-user',
    async (_, thunkAPI) => {
        try {
            sessionStorage.removeItem('quickServeToken');
            sessionStorage.removeItem('refreshToken');
            toast.success('Đăng xuất thành công!');
            return null;
        } catch (error: any) {
            toast.error('Đăng xuất không thành công!');
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const refreshAccessToken = createAsyncThunk<string, void>(
    'auth/refreshAccessToken',
    async (_, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const refreshToken = sessionStorage.getItem('refreshToken');

            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await axiosInstance.post(refreshTokenEndpoint, {
                accessToken: token,
                refreshToken: refreshToken,
            });

            if (response.data.success) {
                sessionStorage.setItem('quickServeToken', response.data.data.accessToken);
                sessionStorage.setItem('refreshToken', response.data.data.refreshToken);
                return response.data.data.accessToken;
            } else {
                throw new Error(response.data.errors.join(', '));
            }
        } catch (error: any) {
            thunkAPI.dispatch(logoutUser());
            throw error;
        }
    }
);

export const authSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string[] | unknown>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        //State Register
        builder.addCase(registerAccountByAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerAccountByAdmin.fulfilled, (state, action: PayloadAction<IRegister>) => {
            state.loading = false;
            state.registerUser = action.payload;
            state.error = null;
        });
        builder.addCase(registerAccountByAdmin.rejected, (state, action: PayloadAction<unknown>) => {
            state.loading = false;
            state.error = action.payload;
        });
        //State Login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
            state.loading = false;
            state.account = action.payload.data;
            state.success = true;
        });
        builder.addCase(loginUser.rejected, (state, action: PayloadAction<unknown>) => {
            state.loading = false;
            state.error = action.payload;
        });

        //State Logout
        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.account = null;
            state.success = true;
        });
        builder.addCase(logoutUser.rejected, (state, action: PayloadAction<unknown>) => {
            state.loading = false;
            state.error = action.payload;
        });

        // State Refresh Token
        builder.addCase(refreshAccessToken.fulfilled, (state, action: PayloadAction<string>) => {
            if (state.account) {
                state.account.accessToken = action.payload;
            }
        });
    },
});

export const { setError } = authSlice.actions;
export default authSlice.reducer;
