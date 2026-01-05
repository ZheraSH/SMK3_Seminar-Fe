import MainClassStudent from "../../view/pages/student/Class/MainClass";
import { LayouthSiswa } from "../../view/layouts/SiswaLayouth";
import MainScheduleStudent from "../../view/pages/student/schedule/MainSchedule";
import PermissionManagement from "../../view/pages/student/permission-management/PermissionManagement";
import BodyDashboard from "../../view/pages/student/home/BodyDashboardStuent";
import ProtectedRoute from "./ProtectedRoute";
import MainDashboard from "../../view/components/elements/MainDashboard";
import AbsentStudentMain from "../../view/pages/student/absence/AbsenceStudent";



export const StudentRoutes =[
   
    {
        path: "/student-home",
            element:(<ProtectedRoute allowedRoles={"student"}
            />),
            children: [{
              element : <LayouthSiswa />,
              children : [
                { index: true, element: < BodyDashboard/>  },
                { path: "dashboard", element: <MainDashboard/> },
                { path: "student-class", element: <MainClassStudent /> },
                { path: "student-attendance", element: <AbsentStudentMain /> },
                { path: "student-schedule", element: <MainScheduleStudent  /> },
                { path: "student-license", element: <PermissionManagement/> },
              ]
        
            }],
    },

    
]