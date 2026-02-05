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
  const [isFutureDate, setIsFutureDate] = useState(false);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const statusOptions = useMemo(() => [
    { id: 1, value: "hadir", label: "Hadir" },
    { id: 2, value: "alpha", label: "Alpha" },
    { id: 3, value: "izin", label: "Izin" },
    { id: 4, value: "terlambat", label: "Terlambat" },
    { id: 5, value: "sakit", label: "Sakit" },
  ], []);

  const checkTimeValidity = useCallback(() => {
  const now = new Date();
  const selectedDate = new Date(date);
  
  const endOfToday = new Date(selectedDate);
  endOfToday.setHours(23, 59, 59, 999);

  const startTime = lessonSchedule?.lesson_hour?.start_time;
  if (startTime) {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const startDateTime = new Date(selectedDate);
    startDateTime.setHours(startHour, startMinute, 0, 0);
    
    setIsFutureDate(now < startDateTime); 
  }

  setIsPastDate(now > endOfToday);
}, [date, lessonSchedule]);

  useEffect(() => {
    checkTimeValidity();
  }, [checkTimeValidity]);

  useEffect(() => {
    if (!lessonSchedule?.lesson_hour) return;

    const interval = setInterval(() => {
      checkTimeValidity();
    }, 30000);

    return () => clearInterval(interval);
  }, [checkTimeValidity, lessonSchedule]);

  const fetchInitialSummary = useCallback(async () => {
    if (!selectedClass?.id || !date) return;
    
    try {
      const currentOrder = selectedClass.lesson?.order || selectedClass.lesson_order;
      const firstRes = await getCrossCheckData(selectedClass.id, date, currentOrder, 1);

      if (firstRes.status && firstRes.data) {
        const lastPage = firstRes.data.pagination.last_page;
        const allPagesData = [];

        allPagesData.push({ page: 1, students: firstRes.data.students });

        if (lastPage > 1) {
          const promises = [];
          for (let i = 2; i <= lastPage; i++) {
            promises.push(
              getCrossCheckData(selectedClass.id, date, currentOrder, i)
                .then(res => ({ page: i, students: res.data.students }))
            );
          }
          const remainingResults = await Promise.all(promises);
          allPagesData.push(...remainingResults);
        }

        setGlobalChanges((prev) => {
          const classKey = selectedClass.id;
          const dateKey = date;
          const updated = { ...prev };
          if (!updated[classKey]) updated[classKey] = {};
          if (!updated[classKey][dateKey]) updated[classKey][dateKey] = {};

          allPagesData.forEach(({ page: pNum, students }) => {
            if (!updated[classKey][dateKey][pNum]) updated[classKey][dateKey][pNum] = {};
            students.forEach(s => {
              if (!updated[classKey][dateKey][pNum][s.id]) {
                updated[classKey][dateKey][pNum][s.id] = s.attendance_status?.code || "";
              }
            });
          });
          return updated;
        });
        
        setIsInitialLoaded(true);
      }
    } catch (err) {
      console.error("Gagal sinkronisasi summary seluruh halaman:", err);
    }
  }, [selectedClass?.id, date, setGlobalChanges]);

  useEffect(() => {
    fetchInitialSummary();
  }, [fetchInitialSummary]);


  useEffect(() => {
    if (Object.keys(globalChanges).length > 0) {
    }
  }, [globalChanges]);

  useEffect(() => {
    if (!selectedClass?.id || !date) return;

    const classKey = selectedClass.id;
    const dateKey = date;
    const classDateChanges = globalChanges[classKey]?.[dateKey];

    const newSummary = { total: 0, present: 0, alpha: 0, leave: 0, late: 0, sick: 0 };

    if (classDateChanges) {
      Object.values(classDateChanges).forEach((pageData) => {
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
  }, [globalChanges, selectedClass?.id, date]);

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

        setIsSubmitted(apiData.submission_status?.has_submitted || false);
        setCanResubmit(apiData.submission_status?.can_resubmit !== false);

        setGlobalChanges((prev) => {
          const classKey = selectedClass.id;
          const dateKey = date;

          const classChanges = prev[classKey] || {};
          const dateChanges = classChanges[dateKey] || {};
          const updatedDateChanges = { ...dateChanges };

          students.forEach((student) => {
            const sId = String(student.id);
            if (!updatedDateChanges[page]) updatedDateChanges[page] = {};

            if (!updatedDateChanges[page][sId]) {
              updatedDateChanges[page][sId] = student.attendance_status?.code || "";
            }
          });

          return {
            ...prev,
            [classKey]: { ...classChanges, [dateKey]: updatedDateChanges },
          };
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  }, [selectedClass?.id, date, page, setGlobalChanges]);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const canSubmit = useMemo(() => {
    if (isSubmitted) return true;
    if (isFutureDate) return false;

    if (!attendance || attendance.length === 0 || isFutureDate) return false;

    const classKey = selectedClass?.id;
    const currentPageChanges = globalChanges[classKey]?.[date]?.[page] || {};

    return attendance.every((student) => {
      const status = currentPageChanges[student.id] || student.attendance_status?.code;
      return status && status !== "";
    });
  }, [globalChanges, selectedClass, page, attendance, date, isFutureDate]);

  const handleSubmit = async () => {
    if (isPastDate || isFutureDate || !canResubmit || !canSubmit) return;
    setSubmitting(true);

    try {
      const classKey = selectedClass.id;
      const classDateChanges = globalChanges[classKey]?.[date] || {};

      const attendanceMap = new Map();

      Object.keys(classDateChanges).forEach((pageKey) => {
        const pageData = classDateChanges[pageKey];
        Object.entries(pageData).forEach(([studentId, statusValue]) => {
          const isValidId = studentId && studentId !== "null" && studentId !== "NaN";

          if (isValidId && statusValue) {
            attendanceMap.set(studentId, statusValue);
          }
        });
      });

      const attendances = Array.from(attendanceMap, ([id, status]) => ({
        student_id: id,
        status: status
      }));

      const body = {
        classroom_id: classKey,
        lesson_schedule_id: lessonSchedule?.id,
        subject_id: lessonSchedule?.subject?.id,
        date: date,
        lesson_order: selectedClass.lesson?.order || selectedClass.lesson_order,
        attendances: attendances
      };

      await postCrossCheck(body);

      setIsSubmitted(true);
      setJustSubmitted(true);
      notify("success", "Absensi berhasil disimpan");
      fetchAttendance();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Gagal menyimpan absensi";
      notify("error", errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

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
    lessonSchedule,
    status: statusOptions,
    handleSubmit,
    isTimeValid: canResubmit && !isPastDate && !isFutureDate
  };
}