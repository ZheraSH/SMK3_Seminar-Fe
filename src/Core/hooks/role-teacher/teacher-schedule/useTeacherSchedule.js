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
    friday: "Jum’at",
    saturday: "Sabtu",
    sunday: "Minggu",
  };

  async function fetchDaily() {
    try {
      const rawData = await fetchDailyScheduleApi(selectedDate);

      const normalized = rawData.map((item) => ({
        id: item.id ?? Math.random(),
        day: item.day ?? "",
        lesson_hour: item.lesson_hour ?? {
          start_time: "00:00",
          end_time: "00:00",
        },
        classroom: item.classroom ?? {
          level: "-",
          major: "-",
          name: "-",
        },
        subject: item.subject ?? { name: "-" },
      }));

      setSchedule(normalized);

      if (normalized.length > 0) {
        const backendDay = normalized[0].day;
        setActiveDay(dayMap[backendDay] || "");
      } else {
        const guessDay = new Date(selectedDate)
          .toLocaleDateString("en-US", { weekday: "long" })
          .toLowerCase();
        setActiveDay(dayMap[guessDay] || "");
      }
    } catch (err) {
      console.error("Error fetching daily schedule:", err);
    }
  }

  useEffect(() => {
    fetchDaily();
  }, [selectedDate]);

  return { schedule, activeDay, dayMap };
}
