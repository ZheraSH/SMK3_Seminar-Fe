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
    const dayNames = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return dayNames[safeDate.getDay()];
  }, [safeDate]);

  const handleDayClick = (targetDayIndex) => {
    if (!safeDate) return;

    const currentDay = safeDate.getDay();
    const normalizedCurrentDay = currentDay === 0 ? 7 : currentDay;

    const diff = targetDayIndex - normalizedCurrentDay;
    const targetDate = new Date(safeDate);
    targetDate.setDate(safeDate.getDate() + diff);

    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, "0");
    const day = String(targetDate.getDate()).padStart(2, "0");

    setSelectedDate(`${year}-${month}-${day}`);
  };

  return (
    <div className="bg-[#EFF1F3] h-[44px] md:h-[48px] py-1 flex  md:-mt-1 rounded-lg pr-1">
      {days.map((day) => (
        <button
          key={day.value}
          onClick={() => handleDayClick(day.index)}
          disabled={!safeDate}
          className={`px-2 py-2 ml-1  w-[59px] md:w-[80px] md:h-[40px] rounded-md font-semibold text-[12px] md:text-[14px] transition-all duration-200 ${
            activeDayValue === day.value
              ? "bg-[#3B82F6] text-white"
              : "bg-[#EFF1F3] text-black hover:text-white hover:bg-[#3B82F6]"
          } disabled:opacity-50`}
          aria-pressed={activeDayValue === day.value}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
}
