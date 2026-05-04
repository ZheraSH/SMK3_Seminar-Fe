import ClassRecapHomeRoom from "@pages/homeroom-teacher/attendance-recap/attendance-recap";
import HomeRoomHome from "@pages/homeroom-teacher/home/main-homeroom-home";
import ProtectedRoute from "./protected-route";
import ProfileUser from "@elements/profile/profile-user";
import { DashboardLayout } from "@/view/layouts/dashboard-layout";

export const HomeRoomRoute = [
    {
        path: "/homeroom-home",
        element: (<ProtectedRoute allowedRoles={["homeroom_teacher", "counselor"]} />),
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    { index: true, element: <HomeRoomHome /> },
                    { path: "home", element: <HomeRoomHome /> },
                    { path: "classroom-recap", element: <ClassRecapHomeRoom /> },
                    { path: "profile", element: <ProfileUser /> },
                ]
            }
        ]
    },
];
