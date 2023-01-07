import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  Action,
  configureStore,
  StateFromReducersMapObject,
  ThunkAction,
} from "@reduxjs/toolkit";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";

import { api } from "./api/index";
import postSlice from "./features/posts/postsSlice";

export * from "./features";
export * from "./api/posts/postsApi";

const middleware = (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware);
const reducer = {
  [postSlice.name]: postSlice.reducer,
  [api.reducerPath]: api.reducer,
};
export const makeStore = () => {
  return configureStore({
    reducer,
    middleware,
    devTools: true, // production da false olacak
  });
};

const store = makeStore();

export type RootState = StateFromReducersMapObject<typeof reducer>;

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
