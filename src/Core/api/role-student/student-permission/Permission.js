import axios from "axios";
import api from "@api/axios-config";

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

export const getPermissionDetailStudent = async (permissionId) => {

  const url = `/student/attendance-permissions/${permissionId}`;

  try {
    const res = await api.get(
      url,
      {
        headers: {
          Accept: "application/json",
        }
      }
    );

    return res.data.data;
  } catch (err) {

    throw new Error(err.response?.data?.message || "Gagal memuat detail izin. Silakan coba lagi.");
  }
};



export async function handleSubmitPermission(formData) {
  const form = new FormData();
  form.append("type", formData.type);
  form.append("start_date", formData.start_date);
  form.append("end_date", formData.end_date);
  form.append("reason", formData.reason);
  if (formData.proof) form.append("proof", formData.proof);

  try {
    await api.post(`/student/attendance-permissions`, form, {
      headers: {
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
