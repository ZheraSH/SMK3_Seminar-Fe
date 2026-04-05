import api from "../../axiosConfig";
import { notify } from "../../../hooks/notification/notify";

export const fetchAttendanceRulesAPI = (day) => {
  return api.get(`/attendance-rules/${day}`);
};

export const saveAttendanceRuleAPI = async (selectedDay, payload) => {
  const response = await api.put(`/attendance-rules/${selectedDay}`, payload);
  notify("Berhasil menyimpan data!", "success");
  return response;
};

export const createAttendanceRuleApi = (payload) => {
  return api.post(`/attendance-rules`, payload);
};