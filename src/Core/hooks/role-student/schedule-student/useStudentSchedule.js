import { useState, useEffect, } from "react";
import { fetchStudentSchedule } from "../../../api/role-student/schedule/schedule";

export function useStudentSchedule(activeDay) {
  const [schedule, setSchedule] = useState([]);
  const [classroomId, setClassroomId] = useState("-");
  const [semesterType, setSemesterType] = useState("-");
  const [academicYear, setAcademicYear] = useState("-");
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState ();

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchStudentSchedule(activeDay)
      .then((data) => {
        if (!data?.data) { 
          setError("Data jadwal tidak ditemukan.");
          return; }

        setSchedule(data.data.jadwal || []);
        setClassroomId(data.data.kelas || "-");
        setSemesterType(data.data.semester || "-");
        setAcademicYear(data.data.tahun_ajaran || "-");
      })
      .catch(() => {
        setError("Gagal memuat data jadwal.");
        setSchedule([]);
        setClassroomId("-");
      })
      .finally(() => setLoading(false));
  }, [activeDay]);

  return {
    schedule,
    classroomId,
    semesterType,
    academicYear,
    loading,
    error
  };
}
