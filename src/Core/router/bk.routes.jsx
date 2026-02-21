import MainMonitoringAbsen from "../../view/pages/BK/monitoring Absen/MainAttendanceMonitoring";
import VerifikasiIzin from "../../view/pages/BK/verifikasi/MainVerifyPermission";
import StatistikGlobal from "../../view/pages/BK/statistikglobal/StatistikGlobal";
import MainDashboard from "../../view/components/elements/MainDashboard";
import BodyDashboard from "../../view/pages/BK/home/BodyDasboardBk";
import ProtectedRoute from "./ProtectedRoute";
import { DashboardLayouth } from "../../view/layouts/DashboardLayouth";
import VerifyPermission from "../../view/pages/BK/verifikasi/MainVerifyPermission";
import ProfileUser from "../../view/components/elements/profile/ProfileUser";

export const BkRoutes = [
    {
        path: "/bk-home",
        element: (<ProtectedRoute allowedRoles={["counselor"]} />),
        children: [
            {
                element: <DashboardLayouth />,
                children: [
                    { index: true, element: <BodyDashboard /> },
                    { path: "dashboard", element: <MainDashboard /> },
                    { path: "monitoring-absen", element: <MainMonitoringAbsen /> },
                    { path: "verifikasi-izin", element: <VerifikasiIzin /> },
                    { path: "statistik-global", element: <StatistikGlobal /> },
                    { path: "profile", element: <ProfileUser /> },
                ]
            }

        ]
    }
]