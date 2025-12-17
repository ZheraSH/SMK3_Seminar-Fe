import { useState, useEffect, useCallback, useMemo } from "react";
import { notify } from "../../notification/notify";
import { getCrossCheckData, postCrossCheck } from "../../../api/role-teacher/attendance/AttendanceClassroom";

export function useClassAttendance(
  selectedClass,
  date,
  globalChanges,
  setGlobalChanges,
  submittedClasses,
  setSubmittedClasses
) {

  // --- State Initialization ---
  const [attendance, setAttendance] = useState([]);
  const [classroom, setClassroom] = useState({});
  const [lessonSchedule, setLessonSchedule] = useState(null);
  const [lessonOrder, setLessonOrder] = useState(null);

  const [summary, setSummary] = useState({
    total: 0,
    present: 0,
    alpha: 0,
    leave: 0,
    late: 0,
    sick: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [canResubmit, setCanResubmit] = useState(true);

  const [isPastDate, setIsPastDate] = useState(false);
  const [isFutureDate, setIsFutureDate] = useState(false);

  const status = useMemo(
    () => [
      { id: 1, value: "hadir", label: "Hadir" },
      { id: 2, value: "alpha", label: "Alpha" },
      { id: 3, value: "izin", label: "Izin" },
      { id: 4, value: "terlambat", label: "Terlambat" },
      { id: 5, value: "sakit", label: "Sakit" },
    ],
    []
  );
  // --- End State Initialization ---


  const fetchAttendance = useCallback(async () => {
    if (!selectedClass || !date) return;

    if (selectedClass.lesson_order === 1) {
      setError("Cross-check hanya untuk jam pelajaran ke-2 dan seterusnya");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const classKey = selectedClass.id;

    try {
      const res = await getCrossCheckData(
        classKey,
        date,
        selectedClass.lesson_order,
        page
      );

      const data = res.data || res;

      setCanResubmit(data.submission_status?.can_resubmit ?? true);
      setIsSubmitted(data.submission_status?.has_submitted ?? false);

      const students = data.students || data.data || [];
      setAttendance(students);

      setClassroom(data.classroom || {});
      setPagination(data.pagination || null);
      setLessonSchedule(data.lesson_schedule || null);
      setLessonOrder(data.lesson_order || selectedClass.lesson_order);

      setGlobalChanges((prev) => {
        const classChanges = prev[classKey] || {};
        const pageChanges = classChanges[page] || {};

        students.forEach((s) => {
          const studentIdKey = s.student_id || s.id;

          if (!pageChanges[studentIdKey] && s.existing_attendance?.status) {
            // Inisialisasi status dari data existing jika belum ada perubahan di globalChanges
            pageChanges[studentIdKey] = s.existing_attendance.status;
          } else if (!pageChanges[studentIdKey]) {
            // Inisialisasi dengan string kosong jika belum ada
            pageChanges[studentIdKey] = "";
          }
        });

        return {
          ...prev,
          [classKey]: {
            ...classChanges,
            [page]: pageChanges,
          },
        };
      });

      if (data.summary) {
        setSummary({
          total: data.summary.total_students || data.summary.total || 0,
          present: data.summary.present || 0,
          alpha: data.summary.alpha || 0,
          leave: data.summary.leave || 0,
          late: data.summary.late || 0,
          sick: data.summary.sick || 0,
        });
      }
    } catch (err) {
      console.error("Fetch attendance error:", err);
      setError(err.response?.data?.message || "Gagal memuat data absensi");
    } finally {
      setLoading(false);
    }
  }, [selectedClass, date, page, setGlobalChanges]);


  // --- Date Logic ---
  useEffect(() => {
    if (!date) {
      setIsPastDate(false);
      setIsFutureDate(false);
      return;
    }

    const localToday = new Date();
    const year = localToday.getFullYear();
    const month = String(localToday.getMonth() + 1).padStart(2, "0");
    const day = String(localToday.getDate()).padStart(2, "0");

    const todayString = `${year}-${month}-${day}`;
    const dateString = date;

    setIsPastDate(dateString < todayString);
    setIsFutureDate(dateString > todayString);
  }, [date]);


  useEffect(() => {
    if (selectedClass && date) {
      setPage(1);
    }
  }, [selectedClass?.id, date]);


  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);


  // --- canSubmit Logic ---
  const canSubmit = useMemo(() => {
    if (!selectedClass || !pagination) return false;

    const classKey = selectedClass.id;
    const classChanges = globalChanges[classKey];
    if (!classChanges) return false;

    const totalStudents = pagination?.total || 0;
    if (totalStudents === 0) return false;

    let filledCount = 0;

    Object.values(classChanges).forEach((pageChanges) => {
      Object.values(pageChanges).forEach((status) => {
        if (status && status.trim() !== "") {
          filledCount++;
        }
      });
    });

    return filledCount === totalStudents;
  }, [globalChanges, selectedClass, pagination]);


  // --- Summary Logic ---
  useEffect(() => {
    if (!selectedClass) return;

    const classKey = selectedClass.id;
    const classChanges = globalChanges[classKey];
    if (!classChanges) return;

    const newSummary = {
      total: 0,
      present: 0,
      alpha: 0,
      leave: 0,
      late: 0,
      sick: 0,
    };

    Object.values(classChanges).forEach((pageChanges) => {
      Object.values(pageChanges).forEach((status) => {
        if (status && status.trim() !== "") {
          newSummary.total++;

          switch (status) {
            case "hadir": newSummary.present++; break;
            case "alpha": newSummary.alpha++; break;
            case "izin": newSummary.leave++; break;
            case "terlambat": newSummary.late++; break;
            case "sakit": newSummary.sick++; break;
          }
        }
      });
    });

    if (pagination?.total && newSummary.total < pagination.total) {
      newSummary.total = pagination.total;
    }

    setSummary(newSummary);
  }, [globalChanges, selectedClass, pagination]);


  const handleSubmit = async () => {
    if (!canSubmit && !isSubmitted) {
      notify("error", "Anda harus mengisi semua status absensi sebelum submit!", "top-right");
      return;
    }

    if (!lessonSchedule || !lessonSchedule.subject || !lessonSchedule.id) {
      notify("error", "Data jadwal pelajaran tidak lengkap. Gagal submit.", "top-right");
      return;
    }

    setSubmitting(true);

    try {
      const classKey = selectedClass.id;
      const classChanges = globalChanges[classKey] || {};
      const attendances = [];

      Object.values(classChanges).forEach((pageChanges) => {
        Object.entries(pageChanges).forEach(([studentId, status]) => {
          
          if (status && status.trim() !== "") {
            attendances.push({
              
              student_id: studentId,
              status,
            });
          }
        });
      });

      const body = {
        classroom_id: classKey,
        subject_id: lessonSchedule.subject.id,
        lesson_schedule_id: lessonSchedule.id,
        date,
        lesson_order: lessonOrder || selectedClass.lesson_order,
        attendances,
      };

      await postCrossCheck(body);

      setSubmittedClasses((prev) => ({
        ...prev,
        [classKey]: true,
      }));

      await fetchAttendance();

      notify("success", "Absensi cross-check berhasil disimpan", "top-right");
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);

      const errorMessage =
        err.response?.data?.message ||
        "Gagal submit absensi. Silakan cek console untuk detail response API.";

      notify("waktu tidak sesuai", "error", errorMessage, "top-right");
    } finally {
      setSubmitting(false);
    }
  };


  const isTimeValid = useMemo(() => {
    if (isFutureDate) return false;
    return canResubmit;
  }, [isFutureDate, canResubmit]);


  return {
    attendance,
    classroom,
    summary,
    loading,
    error,
    page,
    setPage,
    pagination,
    isSubmitted,
    canSubmit,
    submitting,
    canResubmit,
    isPastDate,
    isFutureDate,
    status,
    handleSubmit,
    isTimeValid, 
  };
}