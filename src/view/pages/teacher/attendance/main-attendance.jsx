import ButtonAttendance from "./components/button-attendance";
import CardAttendance from "./components/card-attendance";
import ClassAttendance from "./components/class-attendance";
import { useAttendanceTeacher } from "@core/hooks/role-teacher/attendance/use-attendance";
import Header from "@elements/header/header-new-1";
import LoadingData from "@elements/loading-data/loading";

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
           <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                    <img
                      src="../../../../images/null/null2.png"
                      alt="Data siswa kosong"
                      className="w-72 h-auto md:w-[400px] md:h-[285px] mb-6"
                    />
                    <p className="text-sm font-medium text-center">
                      Belum ada daftar mengajar hari ini.<br />
                    </p>
                  </div>
         )
       }
      </div>
    </div>
  );
}

