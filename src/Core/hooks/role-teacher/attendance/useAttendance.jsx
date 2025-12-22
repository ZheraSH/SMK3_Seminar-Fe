import { useState, useEffect, useCallback } from "react";
import { getAttendanceClassroom } from "../../../api/role-teacher/attendance/AttendanceClassroom";

const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function useAttendanceTeacher() {
  // --- 1. AUTH & PERSISTENCE ---
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isTeacher = userData?.roles?.includes("teacher");

  // Inisialisasi selectedClass dari localStorage
  const [selectedClass, setSelectedClass] = useState(() => {
    const saved = localStorage.getItem("selectedClass");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isOpenClass, setIsOpenClass] = useState(() => {
    const savedOpen = localStorage.getItem("isOpenClass");
    return savedOpen === "true" && !!localStorage.getItem("selectedClass");
  });

  // Effect untuk Sinkronisasi LocalStorage
  useEffect(() => {
    if (selectedClass) {
      localStorage.setItem("selectedClass", JSON.stringify(selectedClass));
    } else {
      localStorage.removeItem("selectedClass");
      localStorage.removeItem("isOpenClass"); // Reset jika kelas null
    }
  }, [selectedClass]);

  useEffect(() => {
    localStorage.setItem("isOpenClass", isOpenClass ? "true" : "false");
  }, [isOpenClass]);

  // --- 2. STATE UTAMA ---
  const [selectedDate, setSelectedDate] = useState(getTodayDateString);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Global state untuk menampung perubahan input absensi di level halaman/pagination
  const [globalChanges, setGlobalChanges] = useState({});
  // Menandai kelas mana saja yang sudah berhasil disubmit dalam session ini
  const [submittedClasses, setSubmittedClasses] = useState({});

  const clearAttendanceState = useCallback(() => {
    localStorage.removeItem("selectedClass");
    localStorage.removeItem("isOpenClass");
    setSelectedClass(null);
    setIsOpenClass(false);
    setGlobalChanges({});
  }, []);

  // --- 3. FETCH DATA (Sinkron dengan getTeacherClassrooms di BE) ---
  useEffect(() => {
    if (!isTeacher) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    // Memanggil API getAttendanceClassroom (Endpoint BE: getTeacherClassrooms)
    getAttendanceClassroom(selectedDate)
      .then((data) => {
        if (!isMounted) return;

        // Backend mengembalikan: collect($classroomData)->values()
        // Struktur: [{ classroom: {...}, first_schedule: {...} }, ...]
        if (!data || data.length === 0) {
          setClassrooms([]);
          setError(`Tidak ada jadwal mengajar pada ${selectedDate}`);
        } else {
          setClassrooms(data);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.response?.data?.message || "Gagal memuat daftar kelas");
        setClassrooms([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [selectedDate, isTeacher]);

  return {
    // Data Kelas & Filter
    classrooms,
    selectedDate,
    setSelectedDate,
    
    // Status Pilihan (UI State)
    selectedClass,
    setSelectedClass,
    isOpenClass,
    setIsOpenClass,
    
    // Management State Absensi
    globalChanges,
    setGlobalChanges,
    submittedClasses,
    setSubmittedClasses,
    
    // Utilities
    loading,
    error,
    clearAttendanceState,
  };
}