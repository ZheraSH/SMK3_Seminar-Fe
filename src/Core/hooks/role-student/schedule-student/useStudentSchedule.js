import { useState, useEffect,useRef } from "react";
import { fetchStudentSchedule } from "../../../api/role-student/schedule/schedule";

export function useStudentSchedule(activeDay) {
  const [schedule, setSchedule] = useState([]);
  const [classroomId, setClassroomId] = useState("-");
  const [semesterType, setSemesterType] = useState("-");
  const [academicYear, setAcademicYear] = useState("-");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (!activeDay) return;

    const loadSchedule = async () => {
      if (isFirstLoad.current) {
      setLoading(true);
    }
      setError(null);

      try {
        await new Promise((r) => setTimeout(r, 500));
        const data = await fetchStudentSchedule(activeDay);
        if (!data?.data) {
          setError("Data jadwal tidak ditemukan.");
          setSchedule([]);
          return;
        }

        setSchedule(data.data.jadwal || []);
        setClassroomId(data.data.kelas || "-");
        setSemesterType(data.data.semester || "-");
        setAcademicYear(data.data.tahun_ajaran || "-");
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data jadwal.");
        setSchedule([]);
        setClassroomId("-");
      } finally {
        if (isFirstLoad.current) {
        setLoading(false);
        isFirstLoad.current = false;
      }}
    };
    loadSchedule();
  }, [activeDay]);

  return {
    schedule,
    classroomId,
    semesterType,
    academicYear,
    loading,
    error,
  };
}
