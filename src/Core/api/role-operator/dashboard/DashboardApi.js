import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/dashboard";

export const fetchDashboardCounters = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/counters`);

    return res.data.data;
  } catch (error) {
    console.error("❌ API ERROR (counters):", error);
    throw error;
  }
};


/**
 * TAP RFID HISTORY (table)
 */
// export const fetchTapHistory = async () => {
//   try {
//     console.log(" Fetching tap history...");
//     const res = await axios.get(`${API_BASE_URL}/tap-history`);
//     console.log(" TAP HISTORY:", res.data);
//     return res.data.data;
//   } catch (err) {
//     console.error("TAP HISTORY ERROR:", err);
//     throw err;
//   }
// };

/**
 * STATISTIC TODAY (pie + small cards)
 */
export const fetchStatisticToday = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/statistic-today`);
    return res.data.data;
  } catch (err) {
    console.error(" STAT TODAY ERROR:", err);
    throw err;
  }
};

/**
 * STATISTIC MONTHLY (line chart)
 */
// export const fetchStatisticMonthly = async () => {
//   try {
//     console.log(" Fetching statistic monthly...");
//     const res = await axios.get(`${API_BASE_URL}/statistic-monthly`);
//     console.log(" STAT MONTHLY:", res.data);
//     return res.data.data;
//   } catch (err) {
//     console.error(" STAT MONTHLY ERROR:", err);
//     throw err;
//   }
// };
