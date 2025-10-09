import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Branda from "./assets/Pages/Branda.jsx";
import TentangKami from "./assets/Pages/TentangKami.jsx";
import Berita from "./assets/Pages/Berita.jsx";
import Ap from "./assets/components/Fragments/TESTTO.jsx";
import Loginn from "./assets/components/Fragments/testlogin.jsx";
import Appp from "./assets/components/Fragments/TESTTO.jsx";
import Login from "./assets/components/Fragments/Login/MainLogin.jsx";
import SidebarSection from "./assets/components/Fragments/SideBar/SidebarSection.jsx";
import DashbordLayouth from "./assets/components/Layouts/DashbordLayouth.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Branda />,
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
    path: "/test",
    element: <Appp />,
  },
  {
    path: "/testlogin",
    element: <Loginn />,
  },
  {
    path: "/side",
    element: <DashbordLayouth/>,
  },
  

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
