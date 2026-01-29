// ButtonAttendance.jsx
const days = [
  { label: "Senin", value: "monday" },
  { label: "Selasa", value: "tuesday" },
  { label: "Rabu", value: "wednesday" },
  { label: "Kamis", value: "thursday" },
  { label: "Jumat", value: "friday" },
];

export default function ButtonAttendance({ setActiveDay, activeDay }) {
  return (
    <div className="bg-[#EFF1F3] w-full md:w-auto h-[40px] md:h-[48px] py-1 flex -mt-5 md:-mt-1 rounded-lg pr-1">
      {days.map((day) => (
        <button
          key={day.value}
          onClick={() => setActiveDay(day.value)}
          className={`px-2 py-2 ml-1 h-[30px] w-full md:w-[80px] md:h-[40px] rounded-md border-none font-semibold text-[12px] md:text-[14px] transition-all duration-200 ${
            activeDay === day.value
              ? "bg-[#3B82F6] text-white border-[#3B82F6]"
              : "bg-[#EFF1F3] text-black hover:bg-[#3B82F6] hover:text-white"
          }`}
          aria-pressed={activeDay === day.value}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
}
