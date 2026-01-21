import ButtonAttendance from "./components/ButtonAttendance";
import CardAttendance from "./components/CardAttendance";
import ClassAttendance from "./components/ClassAttendance";
import { useAttendanceTeacher } from "../../../../Core/hooks/role-teacher/attendance/useAttendance";
import Header from "../../../components/elements/header/Header-new";

export default function AttendanceTeacher() {
  const {
    selectedClass,
    setSelectedClass,
    isOpenClass,
    setIsOpenClass,
    activeDay,
    setActiveDay,
    classrooms,
    loading,
    error,
    globalChanges,
    setGlobalChanges,
    submittedClasses,
    setSubmittedClasses,
    // getDateByDay,
  } = useAttendanceTeacher();



  if (isOpenClass) {
    return (
      <ClassAttendance selectedClass={selectedClass} date={selectedClass.date} setIsOpenClass={setIsOpenClass} globalChanges={globalChanges} setGlobalChanges={setGlobalChanges} submittedClasses={submittedClasses} setSubmittedClasses={setSubmittedClasses}/>
    );
  }

  return (
    <div className="justify-center mx-7 mb-10 mt-5 md:mt-2">
      <Header span={"Daftar Kelas Mengajar"} p={"Akses kelas untuk mencatat kehadiran siswa secara real-time"}/>
      <div className="flex mt-6 md:flex-row gap-2 flex-wrap h-[100px] md:h-[60px] border border-[#000000]/20 justify-between bg-white shadow-md p-2 rounded-lg">
        <div className="pl-[5px] md:pl-[16px] py-[8px]">
          <h1 className="text-[15px] md:text-[20px] font-semibold">Daftar kelas mengajar</h1>
        </div>
        <ButtonAttendance setActiveDay={setActiveDay} activeDay={activeDay} />
      </div>

      <div className="mt-4 w-full overflow-x-auto rounded-lg">
        <CardAttendance classrooms={classrooms} loading={loading} error={error} setIsOpenClass={setIsOpenClass} setSelectedClass={setSelectedClass} />
      </div>
    </div>
  );
}
