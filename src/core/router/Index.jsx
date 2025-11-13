import { createBrowserRouter } from "react-router-dom";
import { AdminRoutes } from "./admin.routes";
import { SiswaRoutes } from "./user.routes";


export const router = createBrowserRouter([ ...AdminRoutes,...SiswaRoutes]);


  
  