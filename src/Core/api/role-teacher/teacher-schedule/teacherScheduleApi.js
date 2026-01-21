import axios from "axios";

export async function fetchDailyScheduleApi(day) {
  const token = localStorage.getItem("token");
  if (!token || !day) return [];

  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/teacher/schedules/${day}`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return res.data?.data ?? [];
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}