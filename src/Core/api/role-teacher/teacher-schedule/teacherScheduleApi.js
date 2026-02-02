import api from "../../axiosConfig";

export async function fetchDailyScheduleApi(day) {

  try {
    const res = await api.get(
      `/teacher/schedules/${day}`, 
      {
        headers: {
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