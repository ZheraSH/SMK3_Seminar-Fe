import MainDashboard from "../../view/components/elements/MainDashboard";
import TeachersMain from "../../view/pages/operator/teachers/PageTeachers";
import { DashboardLayouth } from "../../view/layouts/DashboardLayouth";
import Login from "../../view/components/elements/login/MainLogin";
import { MainClass } from "../../view/pages/operator/class/MainClass";
import NotFound from "../../view/pages/NotFound";
import { MainStudent } from "../../view/pages/operator/student/components/MainStudent";
import { TeachersBoy } from "../../view/pages/operator/teachers/components/MainTeachers";
import { TeacherMainyuyu } from "../../view/pages/operator/teachers/wawa";
import BodyDashboard from "../../view/pages/operator/home/BodyDashboard";
import MainMaple from "../../view/pages/operator/maple/MainMaple";

export const AdminRoutes = [
  {
    path: "/home",
    element: <DashboardLayouth />,
    children: [
      { index: true, element: <BodyDashboard /> },
      { path: "dashboard", element: <MainDashboard /> },
      { path: "guru", element: <TeacherMainyuyu></TeacherMainyuyu> },
      { path: "guru/software", element: <TeachersMain /> },
      { path: "kelas", element: <MainClass /> },
      { path: "maple", element: <MainMaple /> },
      { path: "siswa", element: <MainStudent /> },
      // { path: "coba", element: <TeachersBoy /> },
      // { path: "wawa", element: <TeacherMainyuyu></TeacherMainyuyu> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
