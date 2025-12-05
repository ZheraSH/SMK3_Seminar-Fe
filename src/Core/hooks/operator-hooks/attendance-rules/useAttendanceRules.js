import { useEffect, useState } from "react";
import { DEFAULT_DAYS } from "../../../../view/pages/operator/attendance-rules/constants/attendanceDays";
import {
  fetchAttendanceRulesAPI,
  saveAttendanceRuleAPI,
} from "../../../api/role-operator/attendance-rules/attendanceRules.api";

export default function useAttendanceRules() {
  const [attendanceRules, setAttendanceRules] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const fetchAttendanceRules = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchAttendanceRulesAPI();
      let rules = response.data.data || [];

      rules = rules.map((r) => ({
        ...r,
        day: (r.day || "").trim().toLowerCase(),
      }));

      const mergedRules = DEFAULT_DAYS.map((d) => {
        const found = rules.find((r) => r.day === d.day);
        return (
          found || {
            day: d.day,
            day_label: d.day_label,
            checkin_start: "",
            checkin_end: "",
            checkout_start: "",
            checkout_end: "",
            is_holiday: false,
          }
        );
      });

      setAttendanceRules(mergedRules);

      if (!selectedDay) {
        setSelectedDay(mergedRules[0].day);
      }
    } catch {
      setError("Gagal mengambil data aturan absensi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceRules();
  }, []);

  const selectedDayData = attendanceRules.find((r) => r.day === selectedDay);

  const handleTimeChange = (field, value) => {
    setFieldErrors((prev) => ({ ...prev, [field]: null }));

    setAttendanceRules((prev) =>
      prev.map((r) => (r.day === selectedDay ? { ...r, [field]: value } : r))
    );
  };

  const handleHolidayChange = (e) => {
    const isHoliday = e.target.checked;

    setAttendanceRules((prev) =>
      prev.map((r) =>
        r.day === selectedDay ? { ...r, is_holiday: isHoliday } : r
      )
    );
  };

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
      await saveAttendanceRuleAPI(selectedDay, payload);

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
