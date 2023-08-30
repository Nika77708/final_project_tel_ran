import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { sliceApi } from "./apiSlice";
import { basketReducer } from "./basketSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {filterReducer} from "./filterSlice";

const persistConfig = {
  key: "root",
  storage,
  //blacklist: [sliceApi.reducer, filterReducer],
  blacklist: [sliceApi.reducer, filterReducer],
};

const rootReducer = combineReducers({
  basket: basketReducer,
  filter: filterReducer,
  products: [sliceApi.reducer],
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    allReducers: persistedReducer,
    [sliceApi.reducerPath]: sliceApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    sliceApi.middleware,
  ],
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
