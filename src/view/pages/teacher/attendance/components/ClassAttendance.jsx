import { useState, useEffect } from "react";
import { getCrossCheckData, postCrossCheck } from "../../../../../Core/api/role-teacher/attendance/AttendanceClassroom";
import { UserRoundCheck, Users, GraduationCap, Calendar } from "lucide-react";
import TotalClass from "./ClassTotal";
import TableClass from "./ClassTable";
import Pagination from "./Pagination";

export default function ClassAttendance({
  selectedClass,
  date,
  setIsOpenClass,
  globalChanges,
  setGlobalChanges,
  submittedClasses,
  setSubmittedClasses
}) {
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
    const todayDateStr = now.toISOString().split('T')[0];

    if (lessonDate !== todayDateStr) {
      return { isTimeValid: false, reason: 'NOT_TODAY' };
    }

    const cutoffTime = new Date(`${todayDateStr}T16:00:00`); // ini batas waktu nya sudah 4 sore
    const isBeforeCutoff = now.getTime() < cutoffTime.getTime();

    if (!isBeforeCutoff) {
      return { isTimeValid: false, reason: 'CUTOFF_PASSED' };
    }

    if (!schedule || !schedule.lesson_hour || !lessonDate) {
      return { isTimeValid: isBeforeCutoff, reason: 'NO_SCHEDULE_DATA' };
    }

    const endStr = schedule.lesson_hour.end_time;
    const lessonEnd = new Date(`${lessonDate}T${endStr}`);

    const toleranceInMinutes = 30;
    const toleranceEnd = new Date(lessonEnd.getTime() + toleranceInMinutes * 60000);
    const isLessonTimePassed = now.getTime() > toleranceEnd.getTime();

    if (isSubmitted && isLessonTimePassed) {
      return { isTimeValid: false, reason: 'ALREADY_SUBMITTED_AND_TIME_PASSED' };
    }

    return { isTimeValid: true, reason: 'OK' };
  };

  const convertChangesToAttendances = (changes, studentsMap) => {
    const result = [];
    Object.keys(studentsMap).forEach((pageKey) => {
      studentsMap[pageKey].forEach((s) => {
        const finalStatus = changes?.[pageKey]?.[s.id] ?? s.existing_attendance?.status;
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

        setAllStudents(prev => ({ ...prev, [page]: res.data.students || [] }));
        setAttendance(res.data.students || []);
        setClassroom(res.data.classroom || {});
        setPagination(res.data.pagination || null);

        const lessonScheduleData = res.data.lesson_schedule || null;
        setLessonSchedule(lessonScheduleData);
        setLessonOrder(res.data.lesson_order || null);

        const { isTimeValid: isValidTime, reason } = checkSubmissionTime(
          lessonScheduleData,
          res.data.date,
          submitted
        );
        setIsTimeValid(isValidTime);
        console.log("Validasi Waktu:", isValidTime, "Sebab:", reason);
      } else {
        setError("Data absensi tidak tersedia");
      }
    } catch (err) {
      console.error("Gagal memuat cross check data:", err.response?.data || err.message);
      setError("Gagal memuat data absensi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
    if (allStudents?.[page]?.length === 0 && page > 1) setPage(1);
  }, [selectedClass, date, page]);

  useEffect(() => {
    const summaryUpdate = { present: 0, alpha: 0, leave: 0, late: 0, sick: 0 };

    Object.keys(allStudents).forEach(p => {
      allStudents[p].forEach(s => {
        const finalStatus = globalChanges[p]?.[s.id] ?? s.existing_attendance?.status ?? "";
        switch (finalStatus) {
          case "hadir": summaryUpdate.present++; break;
          case "alpha": summaryUpdate.alpha++; break;
          case "izin": summaryUpdate.leave++; break;
          case "terlambat": summaryUpdate.late++; break;
          case "sakit": summaryUpdate.sick++; break;
          default: break;
        }
      });
    });

    setSummary(summaryUpdate);

    const totalStudents = pagination?.total || 0;
    const countedStudents = summaryUpdate.present + summaryUpdate.alpha + summaryUpdate.leave + summaryUpdate.late + summaryUpdate.sick;

    setCanSubmit(countedStudents === totalStudents && isTimeValid);
  }, [globalChanges, allStudents, isSubmitted, pagination, isTimeValid]);

  const handleSubmit = async () => {

    const lessonScheduleData = lessonSchedule;
    const { isTimeValid: isValidTime, reason } = checkSubmissionTime(
      lessonScheduleData,
      date, 
      isSubmitted
    );

    if (!isValidTime) {
      let alertMessage = "Gagal submit: Absensi tidak dapat diproses pada saat ini.";

      if (reason === 'CUTOFF_PASSED') {
        alertMessage = "Gagal submit: Waktu submit sudah melewati batas harian (Pukul 16:00 sore).";
      } else if (reason === 'ALREADY_SUBMITTED_AND_TIME_PASSED') {
        alertMessage = "Gagal submit: Absensi sudah pernah disubmit dan waktu pelajaran telah berakhir. Submit ulang tidak diizinkan.";
      } else if (reason === 'NOT_TODAY') {
        alertMessage = "Gagal submit: Absensi hanya dapat di-submit pada tanggal hari ini.";
      }

      alert(alertMessage);
      setSubmitting(false);
      return;
    }

    if (submitting || !canSubmit) {
      if (!canSubmit) {
        alert("Gagal submit: Pastikan semua siswa sudah diberi status absensi.");
      }
      return;
    }
    setSubmitting(true);

    try {
      const attendances = convertChangesToAttendances(globalChanges, allStudents);

      const body = {
        classroom_id: selectedClass?.id,
        subject_id: lessonSchedule?.subject?.id,
        lesson_schedule_id: lessonSchedule?.id,
        date,
        lesson_order: lessonOrder,
        attendances,
      };
      console.log("Payload Absensi yang dikirim:", body);

      await postCrossCheck(body);

      setSubmittedClasses(prev => ({ ...prev, [selectedClass.id]: true }));
      setIsSubmitted(true);
      alert("Absensi berhasil disubmit!");
    } catch (error) {
      console.error("Error submit absensi:", error.response?.data || error);
      const errorMessage = error.response?.data?.message || "Gagal submit absensi. Silakan cek konsol.";
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
  if (selectedClass?.lesson_order === 1) {
    return (
      <div className="mx-5 mb-10 mt-5">
        <div className="p-8 bg-white shadow-xl rounded-xl border-t-4 border-blue-600 text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Absensi Jam Pelajaran ke-1 (RFID)</h2>
          <p className="text-gray-700 text-lg font-medium">
            Absensi untuk kelas ini pelajaran ke-1 dilakukan secara otomatis menggunakan Kartu RFID.
            Guru tidak perlu melakukan cross-check atau submit manual di sini.
          </p>
          <div className="mt-8">
            <button
              onClick={() => setIsOpenClass(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition"
            >
              ← Kembali ke Daftar Kelas
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-5 mb-10">
      <div className="relative w-full lg:w-[1129px] h-[140px] bg-[url('/images/background/bg04.png')] rounded-[15px] ">
        <div className="absolute inset-0 flex items-center rounded-[6px] ">
          <div className="ml-5 mt-2 p-4">
            <h1 className="text-white flex text-2xl font-bold">
              <GraduationCap className="w-7 h-7 mr-2" />
              {classroom.name || "Nama Kelas"}
            </h1>
            <div className="flex flex-wrap mt-8 gap-x-8 gap-y-2 text-white text-sm md:text-base">
              <div className="flex gap-2 items-center">
                <UserRoundCheck className="w-5 h-5" />
                <p>{classroom.homeroom_teacher?.name || "Wali Kelas"}</p>
              </div>
              <div className="flex gap-2 items-center">
                <Users className="w-5 h-5" />
                <p>{pagination?.total || 0} Siswa</p>
              </div>
              <div className="flex gap-2 items-center">
                <Calendar className="w-5 h-5" />
                <p>{classroom.school_year || "Tahun Ajaran"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {summary && (
        <TotalClass
          summary={summary}
          setIsOpenClass={setIsOpenClass}
          handleSubmit={handleSubmit}
          isSubmitted={isSubmitted}
          canSubmit={canSubmit}
          submitting={submitting}
          isTimeValid={isTimeValid}
        />
      )}

      <div className="mt-4">
        {loading ? (
          <p className="text-center py-10 text-gray-600">Memuat data absensi...</p>
        ) : error ? (
          <p className="text-center py-10 text-red-500">{error}</p>
        ) : (
          <TableClass
            attendance={attendance}
            pagination={pagination}
            status={status}
            page={page}
            changes={globalChanges}
            setChanges={setGlobalChanges}
            isSubmitted={isSubmitted}
          />
        )}
      </div>

      {pagination && !loading && !error && (
        <Pagination page={page} setPage={setPage} pagination={pagination} />
      )}
    </div>
  );
}
