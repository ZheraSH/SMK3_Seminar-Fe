import axios from "axios";

export async function fetchDailyScheduleApi(date) {
  const token = localStorage.getItem("token");
  if (!token) return [];

  const res = await axios.get(
    "http://127.0.0.1:8000/api/teacher/schedules",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: { date },
    }
  );
  return res.data?.data ?? [];
}
