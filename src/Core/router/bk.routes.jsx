import AttendanceDashboard from "@pages/bk/monitoring-absen/main-attendance-monitoring";
import VerifyPermission from "@pages/bk/verifikasi/main-verify-permission";
import StatistikGlobal from "@pages/bk/statistik-global/statistik-global";
import MainDashboard from "@components/elements/main-dashboard";
import BodyDashboard from "@pages/bk/home/body-dashboard-bk";
import ProtectedRoute from "./protected-route";
import { DashboardLayout } from "../../view/layouts/dashboard-layout";
import ProfileUser from "../../view/components/elements/profile/profile-user";

export const bkRoutes = [
    {
        path: "/bk-home",
        element: (<ProtectedRoute allowedRoles={["counselor"]} />),
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    { index: true, element: <BodyDashboard /> },
                    { path: "dashboard", element: <MainDashboard /> },
                    { path: "monitoring-absen", element: <AttendanceDashboard /> },
                    { path: "verifikasi-izin", element: <VerifyPermission /> },
                    { path: "statistik-global", element: <StatistikGlobal /> },
                    { path: "profile", element: <ProfileUser /> },
                ]
            }

        ]
    }
]
