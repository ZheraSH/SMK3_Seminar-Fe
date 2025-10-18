import MainDashboard from "../../view/components/elements/MainDashboard";
import BodyDashboard from "../../view/components/fragment/home/BodyDashboard";
import TeachersMain from "../../view/pages/operator/teachers/PageTeachers";
import { DashboardLayouth } from "../../view/layouts/DashboardLayouth";
import HomePage from "../../view/pages/operator/dashboard/HomePage";
import Login from "../../view/components/elements/login/MainLogin";

export const AdminRoutes = [
  {
    path: "/home",
    element: <DashboardLayouth />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "dashboard", element: <MainDashboard /> },
      { path: "body", element: <BodyDashboard /> },
      { path: "guru", element: <TeachersMain /> },
      { path: "guru/software", element: <TeachersMain /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  }
];
