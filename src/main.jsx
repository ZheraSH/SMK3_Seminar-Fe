import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import TentangKami from "./assets/Pages/LandingPage/AboutUSPage.jsx";
import Berita from "./assets/Pages/LandingPage/NewsPage.jsx";
import Login from "./assets/components/Elements/Login/MainLogin.jsx";
import BodyTeachers from "./assets/components/Fragments/Dashbord/Teachers/BodyTeachers.jsx";
import DashbordLayouth from "./assets/Layouts/DashbordLayouth.jsx";
import HomeLandingPage from "./assets/Pages/LandingPage/HomeLandingPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLandingPage />,
  },
  {
    path: "/tentangkami",
    element: <TentangKami />,
  },
  {
    path: "/berita",
    element: <Berita />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/side",
    element: <DashbordLayouth />,
  },
  {
    path: "/guru",
    element: <BodyTeachers />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
