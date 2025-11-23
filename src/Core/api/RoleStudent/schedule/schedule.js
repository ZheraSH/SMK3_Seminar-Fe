import axios from "axios";


export async function fetchStudentSchedule(day) {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log("TOKEN:", token);
  console.log("USER DATA:", userData);
  const role = userData?.role;


  if (!userData || role !== "student") {
  console.warn("User bukan student atau data user tidak ditemukan.");
  return null;
}


  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/student/lesson-schedule?day=${day}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          Accept: "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log("Gagal mengambil jadwal:", error);
    return null;
  }
}
