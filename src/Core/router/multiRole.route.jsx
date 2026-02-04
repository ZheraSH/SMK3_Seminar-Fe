import ProtectedRoute from "./ProtectedRoute";
import TeacherSchedule from "../../view/pages/teacher/teaching-schedule/TeachingSchedule";
import AttendanceTeacher from "../../view/pages/teacher/attendance/MainAttendance";
import MainMonitoringAbsen from "../../view/pages/BK/monitoring Absen/MainAttendanceMonitoring";
// import StatistikGlobal from "../../view/pages/BK/statistikglobal/MainStatistikGlobal";
import VerifikasiIzin from "../../view/pages/BK/verifikasi/MainVerifyPermission";
import StatistikGlobal from "../../view/pages/BK/statistikglobal/StatistikGlobal";
import VerifyPermission from "../../view/pages/BK/verifikasi/MainVerifyPermission";
import ProfileUser from "../../view/components/elements/profile/ProfileUser";
import BodyDashboardMultiRole from "../../view/pages/multiRole/BodyDashboard";
import ClassRecapHomeRoom from "../../view/pages/homeroom-teacher/attendance-recap/AttendanceRecap";
import { DashboardLayouth } from "../../view/layouts/DashboardLayouth";

export const MultiRoleRoutes = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute
        allowedRoles={["teacher", "homeroom_teacher", "counselor"]}
      />
    ),
    children: [
      {
        element: <DashboardLayouth />,
        children: [
          { index: true, element: <BodyDashboardMultiRole /> },
          { path: "teacher-schedule", element: <TeacherSchedule /> },
          { path: "attendance-teacher", element: <AttendanceTeacher /> },
          { path: "class-recap", element: <ClassRecapHomeRoom /> },
          { path: "monitoring-absen", element: <MainMonitoringAbsen /> },
          //   { path: "monitoring-class", element: <MainMonitoringAbsen /> },
          { path: "verifikasi-izin", element: <VerifyPermission /> },
          { path: "statistik-global", element: <StatistikGlobal /> },
          { path: "profile", element: <ProfileUser /> },
        ]
      }
    ]
  }
];