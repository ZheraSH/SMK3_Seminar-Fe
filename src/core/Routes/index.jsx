import { createBrowserRouter } from "react-router-dom";
import { DashboardRoutes } from "./dashboard.routes";
import { LoginRoutes } from "./Login.Routes";



export const router = createBrowserRouter([ ...DashboardRoutes, ...LoginRoutes]);
  