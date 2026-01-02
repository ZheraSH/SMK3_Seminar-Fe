import { useStudentSchedule } from "../../../../Core/hooks/role-student/schedule-student/useStudentSchedule";
import TableSchedule from "./components/TableSchedule";
import ButtonSchedule from "./components/ButtonSchedule";
import { useState } from "react";
import HeaderPage from "../../../components/elements/header/Header.Page";

export default function MainScheduleStudent() {
  const [activeDay, setActiveDay] = useState("monday");

  const { schedule, classroomId, semesterType, loading,error } =
    useStudentSchedule(activeDay);

  return (
    <div className="justify-center mx-4 md:mx-7 mb-10 mt-5">
      <HeaderPage
        h1="Jadwal Pelajaran"
        p={`Kelas ${classroomId} | ${semesterType}`}
      />

      <div className="mt-6 flex gap-2 flex-nowrap bg-white shadow-md p-2 rounded-lg overflow-x-auto">
        <ButtonSchedule setActiveDay={setActiveDay} activeDay={activeDay} />
      </div>
      <div className="mt-4 w-full overflow-x-auto rounded-lg border border-gray-200 ">
        <TableSchedule scheduleData={schedule} loading={loading} error={error} />
      </div>
    </div>
  );
}
