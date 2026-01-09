import ProtectedRoute from "./ProtectedRoute";
import MainDashboard from "../../view/components/elements/MainDashboard";
import TeacherSchedule from "../../view/pages/teacher/teaching-schedule/TeachingSchedule";
import AttendanceTeacher from "../../view/pages/teacher/attendance/MainAttendance";
import MainMonitoringAbsen from "../../view/pages/BK/monitoring Absen/MainAttendanceMonitoring";
// import StatistikGlobal from "../../view/pages/BK/statistikglobal/MainStatistikGlobal";
import VerifikasiIzin from "../../view/pages/BK/verifikasi/MainVerifyPermission";
import StatistikGlobal from "../../view/pages/BK/statistikglobal/StatistikGlobal";
import VerifyPermission from "../../view/pages/BK/verifikasi/MainVerifyPermission";
import ProfileEmployee from "../../view/components/elements/profile/ProfileEmployee";
import ClassRecapHomeRoom from "../../view/pages/homeroom-teacher/MainHomeRoomTeacher";
import BodyDashboardTeacher from "../../view/pages/teacher/home/BodyDashboardTeacher";

import { MainLayoutMultiRole } from "../../view/layouts/MultiRoleLayout";

export const MultiRoleRoutes = [
  {
    path: "/dashboard",
    // 1. ProtectedRoute sebagai pembungkus utama untuk cek login/role
    element: (
      <ProtectedRoute 
        allowedRoles={["teacher", "homeroom_teacher", "counselor"]} 
      />
    ),
    children: [
      {
        // 2. MainLayout sebagai pembungkus tampilan (Sidebar & Navbar)
        element: <MainLayoutMultiRole />, 
        children: [
          // 3. Halaman-halaman konten
          { index: true, element: <BodyDashboardTeacher /> },
          { path: "teacher-schedule", element: <TeacherSchedule /> },
          { path: "attendance-teacher", element: <AttendanceTeacher /> },
          { path: "class-recap", element: <ClassRecapHomeRoom /> },
          { path: "monitoring-absen", element: <MainMonitoringAbsen /> },
        //   { path: "monitoring-class", element: <MainMonitoringAbsen /> },
          { path: "verifikasi-izin", element: <VerifyPermission /> },
          { path: "statistik-global", element: <StatistikGlobal /> },
          { path: "profile", element: <ProfileEmployee /> },
        ]
      }
    ]
  }
];