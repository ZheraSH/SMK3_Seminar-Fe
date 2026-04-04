import MainClassStudent from "../../view/pages/student/class/main-class";
import MainScheduleStudent from "../../view/pages/student/schedule/main-schedule";
import PermissionManagement from "../../view/pages/student/permission-management/permission-management";
import ProtectedRoute from "./ProtectedRoute";
import MainDashboard from "../../view/components/elements/MainDashboard";
import BodyDashboard from "../../view/pages/student/home/body-dashboard-student";
import ProfileUser from "../../view/components/elements/profile/ProfileUser";
import AbsentStudentMain from "../../view/pages/student/absence/absence-student";
import { DashboardLayouth } from "../../view/layouts/DashboardLayouth";

export const StudentRoutes = [

  {
    path: "/student-home",
    element: (<ProtectedRoute allowedRoles={["student"]}
    />),
    children: [{
      element: <DashboardLayouth />,
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