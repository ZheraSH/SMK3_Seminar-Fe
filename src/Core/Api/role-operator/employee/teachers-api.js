import api from "../../axiosConfig";
import { notify } from "../../../hooks/notification/notify";

export const fetchTeachersApi = async (page = 1) => {
  try {
    const res = await api.get("/employees", {
      params: {
        page,
      },
    });

    console.log(res.data.data);

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
    } else {
      formData.append(key, value);
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
