"use client";
import { Clock, Save } from "lucide-react";
import HeaderPage from "../../../components/elements/header/Header.Page";
import useAttendanceRules from "../../../../Core/hooks/operator-hooks/attendance-rules/useAttendanceRules";
import LoadingData from "../../../components/Loading/Data";


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

  if (loading) {
    return <LoadingData loading={loading} />;
  }

  return (
    <div className="mx-3 sm:mx-5">
      <HeaderPage
        h1="Pengaturan Jam Absensi Siswa"
        p="Atur jam masuk dan jam pulang siswa."
      />

      <div className="p-4 sm:p-6 max-w-6xl mx-auto bg-white border border-gray-300 rounded-2xl mb-10 shadow-lg">
        <div className="flex gap-2 overflow-x-auto no-scrollbar bg-gray-100 rounded-lg p-2 mb-6 w-[650px]">
          {attendanceRules.map((rule) => (
            <button
              key={rule.day}
              onClick={() => {
                setSelectedDay(rule.day);
                setError(null);
                setSuccess(null);
                setFieldErrors({});
              }}
              className={`px-5 py-2 rounded-lg text-sm whitespace-nowrap
                ${
                  selectedDay === rule.day
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {rule.day_label}
            </button>
          ))}
        </div>

        {selectedDayData && (
          <>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {success}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    Jam Masuk
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="time"
                    value={selectedDayData.checkin_start}
                    onChange={(e) =>
                      handleTimeChange("checkin_start", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-md ${
                      fieldErrors.checkin_start
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                  />

                  <input
                    type="time"
                    value={selectedDayData.checkin_end}
                    onChange={(e) =>
                      handleTimeChange("checkin_end", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-md ${
                      fieldErrors.checkin_end
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                  />
                </div>
              </div>

              <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    Jam Pulang
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="time"
                    value={selectedDayData.checkout_start}
                    onChange={(e) =>
                      handleTimeChange("checkout_start", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-md ${
                      fieldErrors.checkout_start
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                  />

                  <input
                    type="time"
                    value={selectedDayData.checkout_end}
                    onChange={(e) =>
                      handleTimeChange("checkout_end", e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-md ${
                      fieldErrors.checkout_end
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedDayData.is_holiday}
                  onChange={handleHolidayChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Libur</span>
              </label>

              <button
                onClick={handleSave}
                disabled={saving}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium w-full sm:w-auto ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <Save className="w-4 h-4" />
                {saving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
