import api from "@services/axios-config";
import { notify } from "@core/hooks/notification/notify";

export const fetchTeachersApi = async (page = 1, search = "", role = "", gender = "", subject = "") => {
  try {
    const res = await api.get("/employees", {
      params: {
        page,
        search,
        role,
        gender,
        subject,
      },
    });

    return {
      data: res.data.data || [],
      meta: res.data.meta || {},
    };
  } catch (err) {
    console.error("Gagal mengambil Teachers:", err);
    throw err;
  }
};


export const fetchReligionsApi = async () => {
  try {
    const res = await api.get("/religions");
    return res.data.data;
  } catch (err) {
    console.error("gagal", err);
    return [];
  }
};

export const submitTeacherApi = async (editingId, post) => {
  const formData = new FormData();

  Object.entries(post).forEach(([key, value]) => {
    if (key === "roles") {
      post.roles.forEach((r) => {
        formData.append("roles[]", r);
      });
    } else if (key === "image") {
      if (value instanceof File) {
        formData.append(key, value);
      }
    } else if (key !== "showRoleDropdown") {
      formData.append(key, value === null ? "" : value);
    }
  });

  try {
    if (editingId) {
      const updatedPost = { ...post };
      if (post.email === "") {
        delete updatedPost.email;
      }

      await api.post(
        `/employees/${editingId}?_method=PUT`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      notify("Data Berhasil Diperbarui");
    } else {
      await api.post("/employees", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      notify("Data Berhasil Ditambah");
    }

    return { success: true };
  } catch (err) {
    console.log("ERROR RESPONSE:", err.response?.data);

    if (err.response?.data?.errors) {
      return { success: false, errors: err.response.data.errors };
    } else {
      console.log(" Tidak ada field 'errors' di response");
      return { success: false };
    }
  }
};

export const deleteTeacherApi = async (id) => {
  try {
    await api.delete(`/employees/${id}`);

    notify("Guru Berhasil Di Hapus");
    return true;
  } catch (err) {
    console.error(err);
    notify("Gagal menghapus data guru", "error");
    return false;
  }
};


export const submitTeacher = submitTeacherApi;
export const deleteTeacher = deleteTeacherApi;

export const importTeachersApi = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const res = await api.post('/employees-import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const payload = res.data.data;
    if (payload && payload.error_count > 0) {
      if (payload.imported_count > 0) {
        notify(`Berhasil mengimpor ${payload.imported_count} guru. ${payload.error_count} baris gagal.`, "warning");
      } else {
        notify("Gagal mengimpor data guru", "error");
      }
      return { success: true, hasErrors: true, data: payload };
    }

    notify("Berhasil mengimpor data guru");
    return { success: true, hasErrors: false, data: payload };
  } catch (err) {
    if (err.response?.data?.message) {
      notify("Gagal mengimpor data guru", "error");
    } else {
      notify("Gagal mengimpor data guru", "error");
    }
    throw err;
  }
};
