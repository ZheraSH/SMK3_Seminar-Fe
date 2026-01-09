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
    friday: "Jumat",
  };

  function getDayNameFromDate(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);
    const dayIndex = date.getDay(); // 0 - 6

    const dayNames = [
      null,        // Minggu null kan
      "monday",    // Senin
      "tuesday",   // Selasa
      "wednesday", // Rabu
      "thursday",  // Kamis
      "friday",    // Jum'at
      null,        // Sabtu null kan
    ];

    return dayNames[dayIndex];
  }

  async function fetchDaily() {
    try {
      const rawData = await fetchDailyScheduleApi(selectedDate);

      const normalized = rawData.map((item) => ({
        id: item.id ?? Math.random(),

        dayValue: item.day?.value ?? "",
        dayLabel: item.day?.label ?? "",

        time: item.time ?? "-",
        lesson : item.lesson_hour?.name ?? "-",

        classroom: item.classroom ?? { name: "-" },
        subject: item.subject ?? { name: "-" },

        has_cross_checked: item.has_cross_checked ?? false,
        can_cross_check: item.can_cross_check ?? false,
      }));

      setSchedule(normalized);

      if (normalized.length > 0 && normalized[0].dayLabel) {
        setActiveDay(normalized[0].dayLabel);
      } else {
        const dayKey = getDayNameFromDate(selectedDate);
        setActiveDay(dayMap[dayKey] || "");
      }
    } catch (err) {
      console.error("Error fetching daily schedule:", err);
      setSchedule([]);
      setActiveDay("");
    }
  }

 useEffect(() => {
  const day = getDayNameFromDate(selectedDate);
  if (!day) return; // sabtu/minggu stop

  fetchDaily();
}, [selectedDate]);

  return {
    schedule,
    activeDay,
    dayMap,
    getDayNameFromDate,
  };
}
