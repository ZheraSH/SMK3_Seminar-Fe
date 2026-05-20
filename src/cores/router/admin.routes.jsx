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
import MonitoringPage from "@pages/operator/monitoring";


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
          { path: "employees", element: <TeachersPage /> },
          { path: "students", element: <StudentPage /> },
          { path: "school-years", element: <SchoolYearPage /> },
          { path: "majors", element: <MajorPage /> },
          { path: "class-students", element: <ClassPage /> },
          { path: "class-students/detail", element: <ClassStudentsPage /> },
          { path: "subjects", element: <SubjectsPage /> },
          { path: "lesson-schedules", element: <SchedulePage /> },
          { path: "attendance-rules", element: <AttendanceRulesPage /> },
          { path: "monitoring-students", element: <MonitoringPage /> },
          { path: "rfids", element: <RfidPage /> },
          { path: "mastercards", element: <MasterCardPage /> },
          { path: "profile", element: <ProfileUser /> },
          { path: "profile-operator", element: <ProfileOperator /> },
        ],
      },
    ],
  },
];
