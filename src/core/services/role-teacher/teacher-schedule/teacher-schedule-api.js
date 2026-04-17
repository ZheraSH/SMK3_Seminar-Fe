import api from "@services/axios-config";

export async function fetchDailyScheduleApi(day) {

  try {
    const res = await api.get(`/teacher/schedules/${day}`);
    return res.data?.data ?? [];
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}



