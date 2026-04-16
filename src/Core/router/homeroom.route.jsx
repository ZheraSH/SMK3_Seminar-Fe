import ClassRecapHomeRoom from "@pages/homeroom-teacher/attendance-recap/attendance-recap";
import HomeRoomHome from "@pages/homeroom-teacher/home/main-homeroom-home";
import ProtectedRoute from "./protected-route";
import ProfileUser from "@components/elements/profile/profile-user";
import { DashboardLayout } from "@/view/layouts/dashboard-layout";

export const HomeRoomRoute = [
    {
        path: "/homeroom-home",
        element: (<ProtectedRoute allowedRoles={["homeroom_teacher", "counselor"]} />),
        children: [
            {
                element : <LayouthHomeRoom />,
                children : [
                    { index: true, element: <BodyDashboard /> },
                    // // { path: "dashboard", element: <MainDashboard/> },
                    // { path: "student-class", element: <MainClassStudent /> },
                    // { path: "student-schedule", element: <MainScheduleStudent  /> },
                    { path: "class-recap", element: <ClassRecapHomeRoom/> },
                ]
            }
        ]
    },
]
