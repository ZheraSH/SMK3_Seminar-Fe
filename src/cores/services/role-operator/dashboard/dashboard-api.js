import api from "@services/axios-config";

const API_BASE_URL = "/dashboard";

export const fetchDashboardCounters = async () => {
  try {
    const res = await api.get(`${API_BASE_URL}/counters`);
    return res.data.data;
  } catch (error) {throw error;
  }
};


export const fetchTapHistory = async (classroomId = "", search = "", page = 1) => {
  try {
    const params = { page };
    if (classroomId) params.classroom_id = classroomId;
    if (search) params.search = search;

    const res = await api.get(`${API_BASE_URL}/tap-history`, { params });
    return {
      data: res.data.data || [],
      meta: res.data.meta || {}
    };
  } catch (err) {throw err;
  }
};

export const fetchClassrooms = async () => {
  try {
    const res = await api.get("/classrooms");
    return res.data.data;
  } catch (err) {throw err;
  }
};

export const fetchStatisticToday = async () => {
  try {
    const res = await api.get(`${API_BASE_URL}/statistic-today`);
    return res.data.data;
  } catch (err) {throw err;
  }
};


export const fetchStatisticMonthly = async () => {
  try {
    const res = await api.get(`${API_BASE_URL}/statistic-monthly`);
    return res.data.data;
  } catch (err) {throw err;
  }
};

export const fetchActiveSchoolYear = async () => {
  try {
    const res = await api.get("/school-years/active");
    return res.data.data;
  } catch (err) {throw err;
  }
}

export const fetchActiveSemester = async () => {
  try {
    const res = await api.get("/semesters/active");
    return res.data.data;
  } catch (err) {throw err;
  }
}



