import { UserRoundCheck, Users, GraduationCap, Calendar } from "lucide-react";
import TotalClass from "./ClassTotal";
import TableClass from "./ClassTable";
import Pagination from "./Pagination";
import { useClassAttendance } from "../../../../../Core/hooks/role-teacher/attendance/useCrossCheck";
import { FirstLessonView } from "./RIFD";

export default function ClassAttendance({
  selectedClass,
  date,
  setIsOpenClass,
  globalChanges,
  setGlobalChanges,
  submittedClasses,
  setSubmittedClasses,
}) {
  // ===========================
  // 🚀 Pakai custom hook (harus dipanggil sebelum early return)
  // ===========================
  const {
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
    isTimeValid,
    status,
    handleSubmit,
    canResubmit,
    isPastDate,
  } = useClassAttendance(
    selectedClass,
    date,
    globalChanges,
    setGlobalChanges,
    submittedClasses,
    setSubmittedClasses
  );

  // ⛔ Prevent error saat selectedClass belum ada
  if (!selectedClass) {
    return (
      <p className="text-center py-10 text-gray-600">
        Memuat data kelas...
      </p>
    );
  }

  // 🚀 Jika jam pelajaran 1 → pakai halaman RFID
  if (selectedClass.lesson_order === 1) {
    return <FirstLessonView setIsOpenClass={setIsOpenClass} />;
  }

  return (
    <div className="mx-5 mb-10">

      {/* ========================= */}
      {/* HEADER KELAS */}
      {/* ========================= */}
      <div className="relative w-full h-[140px] bg-[url('/images/background/bg04.png')] rounded-[15px]">
        <div className="absolute inset-0 flex rounded-[6px]">
          <div className="px-4 mt-5">

            <h1 className="text-white flex text-[20px] lg:text-xl font-semibold">
              <GraduationCap className="w-6 h-6 mr-2" />
              {classroom?.name || "Nama Kelas"}
            </h1>

            <div className="flex flex-wrap gap-2 md:gap-x-8 gap-y-2 text-white text-xs md:text-base mt-[60px]">

              <div className="flex gap-2 items-center text-[12px] md:text-sm">
                <UserRoundCheck className="w-5 h-5" />
                <p>{classroom?.homeroom_teacher?.name || "Wali Kelas"}</p>
              </div>

              <div className="flex gap-2 items-center text-[12px] md:text-sm">
                <Users className="w-5 h-5" />
                <p>{pagination?.total || 0} Siswa</p>
              </div>

              <div className="flex gap-2 items-center text-[12px] md:text-sm">
                <Calendar className="w-5 h-5" />
                <p>{classroom?.school_year || "Tahun Ajaran"}</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* SUMMARY (TOTAL) */}
      {/* ========================= */}
      {summary && (
        <TotalClass
          summary={summary}
          setIsOpenClass={setIsOpenClass}
          handleSubmit={handleSubmit}
          isSubmitted={isSubmitted}
          canSubmit={canSubmit}       // ← ini SUDAH BOOLEAN
          submitting={submitting}
          isTimeValid={isTimeValid}   // ← sekarang pasti boolean, tidak undefined
        />

      )}

      {/* ======================== */}
      {/* INFORMASI */}
      {/* ========================= */}
      <div className="bg-[#FFF5E3] mx-2 p-3 md:p-4 rounded-md mb-4 mt-2">
        <p className="text-sm md:text-base font-semibold text-[#FFAA05] mb-2">Informasi</p>
        <ul className="list-disc text-xs md:text-sm space-y-1 ml-4">
          <li>Halaman ini digunakan untuk mencatat absensi guru saat mengajar di setiap kelas.</li>
          <li>Pilih status kehadiran sesuai kondisi sebelum melakukan cross check.</li>
          <li>Perbaiki status yang tidak sesuai lalu tekan Submit untuk menyimpan data.</li>
        </ul>
      </div>

      {/* ========================= */}
      {/* TABEL ABSENSI */}
      {/* ========================= */}
      <div className="mt-4 overflow-auto">
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
            canResubmit={canResubmit}
            classKey={selectedClass.id}
            isPastDate={isPastDate}
          />
        )}
      </div>

      {/* ========================= */}
      {/* PAGINATION */}
      {/* ========================= */}
      {pagination && pagination.last_page > 1 && !error && (
        <Pagination page={page} setPage={setPage} pagination={pagination} />
      )}
    </div>
  );
}
