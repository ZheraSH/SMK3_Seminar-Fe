import { useState, useEffect, useCallback, useMemo } from "react";
import { notify } from "../../notification/notify";
import {
  getCrossCheckData,
  postCrossCheck,
} from "../../../api/role-teacher/attendance/AttendanceClassroom";

export function useClassAttendance(
  selectedClass,
  date,
  globalChanges,
  setGlobalChanges,
  submittedClasses,
  setSubmittedClasses
) {
  // ================================
  // STATE
  // ================================
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
    sick: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [canResubmit, setCanResubmit] = useState(false);

  // Status options
  const status = useMemo(() => ([
    { id: 1, value: "hadir", label: "Hadir" },
    { id: 2, value: "alpha", label: "Alpha" },
    { id: 3, value: "izin", label: "Izin" },
    { id: 4, value: "terlambat", label: "Terlambat" },
    { id: 5, value: "sakit", label: "Sakit" },
  ]), []);

  // ================================
  // FETCH ATTENDANCE DATA
  // ================================
  const fetchAttendance = useCallback(async () => {
    if (!selectedClass || !date) return;
    
    // Validasi: hanya lesson_order >= 2 yang bisa cross-check
    if (selectedClass.lesson_order === 1) {
      setError("Cross-check hanya untuk jam pelajaran ke-2 dan seterusnya");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    const classKey = selectedClass.id;

    try {
      const res = await getCrossCheckData(classKey, date, selectedClass.lesson_order, page);
      
      console.log("API Response for attendance:", res);
      
      if (res.status || res.data) {
        const data = res.data || res;
        
        // Set submission status from backend
        const submitted = data.has_submitted || submittedClasses[classKey] || false;
        setIsSubmitted(submitted);
        
        // Set canResubmit dari backend
        setCanResubmit(data.can_resubmit !== false);

        // Set attendance data
        const students = data.students || data.data || [];
        setAttendance(students);
        
        setClassroom(data.classroom || {});
        setPagination(data.pagination || null);
        setLessonSchedule(data.lesson_schedule || null);
        setLessonOrder(data.lesson_order || selectedClass.lesson_order);

        // Initialize globalChanges for this page
        setGlobalChanges((prev) => {
          const classChanges = prev[classKey] || {};
          const pageChanges = classChanges[page] || {};
          
          // Initialize with existing attendance or empty
          students.forEach((s) => {
            if (!pageChanges[s.id] && s.existing_attendance?.status) {
              pageChanges[s.id] = s.existing_attendance.status;
            } else if (!pageChanges[s.id]) {
              pageChanges[s.id] = "";
            }
          });
          
          return {
            ...prev,
            [classKey]: {
              ...classChanges,
              [page]: pageChanges
            }
          };
        });

        // Set summary from API or calculate
        if (data.summary) {
          setSummary({
            total: data.summary.total_students || data.summary.total || 0,
            present: data.summary.present || 0,
            alpha: data.summary.alpha || 0,
            leave: data.summary.leave || 0,
            late: data.summary.late || 0,
            sick: data.summary.sick || 0
          });
        } else if (data.total_students) {
          setSummary({
            total: data.total_students,
            present: data.present || 0,
            alpha: data.alpha || 0,
            leave: data.leave || 0,
            late: data.late || 0,
            sick: data.sick || 0
          });
        }

      } else {
        setError("Data absensi tidak tersedia");
      }
    } catch (err) {
      console.error("Fetch attendance error:", err);
      setError(err.response?.data?.message || "Gagal memuat data absensi");
    } finally {
      setLoading(false);
    }
  }, [selectedClass, date, page, setGlobalChanges, submittedClasses]);

  // ================================
  // EFFECTS
  // ================================
  // Reset page when selectedClass or date changes
  useEffect(() => {
    if (selectedClass && date) {
      setPage(1);
    }
  }, [selectedClass?.id, date]);

  // Fetch data when dependencies change
  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  // ================================
  // VALIDATION: CAN SUBMIT
  // ================================
  const canSubmit = useMemo(() => {
    if (!selectedClass || !pagination) return false;
    
    const classKey = selectedClass.id;
    const classChanges = globalChanges[classKey];
    
    if (!classChanges) return false;
    
    // Hitung total siswa di semua halaman
    const totalStudents = pagination?.total || 0;
    if (totalStudents === 0) return false;
    
    // Hitung berapa banyak status yang sudah diisi di semua halaman
    let filledCount = 0;
    Object.values(classChanges).forEach((pageChanges) => {
      Object.values(pageChanges).forEach((status) => {
        if (status && status.trim() !== "") {
          filledCount++;
        }
      });
    });
    
    console.log("CanSubmit check:", {
      totalStudents,
      filledCount,
      pages: Object.keys(classChanges).length,
      classChanges
    });
    
    // Validasi: semua siswa harus terisi
    return filledCount === totalStudents;
  }, [globalChanges, selectedClass, pagination]);

  // ================================
  // CALCULATE SUMMARY FROM CHANGES
  // ================================
  useEffect(() => {
    if (!selectedClass) return;
    
    const classKey = selectedClass.id;
    const classChanges = globalChanges[classKey];
    
    if (!classChanges) return;
    
    // Calculate summary from global changes
    const newSummary = {
      total: 0,
      present: 0,
      alpha: 0,
      leave: 0,
      late: 0,
      sick: 0
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
    
    // If we have pagination total, use it for total count
    if (pagination?.total && newSummary.total < pagination.total) {
      newSummary.total = pagination.total;
    }
    
    console.log("Calculated summary:", newSummary);
    setSummary(newSummary);
    
  }, [globalChanges, selectedClass, pagination]);

  // ================================
  // HANDLE SUBMIT
  // ================================
  const handleSubmit = async () => {
    // Validasi 1: Lesson order harus >= 2
    if (selectedClass.lesson_order === 1) {
      notify("error", "Cross-check hanya untuk jam pelajaran ke-2 dan seterusnya.", "top-right");
      return;
    }

    // Validasi 2: Waktu 24 jam
    if (!canResubmit) {
      notify("error", "Batas waktu 24 jam untuk submit telah berakhir.", "top-right");
      return;
    }

    // Validasi 3: Semua siswa harus diisi
    if (!canSubmit) {
      notify("error", "Semua siswa harus diberi status sebelum submit.", "top-right");
      return;
    }

    setSubmitting(true);
    try {
      const classKey = selectedClass.id;
      const classChanges = globalChanges[classKey] || {};
      
      // Collect all attendances from all pages
      const attendances = [];
      Object.values(classChanges).forEach((pageChanges) => {
        Object.entries(pageChanges).forEach(([studentId, status]) => {
          if (status && status.trim() !== "") {
            attendances.push({
              student_id: studentId,
              status
            });
          }
        });
      });

      const body = {
        classroom_id: classKey,
        subject_id: lessonSchedule?.subject?.id,
        lesson_schedule_id: lessonSchedule?.id,
        date,
        lesson_order: lessonOrder || selectedClass.lesson_order,
        attendances,
      };
      
      console.log("Submitting with body:", body);
      await postCrossCheck(body);
      
      setSubmittedClasses((prev) => ({ ...prev, [classKey]: true }));
      setIsSubmitted(true);
      notify("success", "Absensi cross-check berhasil disimpan", "top-right");
      
      // Refresh data
      await fetchAttendance();
    } catch (err) {
      console.error("Submit error:", err);
      const errorMessage = err.response?.data?.message || "Gagal submit absensi.";
      notify("error", errorMessage, "top-right");
    } finally {
      setSubmitting(false);
    }
  };

  // ================================
  // RETURN
  // ================================
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
    status,
    handleSubmit,
    isTimeValid: canResubmit,
  };
}