import { useRoutes } from "react-router-dom";
import App from "./App";
import DApp from "./components/DApp";
import Transfer from "./components/Transfer";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <DApp /> },
        { path: "transfer", element: <Transfer /> },
      ],
    },
  ]);
};

export default Router;
