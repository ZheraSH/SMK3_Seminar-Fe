import MainDashboard from "../../view/components/elements/main-dashboard";
import { DashboardLayout } from "../../view/layouts/dashboard-layout";
import Login from "../../view/components/elements/login/MainLogin";
import NotFound from "../../view/pages/not-found";
import { MainStudent } from "../../view/pages/operator/student/main-student";
import BodyDashboard from "../../view/pages/operator/home/body-dashboard";
import MainClass from "../../view/pages/operator/class-major/main-class";
import MainMajor from "../../view/pages/operator/class-major/main-major";
import { RfidManagement } from "../../view/pages/operator/rfid/main-rfid";
import ClassScheduleManager from "../../view/pages/operator/schedule-clock/main-layout";
import { TeacherMain } from "../../view/pages/operator/teachers/teachers-main";
import AttendanceRulesPage from "../../view/pages/operator/attendance-rules/attendance-rules";
import ClassStudents from "../../view/pages/operator/class-major/class-students/main-class-student";
import Shcedule from "../../view/pages/operator/schedule-clock/main-layout";
import ProtectedRoute from "./protected-route";
import TahunAjaran from "../../view/pages/operator/schoolyear/main-school-year";
import MainMaple from "../../view/pages/operator/subjects/main-subjects";
import ProfileUser from "../../view/components/elements/profile/profile-user";
import MasterCard from "../../view/pages/operator/master-card/main-master-card";
import ProfileOperator from "../../view/components/elements/profile/profile-operator";


export const AdminRoutes = [
  {
    path: "/home",
    element: <ProtectedRoute allowedRoles={["school_operator"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <BodyDashboard /> },
          { path: "dashboard", element: <MainDashboard /> },
          { path: "jadwalpelajaran", element: <ClassScheduleManager /> },
          { path: "guru", element: <TeacherMain /> },
          { path: "Major", element: <MainMajor /> },
          { path: "class", element: <MainClass /> },
          { path: "classStudents/detail", element: <ClassStudents /> },
          { path: "maple", element: <MainMaple /> },
          { path: "tahun-ajaran", element: <TahunAjaran /> },
          { path: "siswa", element: <MainStudent /> },
          { path: "absen-rfid", element: <AttendanceRulesPage /> },
          { path: "rfid", element: <RfidManagement /> },
          { path: "Shedule", element: <Shcedule /> },
          { path: "profile", element: <ProfileUser /> },
          { path: "mastercard", element: <MasterCard /> },
          { path: "profile-operator", element: <ProfileOperator /> }
        ],
      },
    ],
  },
];
