import { useEffect, useState } from "react";
import { getTodaySchedule, getClassroomList } from "../../../api/role-teacher/dashboard-teachers/teacherDashboard.api";

export function useTeacherDashboard() {
  const [schedule, setSchedule] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const load = async () => {
      setSchedule(await getTodaySchedule());
      setClassrooms(await getClassroomList());
    };
    load();
  }, []);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("userData"));
      setUserName(stored?.name ?? "");
    } catch {
      setUserName("");
    }
  }, []);

  return {
    schedule,
    classrooms,
    userName,
  };
}
