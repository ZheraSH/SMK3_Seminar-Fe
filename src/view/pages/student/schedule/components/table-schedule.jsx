import React from "react";
import { getBgColorBySubject, getIconBySubject } from "@core/utils/subject-helper";
import { Clock } from "lucide-react";

export default function TableSchedule({ scheduleData = [] }) {
  if (!scheduleData.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in duration-500">
          <img src="/images/null/null2.png" alt="Data Kosong" className="w-72 h-auto md:w-[400px] md:h-[285px] mb-6" />
          <p className="text-gray-500 text-center text-sm md:text-md"> Belum ada jadwal di hari ini silahkan koordinasikan kepada wali kelas. </p>
      </div>
    );
  }

  return (
    <div className="w-full ">
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-gray-800 text-center border-collapse">
          <thead>
            <tr className="bg-[#3B82F6] text-white text-sm">
              <th className="px-4 py-4 text-[14px] font-semibold tracking-tight">No</th>
              <th className="px-4 py-4 text-[14px] font-semibold tracking-tight">Penempatan</th>
              <th className="px-4 py-4 text-[14px] font-semibold tracking-tight">Jam</th>
              <th className="px-4 py-4 text-[14px] font-semibold tracking-tight">Mata Pelajaran</th>
              <th className="px-4 py-4 text-[14px] font-semibold tracking-tight">Guru</th>
            </tr>
          </thead>

          <tbody>
            {scheduleData.map((item, index) => {
              const isRest = item.subject?.toLowerCase().includes("istirahat");
              const subjectColor = getBgColorBySubject(item.subject);

              return (
                <tr
                  key={item.id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-[#F0F7FF]"
                    } border-t border-gray-100 transition-colors hover:bg-blue-50/50`}
                >
                  <td className="px-4 py-4 text-gray-600 font-medium">{index + 1}.</td>

                  <td className="px-4 py-4 text-gray-700 text-[14px] ">
                    {item.lesson_hour?.name?.toLowerCase().includes("istirahat") 
                      ? item.lesson_hour?.name 
                      :  ` ${item.lesson_hour?.name}`}
                  </td>

                  <td className="px-4 py-4">
                    <span className={`inline-flex min-w-[120px] py-1.5 px-4 items-center justify-center rounded-full text-white text-[12px] font-medium tracking-tight ${isRest ? "bg-[#F59E0B]" : "bg-[#22C55E]"}`}>
                      {item.lesson_hour?.time}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    {!isRest ? (
                      <span className={`inline-flex min-w-[140px] py-1.5 px-4 items-center justify-center rounded-full text-white text-[12px] font-medium tracking-tight ${subjectColor}`}>
                        {item.subject}
                      </span>
                    ) : (
                      <span className="text-gray-400 font-bold">-</span>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    {!isRest ? (
                      <span className="text-gray-700 text-14 tracking-tight">{item.teacher}</span>
                    ) : (
                      <span className="text-gray-400 font-bold">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3 px-2 py-6">
        {scheduleData.map((item, index) => {
          const subjectColor = getBgColorBySubject(item.subject);
          return (
            <div 
              key={item.id}
              className="relative bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)] p-5 overflow-hidden flex flex-col gap-4 active:scale-[0.99] transition-transform"
            >
              <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-[#3B82F6] text-white px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-tight">
                    {item.lesson_hour?.name}
                  </div>
                  <div className="h-4 w-[1px] bg-gray-200" />
                  <div className="flex items-center gap-1.5 text-gray-400">
                     <Clock size={12} />
                     <span className="text-[12px] font-bold font-mono tracking-tighter">
                        {item.lesson_hour?.time}
                     </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-300">#{index + 1}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[17px] font-black text-gray-800 leading-tight mb-1 truncate">
                    {item.subject}
                  </h3>
                  <p className="text-[13px] text-gray-500 font-medium truncate italic">
                     {item.teacher}
                  </p>
                </div>
              </div>

              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#3B82F6] opacity-70" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

