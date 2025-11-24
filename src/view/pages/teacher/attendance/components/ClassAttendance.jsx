import { useState } from "react";
import { UserRoundCheck, Users, GraduationCap, Calendar1 } from "lucide-react";
import TableClass from "./ClassTable";
import TotalClass from "./ClassTotal";
import { Pagination } from "./Pagination";

const status = [
  { id: 1, value: "hadir", label: "Hadir" },
  { id: 2, value: "izin", label: "Izin" },
  { id: 3, value: "terlambat", label: "Terlambat" },
  { id: 4, value: "alpa", label: "Alpa" },
];

export default function ClassAttendance({ isOpenClass, selectedClass, setIsOpenClass }) {
  
  // ini tempat simpan status tiap siswa
  const [attendance, setAttendance] = useState(
    selectedClass.students.map(() => null)
  );

  // Pagination nya
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const totalPages = Math.ceil(selectedClass.students.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentStudents = selectedClass.students.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (p) => {
    if (p >= 1 && p <= totalPages) setCurrentPage(p);
  };

  // hitung total status
  const totalHadir = attendance.filter((a) => a === "hadir").length;
  const totalIzin = attendance.filter((a) => a === "izin").length;
  const totalTerlambat = attendance.filter((a) => a === "terlambat").length;
  const totalAlpa = attendance.filter((a) => a === "alpa").length;

  return (
    isOpenClass && selectedClass && (
      <div className="mx-5 mb-10">
        <div className="relative w-[1129px] h-[166px] bg-[url('/images/background/bg04.png')] bg-no-repeat rounded-[15px]">
          <div className="absolute inset-0 items-center justify-center rounded-[6px]">
            <div className="ml-5 mt-2">
              <h1 className="text-white flex text-[20px] font-semibold">
                <GraduationCap className="w-[25px] h-[25px] mr-2" />
                {selectedClass.className}
              </h1>
              <p className="text-white text-[12px]">Kelas - {selectedClass.className}</p>

              <div className="flex mt-12 gap-[35px] text-white">
                <div className="flex gap-2">
                  <UserRoundCheck className="w-[20px] h-[20px]" />
                  <p>{selectedClass.teacher}</p>
                </div>
                <div className="flex gap-2">
                  <Users className="w-[20px] h-[20px]" />
                  <p>{selectedClass.studentCount}</p>
                </div>
                <div className="flex gap-2">
                  <Calendar1 className="w-[20px] h-[20px]" />
                  <p>{selectedClass.year}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex gap-2 flex-wrap h-[60px] w-[1129px] justify-between bg-white shadow-md p-2 rounded-lg">
          <TotalClass
            totalAlpa={totalAlpa}
            totalHadir={totalHadir}
            totalIzin={totalIzin}
            totalTerlambat={totalTerlambat}
            setIsOpenClass={setIsOpenClass}
          />
        </div>
        <div className="mt-5">
          <TableClass
            students={currentStudents}
            attendance={attendance}
            setAttendance={setAttendance}
            status={status}
            startIndex={startIndex}
          />
        </div>

        <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}/>

      </div>
    )
  );
}
