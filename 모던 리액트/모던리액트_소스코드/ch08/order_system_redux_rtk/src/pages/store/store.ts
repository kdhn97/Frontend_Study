import { configureStore } from '@reduxjs/toolkit';
import { customerSlice } from './customerSlice';
const store = configureStore({
    reducer: {
        [customerSlice.reducerPath]: customerSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(customerSlice.middleware);
    }
});
export default store;