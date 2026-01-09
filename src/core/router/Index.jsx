import { createBrowserRouter } from "react-router-dom";
import { AdminRoutes } from "./admin.routes";
import { StudentRoutes } from "./student.routes";
import { TeacherRoutes } from "./teacher.routes";
import { HomeRoomRoute } from "./homeroom.route";
import { BkRoutes } from "./bk.routes";
import { EmployeeProfileRoute } from "./employeProfile.routes";
import { MultiRoleRoutes } from "./multiRole.route";

export const router = createBrowserRouter([
    ...AdminRoutes,
    ...StudentRoutes,
    ...TeacherRoutes,
    ...HomeRoomRoute,
    ...BkRoutes,
    ...EmployeeProfileRoute,
    ...MultiRoleRoutes,
]);
