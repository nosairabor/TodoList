import { configureStore } from "@reduxjs/toolkit";
import { useSelector,useDispatch } from "react-redux";
import type { TypedUseSelectorHook } from 'react-redux'
import inputReducer from "./slice"
import lightReducer from "./lightSlice";

const store = configureStore({
    reducer:{
        inputs:inputReducer,
        light:lightReducer
    }
        
    
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;