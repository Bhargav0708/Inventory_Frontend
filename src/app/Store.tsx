import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import CartReducer from "../components/Customer/CartSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "totalQuantity", "totalPrice"], // only cart will be persisted
};
const persistedReducer = persistReducer(persistConfig, CartReducer);
export const Store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});
export const persistor = persistStore(Store);
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
