<<<<<<< HEAD
import ClassRecapHomeRoom from "../../view/pages/homeroom-teacher/attendance-recap/AttendanceRecap";
import HomeRoomHome from "../../view/pages/homeroom-teacher/home/MainHomeroomHome";
import ProtectedRoute from "./ProtectedRoute";
import ProfileUser from "../../view/components/elements/profile/ProfileUser";
import { DashboardLayouth } from "../../view/layouts/DashboardLayouth";
=======
import ClassRecapHomeRoom from "@pages/homeroom-teacher/attendance-recap/attendance-recap";
import HomeRoomHome from "@pages/homeroom-teacher/home/main-homeroom-home";
import ProtectedRoute from "./protected-route";
import ProfileUser from "@components/elements/profile/profile-user";
import { DashboardLayout } from "@/view/layouts/dashboard-layout";
>>>>>>> dev2

export const HomeRoomRoute = [
    {
        path: "/homeroom-home",
        element: (<ProtectedRoute allowedRoles={["homeroom_teacher", "counselor"]} />),
        children: [
            {
<<<<<<< HEAD
                element: <DashboardLayouth  />,
=======
                element: <DashboardLayout  />,
>>>>>>> dev2
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
