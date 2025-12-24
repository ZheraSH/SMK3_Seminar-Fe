import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useClassAttendance } from "../../../../../Core/hooks/role-teacher/attendance/useCrossCheck";
import TotalClass from "./ClassTotal";
import TableClass from "./ClassTable";
import Pagination from "./Pagination";
import { GraduationCap, UserRoundCheck, Users, Calendar } from "lucide-react";
import { FirstLessonView } from "./RIFD"; 
import { useMemo } from "react";

export default function ClassAttendance() {
  const { 
    globalChanges, 
    setGlobalChanges, 
    submittedClasses, 
    setSubmittedClasses 
  } = useOutletContext(); 

  const location = useLocation();
  const navigate = useNavigate();

  const { 
    classroomId, 
    date, 
    lesson_order: lessonOrder 
  } = location.state || {}; 

  const classKey = `${classroomId}-${lessonOrder}`;

  const handleBack = () => navigate(-1);

  if (!classroomId || !date) {
    return (
      <div className="py-20 text-center flex flex-col items-center">
        <p className="text-red-500 font-bold mb-4">Sesi berakhir atau halaman direfresh.</p>
        <button 
          onClick={() => navigate("/teacher-home/attendance-teacher")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Kembali ke Daftar Kelas
        </button>
      </div>
    );
  }

  if (lessonOrder === 1) {
    return <FirstLessonView onBack={handleBack} setIsOpenClass={handleBack} />;
  }

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
    isPastDate,
    isFutureDate,
  } = useClassAttendance(
    { id: classroomId }, // Gunakan classroomId dari state
    date,
    lessonOrder,
    globalChanges,
    setGlobalChanges,
    submittedClasses,
    setSubmittedClasses
  );

  const hasAnyChange = useMemo(() => {
    if (!classKey) return false;
    const classChanges = globalChanges?.[classKey];
    if (!classChanges) return false;

    return Object.values(classChanges).some(pageData =>
      Object.values(pageData || {}).some(
        status => status && status !== ""
      )
    );
  }, [globalChanges, classKey]);

  return (
    <div className="mx-4 mb-10">
      <div className="relative w-full h-[140px] bg-[url('/images/background/bg04.png')] bg-blue-600 rounded-xl mt-6 shadow-md overflow-hidden">
        <div className="p-4 text-white flex flex-col h-full justify-between relative z-10">
          <h1 className="flex text-xl font-semibold items-center">
            <GraduationCap className="mr-2 w-6 h-6" />
            {classroom?.name || "Memuat Nama Kelas..."}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm mb-2">
            <div className="flex gap-2 items-center">
              <UserRoundCheck className="w-4 h-4" />
              {classroom?.homeroom_teacher?.name || "-"}
            </div>
            <div className="flex gap-2 items-center">
              <Users className="w-4 h-4" />
              {pagination?.total || 0} Siswa
            </div>
            <div className="flex gap-2 items-center">
              <Calendar className="w-4 h-4" />
              {classroom?.school_year || "-"}
            </div>
          </div>
        </div>
      </div>

      <TotalClass
        summary={summary}
        handleSubmit={handleSubmit}
        isSubmitted={isSubmitted}
        canSubmit={canSubmit}
        submitting={submitting}
        isTimeValid={isTimeValid}
        isPastDate={isPastDate}
        isFutureDate={isFutureDate}
        setIsOpenClass={handleBack}
      />
      
      {!hasAnyChange && (
        <div className="bg-[#FFF5E3] p-3 md:p-4 rounded-md mb-4 mt-4">
          <p className="text-sm md:text-base font-semibold text-[#FFAA05] mb-2">Informasi</p>
          <ul className="list-disc text-xs md:text-sm space-y-1 ml-4">
            <li>Halaman ini digunakan untuk mencatat absensi guru saat mengajar.</li>
            <li>Pilih status kehadiran sesuai kondisi sebelum melakukan cross check.</li>
            <li>Perbaiki status yang tidak sesuai lalu tekan Submit untuk menyimpan data.</li>
          </ul>
        </div>
      )}
      
      <div className="mt-4">
        {loading ? (
          <p className="text-center py-10 font-medium text-gray-500">Memuat data...</p>
        ) : error ? (
            <div className="p-10 text-center">
               <p className="text-red-500 font-bold mb-4">{error}</p>
               <button onClick={() => window.location.reload()} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold border border-red-200">
                 RELOAD HALAMAN
               </button>
            </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-sm overflow-auto">
              <TableClass
                attendance={attendance}
                pagination={pagination}
                status={status}
                page={page}
                classKey={classKey}
                changes={globalChanges}
                setChanges={setGlobalChanges}
                isTimeValid={isTimeValid}
              />
            </div>
            
            {pagination?.last_page > 1 && (
              <Pagination 
                page={page} 
                setPage={setPage} 
                pagination={pagination} 
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}