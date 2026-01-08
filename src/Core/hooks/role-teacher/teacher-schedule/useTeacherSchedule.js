import { useState, useEffect,useRef} from "react";
import { fetchDailyScheduleApi } from "../../../api/role-teacher/teacher-schedule/teacherScheduleApi";

export function useTeacherSchedule(selectedDate) {
  const [schedule, setSchedule] = useState([]);
  const [activeDay, setActiveDay] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const isFirstLoad = useRef(true);

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

  const load = async () => {
    if (!selectedDate) return;

    if (isFirstLoad.current) {
      setLoading(true);
    }
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

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
    } catch (err) {
      console.error("Error fetch teacher schedule:", err);
      setSchedule([]);
      setError(
        err?.response?.data?.message ||
        "Gagal memuat jadwal mengajar"
      );
    } finally {
      if (isFirstLoad.current) {
        setLoading(false);
        isFirstLoad.current = false;
      }
    }
  };

  useEffect(() => {
    load();
  }, [selectedDate]);

  return {
    schedule,
    activeDay,
    dayMap,
    loading,
    error,
  };
}
