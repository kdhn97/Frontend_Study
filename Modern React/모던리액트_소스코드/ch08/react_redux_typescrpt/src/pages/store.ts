import { configureStore } from '@reduxjs/toolkit';
import api from './createApi'; 
const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(api.middleware);
    }    
});
export default store;