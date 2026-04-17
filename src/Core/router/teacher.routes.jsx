<<<<<<< HEAD
import AttendanceTeacher from "../../view/pages/teacher/attendance/MainAttendance";
import ProtectedRoute from "./ProtectedRoute";
import TeacherSchedule from "../../view/pages/teacher/teaching-schedule/TeachingSchedule";
import BodyDashboardTeacher from "../../view/pages/teacher/home/BodyDashboardTeacher";
import ProfileUser from "../../view/components/elements/profile/ProfileUser";
import { DashboardLayouth } from "../../view/layouts/DashboardLayouth";
=======
import AttendanceTeacher from "@pages/teacher/attendance/main-attendance";
import ProtectedRoute from "./protected-route";
import TeacherSchedule from "@pages/teacher/teaching-schedule/teaching-schedule";
import BodyDashboardTeacher from "@pages/teacher/home/body-dashboard-teacher";
import ProfileUser from "@elements/profile/profile-user";
import { DashboardLayout } from "@assets/layouts/dashboard-layout";
>>>>>>> dev2

export const TeacherRoutes = [
    {
        path: "/teacher-home",
        element: (<ProtectedRoute allowedRoles={["teacher"]} />),
        children: [
            {
<<<<<<< HEAD
                element: <DashboardLayouth />,
=======
                element: <DashboardLayout />,
>>>>>>> dev2
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
