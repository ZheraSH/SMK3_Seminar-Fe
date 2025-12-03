import { Users } from "lucide-react";
import CardStudent from "./components/CardStudent";
import { Pagination } from "./components/Pagination";
import { useClassStudent } from "../../../../Core/hooks/role-student/classroom/useClassroom";

export default function MainClassStudent() {

    const {
        loading,
        error,
        classroom,
        students,
        currentPage,
        totalPages,
        setCurrentPage,
    } = useClassStudent(); 

    return (
        <div className="mx-3 md:mx-10 mb-10 mt-5 justify-center bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
                <div className="bg-white flex flex-col gap-3 shadow-[0_0_20px_rgba(0,0,0,0.20)] rounded-2xl p-4 border-2 border-gray-300">
                    <h1 className="text-sm md:text-lg font-semibold">Wali Kelas</h1>

                    <div className="flex gap-2 md:gap-5">
                        <img src="/images/profil/ProfilWali.png" className="w-12 h-12 md:w-24 md:h-24 rounded-full"/>
                        <div className="flex flex-col mt-2 md:mt-5">
                            <h2 className="text-xs md:text-lg font-medium">
                                {classroom?.homeroom_teacher?.name}
                            </h2>
                            <p className="font-light text-[10px] md:text-sm">
                                Tahun Ajaran {classroom?.school_year}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.20)] rounded-2xl border-2 p-4 md:px-8 flex justify-between items-center border-gray-300">
                    <div className="flex flex-col gap-3">
                        <h2 className="font-semibold text-sm md:text-lg">Kelasmu saat ini</h2>
                        <h1 className="font-bold text-base md:text-2xl">{classroom?.name}</h1>
                        <span className="flex gap-2 items-center bg-blue-500/20 text-blue-500 p-1 rounded-md w-fit">
                            <Users className="w-4 h-4 md:w-5 md:h-5"/>
                            <p className="text-xs md:text-sm">{classroom?.total_students}</p>
                        </span>
                    </div>
                    <img src="/images/cardbg/Frame.png" className="w-16 h-16 md:w-32 md:h-28"/>
                </div>
            </div>

            <CardStudent 
                student={students}
                loading={loading}
                error={error}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />

        </div>
    );
}
