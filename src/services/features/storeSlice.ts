import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllStoreEndpoint, getStoreByIdEndpoint } from '../api/apiConfig';
import axiosInstance from '../api/axiosInstance';
import { IStore } from '../../models/Store';

interface StoreState {
    loading: boolean;
    stores: IStore[] | null;
    store: IStore | null;
    error: string | null;
}

const initialState: StoreState = {
    loading: false,
    stores: null,
    store: null,
    error: null,
};

export const getAllStore = createAsyncThunk<IStore[], void>(
    'stores/getAllStore',
    async (_, thunkAPI) => {
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.get(getAllStoreEndpoint, {
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
export const getStoreById = createAsyncThunk<IStore, { id: string }>(
    'users/getUserById',
    async (data, thunkAPI) => {
        const { id } = data;
        try {
            const token = sessionStorage.getItem('quickServeToken');
            const response = await axiosInstance.get(
                `${getStoreByIdEndpoint}/id=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.errorMessages || 'Unknown error',
            );
        }
    },
);

export const storeSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllStore.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllStore.fulfilled, (state, action) => {
            state.loading = false;
            state.stores = action.payload;
            state.error = null;
        });
        builder.addCase(getAllStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        //User profile
        builder.addCase(getStoreById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getStoreById.fulfilled, (state, action) => {
            state.loading = false;
            state.store = action.payload;
            state.error = null;
        });
        builder.addCase(getStoreById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { setError } = storeSlice.actions;
export default storeSlice.reducer;
