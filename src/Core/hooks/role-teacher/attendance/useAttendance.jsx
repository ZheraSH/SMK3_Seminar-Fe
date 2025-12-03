import { useState, useEffect } from "react";
import { getAttendanceClassroom } from "../../../api/role-teacher/attendance/AttendanceClassroom";

export function useAttendanceTeacher() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [isOpenClass, setIsOpenClass] = useState(false);

  const todayDayIndex = new Date().getDay();
  let initialDay = "monday";
  const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  if (todayDayIndex >= 1 && todayDayIndex <= 5) {
    initialDay = dayNames[todayDayIndex];
  } else if (todayDayIndex === 6) {
    initialDay = "friday";
  }

  const [activeDay, setActiveDay] = useState(initialDay);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [globalChanges, setGlobalChanges] = useState({});
  const [submittedClasses, setSubmittedClasses] = useState({});

  const getDateByDay = (day) => {
    const today = new Date();
    const dayMap = { monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5 };
    const targetDay = dayMap[day];

    if (!targetDay) return today.toISOString().split("T")[0];

    const difference = targetDay - today.getDay();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + difference);
    return targetDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    const date = getDateByDay(activeDay);
    setLoading(true);
    setError(null);

    getAttendanceClassroom(date)
      .then((data) => {
        if (!data) {
          setError("Data kelas tidak ditemukan");
          setClassrooms([]);
          return;
        }
        setClassrooms(data);
      })
      .catch((err) => {
        console.error("Error fetching class data:", err);
        setError("Gagal memuat data kelas");
        setClassrooms([]);
      })
      .finally(() => setLoading(false));
  }, [activeDay]);

  return {
    selectedClass,
    setSelectedClass,
    isOpenClass,
    setIsOpenClass,
    activeDay,
    setActiveDay,
    classrooms,
    loading,
    error,
    globalChanges,
    setGlobalChanges,
    submittedClasses,
    setSubmittedClasses,
    getDateByDay,
  };
}
