import { useState } from "react";
import { Outlet } from "react-router-dom";
import { LayouthTeacher } from "../../view/layouts/TeacherLayout";
import AttendanceTeacher from "../../view/pages/teacher/attendance/MainAttendance";
import ProtectedRoute from "./ProtectedRoute";
import TeacherSchedule from "../../view/pages/teacher/teaching-schedule/TeachingSchedule";
import BodyDashboardTeacher from "../../view/pages/teacher/home/BodyDashboardTeacher";
import ClassAttendance from "../../view/pages/teacher/attendance/components/ClassAttendance";


export function AttendanceLayout() {
  const [globalChanges, setGlobalChanges] = useState({});
  const [submittedClasses, setSubmittedClasses] = useState({});

  return (
    <Outlet context={{ globalChanges, setGlobalChanges, submittedClasses, setSubmittedClasses }} />
  );
}

export const TeacherRoutes = [
  {
    path: "/teacher-home",
    element: <ProtectedRoute allowedRoles={["teacher"]} />,
    children: [
      {
        element: <LayouthTeacher />,
        children: [
          { index: true, element: <BodyDashboardTeacher /> },
          {
            path: "attendance-teacher",
            element: <AttendanceLayout />, 
            children: [
              { index: true, element: <AttendanceTeacher /> },
              { path: "detail", element: <ClassAttendance /> },
            ],
          },
          { path: "teacher-schedule", element: <TeacherSchedule /> },
        ],
      },
    ],
  },
];