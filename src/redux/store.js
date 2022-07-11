import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import reducer from "@reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["login"],
  stateReconciler: hardSet,
  debug: true,
};
const pReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: pReducer,
});
export const persistor = persistStore(store);

export default store;
