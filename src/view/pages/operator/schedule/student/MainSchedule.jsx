import { useState } from "react";

export default function MainScheduleStudent() {
  const scheduleData = [
    // Senin
    { day: "Senin", jam: "07.00 - 08.30", penetapan: "Jam ke 1-2", mata_pelajaran: "Bahasa Indonesia", guru: "Bu Sundari" },
    { day: "Senin", jam: "08.30 - 09.15", penetapan: "Jam ke 3", mata_pelajaran: "Matematika", guru: "Bu Nining" },
    { day: "Senin", jam: "09.15 - 10.00", penetapan: "Istirahat Pertama", mata_pelajaran: "-", guru: "-" },
    { day: "Senin", jam: "10.00 - 11.30", penetapan: "Jam ke 4-5", mata_pelajaran: "PJOK", guru: "Pak Atik" },
    { day: "Senin", jam: "11.30 - 13.45", penetapan: "Jam ke 6-7", mata_pelajaran: "Produktif", guru: "Bu Nanik" },
    { day: "Senin", jam: "12.15 - 13.00", penetapan: "Istirahat Kedua", mata_pelajaran: "-", guru: "-" },
    { day: "Senin", jam: "13.45 - 15.15", penetapan: "Jam ke 7-8", mata_pelajaran: "Produktif", guru: "Dedy Irwandi" },
    { day: "Senin", jam: "15.15 - 16.00", penetapan: "Jam ke 8", mata_pelajaran: "Bahasa Arab", guru: "Ustazah Dwi" },

     // Selasa
    { day: "Selasa", jam: "07.00 - 08.30", penetapan: "Jam ke-1-2", mata_pelajaran: "Bahasa Inggris", guru: "Bu Lilis" },
    { day: "Selasa", jam: "08.30 - 10.00", penetapan: "Jam ke-3-4", mata_pelajaran: "IPA", guru: "Bu Ratna" },
    { day: "Selasa", jam: "10.15 - 11.45", penetapan: "Jam ke-5-6", mata_pelajaran: "IPS", guru: "Pak Rudi" },

    // Rabu
    { day: "Rabu", jam: "07.00 - 08.30", penetapan: "Jam ke-1-2", mata_pelajaran: "Matematika", guru: "Pak Budi" },
    { day: "Rabu", jam: "08.30 - 10.00", penetapan: "Jam ke-3-4", mata_pelajaran: "Bahasa Indonesia", guru: "Bu Sri" },
    { day: "Rabu", jam: "10.15 - 11.45", penetapan: "Jam ke-5-6", mata_pelajaran: "Seni Budaya", guru: "Bu Tika" },

    // Kamis
    { day: "Kamis",  jam: "07.00 - 08.30", penetapan: "Jam ke-1-2", mata_pelajaran: "Agama", guru: "Pak Hadi" },
    { day: "Kamis",  jam: "08.30 - 10.00", penetapan: "Jam ke-3-4", mata_pelajaran: "PPKn", guru: "Bu Wulan" },
    { day: "Kamis",  jam: "10.15 - 11.45", penetapan: "Jam ke-5-6", mata_pelajaran: "Prakarya", guru: "Bu Nani" },

    // Jumat
    { day: "Jumat",  jam: "07.00 - 08.00", penetapan: "Jam ke-1", mata_pelajaran: "Bahasa Inggris", guru: "Bu Lilis" },
    { day: "Jumat",  jam: "08.00 - 09.00", penetapan: "Jam ke-2", mata_pelajaran: "Matematika", guru: "Pak Budi" },
    { day: "Jumat",  jam: "09.15 - 10.15", penetapan: "Jam ke-3", mata_pelajaran: "Penjas", guru: "Pak Andi" },
  ];

  const [activeDay, setActiveDay] = useState("Senin");
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

  return (
    <div className="justify-center mx-7 mb-10">
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
            <div className=" bg-gray-100 py-1 rounded-lg pr-1 ">
                {days.map((day) => (
                    <button
                        key={day}
                        onClick={() => setActiveDay(day)}
                        className={`px-4 py-2 ml-1 rounded-md border-none font-bold transition-all duration-200 ${
                        activeDay === day
                            ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                            : "bg-gray-100 text-black hover:bg-[#3B82F6] hover:text-white"
                        }`}
                    >
                        {day}
                    </button>
                    ))}
            </div>
        </div>

      <div className="mt-4 w-full overflow-x-auto rounded-lg border border-gray-200 ">
        <table className="w-full text-sm text-gray-800">
          <thead>
            <tr className="bg-[#3B82F6] text-white text-base">
              <th className="px-4 py-3 text-left font-light border-r border-[#3B82F6]">No</th>
              <th className="px-4 py-3 text-left font-light border-r border-[#3B82F6]">Jam</th>
              <th className="px-4 py-3 text-left font-light border-r border-[#3B82F6]">Penempatan</th>
              <th className="px-4 py-3 text-left font-light border-r border-[#3B82F6]">Mata Pelajaran</th>
              <th className="px-4 py-3 text-left font-light">Guru</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData
              .filter((item) => item.day === activeDay)
              .map((item, index) => {
                const isIstirahat = item.penetapan.toLowerCase().includes("istirahat");
                return (
                  <tr
                    key={index}
                    className="border-t  border-gray-200 hover:bg-gray-50 transition text-sm font-semibold"
                  >
                    <td className="px-4 py-3 text-left ">
                      {index + 1}.
                    </td>
                    <td className="px-4 py-3 ">
                      <span
                        className={`px-2 py-1 rounded-md font-medium ${
                          isIstirahat
                            ? "bg-yellow-200/40 text-yellow-400"
                            : "bg-emerald-500/30 text-emerald-500"
                        }`}
                      >
                        {item.jam}
                      </span>
                    </td>
                    <td className="px-4 py-3">{item.penetapan}</td>
                    <td className="px-4 py-3 ">{item.mata_pelajaran}</td>
                    <td className="px-4 py-3">{item.guru}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
