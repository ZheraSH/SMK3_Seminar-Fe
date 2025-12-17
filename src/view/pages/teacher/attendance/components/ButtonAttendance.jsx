import { useMemo } from "react";

const getSpecificDateForDay = (targetDayValue, referenceDateString) => {
  const [y, m, d] = referenceDateString.split("-");
  const referenceDate = new Date(y, m - 1, d);

  const dayMap = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
  };

  const targetIndex = dayMap[targetDayValue];
  if (targetIndex === undefined) return referenceDateString;

  const currentIndex = referenceDate.getDay();
  const diff = targetIndex - currentIndex;

  const targetDate = new Date(referenceDate);
  targetDate.setDate(referenceDate.getDate() + diff);

  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, "0");
  const day = String(targetDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const days = [
  { label: "Senin", value: "monday" },
  { label: "Selasa", value: "tuesday" },
  { label: "Rabu", value: "wednesday" },
  { label: "Kamis", value: "thursday" },
  { label: "Jumat", value: "friday" },
];

export default function ButtonAttendance({
  setActiveDay,
  selectedDate,
  setSelectedDate,
}) {
  const activeDayValue = useMemo(() => {
    if (!selectedDate) return "monday";

    const dateObj = new Date(selectedDate.replace(/-/g, "/"));
    const index = dateObj.getDay();

    const dayNames = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    return dayNames[index] || "monday";
  }, [selectedDate]);

  const handleDayClick = (dayValue) => {
    const newDateString = getSpecificDateForDay(dayValue, selectedDate); 
    setSelectedDate(newDateString); 
    setActiveDay(dayValue); 
  };

  return (
    <div className="bg-[#EFF1F3] h-[40px] md:h-[48px] py-1 flex -mt-5 md:-mt-1 rounded-lg pr-1">
      {days.map((day) => (
        <button
          key={day.value}
          onClick={() => handleDayClick(day.value)}
          className={`px-2 py-2 ml-1 h-[30px] w-[59px] md:w-[80px] md:h-[40px] rounded-md border-none font-semibold text-[12px] md:text-[14px] transition-all duration-200 ${
            activeDayValue === day.value
              ? "bg-[#3B82F6] text-white border-[#3B82F6]"
              : "bg-[#EFF1F3] text-black hover:bg-[#3B82F6] hover:text-white"
          }`}
          aria-pressed={activeDayValue === day.value}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
}
