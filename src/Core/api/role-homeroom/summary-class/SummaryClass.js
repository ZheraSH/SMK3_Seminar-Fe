import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
  },
});

// Interceptor untuk inject token otomatis
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch daily summary-class
export const fetchSummaryClass = async (date) => {
  try {
    const res = await API.get("/homeroom-teacher/summary-class", {
      params: { date },
    });
    // console.log("summary class:",res.data.data)
    return res.data;
  } catch (err) {
    console.error("Error fetchSummaryClass:", err.response || err);
    throw err;
  }
};

// Fetch weekly summary-class
export const fetchSummaryClassWeekly = async (start_date, end_date) => {
  try {
    const res = await API.get("/homeroom-teacher/summary-class/weekly-attendance", {
      params: { start_date, end_date },
    });
    // console.log("Weekly:",res.data.data)
    return res.data;
  } catch (err) {
    console.error("Error fetchSummaryClassWeekly:", err.response || err);
    throw err;
  }
};

export const fetchSummaryClassdaily = async (date) => {
  try {
    const res = await API.get("/homeroom-teacher/summary-class/daily-attendance", {
      params: { date },
    });

    // console.log("Daily Data:", res.data?.data);
    return res.data?.data ?? null;
  } catch (err) {
    console.error("Error fetchSummaryClassdaily:", err.response || err);
    throw err;
  }
};


export default API; // kalau mau akses Axios instance langsung
