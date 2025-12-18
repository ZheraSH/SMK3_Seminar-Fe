// attendanceRules.api.js
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export const fetchAttendanceRulesAPI = () => {
  return axios.get(`${API_BASE}/attendance-rules`);
};

export const saveAttendanceRuleAPI = (selectedDay, payload) => {
  const formattedPayload = {
    checkin_start: payload.checkin_start || null,
    checkin_end: payload.checkin_end || null,
    checkout_start: payload.checkout_start || null,
    checkout_end: payload.checkout_end || null,
    is_holiday: !!payload.is_holiday,
  };

  return axios.put(`${API_BASE}/attendance-rules/day/${selectedDay}`, formattedPayload);
};
