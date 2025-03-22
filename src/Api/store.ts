import { configureStore } from "@reduxjs/toolkit";
import dogReducer from "./dogSlice";

export const dogStore = configureStore({
  reducer: {
    dogs: dogReducer,
  },
});

export type AppStore = typeof dogStore
export type RootState = ReturnType<typeof dogStore.getState>;
export type AppDispatch = typeof dogStore.dispatch;

