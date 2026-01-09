import { LayouthHomeRoom } from "../../view/layouts/HomeRoomLayouth";
import ClassRecapHomeRoom from "../../view/pages/homeroom-teacher/attendance-recap/AttendanceRecap";
import HomeRoomHome from "../../view/pages/homeroom-teacher/home/MainHomeroomHome";
import ProtectedRoute from "./ProtectedRoute";
import ProfileEmployee from "../../view/components/elements/profile/ProfileEmployee";

export const HomeRoomRoute =[
    {
        path:"/homeroom-home",
        element: (<ProtectedRoute allowedRoles={["homeroom_teacher", "counselor"] } />), 
        children: [
            {
                element : <LayouthHomeRoom />,
                children : [
                    { index: true, element: <HomeRoomHome/> },
                    { path: "home", element: <HomeRoomHome/> },
                    // { path: "student-class", element: <MainClassStudent /> },
                    // { path: "student-schedule", element: <MainScheduleStudent  /> },
                    { path: "class-recap", element: <ClassRecapHomeRoom/> },
                    { path : "profile", element: <ProfileEmployee /> }
                ]
            }
        ]
    },
]