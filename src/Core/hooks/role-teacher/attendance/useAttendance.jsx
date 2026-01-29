import { useState, useEffect } from "react";
import { getAttendanceClassroom } from "../../../api/role-teacher/attendance/AttendanceClassroom";

export function useAttendanceTeacher() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [isOpenClass, setIsOpenClass] = useState(false);

  const today = new Date();
  const todayIndex = today.getDay();
  const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  let initialDay = "monday";
  if (todayIndex >= 1 && todayIndex <= 5) {
    initialDay = dayNames[todayIndex];
  } else if (todayIndex === 6 || todayIndex === 0) {
    initialDay = "monday"; 
  }

  const [activeDay, setActiveDay] = useState(initialDay);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [globalChanges, setGlobalChanges] = useState({});
  const [submittedClasses, setSubmittedClasses] = useState({});

  useEffect(() => {
    setLoading(true);
    setError(null);

    getAttendanceClassroom(activeDay)
      .then((data) => {

        if (!data || (Array.isArray(data) && data.length === 0)) {
          setError("Tidak ada jadwal mengajar di hari " + activeDay);
          setClassrooms([]);
          return;
        }

        setClassrooms(data);
      })
      .catch((err) => {
        console.error("Error fetching classroom:", err);
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
  };
}