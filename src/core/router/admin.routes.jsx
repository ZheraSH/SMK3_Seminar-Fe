import MainDashboard from "../../view/components/elements/MainDashboard";
import BodyDashboard from "../../view/pages/operator/dashboard/BodyDashboard";
import TeachersMain from "../../view/pages/operator/teachers/PageTeachers";
import { DashboardLayouth } from "../../view/layouts/DashboardLayouth";
import Login from "../../view/components/elements/login/MainLogin";
import { MainClass } from "../../view/pages/operator/class/MainClass";
import { MainStudent } from "../../view/pages/operator/student/MainStudent";
import NotFound from "../../view/pages/NotFound";

export const AdminRoutes = [
  {
    path: "/home",
    element: <DashboardLayouth />,
    children: [
      { index: true, element: <BodyDashboard /> },
      { path: "dashboard", element: <MainDashboard /> },
      { path: "guru", element: <TeachersMain /> },
      { path: "guru/software", element: <TeachersMain /> },
      { path: "kelas", element: <MainClass /> },
      { path: "siswa", element: <MainStudent /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound /> 
  },
];
