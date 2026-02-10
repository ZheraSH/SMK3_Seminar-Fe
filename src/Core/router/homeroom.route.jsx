import ClassRecapHomeRoom from "../../view/pages/homeroom-teacher/attendance-recap/AttendanceRecap";
import HomeRoomHome from "../../view/pages/homeroom-teacher/home/MainHomeroomHome";
import ProtectedRoute from "./ProtectedRoute";
import ProfileUser from "../../view/components/elements/profile/ProfileUser";
import { DashboardLayouth } from "../../view/layouts/DashboardLayouth";

export const HomeRoomRoute = [
    {
        path: "/homeroom-home",
        element: (<ProtectedRoute allowedRoles={["homeroom_teacher", "counselor"]} />),
        children: [
            {
                element: <DashboardLayouth  />,
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