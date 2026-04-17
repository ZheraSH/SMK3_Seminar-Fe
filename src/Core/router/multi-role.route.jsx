import ProtectedRoute from "./protected-route";
import TeacherSchedule from "@pages/teacher/teaching-schedule/teaching-schedule";
import AttendanceTeacher from "@pages/teacher/attendance/main-attendance";
import MainMonitoringAbsen from "@pages/counselor/monitoring-absen/main-attendance-monitoring";
import VerifikasiIzin from "@pages/counselor/verifikasi/main-verify-permission";
import StatistikGlobal from "@pages/counselor/statistik-global/statistik-global";
import VerifyPermission from "@pages/counselor/verifikasi/main-verify-permission";
import ProfileUser from "@elements/profile/profile-user";
import BodyDashboardMultiRole from "@pages/multi-role/body-dashboard";
import ClassRecapHomeRoom from "@pages/homeroom-teacher/attendance-recap/attendance-recap";
import { DashboardLayout } from "@assets/layouts/dashboard-layout";

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
        element: <DashboardLayout />,
        children: [
          { index: true, element: <BodyDashboardMultiRole /> },
          { path: "teacher-schedule", element: <TeacherSchedule /> },
          { path: "attendance-teacher", element: <AttendanceTeacher /> },
          { path: "class-recap", element: <ClassRecapHomeRoom /> },
          { path: "monitoring-absen", element: <MainMonitoringAbsen /> },
          { path: "verifikasi-izin", element: <VerifyPermission /> },
          { path: "statistik-global", element: <StatistikGlobal /> },
          { path: "profile", element: <ProfileUser /> },
        ]
      }
    ]
  }
];
