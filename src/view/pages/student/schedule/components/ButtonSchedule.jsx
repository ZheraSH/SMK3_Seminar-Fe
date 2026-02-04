import { days } from "../../../../../Core/Data/SiswaData";

export default function ButtonSchedule({ setActiveDay, activeDay }) {
    return (
        <div className="flex flex-nowrap bg-gray-100 py-1 rounded-lg pr-1 overflow-x-auto h-[50px]">
        {days.map((day) => (
            <button
            key={day.value}
            onClick={() => setActiveDay(day.value)}
            className={`px-2 py-2 ml-1 rounded-md font-semibold md:text-[14px] text-[12px] whitespace-nowrap my-1 md:my-0
                ${
                activeDay === day.value
                    ? "bg-[#3B82F6] text-white w-[55px] md:w-[80px]"
                    : "bg-gray-100 text-black hover:bg-[#3B82F6] hover:text-white w-[55px] md:w-[80px]"
                }`}
            >
            {day.label}
            </button>
        ))}
        </div>
    );
}