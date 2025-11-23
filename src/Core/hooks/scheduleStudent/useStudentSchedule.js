import { useState, useEffect } from "react";
import { fetchStudentSchedule } from "../../api/RoleStudent/schedule/schedule";

export function useStudentSchedule(activeDay) {

  const [schedule, setSchedule] = useState([]);
  const [classroomId, setClassroomId] = useState("-");
  const [semesterType, setSemesterType] = useState("-");
  const [academicYear, setAcademicYear] = useState("-");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchStudentSchedule(activeDay)
      .then((data) => {
        if (!data || !data.data) return;

        setSchedule(data.data.jadwal);
        setClassroomId(data.data.kelas || "-");
        setSemesterType(data.data.semester || "-");
        setAcademicYear(data.data.tahun_ajaran || "-");
      })
      .catch(() => {
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
    loading
  };
}
