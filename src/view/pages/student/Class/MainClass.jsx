import { Users,DoorOpen } from "lucide-react";
import CardStudent from "./components/CardStudent";
import { Pagination } from "./components/Pagination";
import { useClassStudent } from "../../../../Core/hooks/role-student/classroom/useClassroom";
import LoadingData from "../../../components/elements/loadingData/loading";


export default function MainClassStudent() {
    const {
        loading,
        error,
        classroom,
        students,
        currentPage,
        totalPages,
        setCurrentPage,
        onError
    } = useClassStudent();

    if (loading) {
        return (
            <div className="mx-2 mb-10 mt-5 space-y-10">
                <LoadingData loading={true} type="2cardMini" />
                <LoadingData loading={true} type="cardStudent" count={8} />
            </div>
        );
    }

    if (!loading && students.length === 0) {
        return (
            <div className="flex flex-col items-center -mt-10">
                <img src="/images/null/null5.png" alt="Data Kosong" className="w-130 h-auto" />
                <h1 className="text-[#4B5563] -mt-10">Belum masuk kelas</h1>
            </div>
        );
    }

    return (
        <div className="mx-2 mb-10 mt-5 justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
                <div className="bg-white flex flex-col gap-3 shadow-md rounded-2xl p-4 border-2 border-gray-300">
                    <h1 className="text-sm md:text-lg font-semibold">Wali Kelas</h1>
                    <div className="flex gap-2 md:gap-5">
                        <img src={classroom?.homeroom_teacher?.image} alt="wali kelas" className="w-12 h-12 md:w-24 md:h-24 rounded-full object-cover" />
                        <div className="flex flex-col mt-2 md:mt-5">
                            <h2 className="text-[18px] md:text-lg font-medium">{classroom?.homeroom_teacher?.name}</h2>
                            <p className="font-light text-[10px] md:text-sm">Tahun Ajaran {classroom?.school_year}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-2xl border-2 p-4 md:px-8 flex justify-between items-center border-gray-300">
                    <div className="flex flex-col gap-3">
                        <h2 className="font-semibold text-sm md:text-lg">Kelasmu saat ini</h2>
                        <h1 className="font-bold text-base md:text-2xl">{classroom?.name}</h1>
                        <span className="flex gap-2 items-center bg-blue-500/20 text-blue-500 p-1 rounded-md w-fit">
                            <Users className="w-4 h-4 md:w-5 md:h-5" />
                            <p className="text-xs md:text-sm">{classroom?.total_students}</p>
                        </span>
                    </div>
                    <DoorOpen className="w-16 h-16 md:w-32 md:h-28 text-[#2563EB]" />
                </div>
            </div>

            <CardStudent 
                student={students}
                loading={loading}
                error={error}
                onError={onError}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}