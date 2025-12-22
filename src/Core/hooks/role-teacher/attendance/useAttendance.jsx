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
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isTeacher = userData?.roles?.includes("teacher");

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

  useEffect(() => {
    if (selectedClass) {
      localStorage.setItem("selectedClass", JSON.stringify(selectedClass));
    } else {
      localStorage.removeItem("selectedClass");
      localStorage.removeItem("isOpenClass"); 
    }
  }, [selectedClass]);

  useEffect(() => {
    localStorage.setItem("isOpenClass", isOpenClass ? "true" : "false");
  }, [isOpenClass]);

  const [selectedDate, setSelectedDate] = useState(getTodayDateString);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [globalChanges, setGlobalChanges] = useState({});
  const [submittedClasses, setSubmittedClasses] = useState({});

  const clearAttendanceState = useCallback(() => {
    localStorage.removeItem("selectedClass");
    localStorage.removeItem("isOpenClass");
    setSelectedClass(null);
    setIsOpenClass(false);
    setGlobalChanges({});
  }, []);

  useEffect(() => {
    if (!isTeacher) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    getAttendanceClassroom(selectedDate)
      .then((data) => {
        if (!isMounted) return;

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
    classrooms,
    selectedDate,
    setSelectedDate,
  
    selectedClass,
    setSelectedClass,
    isOpenClass,
    setIsOpenClass,
    
    globalChanges,
    setGlobalChanges,
    submittedClasses,
    setSubmittedClasses,
    
    loading,
    error,
    clearAttendanceState,
  };
}