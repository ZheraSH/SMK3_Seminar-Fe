import { scheduleData } from "../../../../../Core/Data/SiswaData";


export default function TableSchedule ({activeDay}) {
    return (
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
    );
}