import { useEffect, useState } from "react";
import { DEFAULT_DAYS } from "../../../../view/pages/operator/attendance-rules/constants/attendanceDays";
import { 
  fetchAttendanceRulesAPI, 
  saveAttendanceRuleAPI, 
  createAttendanceRuleApi 
} from "../../../api/role-operator/attendance-rules/attendanceRules.api";

export default function useAttendanceRules() {
  const [isExistingData, setIsExistingData] = useState(false);
  const [attendanceRules, setAttendanceRules] = useState(
    DEFAULT_DAYS.map((d) => ({ 
      day: d.day, 
      day_label: d.day_label, 
      checkin_start: "", 
      checkin_end: "", 
      checkout_start: "", 
      checkout_end: "", 
      is_holiday: false,
    }))
  );

  const [selectedDay, setSelectedDay] = useState("monday");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Definisi selectedDayData agar bisa dipakai di handleSave
  const selectedDayData = attendanceRules.find((r) => r.day === selectedDay);

  const fetchAttendanceRules = async () => {
    if (!selectedDay) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAttendanceRulesAPI(selectedDay);
      const ruleFromApi = response.data.data;

      if (ruleFromApi) {
        setIsExistingData(true);
        setAttendanceRules((prev) =>
          prev.map((r) => {
            if (r.day === selectedDay) {
              return {
                ...r,
                // Mengambil value string jika day berupa object {value: 'monday', label: 'Senin'}
                day: typeof ruleFromApi.day === 'object' ? ruleFromApi.day.value : ruleFromApi.day,
                checkin_start: ruleFromApi.checkin_start?.substring(0, 5) || "",
                checkin_end: ruleFromApi.checkin_end?.substring(0, 5) || "",
                checkout_start: ruleFromApi.checkout_start?.substring(0, 5) || "",
                checkout_end: ruleFromApi.checkout_end?.substring(0, 5) || "",
                is_holiday: !!ruleFromApi.is_holiday,
              };
            }
            return r;
          })
        );
      }
    } catch (err) {
      setIsExistingData(false);
      // Reset form ke kosong jika data tidak ditemukan di DB
      setAttendanceRules((prev) =>
        prev.map((r) => (r.day === selectedDay ? { ...r, checkin_start: "", checkin_end: "", checkout_start: "", checkout_end: "", is_holiday: false } : r))
      );
      console.warn(`Data hari ${selectedDay} belum ada.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceRules();
  }, [selectedDay]);

  const handleTimeChange = (field, value) => {
    setFieldErrors((prev) => ({ ...prev, [field]: null }));
    setAttendanceRules((prev) =>
      prev.map((r) => (r.day === selectedDay ? { ...r, [field]: value } : r))
    );
  };

  const handleHolidayChange = (e) => {
    const isHoliday = e.target.checked;
    setAttendanceRules((prev) =>
      prev.map((r) => (r.day === selectedDay ? { ...r, is_holiday: isHoliday } : r))
    );
  };

  const handleSave = async () => {
    if (!selectedDayData) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    setFieldErrors({});

    const payload = {
      day: selectedDay, 
      checkin_start: selectedDayData.checkin_start,
      checkin_end: selectedDayData.checkin_end,
      checkout_start: selectedDayData.checkout_start,
      checkout_end: selectedDayData.checkout_end,
      is_holiday: selectedDayData.is_holiday ? 1 : 0,
    };

    try {
      if (isExistingData) {
        await saveAttendanceRuleAPI(selectedDay, payload);
        setSuccess(`Berhasil memperbarui data hari ${selectedDayData.day_label}`);
      } else {
        await createAttendanceRuleApi(payload);
        setSuccess(`Berhasil membuat data baru hari ${selectedDayData.day_label}`);
      }
      fetchAttendanceRules(); 
    } catch (err) {
      if (err.response?.data?.errors) {
        setFieldErrors(err.response.data.errors);
      }
      setError(err.response?.data?.message || "Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  return {
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
    fetchAttendanceRules,
    setError,
    setSuccess,
    setFieldErrors,
  };
}