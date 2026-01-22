import axios from "axios";

export async function fetchStudentSchedule(day) {
  if (!day) throw new Error("day wajib diisi");

  const token = localStorage.getItem("token");

  const res = await axios.get(
    `http://127.0.0.1:8000/api/student/lesson-schedule/${day}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  // RETURN SHAPE API
  // { classroom, day, schedules }
  return res.data.data;
}
