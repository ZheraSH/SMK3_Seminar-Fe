import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export const fetchAttendanceRulesAPI = () => {
  return axios.get(`${API_BASE}/attendance-rules`);
};

export const saveAttendanceRuleAPI = (selectedDay, payload) => {
  return axios.post(`${API_BASE}/attendance-rules/day/${selectedDay}`, payload);
};
