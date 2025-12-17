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
        selectedClass,
        date,
        globalChanges,
        setGlobalChanges,
        submittedClasses,
        setSubmittedClasses
    );

    if (!selectedClass) {
        return (
            <p className="text-center py-10 text-gray-600">
                Memuat data kelas...
            </p>
        );
    }

    if (selectedClass.lesson_order === 1) {
        return <FirstLessonView setIsOpenClass={setIsOpenClass} />;
    }

    return (
        <div className="mx-2 md:mx-4 lg:mx-6 mb-10 "> 
            <div className="relative w-full h-[140px] bg-[url('/images/background/bg04.png')] rounded-[15px] overflow-hidden mt-6">
                <div className="absolute inset-0 flex">
                    <div className="p-2 md:p-4 w-full"> 

                        <h1 className="text-white flex text-[20px] lg:text-2xl font-semibold mb-2 md:mb-4 mt-2 md:mt-0">
                            <GraduationCap className="w-7 h-7 mr-2 flex-shrink-0" />
                            <span className="truncate">{classroom?.name || "Nama Kelas"}</span> 
                        </h1>

                        <div className="flex flex-wrap gap-4 md:gap-x-8 gap-y-2 text-white text-[11px] md:text-sm mt-14"> 

                            <div className="flex gap-2 items-center md:text-base">
                                <UserRoundCheck className="w-5 h-5 flex-shrink-0" />
                                <p className="truncate">{classroom?.homeroom_teacher?.name || "Wali Kelas"}</p>
                            </div>

                            <div className="flex gap-2 items-center  md:text-base">
                                <Users className="w-5 h-5 flex-shrink-0" />
                                <p>{pagination?.total || 0} Siswa</p>
                            </div>

                            <div className="flex gap-2 items-center md:text-base">
                                <Calendar className="w-5 h-5 flex-shrink-0" />
                                <p>{classroom?.school_year || "Tahun Ajaran"}</p>
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
                    isPastDate={isPastDate}
                    isFutureDate={isFutureDate}
                />
            )}
            <div className="bg-[#FFF5E3] p-3 md:p-4 rounded-md mb-4 mt-4"> {/* Menyesuaikan margin top */}
                <p className="text-sm md:text-base font-semibold text-[#FFAA05] mb-2">Informasi</p>
                <ul className="list-disc text-xs md:text-sm space-y-1 ml-4">
                    <li>Halaman ini digunakan untuk mencatat absensi guru saat mengajar di setiap kelas.</li>
                    <li>Pilih status kehadiran sesuai kondisi sebelum melakukan cross check.</li>
                    <li>Perbaiki status yang tidak sesuai lalu tekan Submit untuk menyimpan data.</li>
                </ul>
            </div>

            <div className="mt-4 overflow-x-auto mb-2"> 
                {loading ? (
                    <p className="text-center py-10 text-gray-600">Memuat data absensi...</p>
                ) : error ? (
                    <p className="text-center py-10 text-red-500">{error}</p>
                ) : (
                    <>
                        <TableClass
                            attendance={attendance}
                            pagination={pagination}
                            status={status}
                            page={page}
                            changes={globalChanges}
                            setChanges={setGlobalChanges}
                            isTimeValid={isTimeValid} 
                            classKey={selectedClass.id}
                            isPastDate={isPastDate}
                        />
                        {pagination && pagination.last_page > 1 && !error && (
                            <Pagination page={page} setPage={setPage} pagination={pagination} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}