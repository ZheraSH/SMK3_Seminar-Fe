import api from "../../axiosConfig";

export const getDashboardSummary = async  () => {

    try {
        const res = await api.get (
            `student/dashboard/attendance-summary`,
            {
                headers : {
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


export async function fetchStudentSchedule(Day) {

  try {
    const res = await api.get(
      `/student/lesson-schedule/${Day}`,
      {
        headers: {
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

  try {
    const res = await api.get(
      "/student/attendance-permissions",
      {
        headers: {
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


export async function fetchAttendanceMonthly() {

  try {
    const res = await api.get(
      "/student/dashboard/attendance-monthly",
      {
        headers: {
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