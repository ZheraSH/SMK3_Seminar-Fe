import { useState } from "react";
import { useStudentSchedule } from "../../../../Core/hooks/role-student/schedule-student/useStudentSchedule";
import ButtonSchedule from "./components/ButtonSchedule";
import TableSchedule from "./components/TableSchedule";
import Header from "../../../components/elements/header/Header-new";

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
      <Header
        span="Jadwal Pelajaran"
        p={`Kelas ${classroomId} | ${semesterType} ${academicYear}`}
        src="/images/particle/studentschedule.png"
      />

      <div className="mt-6 flex gap-2 flex-wrap bg-white shadow-md p-2 rounded-lg">
        <ButtonSchedule
          setActiveDay={setActiveDay}
          activeDay={activeDay}
        />
      </div>

      <div className="mt-4 w-full overflow-x-auto rounded-lg border border-gray-200">
        <TableSchedule scheduleData={schedule} loading={loading} />
      </div>
    </div>
  );
}
