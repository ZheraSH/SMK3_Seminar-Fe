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

  // Fungsi untuk mendapatkan nama hari dari tanggal
  function getDayNameFromDate(dateString) {
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    
    // Mapping: 0=Minggu, 1=Senin, ..., 6=Sabtu
    const dayNames = [
      "sunday", "monday", "tuesday", "wednesday", 
      "thursday", "friday", "saturday"
    ];
    
    return dayNames[dayIndex];
  }

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

      // Tentukan activeDay berdasarkan data yang diterima
      if (normalized.length > 0 && normalized[0].day) {
        // Gunakan hari dari data API jika ada
        setActiveDay(dayMap[normalized[0].day] || "");
      } else {
        // Jika tidak ada data, gunakan hari dari selectedDate
        const dayName = getDayNameFromDate(selectedDate);
        setActiveDay(dayMap[dayName] || "");
      }
    } catch (err) {
      console.error("Error fetching daily schedule:", err);
    }
  }

  useEffect(() => {
    fetchDaily();
  }, [selectedDate]);

  return { schedule, activeDay, dayMap, getDayNameFromDate };
}