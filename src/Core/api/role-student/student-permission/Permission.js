import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User belum login");
  return { Authorization: `Bearer ${token}` };
};

export async function fetchPendingPermissionsApi() {
  const headers = getAuthHeaders();
  const res = await axios.get(`${BASE_URL}/api/student/attendance-permissions/pending`, {
    headers
  });
  return res.data.data;
}

export async function fetchPermissionsApi(page = 1) {
  const headers = getAuthHeaders();
  const res = await axios.get(`${BASE_URL}/api/student/attendance-permissions`, {
    headers,
    params: { page },
  });
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

    return { success: true };

  } catch (err) {
    if (err.response?.status === 422) {
      return { errors: err.response.data.errors };
    }
    throw err;
  }
}
