import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.scss";
// import { store } from "./redux/store";
import { store, persistor } from "./redux/store/index";
import { PersistGate } from "redux-persist/integration/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
        <App />
      </BrowserRouter>
        </PersistGate>
  </Provider>
);
