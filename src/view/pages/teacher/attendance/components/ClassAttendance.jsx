import { UserRoundCheck, Users, GraduationCap, Calendar } from "lucide-react";
import TotalClass from "./ClassTotal";
import TableClass from "./ClassTable";
import Pagination from "./Pagination";
import { useClassAttendance } from "../../../../../Core/hooks/role-teacher/useCrossCheck";

export default function ClassAttendance({
  selectedClass,
  date,
  setIsOpenClass,
  globalChanges,
  setGlobalChanges,
  submittedClasses,
  setSubmittedClasses
}) {
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
} = useClassAttendance(
  selectedClass,
  date,
  globalChanges,
  setGlobalChanges,
  submittedClasses,
  setSubmittedClasses
);

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
          <div className=" p-4">
            <h1 className="text-white flex text-[20px] lg:text-2xl font-semibold">
              <GraduationCap className="w-7 h-7 mr-2" />
              {classroom.name || "Nama Kelas"} 
            </h1>
            <div className="flex flex-wrap mt-15 gap-x-2 md:gap-x-8 gap-y-2 text-white text-xs md:text-base">
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

      <div className="bg-[#FFF5E3] mx-2 p-3 md:p-4 rounded-md mb-4 mt-2">
        <p className="text-sm md:text-base font-semibold text-[#FFAA05] mb-2">Informasi</p>
        <ul className="list-disc text-xs md:text-sm space-y-1 ml-4">
          <li>Halaman ini digunakan untuk mencatat absensi guru saat mengajar di setiap kelas.</li>
          <li>Pilih status kehadiran sesuai kondisi sebenarnya sebelum melakukan cross check.</li>
          <li>Perbaiki status yang tidak sesuai dan tekan Submit untuk menyimpan data dengan benar.</li>
        </ul>
      </div>

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
            isSubmitted={isSubmitted}
          />
        )}
      </div>

      {pagination && pagination.last_page > 1  && !error && (
          <Pagination page={page} setPage={setPage} pagination={pagination} />
      )}
    </div>
  );
}
