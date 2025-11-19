import React from "react";
import { Clock } from "lucide-react";

export default function AbsenRfid() {
  // Komponen TimeRange (dipindahkan ke luar untuk keringkasan)
  const TimeRangeInput = () => (
    <div className="flex items-center justify-center space-x-20">
      {/* Mulai */}
      <div className="flex flex-col items-start">
        <label className="text-sm text-gray-600 font-medium">Mulai</label>
        <div className="mt-1 flex justify-center items-center 
                        border border-gray-300 bg-gray-100 rounded-xl 
                        px-4 py-1.5 w-30 h-9 shadow-sm cursor-pointer">
          <span className="text-sm text-gray-500">-- : --</span>
        </div>
      </div>

      {/* Panah Pemisah */}
      <div className="mt-6 text-xl text-gray-700">
        &rarr;
      </div>

      {/* Selesai */}
      <div className="flex flex-col items-start">
        <label className="text-sm text-gray-600 font-medium">Selesai</label>
        <div className="mt-1 flex justify-center items-center 
                        border border-gray-300 bg-gray-100 rounded-xl 
                        px-4 py-1.5 w-30 h-9 shadow-sm cursor-pointer">
          <span className="text-sm text-gray-500">-- : --</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="justify-center mt-8 mx-7">
        <div className="relative w-full h-[166px] mt-6 bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px] shadow-md">
          <div className="absolute inset-0 flex flex-col mt-2 rounded-[6px]">
            <div className="ml-6">
              <h1 className="text-white text-[30px] font-semibold drop-shadow-lg">
                Pengaturan Jam Absensi Siswa
              </h1>
              <p className="text-white text-[14px] font-light drop-shadow-md">
                Atur jam masuk dan jam pulang siswa.
              </p>
            </div>
          </div>
        </div>
        <div className="p-5 mt-5 mb-10 bg-white rounded-2xl shadow-lg border border-gray-300 space-y-6">
          {/* Tabs Hari */}
          <div className="flex space-x-2 ">
            <div className="bg-[#EFF1F3] rounded-2xl p-1"> {/* Menambahkan p-1 agar tab terlihat lebih baik */}
              {[
                "Senin",
                "Selasa",
                "Rabu",
                "Kamis",
                "Jumat",
                "Sabtu",
                "Minggu",
              ].map((day, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                    i === 0 ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Jam Masuk */}
            <div className="border border-gray-300 rounded-2xl shadow-sm p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Jam Masuk
                </span>
              </div>
              
            
              <TimeRangeInput />
             
            </div>

            {/* Jam Pulang */}
            <div className="border border-gray-300 rounded-2xl shadow-sm p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                  Jam Pulang
                </span>
              </div>

              {/* === KODE YANG DIUBAH (Jam Pulang) === */}
              <TimeRangeInput />
              {/* ==================================== */}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            {/* Checkbox "Libur" */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500" />
              <span className="text-sm text-gray-700">Libur</span>
            </label>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-md">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}