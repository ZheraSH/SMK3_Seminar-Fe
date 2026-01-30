import { LayouthTeacher } from "../../view/layouts/TeacherLayout";
import AttendanceTeacher from "../../view/pages/teacher/attendance/MainAttendance";
import ProtectedRoute from "./ProtectedRoute";
import TeacherSchedule from "../../view/pages/teacher/teaching-schedule/TeachingSchedule";
import BodyDashboardTeacher from "../../view/pages/teacher/home/BodyDashboardTeacher";
import ProfileUser from "../../view/components/elements/profile/ProfileUser";

export const TeacherRoutes = [
    {
        path: "/teacher-home",
        element: (<ProtectedRoute allowedRoles={["teacher"]} />),
        children: [
            {
                element: <LayouthTeacher />,
                children: [
                    { index: true, element: <BodyDashboardTeacher /> },
                    { path: "dashboard", element: <BodyDashboardTeacher /> },
                    { path: "attendance-teacher", element: <AttendanceTeacher /> },
                    { path: "teacher-schedule", element: <TeacherSchedule /> },
                    { path: "profile", element: <ProfileUser /> },
                ]
            }
        ],
    }

];