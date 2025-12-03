import { useState, useEffect } from "react";
import {notify} from "../../hooks/notification/notify";
import { getCrossCheckData, postCrossCheck } from "../../api/role-teacher/attendance/AttendanceClassroom";

export function useClassAttendance(selectedClass, date, globalChanges, setGlobalChanges, submittedClasses, setSubmittedClasses) {

  const [attendance, setAttendance] = useState([]);
  const [classroom, setClassroom] = useState({});
  const [lessonSchedule, setLessonSchedule] = useState(null);
  const [lessonOrder, setLessonOrder] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [allStudents, setAllStudents] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  const [isTimeValid, setIsTimeValid] = useState(false);

  const status = [
    { id: 1, value: "hadir", label: "Hadir" },
    { id: 2, value: "alpha", label: "Alpha" },
    { id: 3, value: "izin", label: "Izin" },
    { id: 4, value: "terlambat", label: "Terlambat" },
    { id: 5, value: "sakit", label: "Sakit" },
  ];

  
  const checkSubmissionTime = (schedule, lessonDate, isSubmitted) => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    if (lessonDate !== today) {
      return { isTimeValid: false, reason: "NOT_TODAY" };
    }

    const cutoff = new Date(`${today}T16:00:00`);
    if (now > cutoff) {
      return { isTimeValid: false, reason: "CUTOFF_PASSED" };
    }

    if (!schedule?.lesson_hour) {
      return { isTimeValid: true, reason: "NO_SCHEDULE_DATA" };
    }

    const endStr = schedule.lesson_hour.end_time;
    const lessonEnd = new Date(`${today}T${endStr}`);

    const tolerance = new Date(lessonEnd.getTime() + 30 * 60000);
    const isTimePassed = now > tolerance;

    if (isSubmitted && isTimePassed) {
      return { isTimeValid: false, reason: "ALREADY_SUBMITTED_AND_TIME_PASSED" };
    }

    return { isTimeValid: true, reason: "OK" };
  };

  const convertChangesToAttendances = (changes, studentsMap) => {
    const result = [];

    Object.keys(studentsMap).forEach((p) => {
      studentsMap[p].forEach((s) => {
        const finalStatus = changes?.[p]?.[s.id] ?? s.existing_attendance?.status;

        if (finalStatus) {
          result.push({
            student_id: s.id,
            status: finalStatus,
          });
        }
      });
    });

    return result;
  };

  const fetchAttendance = async () => {
    if (!selectedClass || selectedClass.lesson_order === 1) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await getCrossCheckData(
        selectedClass.id,
        date,
        selectedClass.lesson_order,
        page
      );

      if (res.status) {
        const submitted = res.data.is_submitted || submittedClasses[selectedClass.id] || false;
        setIsSubmitted(submitted);

        setAllStudents((prev) => ({
          ...prev,
          [page]: res.data.students || [],
        }));

        setAttendance(res.data.students || []);
        setClassroom(res.data.classroom || {});
        setPagination(res.data.pagination || null);

        const schedule = res.data.lesson_schedule || null;
        setLessonSchedule(schedule);
        setLessonOrder(res.data.lesson_order || null);

        const { isTimeValid, reason } = checkSubmissionTime(
          schedule,
          res.data.date,
          submitted
        );

        setIsTimeValid(isTimeValid);
      } else {
        setError("Data absensi tidak tersedia");
      }
    } catch (err) {
      console.error("Gagal fetch:", err);
      setError("Gagal memuat data absensi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [selectedClass, date, page]);
  //update summary
  useEffect(() => {
    const s = { present: 0, alpha: 0, leave: 0, late: 0, sick: 0 };

    Object.keys(allStudents).forEach((p) => {
      allStudents[p].forEach((st) => {
        const finalStatus = globalChanges[p]?.[st.id] ?? st.existing_attendance?.status;

        switch (finalStatus) {
          case "hadir": s.present++; break;
          case "alpha": s.alpha++; break;
          case "izin": s.leave++; break;
          case "terlambat": s.late++; break;
          case "sakit": s.sick++; break;
        }
      });
    });

    setSummary(s);

    const total = pagination?.total || 0;
    const counted = s.present + s.alpha + s.leave + s.late + s.sick;

    setCanSubmit(counted === total && isTimeValid);
  }, [globalChanges, allStudents, pagination, isTimeValid]);

 //submit
  const handleSubmit = async () => {
    const { isTimeValid: validSubmit, reason } = checkSubmissionTime(
      lessonSchedule,
      date,
      isSubmitted
    );

    if (!validSubmit) {
      let msg = "Gagal submit.";
      if (reason === "CUTOFF_PASSED") msg = "Batas submit (16:00) telah lewat.";
      if (reason === "NOT_TODAY") msg = "Absensi hanya bisa untuk hari ini.";
      if (reason === "ALREADY_SUBMITTED_AND_TIME_PASSED")
        msg = "Absensi sudah dikirim dan waktu pelajaran telah lewat.";

      alert(msg);
      return;
    }

    if (submitting || !canSubmit) {
      alert("Semua siswa harus diberi status sebelum submit.");
      return;
    }

    setSubmitting(true);

    try {
      const attendances = convertChangesToAttendances(globalChanges, allStudents);

      const body = {
        classroom_id: selectedClass.id,
        subject_id: lessonSchedule?.subject?.id,
        lesson_schedule_id: lessonSchedule?.id,
        date,
        lesson_order: lessonOrder,
        attendances,
      };

      await postCrossCheck(body);

      setSubmittedClasses((prev) => ({
        ...prev,
        [selectedClass.id]: true,
      }));

      setIsSubmitted(true);
      notify("Data Berhasil Dikirim");
    } catch (err) {
      console.error(err);
      alert("Gagal submit absensi.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    attendance,
    classroom,
    lessonSchedule,
    lessonOrder,
    summary,
    loading,
    error,
    page,
    setPage,
    pagination,
    isSubmitted,
    canSubmit,
    submitting,
    isTimeValid,
    status,
    handleSubmit,
    fetchAttendance,
  };
}
