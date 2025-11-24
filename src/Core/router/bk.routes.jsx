import MainMonitoringAbsen from "../../view/pages/BK/monitoring Absen/MainAttendanceMonitoring";
import MainDashboard from "../../view/components/elements/MainDashboard";
import BodyDashboard from "../../view/pages/BK/home/BodyDasboardBk";
import { LayouthBK } from "../../view/layouts/BkLayouth";
import ProtectedRoute from "./ProtectedRoute";
export const BkRoutes = [
    {
        path: "/bk-home",
        element:(<ProtectedRoute allowedRoles={["counselor", "teacher"]} />),  
        children :[ 
            {
                element: <LayouthBK />,
                children : [
                    { index: true, element: <BodyDashboard /> },
                    { path: "dashboard", element: <MainDashboard/> },
                    {path: "monitoring-absen", element: <MainMonitoringAbsen />},
                    // {path : "statistik-global", element: <MainStatistikGlobal/>},
                    // {path: "verifikasi-izin", element: <MainVerifikasiIzin/>}
                ]
            }
           
        ]
    }
]