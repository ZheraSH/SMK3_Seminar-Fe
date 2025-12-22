import { useState, useEffect, useCallback, useMemo } from "react";
import { notify } from "../../notification/notify";
import { getCrossCheckData, postCrossCheck } from "../../../api/role-teacher/attendance/AttendanceClassroom";

export function useClassAttendance(
  selectedClass,
  date,
  globalChanges,
  setGlobalChanges,
  // submittedClasses,
  setSubmittedClasses
) {
  const [attendance, setAttendance] = useState([]);
  const [classroom, setClassroom] = useState({});
  const [lessonSchedule, setLessonSchedule] = useState(null);
  const [lessonOrder, setLessonOrder] = useState(null);
  const [pagination, setPagination] = useState(null);


  const summary = useMemo(() => {
  const classKey = selectedClass?.id;
  const currentClassChanges = globalChanges[classKey] || {};
  
  const totalStudents = pagination?.total || 0;

  const counts = {
    total: totalStudents,
    present: 0,
    alpha: 0,
    leave: 0,
    late: 0,
    sick: 0,
  };

  Object.values(currentClassChanges).forEach((pageData) => {
    Object.values(pageData).forEach((statusValue) => {
      if (statusValue === "hadir") counts.present++;
      else if (statusValue === "alpha") counts.alpha++;
      else if (statusValue === "izin") counts.leave++;
      else if (statusValue === "terlambat") counts.late++;
      else if (statusValue === "sakit") counts.sick++;
    });
  });

  return counts;
}, [globalChanges, selectedClass, pagination]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [canResubmit, setCanResubmit] = useState(true);
  const [isPastDate, setIsPastDate] = useState(false);
  const [isFutureDate, setIsFutureDate] = useState(false);

  const statusOptions = useMemo(() => [
    { id: 1, value: "hadir", label: "Hadir" },
    { id: 2, value: "alpha", label: "Alpha" },
    { id: 3, value: "izin", label: "Izin" },
    { id: 4, value: "terlambat", label: "Terlambat" },
    { id: 5, value: "sakit", label: "Sakit" },
  ], []);

  const fetchAttendance = useCallback(async () => {
    if (!selectedClass || !date) return;

    setLoading(true);
    setError(null);

    try {
      const res = await getCrossCheckData(selectedClass.id, date, selectedClass.lesson_order, page);
      const data = res.data || res;

      setCanResubmit(data.submission_status?.can_resubmit ?? true);
      setIsSubmitted(data.submission_status?.has_submitted ?? false);

      const studentData = data.students || [];
      setAttendance(studentData);

      setClassroom(data.classroom || {});
      setPagination(data.pagination || null);
      setLessonSchedule(data.lesson_schedule || null);
      setLessonOrder(data.lesson_order || selectedClass.lesson_order);

      setGlobalChanges((prev) => {
        const classKey = selectedClass.id;
        const currentClassChanges = prev[classKey] || {};
        const pageChanges = { ...(currentClassChanges[page] || {}) };

        studentData.forEach((s) => {
          if (pageChanges[s.id] === undefined) {
            pageChanges[s.id] = s.existing_attendance?.status || "";
          }
        });

        return { ...prev, [classKey]: { ...currentClassChanges, [page]: pageChanges } };
      });

      
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memuat data absensi");
    } finally {
      setLoading(false);
    }
  }, [selectedClass, date, page, setGlobalChanges]);

  useEffect(() => {
    if (!date) return;
    const today = new Date().toISOString().split('T')[0];
    setIsPastDate(date < today);
    setIsFutureDate(date > today);
  }, [date]);

  useEffect(() => { fetchAttendance(); }, [fetchAttendance]);

  const canSubmit = useMemo(() => {
    if (!selectedClass || !pagination) return false;
    const classChanges = globalChanges[selectedClass.id];
    if (!classChanges) return false;

    let filledCount = 0;
    Object.values(classChanges).forEach((pageData) => {
      Object.values(pageData).forEach((status) => {
        if (status && status.trim() !== "") filledCount++;
      });
    });

    return filledCount >= (pagination.total || 0);
  }, [globalChanges, selectedClass, pagination]);

  const handleSubmit = async () => {
    if (!canSubmit && !isSubmitted) {
      notify("error", "Harap isi semua absensi siswa!", "top-right");
      return;
    }

    setSubmitting(true);
    try {
      const classKey = selectedClass.id;
      const classChanges = globalChanges[classKey] || {};
      const attendances = [];

      Object.values(classChanges).forEach((pageData) => {
        Object.entries(pageData).forEach(([studentId, statusValue]) => {
          if (statusValue) {
            attendances.push({ student_id: studentId, status: statusValue });
          }
        });
      });

      const body = {
        classroom_id: classKey,
        subject_id: lessonSchedule.subject?.id,
        lesson_schedule_id: lessonSchedule.id,
        date: date,
        lesson_order: lessonOrder,
        attendances: attendances,
      };

      await postCrossCheck(body);
      
      setSubmittedClasses(prev => ({ ...prev, [classKey]: true }));
      notify("Data Berhasi Dikirim", "Absensi berhasil disimpan", "top-right");
      await fetchAttendance(); 
    } catch (err) {
      notify("error", err.response?.data?.message || "Gagal menyimpan absensi", "top-right");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    attendance, classroom, summary, loading, error,
    page, setPage, pagination, isSubmitted, canSubmit,
    submitting, canResubmit, isPastDate, isFutureDate,
    status: statusOptions,
    handleSubmit,
    isTimeValid: !isFutureDate && canResubmit
  };
}