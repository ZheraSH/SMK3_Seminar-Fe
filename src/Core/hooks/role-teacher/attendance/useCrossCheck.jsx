import { useState, useEffect, useCallback, useMemo } from "react";
import { notify } from "../../notification/notify";
import {
  getCrossCheckData,
  postCrossCheck,
} from "../../../api/role-teacher/attendance/AttendanceClassroom";
import { Type } from "lucide-react";

export function useClassAttendance(
  selectedClass,
  date,
  lessonOrder,
  globalChanges,
  setGlobalChanges, 
  submittedClasses,
  setSubmittedClasses
) {
  const [attendance, setAttendance] = useState([]);
  const [classroom, setClassroom] = useState({});
  const [lessonSchedule, setLessonSchedule] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [canResubmit, setCanResubmit] = useState(true);
  const [isPastDate, setIsPastDate] = useState(false);
  const [isFutureDate, setIsFutureDate] = useState(false);

  const classKey = useMemo(() => {
    if (!selectedClass?.id || !lessonOrder) return null;
    return `${selectedClass.id}-${lessonOrder}`;
  }, [selectedClass?.id, lessonOrder]);

  const summary = useMemo(() => {
    const counts = { total: 0, present: 0, alpha: 0, leave: 0, late: 0, sick: 0 };
    if (!classKey) return counts;
    const classChanges = globalChanges?.[classKey] || {};
    Object.values(classChanges).forEach((pageData) => {
      Object.values(pageData || {}).forEach((status) => {
        if (!status) return;
        counts.total++;
        if (status === "hadir") counts.present++;
        else if (status === "alpha") counts.alpha++;
        else if (status === "izin") counts.leave++;
        else if (status === "terlambat") counts.late++;
        else if (status === "sakit") counts.sick++;
      });
    });
    return counts;
  }, [globalChanges, classKey]);

  const fetchAttendance = useCallback(
    async (targetPage = page, fetchAll = false) => {
      if (!selectedClass?.id || !date || !lessonOrder) return;

      if (!fetchAll) setLoading(true);
      setError(null);

      try {
        const res = await getCrossCheckData(selectedClass.id, date, lessonOrder, targetPage);
        if (!res) return;
        const data = res?.data || res;

        if (targetPage === page) {
          setAttendance(data.students || []);
          setClassroom(data.classroom || {});
          setPagination(data.pagination || null);
          setLessonSchedule(data.lesson_schedule || null);
          setIsSubmitted(data.submission_status?.has_submitted ?? false);
          setCanResubmit(data.submission_status?.can_resubmit ?? true);
        }

        if (typeof setGlobalChanges === "function") {
          setGlobalChanges((prev = {}) => {
            const classState = prev[classKey] || {};
            const pageState = { ...(classState[targetPage] || {}) };
            (data.students || []).forEach((s) => {
              if (pageState[s.id] === undefined) {
                pageState[s.id] = s.existing_attendance?.status || "";
              }
            });
            return { ...prev, [classKey]: { ...classState, [targetPage]: pageState } };
          });
        }

        if (fetchAll && data.pagination?.last_page > 1 && targetPage === 1) {
          for (let p = 2; p <= data.pagination.last_page; p++) {
            fetchAttendance(p, false);
          }
        }
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Terjadi kesalahan pada server";
        console.error("Error Detail:", err.response?.data || err.message);
        if (targetPage === page) setError(errorMsg);
      } finally {
        if (targetPage === page) setLoading(false);
      }
    },
    [selectedClass?.id, date, lessonOrder, page, classKey, setGlobalChanges]
  );

  useEffect(() => { setPage(1); }, [selectedClass?.id, date, lessonOrder]);

  useEffect(() => {
    if (!date) return;
    const today = new Date().toISOString().split("T")[0];
    setIsPastDate(date < today);
    setIsFutureDate(date > today);
  }, [date]);

  useEffect(() => {
    if (!classKey || !date) return;
    const hasData = globalChanges?.[classKey];
    fetchAttendance(page, !hasData);
  }, [classKey, date, page]);

  const canSubmit = useMemo(() => {
    if (!pagination) return false;
    return summary.total >= pagination.total;
  }, [summary.total, pagination]);

  const handleSubmit = async () => {
    if (!canSubmit && !isSubmitted) {
      notify("error", "Harap isi semua absensi siswa!", "top-right");
      return;
    }
    setSubmitting(true);
    try {
      const classChanges = globalChanges?.[classKey] || {};
      const attendances = [];
      Object.values(classChanges).forEach((pageData) => {
        Object.entries(pageData || {}).forEach(([id, status]) => {
          if (status) attendances.push({ student_id: id, status });
        });
      });

      await postCrossCheck({
        classroom_id: selectedClass.id,
        subject_id: lessonSchedule?.subject?.id,
        lesson_schedule_id: lessonSchedule?.id,
        lesson_order: lessonOrder,
        date,
        attendances,
      });

      notify("success", "Absensi berhasil disimpan", "top-right");
      if (typeof setSubmittedClasses === "function") {
        setSubmittedClasses((p = {}) => ({ ...p, [classKey]: true }));
      }
      fetchAttendance(page, true);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Gagal submit absensi";

      notify(errorMessage, "error");

    } finally {
          setSubmitting(false);
        }
      };

  return {
    attendance, classroom, summary, loading, error, page, setPage,
    pagination, isSubmitted, canSubmit, submitting, canResubmit,
    isPastDate, isFutureDate, handleSubmit,
    isTimeValid: !isFutureDate && canResubmit,
    status: [
      { id: 1, value: "hadir", label: "Hadir" },
      { id: 2, value: "alpha", label: "Alpha" },
      { id: 3, value: "izin", label: "Izin" },
      { id: 4, value: "terlambat", label: "Terlambat" },
      { id: 5, value: "sakit", label: "Sakit" },
    ],
  };
}