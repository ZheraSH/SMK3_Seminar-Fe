import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { Accept: "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchSummaryClass = async () => {
  try {
    const res = await API.get("/homeroom-teacher/summary-class/header");
    return res.data.data;
  } catch (err) {
    console.error("Error fetchSummaryClass:", err.response || err);
    throw err;
  }
};

export const fetchSummaryClassCard = async () => {
  try {
    const res = await API.get("/homeroom-teacher/dashboard/attendance-counts");
    return res.data.data;
  } catch (err) {
    console.error("Error fetchSummaryClassCard:", err.response || err);
    throw err;
  }
};

export const fetchSummaryClassdaily = async (date, page = 1, search = "" , status = "") => {
  try {
    const res = await API.get("/homeroom-teacher/summary-class/students", {
    params: { 
        date: date,
        page: page ,
        search: search,
        status: status,
      } 
    });
    
    return res.data.data; 
  } catch (err) {
    console.error("Error fetchSummaryClass:", err.response || err);
    return { students: [],pagination: {}}; 
  }
};

export const getCetakRecap = async (date) => {
  const response = await API.get("/homeroom-teacher/summary-class/recap", {
    params: { date},
    responseType: 'blob',
  });
  return response.data; 
};