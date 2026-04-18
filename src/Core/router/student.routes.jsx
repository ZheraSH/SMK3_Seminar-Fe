import MainClassStudent from "@pages/student/class/main-class";
import MainScheduleStudent from "@pages/student/schedule/main-schedule";
import PermissionManagement from "@pages/student/permission-management/permission-management";
import ProtectedRoute from "./protected-route";
import MainDashboard from "@elements/main-dashboard";
import BodyDashboard from "@pages/student/home/body-dashboard-student";
import ProfileUser from "@elements/profile/profile-user";
import AbsentStudentMain from "@pages/student/absence/absence-student";
import { DashboardLayout } from "@assets/layouts/dashboard-layout";

export const StudentRoutes = [

  {
    path: "/student-home",
    element: (<ProtectedRoute allowedRoles={["student"]}
    />),
    children: [{
      element: <DashboardLayout />,
      children: [
        { index: true, element: < BodyDashboard /> },
        { path: "dashboard", element: <MainDashboard /> },
        { path: "student-class", element: <MainClassStudent /> },
        { path: "absen-student", element: <AbsentStudentMain /> },
        { path: "student-schedule", element: <MainScheduleStudent /> },
        { path: "student-license", element: <PermissionManagement /> },
        { path: "profile", element: <ProfileUser /> },
      ]

    }],
  },


]
