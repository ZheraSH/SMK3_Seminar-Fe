import { useState, useEffect } from "react";
import { getAttendanceClassroom } from "../../../api/role-teacher/attendance/AttendanceClassroom";

export const getTodayDateString = () => {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export function useAttendanceTeacher() {
  
  const userData = (() => {
    try {
      return JSON.parse(localStorage.getItem("userData"));
    } catch {
      return null;
    }
  })();

  const isTeacher = userData?.roles?.includes("teacher");

 
  const [selectedDate, setSelectedDate] = useState(() => {
    const saved = localStorage.getItem("selectedDate");
    return saved && !isNaN(new Date(saved))
      ? saved
      : getTodayDateString();
  });

  useEffect(() => {
    localStorage.setItem("selectedDate", selectedDate);
  }, [selectedDate]);

  const [classrooms, setClassrooms] = useState([]);
  const [globalChanges, setGlobalChanges] = useState({});
  const [submittedClasses, setSubmittedClasses] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    if (!isTeacher || !selectedDate) return;

    let active = true;
    setLoading(true);
    setError(null);

    getAttendanceClassroom(selectedDate)
      .then((data) => {
        if (!active) return;
        setClassrooms(data || []);
        if (!data || data.length === 0) {
          setError(`Tidak ada jadwal mengajar pada ${selectedDate}`);
        }
      })
      .catch((err) => {
        if (!active) return;
        setError(
          err?.response?.data?.message || "Gagal memuat daftar kelas"
        );
        setClassrooms([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [selectedDate, isTeacher]);

  
  return {
    classrooms,
    selectedDate,
    setSelectedDate,
    globalChanges,
    setGlobalChanges,
    submittedClasses,
    setSubmittedClasses,
    loading,
    error,
  };
}
