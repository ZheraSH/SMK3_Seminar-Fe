import { useState } from "react";
import { useStudentSchedule } from "../../../../Core/hooks/role-student/schedule-student/useStudentSchedule";
import ButtonSchedule from "./components/ButtonSchedule";
import TableSchedule from "./components/TableSchedule";
import Header from "../../../components/elements/header/Header-new";
import LoadingData from "../../../components/elements/loadingData/loading";

export default function MainScheduleStudent() {
  const [activeDay, setActiveDay] = useState("monday"); 

  const {
    schedule,
    classroomId,
    semesterType,
    academicYear,
    loading,
  } = useStudentSchedule(activeDay);

  return (
    <div className="justify-center mx-7 mb-10 mt-5">
      <div className="hidden md:block">
          {loading? (<LoadingData loading={loading} type="header1"/>) 
          : (
            <Header
              span="Jadwal Pelajaran"
              p={`Kelas ${classroomId} | ${semesterType} ${academicYear}`}
              src="/images/particle/studentschedule.png"
            />
          )}
      </div>

      {loading? (<LoadingData loading={loading} type="tombolday" count={5} />) 
      : (
        <div className="mt-6 flex gap-2 flex-wrap bg-white shadow-md p-2 rounded-lg">
          <ButtonSchedule
            setActiveDay={setActiveDay}
            activeDay={activeDay}
          />
        </div>
      )}

      <div className="mt-4 w-full overflow-x-auto rounded-lg border border-gray-200">
        {loading? (<LoadingData loading={loading} type="tableSchedule" count={10}/>)
        : (
          <TableSchedule scheduleData={schedule}  />
        )}
      </div>
    </div>
  );
}
