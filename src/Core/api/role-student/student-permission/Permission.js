import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export async function fetchPermissionsApi(page = 1) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User belum login");

  await axios.get(`${BASE_URL}/sanctum/csrf-cookie`, { withCredentials: true });
  const res = await axios.get(
    `${BASE_URL}/api/student/attendance-permissions`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { page },
    }
  );

  // backend biasanya return { data: [...], meta: { last_page, total, ... } }
  console.log(res.data.data);
  return res.data;
}

export async function handleSubmitPermission(formData) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User belum login");

  const form = new FormData();
  form.append("type", formData.type);
  form.append("start_date", formData.start_date);
  form.append("end_date", formData.end_date);
  form.append("reason", formData.reason);
  if (formData.proof) form.append("proof", formData.proof);

  try {
    await axios.post(`${BASE_URL}/api/student/attendance-permissions`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // 🔥 Tambahin ini → hook bisa detect success
    return { success: true };

  } catch (err) {
    if (err.response?.status === 422) {
      return { errors: err.response.data.errors };
    }
    throw err;
  }
}
