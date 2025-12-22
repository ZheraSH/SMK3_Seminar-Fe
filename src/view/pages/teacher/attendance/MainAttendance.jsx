import ButtonAttendance from "./components/ButtonAttendance";
import CardAttendance from "./components/CardAttendance";
import ClassAttendance from "./components/ClassAttendance";
import { useAttendanceTeacher } from "../../../../Core/hooks/role-teacher/attendance/useAttendance";
import HeaderPage from "../../../components/elements/header/Header.Page";
// import "react-datepicker/dist/react-datepicker.css";

export default function AttendanceTeacher() {
  const {
    selectedClass,
    setSelectedClass,
    isOpenClass,
    setIsOpenClass,
    classrooms,
    loading,
    error,
    globalChanges,
    setGlobalChanges,
    submittedClasses,
    setSubmittedClasses,
    selectedDate,
    setSelectedDate,
  } = useAttendanceTeacher();

  if (isOpenClass) {
    return (
      <ClassAttendance
        selectedClass={selectedClass}
        date={selectedDate}
        setIsOpenClass={setIsOpenClass}
        globalChanges={globalChanges}
        setGlobalChanges={setGlobalChanges}
        submittedClasses={submittedClasses}
        setSubmittedClasses={setSubmittedClasses}
      />
    );
  }

  return (
    <div className="justify-center mx-4 mb-10 mt-5 md:mt-2">
      <HeaderPage
        h1="Absensi Kelas"
        p=" Pilih kelas mengajar dan absen siswa di dalamnya."
      />

      <div className="flex md:flex-row gap-2 flex-wrap h-[100px] md:h-[60px] border border-black/20 justify-between bg-white shadow-md p-2 rounded-lg">
        <div className="pl-[5px] md:pl-[16px] py-[8px]">
          <h1 className="text-[15px] md:text-[20px] font-semibold">
            Daftar kelas mengajar
          </h1>
        </div>

        <ButtonAttendance
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      {/* Cards */}
      <div className="mt-4 w-full overflow-x-auto rounded-lg">
        <CardAttendance
          classrooms={classrooms}
          loading={loading}
          error={error}
          setIsOpenClass={setIsOpenClass}
          setSelectedClass={setSelectedClass}
        />
      </div>
    </div>
  );
}
