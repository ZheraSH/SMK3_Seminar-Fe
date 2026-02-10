import { Navigate, Outlet } from "react-router-dom";
import NotFound from "../../view/pages/NotFound";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const token = localStorage.getItem("token");
  const data = JSON.parse(localStorage.getItem("userData"));

  if (!token) return <Navigate to="/" replace />;

  const userRoles = Array.isArray(data?.roles)
    ? data.roles
    : data?.role
    ? [data.role]
    : [];

  if (userRoles.length === 0) return <NotFound />;

  const allowed = userRoles.some((r) => allowedRoles.includes(r));

  if (!allowed) return <NotFound />;

  return <Outlet />;
}
