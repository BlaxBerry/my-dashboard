import {
  useDispatch as useDispatchWithoutType,
  useSelector as useSelectorWithoutType,
  type TypedUseSelectorHook,
} from "react-redux";
import store from "./store";

type RootState = ReturnType<typeof store.getState>;
type StoreDispatch = typeof store.dispatch;

export const useDispatch: () => StoreDispatch = useDispatchWithoutType;
export const useSelector: TypedUseSelectorHook<RootState> =
  useSelectorWithoutType;
