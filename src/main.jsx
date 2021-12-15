import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configStore } from "./redux/store";
import Router from "./routes";

const { store } = configStore();
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Router />
      </SnackbarProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
