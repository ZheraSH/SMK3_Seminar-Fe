import { createBrowserRouter } from "react-router-dom";
import { AdminRoutes } from "./admin.routes";
import { StudentRoutes } from "./student.routes";
import { TeacherRoutes } from "./teacher.routes";
import { HomeRoomRoute } from "./homeroom.route";
import { BkRoutes } from "./bk.routes";
import { EmployeeProfileRoute } from "./employee-profile.route";
import { MultiRoleRoutes } from "./multi-role.route";
import { LandingRoutes } from "./landing.routes";
import NotFound from "../../view/pages/not-found";

export const router = createBrowserRouter([
    ...LandingRoutes,
    ...AdminRoutes,
    ...StudentRoutes,
    ...TeacherRoutes,
    ...HomeRoomRoute,
    ...BkRoutes,
    ...EmployeeProfileRoute,
    ...MultiRoleRoutes,
    {
        path: "*",
        element: <NotFound />,
    },
]);
