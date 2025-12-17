import { useState, useEffect, useCallback } from "react";
import { getAttendanceClassroom } from "../../../api/role-teacher/attendance/AttendanceClassroom";

// Helper: ambil tanggal hari ini (YYYY-MM-DD)
const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function useAttendanceTeacher() {
  // --- 1. STATE MANAGEMENT (PERSISTENSI) ---
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isTeacher = userData?.roles?.includes("teacher");
  const [selectedClass, setSelectedClass] = useState(() => {
    const saved = localStorage.getItem("selectedClass");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (selectedClass) {
      localStorage.setItem("selectedClass", JSON.stringify(selectedClass));
    } else {
      localStorage.removeItem("selectedClass");
    }
  }, [selectedClass]);

  const [isOpenClass, setIsOpenClass] = useState(() => {
    const savedOpen = localStorage.getItem("isOpenClass");
    const savedClass = localStorage.getItem("selectedClass");
    return savedOpen === "true" && savedClass !== null;
  });

  useEffect(() => {
    if (isOpenClass) {
      localStorage.setItem("isOpenClass", "true");
    } else {
      localStorage.removeItem("isOpenClass");
    }
  }, [isOpenClass]);

  const clearAttendanceState = useCallback(() => {
    console.log("Attendance State Cleared for Logout.");
    localStorage.removeItem("selectedClass");
    localStorage.removeItem("isOpenClass");

    setSelectedClass(null);
    setIsOpenClass(false);
  }, []);

  // --- 2. STATE UTAMA ---
  const [selectedDate, setSelectedDate] = useState(getTodayDateString);

  
  

  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [globalChanges, setGlobalChanges] = useState({});
  const [submittedClasses, setSubmittedClasses] = useState({});

  // --- 3. FETCH DATA BERDASAR selectedDate ---
  useEffect(() => {
  if (!isTeacher) {
    setLoading(false);
    return;
  }

  if (!selectedDate || selectedDate.split("-").length !== 3) {
    setError("Tanggal tidak valid.");
    setLoading(false);
    return;
  }

  let isMounted = true;

  setLoading(true);
  setError(null);

  console.log(`[API CALL] Fetching classes for date: ${selectedDate}`);

  getAttendanceClassroom(selectedDate)
    .then((data) => {
      if (!isMounted) return;
      if (!data || data.length === 0) {
        setError(`Tidak ada kelas mengajar pada tanggal ${selectedDate}`);
        setClassrooms([]);
        return;
      }
      setClassrooms(data);
    })
    .catch(() => {
      if (!isMounted) return;
      setError("Gagal memuat data kelas");
      setClassrooms([]);
    })
    .finally(() => isMounted && setLoading(false));

  return () => {
    isMounted = false;
  };
}, [selectedDate, isTeacher]);


  // --- 4. RETURN ---
  return {
    selectedClass,
    setSelectedClass,
    isOpenClass,
    setIsOpenClass,
    selectedDate,
    setSelectedDate,
    classrooms,
    loading,
    error,
    globalChanges,
    setGlobalChanges,
    submittedClasses,
    setSubmittedClasses,
    clearAttendanceState,
  };
}
