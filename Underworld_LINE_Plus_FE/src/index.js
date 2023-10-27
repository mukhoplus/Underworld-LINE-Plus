import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import AxiosProvider from "axios";
import store from "./redux/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

AxiosProvider.defaults.baseURL = "http://localhost:8080/api/v1";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
