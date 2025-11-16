import { useState } from "react";
import ButtonAttendance from "./components/ButtonAttendance";
import CardAttdance from "./components/CardAttendance";
import ClassAttendance from "./components/ClassAttendance";

export default function AttendanceTeacher() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeDay, setActiveDay] = useState("Senin");
  const [isOpenClass, setIsOpenClass] = useState(false);

  // Kalau sudah pilih kelas → buka halaman class detail
  if (isOpenClass) {
    return (
      <ClassAttendance
        isOpenClass={isOpenClass}
        setIsOpenClass={setIsOpenClass}
        selectedClass={selectedClass}
      />
    );
  }

  // Halaman utama (memilih kelas)
  return (
    <div className="justify-center mx-7 mb-10">
      <div className="relative w-full h-[166px] bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px]">
        <div className="absolute inset-0 items-center justify-center rounded-[6px]">
          <div className="ml-5 mt-2">
            <h1 className="text-white text-[30px] font-semibold">Absensi Kelas</h1>
            <p className="text-white text-[14px] font-light">
              Pilih kelas mengajar dan absen siswa di dalamnya.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-2 flex-wrap h-[60px] border border-[#000000]/20 justify-between bg-white shadow-md p-2 rounded-lg">
        <div className="pl-[16px] pt-[8px] pb-[8px]">
          <h1 className="text-xl font-semibold">Daftar kelas mengajar</h1>
        </div>

        <ButtonAttendance 
          setActiveDay={setActiveDay} 
          activeDay={activeDay}
        />
      </div>

      <div className="mt-4 w-full overflow-x-auto rounded-lg">
        <CardAttdance
          activeDay={activeDay}
          isOpenClass={isOpenClass}
          setIsOpenClass={setIsOpenClass}
          setSelectedClass={setSelectedClass}
        />
      </div>
    </div>
  );
}
