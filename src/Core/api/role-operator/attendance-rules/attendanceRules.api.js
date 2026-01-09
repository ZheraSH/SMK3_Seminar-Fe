import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export const fetchAttendanceRulesAPI = (day) => {
  return axios.get(`${API_BASE}/attendance-rules/${day}`);
};

export const saveAttendanceRuleAPI = (selectedDay, payload) => {
  return axios.put(`${API_BASE}/attendance-rules/${selectedDay}`, payload);
};

export const createAttendanceRuleApi = (payload) => {
  return axios.post(`${API_BASE}/attendance-rules`, payload);
};