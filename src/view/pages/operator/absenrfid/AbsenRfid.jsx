"use client";
import { Clock, Save } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import HeaderPage from "../../../components/elements/header/Header.Page";

const API_BASE = "http://127.0.0.1:8000/api";

export default function AttendanceRulesPage() {
  const [attendanceRules, setAttendanceRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  // Fetch awal
  const fetchAttendanceRules = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.get(`${API_BASE}/attendance-rules`);
      let rules = response.data.data || [];
  
      // Normalisasi hardcore biar indexOf gak pernah -1
      rules = rules.map((r) => ({
        ...r,
        day: (r.day || "")
          .toString()
          .trim()
          .toLowerCase()
          .replace(/\s+/g, ""), // hapus hidden whitespace
      }));
  
      const order = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];
  
      // Sort fix
      const sorted = rules.sort(
        (a, b) => order.indexOf(a.day) - order.indexOf(b.day)
      );
  
      console.log("SETELAH SORT:", sorted);
  
      setAttendanceRules(sorted);
      if (sorted.length > 0) setSelectedDay(sorted[0].day);
    } catch (err) {
      setError("Gagal mengambil data aturan absensi");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAttendanceRules();
  }, []);
  
  const selectedDayData = attendanceRules.find((r) => r.day === selectedDay);

  // Update input waktu
  const handleTimeChange = (field, value) => {
    setFieldErrors((prev) => ({ ...prev, [field]: null }));

    setAttendanceRules((prev) =>
      prev.map((r) =>
        r.day === selectedDay ? { ...r, [field]: value } : r
      )
    );
  };

  // Checkbox libur
  const handleHolidayChange = async (e) => {
    const isHoliday = e.target.checked;

    const updated = {
      ...selectedDayData,
      is_holiday: isHoliday,
      ...(isHoliday && {
        checkin_start: "00:00",
        checkin_end: "00:00",
        checkout_start: "00:00",
        checkout_end: "00:00",
      }),
    };

    setAttendanceRules((prev) =>
      prev.map((r) => (r.day === selectedDay ? updated : r))
    );

    try {
      await axios.post(`${API_BASE}/attendance-rules/day/${selectedDay}`, updated);

      setSuccess(
        isHoliday
          ? "Hari berhasil ditandai sebagai libur"
          : "Hari berhasil ditandai sebagai aktif"
      );
    } catch (err) {
     
    }
  };

  // Simpan jam
  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    setFieldErrors({});

    const payload = {
      checkin_start: selectedDayData.checkin_start,
      checkin_end: selectedDayData.checkin_end,
      checkout_start: selectedDayData.checkout_start,
      checkout_end: selectedDayData.checkout_end,
      is_holiday: selectedDayData.is_holiday,
    };

    try {
      await axios.post(
        `${API_BASE}/attendance-rules/day/${selectedDay}`,
        payload
      );

      setSuccess("Data berhasil disimpan!");
      fetchAttendanceRules();
    } catch (err) {
      if (err.response?.data?.errors) {
        setFieldErrors(err.response.data.errors);
        setError("Terdapat kesalahan dalam pengisian form");
      } else {
        setError("Gagal menyimpan data");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="mx-5">
      <HeaderPage
        h1="Pengaturan Jam Absensi Siswa"
        p="Atur jam masuk dan jam pulang siswa."
      />

      <div className="p-6 max-w-6xl mx-auto bg-white border border-gray-300 rounded-2xl mb-10 shadow-lg">
        {/* Tabs Hari */}
        <div className="flex flex-wrap bg-gray-100 rounded-lg max-w-[760px] justify-between mb-6 ">
          {attendanceRules.map((rule) => (
            <button
              key={rule.day}
              onClick={() => {
                setSelectedDay(rule.day);
                setError(null);
                setSuccess(null);
                setFieldErrors({});
              }}
              className={`px-5 py-3 rounded-lg text-sm font-medium transition-all ${
                selectedDay === rule.day
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {rule.day_label}
            </button>
          ))}
        </div>

        {selectedDayData && (
          <>
            {/* Error Global */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {success}
              </div>
            )}

            {/* Input Jam */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Jam Masuk */}
              <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    Jam Masuk
                  </span>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="time"
                      value={selectedDayData.checkin_start}
                      disabled={selectedDayData.is_holiday}
                      onChange={(e) =>
                        handleTimeChange("checkin_start", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md ${
                        fieldErrors.checkin_start
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                    />
                    {fieldErrors.checkin_start && (
                      <p className="text-red-500 text-xs mt-1">
                        {fieldErrors.checkin_start[0]}
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <input
                      type="time"
                      value={selectedDayData.checkin_end}
                      disabled={selectedDayData.is_holiday}
                      onChange={(e) =>
                        handleTimeChange("checkin_end", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md ${
                        fieldErrors.checkin_end
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                    />
                    {fieldErrors.checkin_end && (
                      <p className="text-red-500 text-xs mt-1">
                        {fieldErrors.checkin_end[0]}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Jam Pulang */}
              <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    Jam Pulang
                  </span>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="time"
                      value={selectedDayData.checkout_start}
                      disabled={selectedDayData.is_holiday}
                      onChange={(e) =>
                        handleTimeChange("checkout_start", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md ${
                        fieldErrors.checkout_start
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                    />
                    {fieldErrors.checkout_start && (
                      <p className="text-red-500 text-xs mt-1">
                        {fieldErrors.checkout_start[0]}
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <input
                      type="time"
                      value={selectedDayData.checkout_end}
                      disabled={selectedDayData.is_holiday}
                      onChange={(e) =>
                        handleTimeChange("checkout_end", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md ${
                        fieldErrors.checkout_end
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      }`}
                    />
                    {fieldErrors.checkout_end && (
                      <p className="text-red-500 text-xs mt-1">
                        {fieldErrors.checkout_end[0]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            

            {selectedDayData.is_holiday && (
              <div className="mb-6 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                Hari ini ditandai sebagai libur. Jam absensi tidak berlaku.
              </div>
            )}

            <div className="flex justify-between">

              {/* Checkbox libur */}
            <div className="flex items-center gap-2 cursor-pointer ">
              <input
                type="checkbox"
                checked={selectedDayData.is_holiday}
                onChange={handleHolidayChange}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Libur</span>
            </div>

            <div className=""></div>

              <button
                onClick={handleSave}
                disabled={saving || selectedDayData.is_holiday}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
                  saving || selectedDayData.is_holiday
                    ? "bg-gray-400 cursor-not-allowed"
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
