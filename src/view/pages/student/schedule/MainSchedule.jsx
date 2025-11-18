import { useState } from "react";
import TableSchedule from "./components/TableSchedule";
import ButtonSchedule from "./components/ButtonSchedule";

export default function MainScheduleStudent() {
  

  const [activeDay, setActiveDay] = useState("Senin");
  

  return (
    <div className="justify-center mx-7 mb-10 mt-5">
      <div className="relative w-full h-[166px] bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px]">
        <div className="absolute inset-0 items-center justify-center rounded-[6px]">
          <div className="ml-5 mt-2">
            <h1 className="text-white text-[30px] font-semibold">Jadwal Pelajaran</h1>
            <p className="text-white text-[14px] font-light">
              Kelas XII RPL 1 | Semester Ganjil 2025/2026
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-2 flex-wrap bg-white shadow-md p-2 rounded-lg">
        <ButtonSchedule 
          setActiveDay = {setActiveDay}
          activeDay ={activeDay}
        />
      </div>

      <div className="mt-4 w-full overflow-x-auto rounded-lg border border-gray-200 ">
        <TableSchedule 
          activeDay ={activeDay}
        />
      </div>
    </div>
  );
}
