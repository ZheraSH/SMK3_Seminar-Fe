import { useEffect, useState } from "react";
import {
  getTodaySchedule,
  getClassroomList,
} from "../../../api/role-teacher/dashboard-teachers/teacherDashboard.api";

export function useTeacherDashboard() {
  const [schedule, setSchedule] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const [scheduleRes, classroomRes] = await Promise.all([
        getTodaySchedule(),
        getClassroomList(),
      ]);

      setSchedule(scheduleRes || []);
      setClassrooms(classroomRes || []);
    } catch (err) {
      console.error("Error load dashboard teacher:", err);
      setSchedule([]);
      setClassrooms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    loading,
  };
}
