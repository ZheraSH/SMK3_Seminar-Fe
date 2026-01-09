import ProtectedRoute from "./ProtectedRoute";
import ProfileEmploye from "../../view/components/elements/profile/ProfileEmployee";

export const EmployeeProfileRoute = [
  {
    path: "/employee/profile",
    element: (
      <ProtectedRoute
        allowedRoles={[
          "teacher",
          "counselor",
          "homeroom_teacher",
        ]}
      />
    ),
    children: [
      {
        index: true,          // 🔥 INI YANG KURANG
        element: <ProfileEmploye />,
      },
    ],
  },
];
