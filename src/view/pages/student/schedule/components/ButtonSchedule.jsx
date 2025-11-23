import { days } from "../../../../../Core/Data/SiswaData";

export default function ButtonSchedule ({setActiveDay,activeDay}){
    return (
        <div className=" bg-gray-100 py-1 rounded-lg pr-1 ">
                {days.map((day) => (
                    <button
                        key={day.value}
                        onClick={() => setActiveDay(day.value)}
                        className={`px-2 py-2 ml-1 rounded-md border-none font-semibold ${
                        activeDay === day.value
                            ? "bg-[#3B82F6] text-white border-[#3B82F6] w-[80px]"
                            : "bg-gray-100 text-black hover:bg-[#3B82F6] hover:text-white w-[80px]"
                        }`}
                    >
                        {day.label}
                    </button>
                    ))}
            </div>
    );
}