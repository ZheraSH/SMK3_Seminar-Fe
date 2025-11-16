import { createBrowserRouter } from "react-router-dom";
import { AdminRoutes } from "./admin.routes";
import { StudentRoutes } from "./student.routes";
import { TeacherRoutes } from "./teacher.routes";


export const router = createBrowserRouter([ ...AdminRoutes,...StudentRoutes,...TeacherRoutes]);


  
  