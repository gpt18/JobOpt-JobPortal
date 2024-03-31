import { configureStore } from '@reduxjs/toolkit';
import  companyReducer  from './slices/companySlice';
import studentReducer  from './slices/studentSlice';

export const store = configureStore({
    reducer: {
        company: companyReducer,
        student: studentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;