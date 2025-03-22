import { configureStore } from "@reduxjs/toolkit";
import dogReducer from "./dogSlice";
import { useDispatch, useSelector } from "react-redux";

export const dogStore = configureStore({
  reducer: {
    dogs: dogReducer,
  },
});

export type AppStore = typeof dogStore
export type RootState = ReturnType<typeof dogStore.getState>;
export type AppDispatch = typeof dogStore.dispatch;

export const useAppDispath = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();