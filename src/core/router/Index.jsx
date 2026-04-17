import { createBrowserRouter } from "react-router-dom";
import { AdminRoutes } from "./admin.routes";
import { StudentRoutes } from "./student.routes";
import { TeacherRoutes } from "./teacher.routes";
import { HomeRoomRoute } from "./homeroom.route";
<<<<<<< HEAD
import { BkRoutes } from "./bk.routes";
import { EmployeeProfileRoute } from "./employeProfile.routes";
import { MultiRoleRoutes } from "./multiRole.route";
import { LandingRoutes } from "./landing.routes";
import NotFound from "../../view/pages/NotFound";
=======
import { counselorRoutes } from "./counselor.routes";
import { EmployeeProfileRoute } from "./employee-profile.route";
import { MultiRoleRoutes } from "./multi-role.route";
import { LandingRoutes } from "./landing.routes";
import NotFound from "@/view/pages/not-found";
>>>>>>> dev2

export const router = createBrowserRouter([
    ...LandingRoutes,
    ...AdminRoutes,
    ...StudentRoutes,
    ...TeacherRoutes,
    ...HomeRoomRoute,
<<<<<<< HEAD
    ...BkRoutes,
=======
    ...counselorRoutes,
>>>>>>> dev2
    ...EmployeeProfileRoute,
    ...MultiRoleRoutes,
    {
        path: "*",
        element: <NotFound />,
    },
]);
