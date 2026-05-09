import api from "@services/axios-config";

export const getAttendanceStatistics = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await api.get(
      `/counselor/attendance/statistic-global`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          Accept: "application/json",
        },
      }
    );
    return res.data.data;
  } catch (err) {
    console.error("Gagal mengambil statistik global:", err);
    return null;
  }
};

export const getMonthlyAttendanceTrend = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await api.get(
      `/counselor/attendance/statistic-monthly`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          Accept: "application/json",
        },
      }
    );
    return res.data.data;
  } catch (err) {
    console.error("Gagal mengambil statistik bulanan:", err);
    return [];
  }
};



