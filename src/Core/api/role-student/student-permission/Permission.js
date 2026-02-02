import axios from "axios";
import api from "../../axiosConfig";

const BASE_URL = "http://127.0.0.1:8000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User belum login");
  return { Authorization: `Bearer ${token}` };
};

export async function fetchPendingPermissionsApi() {
  const res = await api.get(`/student/attendance-permissions/pending`, {
  });
  return res.data.data;
}

export async function fetchPermissionsApi(page = 1) {
  const res = await api.get(`/student/attendance-permissions`, {
    params: { page },
  });
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

export async function deletePermissionApi(UuidPermit) {
  const headers = getAuthHeaders();
  await axios.delete(`${BASE_URL}/api/student/attendance-permissions/${UuidPermit}`, {
    headers,
  });
  return { success: true };
}
