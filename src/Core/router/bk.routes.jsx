import MainMonitoringAbsen from "../../view/pages/bk/monitoring-absen/main-attendance-monitoring";
import VerifikasiIzin from "../../view/pages/bk/verifikasi/main-verify-permission";
import StatistikGlobal from "../../view/pages/bk/statistik-global/statistik-global";
import MainDashboard from "../../view/components/elements/MainDashboard";
import BodyDashboard from "../../view/pages/bk/home/body-dasboard-bk";
import ProtectedRoute from "./ProtectedRoute";
import { DashboardLayouth } from "../../view/layouts/DashboardLayouth";
import VerifyPermission from "../../view/pages/bk/verifikasi/main-verify-permission";
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
                    { path: "verifikasi-izin", element: <VerifyPermission /> },
                    { path: "statistik-global", element: <StatistikGlobal /> },
                    { path: "verifikasi-izin", element: <VerifikasiIzin /> },
                    { path: "profile", element: <ProfileUser /> },
                ]
            }

        ]
    }
]