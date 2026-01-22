import { useState, useEffect } from "react";
import { fetchStudentSchedule } from "../../../api/role-student/schedule/schedule";

export function useStudentSchedule(activeDay) {
  const [schedule, setSchedule] = useState([]);
  const [classroomId, setClassroomId] = useState("-");
  const [semesterType, setSemesterType] = useState("-");
  const [academicYear, setAcademicYear] = useState("-");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!activeDay) return;

    let ignore = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchStudentSchedule(activeDay);
        if (ignore) return;

        setSchedule(data?.schedules || []);
        setClassroomId(data?.classroom?.name || "-");

        // sementara hardcode (BE belum kirim)
        setSemesterType("Genap");
        setAcademicYear("2024/2025");
      } catch (e) {
        if (!ignore) {
          setError("Gagal memuat data jadwal.");
          setSchedule([]);
          setClassroomId("-");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
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
