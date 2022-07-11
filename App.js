import React from "react";
import { Provider } from "react-redux";
import store, { persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import RootNavigation from "@navigation";

console.disableYellowBox = true;

const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
};

export default Root;
