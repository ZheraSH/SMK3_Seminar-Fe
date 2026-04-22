import { days } from "@mock/siswa-data";

export default function ButtonSchedule({ setActiveDay, activeDay }) {
    return (
        <div className="flex w-full md:w-auto bg-gray-100 p-1 rounded-lg h-[50px] gap-1 md:gap-0">
            {days.map((day) => (
                <button
                    key={day.value}
                    onClick={() => setActiveDay(day.value)}
                    className={`flex-1 md:flex-none md:w-[80px] md:ml-1 py-2 rounded-md font-semibold md:text-[14px] text-[12px] whitespace-nowrap transition-colors
                        ${
                        activeDay === day.value
                            ? "bg-[#3B82F6] text-white"
                            : "bg-gray-100 text-black hover:bg-[#3B82F6] hover:text-white"
                        }`}
                >
                    {day.label}
                </button>
            ))}
        </div>
    );
}

