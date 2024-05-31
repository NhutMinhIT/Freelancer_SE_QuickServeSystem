// Import các module cần thiết
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import accountSlice from '../features/authSlice';
import userSlice from '../features/userSlice';
// Định nghĩa cấu hình persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['account',"users"],
};

const rootReducer = combineReducers({
    account: accountSlice,
     users: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
