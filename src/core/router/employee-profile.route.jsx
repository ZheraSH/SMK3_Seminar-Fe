
import ProfileUser from "../../view/components/elements/profile/profile-user";
import ProtectedRoute from "./protected-route";

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
