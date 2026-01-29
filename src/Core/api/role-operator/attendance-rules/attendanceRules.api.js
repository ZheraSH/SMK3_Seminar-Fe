import api from "../../axiosConfig";

export const fetchAttendanceRulesAPI = (day) => {
  return api.get(`/attendance-rules/${day}`);
};

export const saveAttendanceRuleAPI = (selectedDay, payload) => {
  return api.put(`/attendance-rules/${selectedDay}`, payload);
};

export const createAttendanceRuleApi = (payload) => {
  return api.post(`/attendance-rules`, payload);
};