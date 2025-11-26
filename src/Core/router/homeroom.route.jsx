import { LayouthHomeRoom } from "../../view/layouts/HomeRoomLayouth";
import ClassRecapHomeRoom from "../../view/pages/homeroom-teacher/MainHomeRoomTeacher";
import BodyDashboard from "../../view/pages/operator/home/BodyDashboard";
import ProtectedRoute from "./ProtectedRoute";

export const HomeRoomRoute =[
    {
        path:"/homeroom-home",
        element: (<ProtectedRoute allowedRoles={["homeroom_teacher", "counselor"] } />), 
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