import MainMonitoringAbsen from "../../view/pages/bk/monitoring-absen/main-attendance-monitoring";
import VerifikasiIzin from "../../view/pages/bk/verifikasi/main-verify-permission";
import StatistikGlobal from "../../view/pages/bk/statistik-global/statistik-global";
import MainDashboard from "../../view/components/elements/main-dashboard";
import BodyDashboard from "../../view/pages/bk/home/body-dasboard-bk";
import ProtectedRoute from "./protected-route";
import { DashboardLayout } from "../../view/layouts/dashboard-layout";
import VerifyPermission from "../../view/pages/bk/verifikasi/main-verify-permission";
import ProfileUser from "../../view/components/elements/profile/profile-user";

export const BkRoutes = [
    {
        path: "/bk-home",
        element: (<ProtectedRoute allowedRoles={["counselor"]} />),
        children: [
            {
                element: <DashboardLayout />,
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
