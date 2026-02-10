import api from "../../axiosConfig";

export async function fetchStudentSchedule(day) {
  if (!day) throw new Error("day wajib diisi");
  const res = await api.get(
    `/student/lesson-schedule/${day}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  return res.data.data;
}
