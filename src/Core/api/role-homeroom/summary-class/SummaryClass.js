import api from "../../axiosConfig";


export const fetchSummaryClass = async () => {
  try {
    const res = await api.get("/homeroom-teacher/summary-class/header");
    return res.data.data;
  } catch (err) {
    console.error("Error fetchSummaryClass:", err.response || err);
    throw err;
  }
};

export const fetchSummaryClassCard = async () => {
  try {
    const res = await api.get("/homeroom-teacher/dashboard/attendance-counts");
    return res.data.data;
  } catch (err) {
    console.error("Error fetchSummaryClassCard:", err.response || err);
    throw err;
  }
};

export const fetchSummaryClassdaily = async (date, page = 1, search = "", status = "") => {
  try {
    const res = await api.get("/homeroom-teacher/summary-class/students", {
      params: { 
        date, 
        page, 
        search, 
        status 
      }
    });
    return res.data.data; 
  } catch (err) {
    console.error("Error fetchSummaryClassDaily:", err.response || err);
    return { students: [], pagination: {} }; 
  }
};


export const getCetakRecap = async (date, status = "") => {
  try {
    const response = await api.get("/homeroom-teacher/summary-class/recap", {
      params: { date, status },
      responseType: 'blob', 
    });
    return response.data;
  } catch (err) {
    console.error("Error getCetakRecap:", err.response || err);
    throw err;
  }
};