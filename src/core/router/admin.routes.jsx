<<<<<<< HEAD
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
=======
import MainDashboard from "@elements/main-dashboard";
import { DashboardLayout } from "@/view/layouts/dashboard-layout";
import NotFound from "@pages/not-found";
import ProtectedRoute from "./protected-route";
import ProfileUser from "@elements/profile/profile-user";
import StudentPage from "@pages/operator/student";
import HomePage from "@pages/operator/home";
import MajorPage from "@pages/operator/class-major/major";
import ClassPage from "@pages/operator/class-major/class";
import RfidPage from "@pages/operator/rfid";
import SchedulePage from "@pages/operator/schedule-clock";
import TeachersPage from "@pages/operator/teachers";
import AttendanceRulesPage from "@pages/operator/attendance-rules";
import ClassStudentsPage from "@pages/operator/class-major/class-students";
import SchoolYearPage from "@pages/operator/school-year";
import SubjectsPage from "@pages/operator/subjects";
import ProfileOperator from "@elements/profile/profile-operator";
import MasterCardPage from "@pages/operator/master-card";
>>>>>>> dev2


export const AdminRoutes = [
  {
    path: "/home",
    element: <ProtectedRoute allowedRoles={["school_operator"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "dashboard", element: <MainDashboard /> },
<<<<<<< HEAD
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
=======
          { path: "jadwalpelajaran", element: <SchedulePage /> },
          { path: "guru", element: <TeachersPage /> },
          { path: "Major", element: <MajorPage /> },
          { path: "class", element: <ClassPage /> },
          { path: "classStudents/detail", element: <ClassStudentsPage /> },
          { path: "maple", element: <SubjectsPage /> },
          { path: "tahun-ajaran", element: <SchoolYearPage /> },
          { path: "siswa", element: <StudentPage /> },
          { path: "absen-rfid", element: <AttendanceRulesPage /> },
          { path: "rfid", element: <RfidPage /> },
          { path: "Shedule", element: <SchedulePage /> },
          { path: "profile", element: <ProfileUser /> },
          { path: "mastercard", element: <MasterCardPage /> },
          { path: "profile-operator", element: <ProfileOperator /> }
>>>>>>> dev2
        ],
      },
    ],
  },
];
