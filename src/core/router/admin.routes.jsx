import MainDashboard from "../../view/components/elements/MainDashboard";
import { DashboardLayouth } from "../../view/layouts/DashboardLayouth";
import Login from "../../view/components/elements/login/MainLogin";
import NotFound from "../../view/pages/NotFound";
import { MainStudent } from "../../view/pages/operator/student/MainStudent";
import BodyDashboard from "../../view/pages/operator/home/BodyDashboard";
import MainClass from "../../view/pages/operator/class-major/MainClass";
import MainMajor from "../../view/pages/operator/class-major/MainMajor";
import { RfidManagement } from "../../view/pages/operator/rfid/MainRfid";
import ClassScheduleManager from "../../view/pages/operator/schedule-clock/MainLayout";
import { TeacherMain } from "../../view/pages/operator/teachers/TeachersMain";
import AttendanceRulesPage from "../../view/pages/operator/attendance-rules/AttendanceRules";
import ClassStudents from "../../view/pages/operator/class-major/class-students/MainClassStudent";
import Shcedule from "../../view/pages/operator/schedule-clock/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import TahunAjaran from "../../view/pages/operator/schoolyear/MainSchoolYear";
import MainMaple from "../../view/pages/operator/subjects/MainSubjects";
import ProfileUser from "../../view/components/elements/profile/ProfileUser";
import MasterCard from "../../view/pages/operator/master-card/MainMasterCard";
import ProfileOperator from "../../view/components/elements/profile/ProfileOperator";


export const AdminRoutes = [
  {
    path: "/home",
    element: <ProtectedRoute allowedRoles={["school_operator"]} />,
    children: [
      {
        element: <DashboardLayouth />,
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
          { path: "ProfileOperator", element: <ProfileOperator /> }
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
