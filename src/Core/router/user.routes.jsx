import BodyDashboard from "../../view/pages/operator/home/BodyDashboard";
import MainDashboard from "../../view/components/elements/MainDashboard";
import { LayouthSiswa } from "../../view/layouts/SiswaLayouth";
import MainScheduleStudent from "../../view/pages/operator/schedule/student/MainSchedule";
import PermissionManagement from "../../view/pages/student/permission-management/PermissionManagement";

export const SiswaRoutes = [
  {
    path: "/home-siswa",
    element: <LayouthSiswa />,
    children: [
      { index: true, element: <BodyDashboard /> },
      { path: "dashboard", element: <MainDashboard /> },
      // { path: "kelas", element: <MainClassStudent /> },
      // { path: "absen", element: <AbsentStudentMain /> },
      { path: "jadwal-student", element: <MainScheduleStudent /> },
      { path: "izin", element: <PermissionManagement /> },
    ],
  },
];
