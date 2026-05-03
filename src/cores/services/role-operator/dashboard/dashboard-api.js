import api from "@services/axios-config";

const API_BASE_URL = "/dashboard";

export const fetchDashboardCounters = async () => {
  try {
    const res = await api.get(`${API_BASE_URL}/counters`);
    return res.data.data;
  } catch (error) {
    console.error(" API ERROR (counters):", error);
    throw error;
  }
};


export const fetchTapHistory = async (classroomId = "", search = "") => {
  try {
    const params = {};
    if (classroomId) params.classroom_id = classroomId;
    if (search) params.search = search;
    
    const res = await api.get(`${API_BASE_URL}/tap-history`, { params });
    return res.data.data;
  } catch (err) {
    console.error("TAP HISTORY ERROR:", err);
    throw err;
  }
};

export const fetchClassrooms = async () => {
  try {
    const res = await api.get("/classrooms");
    return res.data.data;
  } catch (err) {
    console.error("CLASSROOMS ERROR:", err);
    throw err;
  }
};

export const fetchStatisticToday = async () => {
  try {
    const res = await api.get(`${API_BASE_URL}/statistic-today`);
    return res.data.data;
  } catch (err) {
    console.error("STAT TODAY ERROR:", err);
    throw err;
  }
};


export const fetchStatisticMonthly = async () => {
  try {
    const res = await api.get(`${API_BASE_URL}/statistic-monthly`);
    return res.data.data;
  } catch (err) {
    console.error("STAT MONTHLY ERROR:", err);
    throw err;
  }
};

export const fetchActiveSchoolYear = async () => {
  try {
    const res = await api.get("/school-years/active");
    return res.data.data;
  } catch (err) {
    console.error("ACTIVE SCHOOL YEAR ERROR:", err);
    throw err;
  }
}

export const fetchActiveSemester = async () => {
  try {
    const res = await api.get("/semesters/active");
    return res.data.data;
  } catch (err) {
    console.error("ACTIVE SEMESTER ERROR:", err);
    throw err;
  }
}



