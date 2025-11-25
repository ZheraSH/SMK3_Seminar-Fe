import { LayouthTeacher } from "../../view/layouts/TeacherLayout";
import AttendanceTeacher from "../../view/pages/teacher/attendance/MainAttendance";
import ProtectedRoute from "./ProtectedRoute";
import MainDashboard from "../../view/components/elements/MainDashboard";

import BodyDashboard from "../../view/pages/teacher/home/BodyDashboardTeacher";

export const TeacherRoutes = [
    {
        path:"/teacher-home",
        element: ( <ProtectedRoute allowedRoles={["teacher"]} />),
        children: [
            {
                element :<LayouthTeacher />,
                children : [
                    { index: true, element: <BodyDashboard /> },
                    { path: "dashboard", element: <MainDashboard /> },
                    { path : "attendance-teacher", element: <AttendanceTeacher /> },
                    // { path : "teacher-schedule", element: <TeacherSchedule /> },
                ]
            }
        ],
    }

];