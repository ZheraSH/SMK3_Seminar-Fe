import axios from "axios";

function getToken() {
  return localStorage.getItem("token") || "";
}

async function apiGetTeacher(url) {
  const token = getToken();

  if (!token) {
    console.error("NO TOKEN FOUND");
    return [];
  }

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    return res.data?.data ?? [];
  } catch (err) {
    console.error("API ERROR:", err);
    return [];
  }
}

export const getTodaySchedule = () =>
  apiGetTeacher("http://127.0.0.1:8000/api/teacher/dashboard/today-schedule");

export const getClassroomList = () =>
  apiGetTeacher("http://127.0.0.1:8000/api/teacher/dashboard/classroom-list");
