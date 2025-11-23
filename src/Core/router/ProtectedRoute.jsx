import { Outlet } from "react-router-dom";
import NotFound from "../../view/pages/NotFound"; 

export default function ProtectedRoute({ allowedRoles }) {
  const token = localStorage.getItem("token");
  const data = JSON.parse(localStorage.getItem("userData"));

  if (!token) {
   if (!token) return <Navigate to="/" replace />;
  }

  const userRole = data?.role?.toLowerCase();

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <NotFound />; 
  }

  return <Outlet />; 
}
