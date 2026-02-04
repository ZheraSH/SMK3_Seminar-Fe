import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./core/router/index";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
