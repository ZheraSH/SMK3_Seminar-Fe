import ButtonAttendance from "./components/ButtonAttendance";
import CardAttendance from "./components/CardAttendance";
import ClassAttendance from "./components/ClassAttendance";
import { useAttendanceTeacher } from "../../../../Core/hooks/role-teacher/attendance/useAttendance";
import Header from "../../../components/elements/header/Header-new";
import LoadingData from "../../../components/elements/loadingData/loading";

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
    <div className="justify-center mb-10">
      <div className="hidden md:block">
        {loading?(<LoadingData loading={loading} type="header1"/>)
        :(
          <Header span={"Daftar Kelas Mengajar"} p={"Akses kelas untuk mencatat kehadiran siswa secara real-time"}  src="/images/background/bg-4.png"/>
        )}

      </div>
      {loading? (<LoadingData loading={loading} type="tombolDay2" count={5} />)
      :(
        <div className="flex mt-6 md:flex-row gap-2 flex-wrap h-[100px] md:h-[60px] border border-[#000000]/20 justify-between bg-white shadow-md p-2 rounded-lg">
          <div className="pl-[5px] md:pl-[16px] py-[8px]">
            <h1 className="text-[15px] md:text-[20px] font-semibold">Daftar kelas mengajar</h1>
          </div>
          <ButtonAttendance setActiveDay={setActiveDay} activeDay={activeDay} />
        </div>
      )}

      <div className="mt-4 w-full overflow-x-auto rounded-lg">
       { loading? (
        <LoadingData loading={loading} type="cardclass" count={9}/>
       ):
         classrooms.length > 0 ? (
           <CardAttendance classrooms={classrooms} loading={loading} error={error} setIsOpenClass={setIsOpenClass} setSelectedClass={setSelectedClass} />
         ) : (
           <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in duration-500">
              <img  src="/images/null/nullimage.png"  alt="Data Kosong"  className="w-48 h-auto md:w-[400px] md:h-[285px] mb-6" />
              <p className="text-gray-500 text-center text-sm md:text-md"> Maaf yaaa.. datanya gaada, silahkan konsultasi kelas <br /> mengajar anda ke operator!</p>
            </div>
         )
       }
      </div>
    </div>
  );
}
