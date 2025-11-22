import MainMonitoringAbsen from "../../view/pages/BK/monitoring Absen/MainAttendanceMonitoring";
import { LayouthBK } from "../../view/layouts/BkLayouth";
export const BkRoutes = [
    {
        path: "/bk-home",
        element: <LayouthBK />,
        children :[
            // { index: true, element: <BodyDashboard /> },
            // { path: "dashboard", element: <MainDashboard/> },
            {path: "monitoring-absen", element: <MainMonitoringAbsen />},
            // {path : "statistik-global", element: <MainStatistikGlobal/>},
            // {path: "verifikasi-izin", element: <MainVerifikasiIzin/>}
        ]
    }
]