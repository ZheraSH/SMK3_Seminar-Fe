import { LayouthHomeRoom } from "../../view/layouts/HomeRoomLayouth";
import ClassRecapHomeRoom from "../../view/pages/homeroom-teacher/MainHomeRoomTeacher";

export const HomeRoomRoute =[
    {
        path:"/homeroom-home",
        element: <LayouthHomeRoom />,
        children: [
            // { index: true, element: <BodyDashboard /> },
            // // { path: "dashboard", element: <MainDashboard/> },
            // { path: "student-class", element: <MainClassStudent /> },
            // { path: "student-schedule", element: <MainScheduleStudent  /> },
            { path: "class-recap", element: <ClassRecapHomeRoom/> },
        ]
    },
]