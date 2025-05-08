import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import expireTransform from "@/redux/utiles/expireTransform";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "@/redux/slice/userSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"], // Ensure subscription is persisted
    transforms: [expireTransform],
};

const rootReducer = combineReducers({
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
