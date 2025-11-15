import MainDashboard from "../../view/components/elements/MainDashboard";
// import TeachersMain from "../../view/pages/operator/teachers/PageTeachers";
// import BodyDashboard from "../../view/pages/operator/dashboard/BodyDashboard";
// import TeachersMain from "../../view/pages/PageTeachers";
import { DashboardLayouth } from "../../view/layouts/DashboardLayouth";
import Login from "../../view/components/elements/login/MainLogin";
// import { MainClass } from "../../view/pages/operator/class/MainClass";
import NotFound from "../../view/pages/NotFound";
import { MainStudent } from "../../view/pages/operator/student/MainStudent";
import { TeachersBoy } from "../../view/pages/operator/teachers/components/MainTeachers";
import { TeacherMainyuyu } from "../../view/pages/operator/teachers/wawa";
import BodyDashboard from "../../view/pages/operator/home/BodyDashboard";
import MainMaple from "../../view/pages/operator/subjects/MainSubjects";
import MainScheduleStudent from "../../view/pages/operator/schedule/student/MainSchedule";
import MainClass from "../../view/pages/operator/class-major/MainClass";
import MainMajor from "../../view/pages/operator/class-major/MainMajor";
import MainShedule from "../../view/pages/operator/schedule-clock/MainLayout";

export const AdminRoutes = [
  {
    path: "/home",
    element: <DashboardLayouth />,
    children: [
      // { index: true, element: <BodyDashboard /> },
      { path: "dashboard", element: <MainDashboard /> },
      { path: "guru", element: <TeacherMainyuyu></TeacherMainyuyu> },
      // { path: "guru/software", element: <TeachersMain /> },
      { path: "Major", element: <MainMajor /> },
      { path: "kelas", element: <MainClass /> },
      { path: "maple", element: <MainMaple /> },
      { path: "siswa", element: <MainStudent /> },
      { path : "jadwal/siswa", element: <MainScheduleStudent />},
      { path : "jadwalpelajaran", element: <MainShedule />},
      // { path: "coba", element: <TeachersBoy /> },
      // { path: "wawa", element: <TeacherMainyuyu></TeacherMainyuyu> },
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
