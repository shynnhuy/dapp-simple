import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducer";

const middlewares = [];

export const configStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  return { store };
};
