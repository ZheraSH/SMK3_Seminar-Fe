import { UserRoundCheck, Users, GraduationCap, Calendar } from "lucide-react";
import TotalClass from "./ClassTotal";
import TableClass from "./ClassTable";
import Pagination from "./Pagination";
import { useClassAttendance } from "../../../../../Core/hooks/role-teacher/attendance/useCrossCheck";
import Header from "../../../../components/elements/header/Header-new";
import { FirstLessonView } from "./RIFD";

export default function ClassAttendance({ selectedClass, date, setIsOpenClass, globalChanges, setGlobalChanges, submittedClasses, setSubmittedClasses,}) {

  const {
    attendance,
    // classroom,
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
  } = useClassAttendance( selectedClass, date, globalChanges, setGlobalChanges, submittedClasses, setSubmittedClasses);

  if (!selectedClass) {
    return (
      <p className="text-center py-10 text-gray-600">
        Memuat data kelas...
      </p>
    );
  }


  

  return (
    <div className="mx-5 mb-10">
      <Header span="Daftar Kehadiran Siswa" p="informasi kehadiran siswa sebagai bagian dari pemantauan aktivitas belajar"/>
      {summary && (
        <TotalClass summary={summary} setIsOpenClass={setIsOpenClass} handleSubmit={handleSubmit} isSubmitted={isSubmitted} canSubmit={canSubmit}   submitting={submitting} isTimeValid={isTimeValid}  />
      )}
      <div className="bg-[#FFF5E3] mx-2 p-3 md:p-4 rounded-md mb-4 mt-2">
        <p className="text-sm md:text-base font-semibold text-[#FFAA05] mb-2">Informasi</p>
        <ul className="list-disc text-xs md:text-sm space-y-1 ml-4">
          <li>Halaman ini digunakan untuk mencatat absensi guru saat mengajar di setiap kelas.</li>
          <li>Pilih status kehadiran sesuai kondisi sebelum melakukan cross check.</li>
          <li>Perbaiki status yang tidak sesuai lalu tekan Submit untuk menyimpan data.</li>
        </ul>
      </div>
      <div className="mt-4 overflow-auto">
        {loading ? (
          <p className="text-center py-10 text-gray-600">Memuat data absensi...</p>
        ) : error ? (
          <p className="text-center py-10 text-red-500">{error}</p>
        ) : (
          <TableClass attendance={attendance} pagination={pagination} status={status} page={page} changes={globalChanges} setChanges={setGlobalChanges} canResubmit={canResubmit} classKey={selectedClass.id} isPastDate={isPastDate}/>
        )}
      </div>
      {pagination && pagination.last_page > 1 && !error && (
        <Pagination page={page} setPage={setPage} pagination={pagination} />
      )}
    </div>
  );
}
