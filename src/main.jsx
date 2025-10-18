import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./core/router/index";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomeLandingPage />,
//   },
//   {
//     path: "/tentangkami",
//     element: <TentangKami />,
//   },
//   {
//     path: "/berita",
//     element: <Berita />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/Dashbord",
//     element: <HomePage></HomePage>,
//   },
//   {
//     path: "/guru",
//     element: <TeachersPage />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
