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

    const errors = {};

    if (
      payload.checkin_start &&
      payload.checkin_end &&
      payload.checkin_end <= payload.checkin_start
    ) {
      errors.checkin_end =
        "Waktu akhir check-in harus setelah waktu mulai check-in";
    }

    if (
      payload.checkin_end &&
      payload.checkout_start &&
      payload.checkout_start <= payload.checkin_end
    ) {
      errors.checkout_start =
        "Waktu mulai check-out harus setelah waktu akhir check-in";
    }

    if (
      payload.checkout_start &&
      payload.checkout_end &&
      payload.checkout_end <= payload.checkout_start
    ) {
      errors.checkout_end =
        "Waktu akhir check-out harus setelah waktu mulai check-out";
    }

    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setError("Terdapat kesalahan dalam pengisian form");
      setSaving(false);
      return;
    }

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