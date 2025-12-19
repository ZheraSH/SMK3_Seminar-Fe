import { useState, useEffect } from "react";
import { fetchDailyScheduleApi } from "../../../api/role-teacher/teacher-schedule/teacherScheduleApi";

export function useTeacherSchedule(selectedDate) {
  const [schedule, setSchedule] = useState([]);
  const [activeDay, setActiveDay] = useState("");

  const dayMap = {
    monday: "Senin",
    tuesday: "Selasa",
    wednesday: "Rabu",
    thursday: "Kamis",
    friday: "Jum'at",
    saturday: "Sabtu",
    sunday: "Minggu",
  };

  function getDayFromDate(dateString) {
    const dayIndex = new Date(dateString).getDay();
    return ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][dayIndex];
  }

  useEffect(() => {
    async function fetchData() {
      const raw = await fetchDailyScheduleApi(selectedDate);

      const normalized = raw.map((item) => ({
        id: item.id,
        day: item.day,
        lesson_hour: item.lesson_hour,
        classroom: item.classroom,
        subject: item.subject,
      }));

      setSchedule(normalized);
      setActiveDay(dayMap[getDayFromDate(selectedDate)]);
    }

    fetchData();
  }, [selectedDate]);

  return { schedule, activeDay, dayMap };
}
