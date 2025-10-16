import Login from "../../assets/components/Elements/Login/MainLogin";

export const LoginRoutes = [
    {
      path: "/login",
      element: <Login />,
      children: [
        { index: true, element: <Login /> },
      ],
    },
  ];
  