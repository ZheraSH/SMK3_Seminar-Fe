import axios from "axios";

const API = "http://127.0.0.1:8000/api/school-years";

export const fetchSchoolYearsAPI = (page) =>
  axios.get(`${API}?page=${page}`);

export const createSchoolYearAPI = () =>
  axios.post(API);

export const deleteSchoolYearAPI = (id) =>
  axios.delete(`${API}/${id}`);

export const activateSchoolYearAPI = (id) =>
  axios.post(`${API}/${id}/activate`);
