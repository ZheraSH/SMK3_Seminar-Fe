import { useMemo } from "react";

const days = [
  { label: "Senin", value: "monday", index: 1 },
  { label: "Selasa", value: "tuesday", index: 2 },
  { label: "Rabu", value: "wednesday", index: 3 },
  { label: "Kamis", value: "thursday", index: 4 },
  { label: "Jumat", value: "friday", index: 5 },
];

export default function ButtonAttendance({ selectedDate, setSelectedDate }) {
  const safeDate = useMemo(() => {
    if (!selectedDate) return null;
    const d = new Date(selectedDate.replace(/-/g, "/"));
    return isNaN(d.getTime()) ? null : d;
  }, [selectedDate]);

  const activeDayValue = useMemo(() => {
    if (!safeDate) return "";
    return ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][safeDate.getDay()];
  }, [safeDate]);

  const handleDayClick = (targetDayIndex) => {
    if (!safeDate) return;

    const currentDay = safeDate.getDay() || 7;
    const diff = targetDayIndex - currentDay;

    const targetDate = new Date(safeDate);
    targetDate.setDate(safeDate.getDate() + diff);

    const y = targetDate.getFullYear();
    const m = String(targetDate.getMonth() + 1).padStart(2, "0");
    const d = String(targetDate.getDate()).padStart(2, "0");

    setSelectedDate(`${y}-${m}-${d}`);
  };

  return (
    <div className=" w-full md:w-auto h-[40px] md:h-[48px] py-1 flex -mt-5 md:-mt-1  pr-1">
      {days.map((day) => (
        <button
          key={day.value}
          onClick={() => setActiveDay(day.value)}
          className={`px-2 py-2 ml-1 h-[30px] w-full md:w-[80px] md:h-[40px] rounded-md border-none font-semibold text-[12px] md:text-[14px] transition-all duration-200 ${
            activeDay === day.value
              ? "bg-[#3B82F6] text-white border-[#3B82F6]"
              : "bg-[#EFF1F3] text-black hover:bg-[#3B82F6] hover:text-white"
          }`}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
}
