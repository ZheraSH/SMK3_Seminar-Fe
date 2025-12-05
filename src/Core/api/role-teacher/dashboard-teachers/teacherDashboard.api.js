import axios from "axios";

function getToken() {
  return localStorage.getItem("token");
}

export async function apiGetTeacher(url) {
  try {
    const token = getToken();
    if (!token) return [];

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (res?.data?.success && Array.isArray(res.data.data)) {
      return res.data.data;
    }

    return [];
  } catch (err) {
    console.error("API ERROR:", err);
    return [];
  }
}

export function getTodaySchedule() {
  return apiGetTeacher("http://127.0.0.1:8000/api/teacher/dashboard/today-schedule");
}

export function getClassroomList() {
  return apiGetTeacher("http://127.0.0.1:8000/api/teacher/dashboard/classroom-list");
}
