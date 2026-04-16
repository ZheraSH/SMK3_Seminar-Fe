import { useEffect, useState, useCallback } from "react";
import { getDashboardClassroom, getDashboardSchedule } from "@/core/api/role-teacher/dashboard-teachers/teacher-dashboard-api";

export function useTeacherDashboard() {
  const getTodayIndonesian = () => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return days[new Date().getDay()];
  };

  const [activeDay, setActiveDay] = useState(getTodayIndonesian());
  const [schedule, setSchedule] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const fetchData = useCallback(async (day) => {
    setIsLoading(true); 
    try {
      
      const [classroomData, scheduleData] = await Promise.all([
        getDashboardClassroom(day),
        getDashboardSchedule(day)
      ]);

      setClassrooms(classroomData || []);
      setSchedule(scheduleData || []);
      
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(activeDay);
  }, [activeDay, fetchData]);

  return {
    activeDay,
    setActiveDay,
    schedule,
    classrooms,
    isLoading,
  };
}
