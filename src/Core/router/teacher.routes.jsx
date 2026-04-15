import AttendanceTeacher from "@pages/teacher/attendance/main-attendance";
import ProtectedRoute from "./protected-route";
import TeacherSchedule from "@pages/teacher/teaching-schedule/teaching-schedule";
import BodyDashboardTeacher from "@pages/teacher/home/body-dashboard-teacher";
import ProfileUser from "@elements/profile/profile-user";
import { DashboardLayout } from "@assets/layouts/dashboard-layout";

export const TeacherRoutes = [
    {
        path: "/teacher-home",
        element: (<ProtectedRoute allowedRoles={["teacher"]} />),
        children: [
            {
                element: <DashboardLayout />,
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
