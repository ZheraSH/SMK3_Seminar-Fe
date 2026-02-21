import api from "../../axiosConfig";

export const getAttendanceStatistics = async () => {
  try {
    const res = await api.get(`/counselor/attendance/statistic-monthly`);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    console.error("Gagal mengambil statistik globalyyy:", err);

    return {
      total: 0,
      hadir: 0,
      sakit: 0,
      izin: 0,
      alpha: 0,
    };
  }
};
