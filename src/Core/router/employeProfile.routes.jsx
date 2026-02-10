import ProtectedRoute from "./ProtectedRoute";
import ProfileUser from "../../view/components/elements/profile/ProfileUser";

export const EmployeeProfileRoute = [
  {
    path: "/employee/profile",
    element: (
      <ProtectedRoute
        allowedRoles={[
          "teacher",
          "counselor",
          "homeroom_teacher",
          "student",
        ]}
      />
    ),
    children: [
      {
        index: true,          
        element: <ProfileUser />,
      },
    ],
  },
];
