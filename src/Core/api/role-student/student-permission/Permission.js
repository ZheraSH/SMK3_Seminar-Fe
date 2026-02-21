import api from "../../axiosConfig";


export async function fetchPendingPermissionsApi(startDate = "", endDate = "") {
  const res = await api.get(`/student/attendance-permissions/pending`, {
    params: {
      start_date: startDate,
      end_date: endDate
    }
  });
  return res.data.data;
}

export async function fetchPermissionsApi(page = 1, startDate = "", endDate = "") {
  const res = await api.get(`/student/attendance-permissions`, {
    params: {
      page,
      start_date: startDate,
      end_date: endDate

    },
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

export async function deletePermissionApi(UuidPermit) {
  const res = await api.delete(`/student/attendance-permissions/${UuidPermit}`);
  return { success: true, data: res.data };
}
