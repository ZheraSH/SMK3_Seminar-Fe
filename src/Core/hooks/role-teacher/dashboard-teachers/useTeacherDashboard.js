import { useEffect, useState } from "react";
import { getDashboardClassroom,getDashboardSchedule } from "../../../api/role-teacher/dashboard-teachers/teacherDashboard.api";

export function useTeacherDashboard() {
  const getTodayIndonesian = () => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const todayIndex = new Date().getDay(); 
    return days[todayIndex];
  };

  const [activeDay, setActiveDay] = useState(getTodayIndonesian());
  const [schedule, setSchedule] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchDashboardData = async (day) => {
    setIsLoading(true);
    try {
      const data = await getDashboardClassroom(day);
      console.log(data);
      setClassrooms(data || []);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDashboardSchedule = async (day) => {
    setIsLoading(true);
    try {
      const data = await getDashboardSchedule(day);
      console.log(data);
      setSchedule(data || []);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(activeDay);
    fetchDashboardSchedule(activeDay);
  }, [activeDay]);

  return {
    activeDay,
    setActiveDay,
    schedule,
    classrooms,
    // userName,
    isLoading,
  };
}