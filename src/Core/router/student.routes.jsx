import MainClassStudent from "../../view/pages/student/Class/MainClass";
import { LayouthSiswa } from "../../view/layouts/SiswaLayouth";
import MainScheduleStudent from "../../view/pages/student/schedule/MainSchedule";
import PermissionManagement from "../../view/pages/student/permission-management/PermissionManagement";
import ProtectedRoute from "./ProtectedRoute";
import MainDashboard from "../../view/components/elements/MainDashboard";
import BodyDashboard from "../../view/pages/operator/home/BodyDashboard";


export const StudentRoutes =[
   
    {
        path: "/student-home",
            element:(<ProtectedRoute allowedRoles={["student",]}
            />),
            children: [{
              element : <LayouthSiswa />,
              children : [
                { index: true, element: <BodyDashboard/>  },
                { path: "dashboard", element: <MainDashboard/> },
                { path: "student-class", element: <MainClassStudent /> },
                // { path: "absen-student", element: <AbsentStudentMain /> },
                { path: "student-schedule", element: <MainScheduleStudent  /> },
                { path: "student-license", element: <PermissionManagement/> },
              ]
        
            }],
    },

    
]