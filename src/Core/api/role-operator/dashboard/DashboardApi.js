import api from "../../axiosConfig";

const API_BASE_URL = "/dashboard";

/**
 * COUNTERS
 */
export const fetchDashboardCounters = async () => {
  try {
    const res = await api.get(`${API_BASE_URL}/counters`);
    return res.data.data;
  } catch (error) {
    console.error("❌ API ERROR (counters):", error);
    throw error;
  }
};

/**
 * TAP RFID HISTORY (table)
 */
export const fetchTapHistory = async () => {
  try {
    const res = await api.get(`${API_BASE_URL}/tap-history`);
    return res.data.data;
  } catch (err) {
    console.error("TAP HISTORY ERROR:", err);
    throw err;
  }
};

/**
 * STATISTIC TODAY (pie + small cards)
 */
export const fetchStatisticToday = async () => {
  try {
    const res = await api.get(`${API_BASE_URL}/statistic-today`);
    return res.data.data;
  } catch (err) {
    console.error("STAT TODAY ERROR:", err);
    throw err;
  }
};

/**
 * STATISTIC MONTHLY (line chart)
 */
export const fetchStatisticMonthly = async () => {
  try {
    const res = await api.get(`${API_BASE_URL}/statistic-monthly`);
    return res.data.data;
  } catch (err) {
    console.error("STAT MONTHLY ERROR:", err);
    throw err;
  }
};
