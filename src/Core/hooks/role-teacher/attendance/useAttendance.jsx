import { useState, useEffect } from "react";
import { getAttendanceClassroom } from "../../../api/role-teacher/attendance/AttendanceClassroom";

export function useAttendanceTeacher() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [isOpenClass, setIsOpenClass] = useState(false);

  // --- Tentukan initial day sesuai hari sekarang ---
  const today = new Date();
  const todayIndex = today.getDay(); // 0–6
  const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  let initialDay = "monday";
  if (todayIndex >= 1 && todayIndex <= 5) {
    initialDay = dayNames[todayIndex];
  } else if (todayIndex === 6) {
    initialDay = "friday";
  }

  const [activeDay, setActiveDay] = useState(initialDay);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [globalChanges, setGlobalChanges] = useState({});
  const [submittedClasses, setSubmittedClasses] = useState({});

  // --------------------------------------------------------
  // 🔥 FIX UTAMA: Map hari → tanggal minggu ini, TAPI
  // tidak melompat ke minggu depan (Senin sebelumnya tetap dipakai)
  // --------------------------------------------------------
  const getDateByDay = (day) => {
    const map = { 
      monday: 1, 
      tuesday: 2, 
      wednesday: 3, 
      thursday: 4, 
      friday: 5 
    };

    // kalau bukan hari belajar
    if (!map[day]) return today.toLocaleDateString("en-CA");

    const targetIndex = map[day];
    const currentIndex = today.getDay(); // hari ini

    let diff = targetIndex - currentIndex;

    // 🔥 FIX: jika diff > 0 (misal sekarang Selasa, buka Senin),
    // maka ambil Minggu INI, bukan minggu depan
    if (diff > 0) {
      diff -= 7;
    }

    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);

    return targetDate.toLocaleDateString("en-CA");
  };

  // --------------------------------------------------------
  // 🔥 FETCH DATA CLASSROOM
  // --------------------------------------------------------
  useEffect(() => {
    const date = getDateByDay(activeDay);
    console.log("[useAttendanceTeacher] Fetching", activeDay, "=>", date);

    setLoading(true);
    setError(null);

    getAttendanceClassroom(date)
      .then((data) => {
        console.log("[useAttendanceTeacher] Received:", data);

        if (!data || (Array.isArray(data) && data.length === 0)) {
          setError("Tidak ada kelas mengajar");
          setClassrooms([]);
          return;
        }

        setClassrooms(data);
      })
      .catch((err) => {
        console.error("Error fetching classroom:", err?.response?.data || err);
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
