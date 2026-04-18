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
        ],
      },
    ],
  },
];
