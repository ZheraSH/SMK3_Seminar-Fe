import { Users } from "lucide-react";
import { useState } from "react";
import { Pagination } from "./components/Pagination";
import { students } from "../../../../Core/Data/SiswaData";
import CardStudent from "./components/CardStudent";

export default function MainClassStudent() {
  
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12; 

  const totalPages = Math.ceil(students.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentStudents = students.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };

  return (
    <div className="mx-10 mb-10 mt-5 justify-center">
        <div className="w-[1090px] h-[175px] flex gap-10">
            <div className="w-[520px] h-[176px] bg-white flex flex-col gap-3 shadow-[0_0_20px_rgba(0,0,0,0.20)] rounded-2xl p-4 border-2 border-gray-300">
                <h1 className="text-[18px] font-semibold">Wali Kelas</h1>

                <div className="flex gap-5">
                    <img
                    src="/images/profil/ProfilWali.png"
                    alt="Profil wali kelas"
                    className="w-[100px] h-[100px] rounded-full object-cover"
                    />

                    <div className="flex flex-col mt-2">
                        <h2 className="text-[18px] font-medium">Deddy Irwandi</h2>
                        <p className="font-light text-[14px]">Tahun Ajaran 2023-2024</p>

                        <div className="flex mt-2 gap-5">
                            <span className="py-1 px-2 bg-blue-500/20 text-blue-500 rounded-md text-[12px]">
                                Bhs. Indonesia
                            </span>
                            <span className="py-1 px-2 bg-blue-500/20 text-blue-500 rounded-md text-[12px]">
                                PPKN
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[520px] h-[176px] bg-white shadow-[0_0_20px_rgba(0,0,0,0.20)] rounded-2xl border-2 justify-between px-8 items-center flex border-gray-300">
                <div className="flex flex-col gap-3">
                    <h2 className="font-semibold text-[18px]">Kelasmu saat ini</h2>
                    <h1 className="font-bold text-[24px]">XII PPLG 3</h1>

                    <span className="flex gap-2 items-center justify-center rounded-md bg-blue-500/20 text-blue-500 w-[70px] h-[30px]">
                        <Users className="w-[20px] h-[20px]" />
                        <p className="text-[14px]">{students.length}</p>
                    </span>
                </div>
                <img src="/images/cardbg/Frame.png" alt="" />
            </div>
        </div>
        <CardStudent 
        currentStudents={currentStudents} />
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
    </div>
  );
}
