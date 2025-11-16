import { LayouthTeacher } from "../../view/layouts/TeacherLayout";
import AttendanceTeacher from "../../view/pages/teacher/attendance/MainAttendance";



export const TeacherRoutes = [
    {
        path:"/teacher-home",
        element: <LayouthTeacher />,
        children: [
            // { index: true, element: <BodyDashboardTeacher /> },
            // { path: "dashboard", element: <MainDashboard /> },
            { path : "attendance-teacher", element: <AttendanceTeacher /> },
        ]
    }

];