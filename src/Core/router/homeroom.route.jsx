import ClassRecapHomeRoom from "../../view/pages/homeroom-teacher/attendance-recap/attendance-recap";
import HomeRoomHome from "../../view/pages/homeroom-teacher/home/main-homeroom-home";
import ProtectedRoute from "./protected-route";
import ProfileUser from "../../view/components/elements/profile/profile-user";
import { DashboardLayout } from "../../view/layouts/dashboard-layout";

export const HomeRoomRoute = [
    {
        path: "/homeroom-home",
        element: (<ProtectedRoute allowedRoles={["homeroom_teacher", "counselor"]} />),
        children: [
            {
                element: <DashboardLayout  />,
                children: [
                    { index: true, element: <HomeRoomHome /> },
                    { path: "home", element: <HomeRoomHome /> },
                    { path: "class-recap", element: <ClassRecapHomeRoom /> },
                    { path: "profile", element: <ProfileUser /> }
                ]
            }
        ]
    },
]
