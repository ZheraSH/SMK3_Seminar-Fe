import axios from "axios";

export const getDashboardStudent = async  () => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData"));

    const roles = userData?.roles || [];
        if (!userData || !roles.includes("student")) {
            console.warn("User bukan student atau data user tidak ditemukan.");
            return null;
    }

    try {
        const res = await axios.get (
            `http://127.0.0.1:8000/api/student/dashboard`,
            {
                headers : {
                    Authorization : token ? `Bearer ${token}` : "",
                    Accept : "application/json",

                },
            }
        );
        return res.data;
    }
    catch (error) {
        console.log("Gagal mengambil jadwal: ", error);
        return null;
    }
}


export async function fetchStudentSchedule(day) {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));

  const roles = userData?.roles || [];
  if (!userData || !roles.includes("student")) {
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


export async function fetchAttendancePermissions() {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));

  const roles = userData?.roles || [];
  if (!userData || !roles.includes("student")) {
    console.warn("User bukan student");
    return null;
  }

  try {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/student/attendance-permissions",
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          Accept: "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Gagal ambil izin:", error);
    return null;
  }
}

