import BodyDashboard from "../../view/pages/operator/home/BodyDashboard";
import MainDashboard from "../../view/components/elements/MainDashboard";
import { LayouthSiswa } from "../../view/layouts/SiswaLayouth";
import MainScheduleStudent from "../../view/pages/student/schedule/MainSchedule";
import PermissionManagement from "../../view/pages/student/permission-management/PermissionManagement";

export const StudentRoutes =[
    {
        path:"/student-home",
        element: <LayouthSiswa />,
        children: [
            // { index: true, element: <BodyDashboard /> },
            // { path: "dashboard", element: <MainDashboard/> },
            // { path: "kelas-student", element: <MainClassStudent /> },
            // { path: "absen-student", element: <AbsentStudentMain /> },
            { path: "student-schedule", element: <MainScheduleStudent  /> },
            { path: "student-license", element: <PermissionManagement/> },
        ]
    },

    
]