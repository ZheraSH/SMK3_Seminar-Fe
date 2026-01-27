"use client";
import { Save, ArrowRight } from "lucide-react";
import useAttendanceRules from "../../../../Core/hooks/operator-hooks/attendance-rules/useAttendanceRules";
import LoadingData from "../../../components/elements/loadingData/loading";

export default function AttendanceRulesPage() {
  const {
    attendanceRules,
    selectedDay,
    setSelectedDay,
    selectedDayData,
    error,
    success,
    loading,
    saving,
    fieldErrors,
    handleTimeChange,
    handleHolidayChange,
    handleSave,
    setError,
    setSuccess,
    setFieldErrors,
  } = useAttendanceRules();

  

  return (
    <div className="mx-3 sm:mx-5">
      <style jsx global>{`
        input[type="time"]::-webkit-calendar-picker-indicator {
          display: none;
          -webkit-appearance: none;
          opacity: 0;
          pointer-events: none;
        }
        input[type="time"]::-ms-expand {
          display: none;
        }
        input[type="time"] {
          -moz-appearance: textfield;
          -webkit-appearance: none;
          appearance: none;
        }
      `}</style>

      {loading? 
      (<LoadingData loading={loading} type="kotakRfid"/>)
      :(
        <div className="bg-white mt-8 w-full rounded-lg p-4 mb-6 drop-shadow-md">
          <div className="bg-[#FEF3C7] lg:p-6 md:p-4 p-3 rounded-md mb-4">
            <p className="lg:text-[20px] md:text-[18px] sm:text-[16px] font-semibold text-[#FFAA05] mb-3">Informasi</p>
            <ul className="list-disc lg:text-[16px] md:text-[14px] text-[12px] space-y-1 ml-4">
              <li>Pilih hari terlebih dahulu untuk mengatur jam operasional absensi.</li>
              <li>Format waktu menggunakan format 24 jam (Contoh: 07:00).</li>
              <li>Klik tombol simpan setelah melakukan perubahan data pada setiap hari.</li>
            </ul>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar rounded-lg p-2 w-full">
            {attendanceRules.map((rule) => (
              <button
                key={rule.day}
                onClick={() => {
                  setSelectedDay(rule.day);
                  setError(null);
                  setSuccess(null);
                  setFieldErrors({});
                }}
                className={`px-5 py-2 rounded-lg text-sm whitespace-nowrap transition-all drop-shadow-sm
                  ${selectedDay === rule.day 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-[#CBD5E1]"}`}
              >
                {rule.day_label}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading? (<LoadingData loading={loading} type="kotakRfid2" />)
       : (
            <div className="p-4 sm:p-6 max-w-6xl mx-auto bg-white border border-gray-300 rounded-2xl mb-10 shadow-lg relative">
              {loading && (
                <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center rounded-2xl">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}

              <div className="mb-6 lg:text-start md:text-start text-center">
                <span className="text-[24px] font-semibold">Pengaturan Jam {selectedDayData?.day_label}</span>
              </div>

              {selectedDayData && (
                <>
                  {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                      <p>Terjadi Kesalahan</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-4">
                        <span className="text-[18px] font-semibold">Jam Masuk</span>
                      </div>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 gap-4">
                        <div className="flex-1">
                          <p className="mb-2 text-sm font-medium text-gray-600">Mulai</p>
                          <input
                            type="time"
                            value={selectedDayData.checkin_start || ""}
                            onChange={(e) => handleTimeChange("checkin_start", e.target.value)}
                            disabled={selectedDayData.is_holiday}
                            className={`w-full px-3 py-2 border rounded-md outline-none transition-all 
                              ${selectedDayData.is_holiday ? "bg-gray-100 cursor-not-allowed" : ""}
                              ${fieldErrors.checkin_start ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"}`}
                          />
                          {fieldErrors.checkin_start && <p className="text-red-500 text-xs mt-1">{fieldErrors.checkin_start}</p>}
                        </div>
                        <ArrowRight className="hidden lg:block w-5 h-5 mt-6 text-gray-400" />
                        <div className="flex-1">
                          <p className="mb-2 text-sm font-medium text-gray-600">Selesai</p>
                          <input
                            type="time"
                            value={selectedDayData.checkin_end || ""}
                            onChange={(e) => handleTimeChange("checkin_end", e.target.value)}
                            disabled={selectedDayData.is_holiday}
                            className={`w-full px-3 py-2 border rounded-md outline-none transition-all 
                              ${selectedDayData.is_holiday ? "bg-gray-100 cursor-not-allowed" : ""}
                              ${fieldErrors.checkin_end ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"}`}
                          />
                          
                        </div>
                      </div>
                      {fieldErrors.checkin_end && <p className="text-red-500 text-xs mt-2">{fieldErrors.checkin_end}</p>}
                    </div>

                    <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-4">
                        <span className="text-[18px] font-semibold">Jam Pulang</span>
                      </div>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6 gap-4">
                        <div className="flex-1">
                          <p className="mb-2 text-sm font-medium text-gray-600">Mulai</p>
                          <input
                            type="time"
                            value={selectedDayData.checkout_start || ""}
                            onChange={(e) => handleTimeChange("checkout_start", e.target.value)}
                            disabled={selectedDayData.is_holiday}
                            className={`w-full px-3 py-2 border rounded-md outline-none transition-all 
                              ${selectedDayData.is_holiday ? "bg-gray-100 cursor-not-allowed" : ""}
                              ${fieldErrors.checkout_start ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"}`}
                          />
                          {fieldErrors.checkout_start && <p className="text-red-500 text-xs mt-1">{fieldErrors.checkout_start}</p>}
                        </div>
                        <ArrowRight className="hidden lg:block w-5 h-5 mt-6 text-gray-400" />
                        <div className="flex-1">
                          <p className="mb-2 text-sm font-medium text-gray-600">Selesai</p>
                          <input
                            type="time"
                            value={selectedDayData.checkout_end || ""}
                            onChange={(e) => handleTimeChange("checkout_end", e.target.value)}
                            disabled={selectedDayData.is_holiday}
                            className={`w-full px-3 py-2 border rounded-md outline-none transition-all 
                              ${selectedDayData.is_holiday ? "bg-gray-100 cursor-not-allowed" : ""}
                              ${fieldErrors.checkout_end ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500"}`}
                          />
                        </div>
                      </div>
                      {fieldErrors.checkout_end && <p className="text-red-500 text-xs mt-2">{fieldErrors.checkout_end}</p>}
                    </div>
                  </div>
                  

                  <div className="flex flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-100">
                    <label htmlFor="holiday-toggle" className="flex items-center gap-4 cursor-pointer group">
                      <input
                        id="holiday-toggle"
                        type="checkbox"
                        checked={selectedDayData.is_holiday}
                        onChange={handleHolidayChange}
                        className="sr-only peer"
                      />
                      <div className="relative w-12 h-6 bg-gray-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                      <span className="text-lg text-gray-800 font-medium group-hover:text-blue-600">Libur</span>
                    </label>

                    <button
                      onClick={handleSave}
                      disabled={saving || loading}
                      className={`flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-medium transition-all
                        ${saving || loading 
                          ? "bg-gray-400 cursor-not-allowed text-white" 
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95"}`}
                    >
                      <Save className="w-4 h-4" />
                      {saving ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                  </div>
                </>
              )}
            </div>

       )}
    </div>
  );
}