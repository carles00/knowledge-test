import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Api/store";

export const useAppDispath = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();