import { useMemo } from "react";

const days = [
  { label: "Senin", value: "monday", index: 1 },
  { label: "Selasa", value: "tuesday", index: 2 },
  { label: "Rabu", value: "wednesday", index: 3 },
  { label: "Kamis", value: "thursday", index: 4 },
  { label: "Jumat", value: "friday", index: 5 },
];

export default function ButtonAttendance({
  selectedDate,
  setSelectedDate,
}) {
  // 1. Deteksi Hari Aktif berdasarkan selectedDate
  const activeDayValue = useMemo(() => {
    if (!selectedDate) return "";
    // Gunakan replace agar kompatibel dengan berbagai browser
    const dateObj = new Date(selectedDate.replace(/-/g, "/"));
    const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return dayNames[dateObj.getDay()];
  }, [selectedDate]);

  // 2. Handler klik hari yang sinkron dengan minggu saat ini
  const handleDayClick = (targetDayIndex) => {
    const current = new Date(selectedDate.replace(/-/g, "/"));
    const currentDay = current.getDay(); // 0 (Sun) - 6 (Sat)
    
    // Normalisasi hari Minggu dari 0 menjadi 7 agar perhitungan selisih konsisten
    const normalizedCurrentDay = currentDay === 0 ? 7 : currentDay;
    
    const diff = targetDayIndex - normalizedCurrentDay;
    const targetDate = new Date(current);
    targetDate.setDate(current.getDate() + diff);

    // Format ke YYYY-MM-DD tanpa masalah Timezone
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, "0");
    const day = String(targetDate.getDate()).padStart(2, "0");
    
    setSelectedDate(`${year}-${month}-${day}`);
  };

  return (
    <div className="bg-[#EFF1F3] h-[40px] md:h-[48px] py-1 flex -mt-5 md:-mt-1 rounded-lg pr-1">
      {days.map((day) => (
        <button
          key={day.value}
          onClick={() => handleDayClick(day.index)} // Langsung kirim index hari
          className={`px-2 py-2 ml-1 h-[30px] w-[59px] md:w-[80px] md:h-[40px] rounded-md border-none font-semibold text-[12px] md:text-[14px] transition-all duration-200 ${
            activeDayValue === day.value
              ? "bg-[#3B82F6] text-white"
              : "bg-[#EFF1F3] text-black hover:bg-[#3B82F6]/10"
          }`}
          aria-pressed={activeDayValue === day.value}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
}