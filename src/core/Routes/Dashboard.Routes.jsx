import { DashboardLayouth } from "../../assets/Layouts/DashbordLayouth";
import MainDashboard from "@elements/MainDashboard";
import BodyDashboard from "@fragments/Dashboard/Home/BodyDashboard";
import TeachersMain from "@fragments/Dashboard/Teachers/BodyTeachers";
import HomePage from "../../assets/pages/Dashbord/HomePage";
import TeachersPage from "../../assets/pages/Dashbord/TeachersPage";

export const DashboardRoutes = [
  {
    path: "/home",
    element: <DashboardLayouth />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "dashboard", element: <MainDashboard /> },
      { path: "body", element: <BodyDashboard /> },
      { path: "guru", element: <TeachersPage /> },
      { path: "guru/software", element: <TeachersMain /> },
    ],
  },
];
