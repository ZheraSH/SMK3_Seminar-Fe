import { useState } from "react"; // 1. Tambahkan useState
import ButtonAttendance from "./components/ButtonAttendance";
import CardAttendance from "./components/CardAttendance";
import { useAttendanceTeacher } from "../../../../Core/hooks/role-teacher/attendance/useAttendance";
import "react-datepicker/dist/react-datepicker.css";

export default function AttendanceTeacher() {
  const {
    classrooms,
    loading,
    error,
    selectedDate,
    setSelectedDate,
  } = useAttendanceTeacher();

  const [globalChanges, setGlobalChanges] = useState({});
  const [submittedClasses, setSubmittedClasses] = useState({});

  return (
    <div className="justify-center mx-4 mb-10 mt-5 md:mt-2">
      <div className="relative w-full h-[166px] bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px]">
        <div className="inset-0 flex flex-col pt-2 ml-3 md:ml-5 h-full">
          <h1 className="text-white text-[26px] md:text-[33px] font-semibold">
            Absensi Kelas
          </h1>
          <p className="text-white text-[12px] font-light">
            Pilih kelas mengajar dan absen siswa di dalamnya.
          </p>
        </div>
      </div>

      <div className="flex h-full mt-6 gap-2 flex-col md:flex-row border border-black/20 justify-between bg-white shadow-md p-2 rounded-lg items-center">
        <h1 className="text-[15px] md:text-[20px] font-semibold ">
          Daftar kelas mengajar
        </h1>

        <ButtonAttendance
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      <div className="mt-4 w-full overflow-x-auto rounded-lg">
        <CardAttendance
          classrooms={classrooms}
          loading={loading}
          error={error}
          selectedDate={selectedDate} 
          globalChanges={globalChanges}
          setGlobalChanges={setGlobalChanges}
          submittedClasses={submittedClasses}
          setSubmittedClasses={setSubmittedClasses}
        />
      </div>
    </div>
  );
}