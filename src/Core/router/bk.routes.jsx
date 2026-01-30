import MainMonitoringAbsen from "../../view/pages/BK/monitoring Absen/MainAttendanceMonitoring";
// import StatistikGlobal from "../../view/pages/BK/statistikglobal/MainStatistikGlobal";
import VerifikasiIzin from "../../view/pages/BK/verifikasi/MainVerifyPermission";
import StatistikGlobal from "../../view/pages/BK/statistikglobal/StatistikGlobal";
import MainDashboard from "../../view/components/elements/MainDashboard";
import BodyDashboard from "../../view/pages/BK/home/BodyDasboardBk";
import { LayouthBK } from "../../view/layouts/BkLayouth";
import ProtectedRoute from "./ProtectedRoute";
import VerifyPermission from "../../view/pages/BK/verifikasi/MainVerifyPermission";
import ProfileUser from "../../view/components/elements/profile/ProfileUser";

export const BkRoutes = [
    {
        path: "/bk-home",
        element: (<ProtectedRoute allowedRoles={["counselor"]} />),
        children: [
            {
                element: <LayouthBK />,
                children: [
                    { index: true, element: <BodyDashboard /> },
                    { path: "dashboard", element: <MainDashboard /> },
                    { path: "monitoring-absen", element: <MainMonitoringAbsen /> },
                    { path: "verifikasi-izin", element: <VerifyPermission /> },
                    { path: "statistik-global", element: <StatistikGlobal /> },
                    { path: "verifikasi-izin", element: <VerifikasiIzin /> },
                    { path: "profile", element: <ProfileUser /> },
                ]
            }

        ]
    }
]