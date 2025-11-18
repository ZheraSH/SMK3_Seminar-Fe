import MainDashboard from "../../view/components/elements/MainDashboard";
// import TeachersMain from "../../view/pages/operator/teachers/PageTeachers";
// import BodyDashboard from "../../view/pages/operator/dashboard/BodyDashboard";
// import TeachersMain from "../../view/pages/PageTeachers";
import { DashboardLayouth } from "../../view/layouts/DashboardLayouth";
import Login from "../../view/components/elements/login/MainLogin";
// import { MainClass } from "../../view/pages/operator/class/MainClass";
import NotFound from "../../view/pages/NotFound";
import { MainStudent } from "../../view/pages/operator/student/MainStudent";
// import { TeacherMainyuyu } from "../../view/pages/operator/teachers/wawa";
import BodyDashboard from "../../view/pages/operator/home/BodyDashboard";
import MainMaple from "../../view/pages/operator/subjects/MainSubjects";

import MainClass from "../../view/pages/operator/class-major/MainClass";
import MainMajor from "../../view/pages/operator/class-major/MainMajor";

import { RfidManagement } from "../../view/pages/operator/rfid/MainRfid";
import ClassScheduleManager from "../../view/pages/operator/schedule-clock/MainLayout";

// import MainShedule from "../../view/pages/operator/schedule-clock/MainLayout";
import MainShedule from "../../view/pages/operator/schedule-clock/MainLayout";
import ClassStudents from "../../view/pages/operator/class-major/class-students/MainClassStudent";
import Shcedule from "../../view/pages/operator/schedule-clock/MainLayout";

export const AdminRoutes = [
  {
    path: "/home",
    element: <DashboardLayouth />,
    children: [
      { index: true, element: <BodyDashboard /> },
      { path: "dashboard", element: <MainDashboard /> },
      { path: "jadwalpelajaran", element: <ClassScheduleManager/>},
      // { path: "guru", element: <TeacherMainyuyu></TeacherMainyuyu> },
      // { path: "guru/software", element: <TeachersMain /> },
      { path: "Major", element: <MainMajor /> },
      { path: "class", element: <MainClass /> },
      { path: "classStudents/:id", element: <ClassStudents /> },
      { path: "maple", element: <MainMaple /> },
      { path: "siswa", element: <MainStudent /> },
      { path : "rfid", element: <RfidManagement />},
      { path : "Shedule", element: <Shcedule />},


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
