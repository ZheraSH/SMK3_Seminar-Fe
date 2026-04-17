import AttendanceDashboard from "@pages/counselor/monitoring-absen/main-attendance-monitoring";
import VerifyPermission from "@pages/counselor/verifikasi/main-verify-permission";
import StatistikGlobal from "@pages/counselor/statistik-global/statistik-global";
import MainDashboard from "@components/elements/main-dashboard";
import BodyDashboard from "@pages/counselor/home/body-dashboard-counselor";
import ProtectedRoute from "./protected-route";
import { DashboardLayout } from "../../view/layouts/dashboard-layout";
import ProfileUser from "../../view/components/elements/profile/profile-user";

export const counselorRoutes = [
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
