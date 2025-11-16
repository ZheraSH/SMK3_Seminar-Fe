import { days } from "../../../../../Core/Data/SiswaData";


export default function ButtonAttendance ({setActiveDay,activeDay}){
    return (
        <div className=" bg-[#EFF1F3] py-1 rounded-lg pr-1">
            {days.map((day) => (
                <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`px-4 py-2 ml-1 rounded-md border-none font-bold transition-all duration-200 ${
                    activeDay === day
                        ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                        : "bg-[#EFF1F3] text-black hover:bg-[#3B82F6] hover:text-white"
                    }`}
                    >
                    {day}
                </button>
                ))}
        </div>
    );
}