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
          { path: "jadwalpelajaran", element: <ClassScheduleManager /> },
          { path: "guru", element: <TeacherMain /> },
          { path: "Major", element: <MainMajor /> },
          { path: "class", element: <MainClass /> },
          { path: "classStudents/detail", element: <ClassStudents /> },
          { path: "maple", element: <MainMaple /> },
          // { path: "tahun-ajaran", element: <TahunAjaran /> },
          { path: "siswa", element: <MainStudent /> },
          { path: "absen-rfid", element: <AttendanceRulesPage /> },
          { path: "rfid", element: <RfidManagement /> },
          { path: "Shedule", element: <Shcedule /> },
        ],
      },
    ],
  },
];
