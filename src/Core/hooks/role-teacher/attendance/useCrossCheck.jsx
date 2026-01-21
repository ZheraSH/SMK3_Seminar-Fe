import { useState, useEffect, useCallback, useMemo } from "react";
import { notify } from "../../notification/notify";
import { getCrossCheckData, postCrossCheck } from "../../../api/role-teacher/attendance/AttendanceClassroom";

export function useClassAttendance(selectedClass, date, globalChanges, setGlobalChanges, submittedClasses, setSubmittedClasses) {
  const [attendance, setAttendance] = useState([]);
  const [classroom, setClassroom] = useState({});
  const [lessonSchedule, setLessonSchedule] = useState(null);
  const [summary, setSummary] = useState({ total: 0, present: 0, alpha: 0, leave: 0, late: 0, sick: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [canResubmit, setCanResubmit] = useState(false);
  const [isPastDate, setIsPastDate] = useState(false);

  const statusOptions = useMemo(() => [
    { id: 1, value: "hadir", label: "Hadir" },
    { id: 2, value: "alpha", label: "Alpha" },
    { id: 3, value: "izin", label: "Izin" },
    { id: 4, value: "terlambat", label: "Terlambat" },
    { id: 5, value: "sakit", label: "Sakit" },
  ], []);

  useEffect(() => {
    if (!selectedClass?.id) return;
    const classKey = selectedClass.id;
    const classChanges = globalChanges[classKey];
    const newSummary = { total: 0, present: 0, alpha: 0, leave: 0, late: 0, sick: 0 };

    if (classChanges) {
      Object.values(classChanges).forEach((pageData) => {
        Object.values(pageData).forEach((statusValue) => {
          if (statusValue) {
            newSummary.total++;
            if (statusValue === "hadir") newSummary.present++;
            else if (statusValue === "alpha") newSummary.alpha++;
            else if (statusValue === "izin") newSummary.leave++;
            else if (statusValue === "terlambat") newSummary.late++;
            else if (statusValue === "sakit") newSummary.sick++;
          }
        });
      });
    }
    setSummary(newSummary);
  }, [globalChanges, selectedClass?.id]);

  const fetchAttendance = useCallback(async () => {
    if (!selectedClass?.id || !date) return;
    const currentOrder = selectedClass.lesson?.order || selectedClass.lesson_order;

    setLoading(true);
    try {
      const res = await getCrossCheckData(selectedClass.id, date, currentOrder, page);
      if (res.status && res.data) {
        const apiData = res.data;
        const students = apiData.students || [];
        
        setAttendance(students);
        setClassroom(apiData.classroom || {});
        setPagination(apiData.pagination || null);
        setLessonSchedule(apiData.lesson_schedule || null);
        setIsSubmitted(apiData.submission_status?.has_submitted || submittedClasses[selectedClass.id] || false);
        setCanResubmit(apiData.submission_status?.can_resubmit !== false);

        setGlobalChanges((prev) => {
          const classKey = selectedClass.id;
          const classChanges = prev[classKey] || {};
          const updatedClassChanges = { ...classChanges };

          students.forEach((student) => {
            const sId = String(student.id);
            if (!updatedClassChanges[page]?.[sId]) {
              if (!updatedClassChanges[page]) updatedClassChanges[page] = {};
              
              updatedClassChanges[page][sId] = student.existing_attendance?.status || "";
            }
          });

          return {
            ...prev,
            [classKey]: updatedClassChanges,
          };
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }, [selectedClass, date, page, setGlobalChanges, submittedClasses]);

  useEffect(() => { fetchAttendance(); }, [fetchAttendance]);


  const canSubmit = useMemo(() => {
    if (!attendance || attendance.length === 0) return false;
    const classKey = selectedClass?.id;
    const currentPageChanges = globalChanges[classKey]?.[page] || {};

    const allInCurrentPageFilled = attendance.every((student) => {
      const status = currentPageChanges[student.id] || student.existing_attendance?.status;
      return status && status !== "";
    });

    return allInCurrentPageFilled;
  }, [globalChanges, selectedClass, page, attendance]);

  const handleSubmit = async () => {
    if (isPastDate || !canResubmit || !canSubmit) return;
    setSubmitting(true);

    try {
      const classKey = selectedClass.id;
      const classChanges = globalChanges[classKey] || {};
      const attendances = [];

      Object.keys(classChanges).forEach((pageKey) => {
        const pageData = classChanges[pageKey];
        Object.entries(pageData).forEach(([studentId, statusValue]) => {
          if (statusValue) {
            attendances.push({
              student_id: studentId,
              status: statusValue
            });
          }
        });
      });

      const body = {
        classroom_id: classKey,
        lesson_schedule_id: lessonSchedule?.id,
        subject_id: lessonSchedule?.subject?.id,
        date: date,
        lesson_order: selectedClass.lesson?.order || selectedClass.lesson_order,
        attendances: attendances
      };

      console.log("Payload yang dikirim:", body); 
      await postCrossCheck(body);
      
      setSubmittedClasses(prev => ({ ...prev, [classKey]: true }));
      setIsSubmitted(true);
      notify("success", "Absensi berhasil disimpan");
      
      fetchAttendance();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Gagal menyimpan absensi";
      notify("error", errorMsg);
      console.error("Submit Error:", error.response?.data);
    } finally {
      setSubmitting(false);
    }
  };

  return { 
    attendance, classroom, summary, loading, error, page, setPage, 
    pagination, isSubmitted, canSubmit, submitting, canResubmit, 
    isPastDate, status: statusOptions, handleSubmit, 
    isTimeValid: canResubmit && !isPastDate 
  };
}