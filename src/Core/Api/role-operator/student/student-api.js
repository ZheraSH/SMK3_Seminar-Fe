import api from "../../axiosConfig";
import { notify } from "../../../hooks/notification/notify";


export const fetchStudents = async (
  page = 1,
  search = "",
  filter = {}
) => {
  try {
    const res = await api.get("/students", {
      params: {
        page,
        search,
        gender: filter.gender ?? "",
        major: filter.major ?? "",
        level_class: filter.level_class ?? "",
      },
    });

    return {
      data: res.data.data || [],
      meta: res.data.meta || {},
    };
  } catch (err) {
    console.error("Gagal ambil data siswa:", err);
    throw err;
  }
};


export const fetchlevelclasses = async () => {
  try {
    const res = await api.get("/level-classes");
    return res.data.data;
  } catch (err) {
    console.error("Gagal ambil data:", err);
    throw err;
  }
};


export const fetchMajors = async () => {
  try {
    const res = await api.get("/majors");
    return res.data.data;
  } catch (err) {
    console.error("Gagal ambil majors:", err);
    throw err;
  }
};


export const fetchReligions = async () => {
  try {
    const res = await api.get("/religions");
    return res.data.data;
  } catch (err) {
    console.error("gagal", err);
    throw err;
  }
};


export const submitStudent = async (post, editingId) => {
  const formData = new FormData();

  Object.entries(post).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  try {
    let response;

    if (editingId) {
      response = await api.post(
        `/students/${editingId}?_method=PUT`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      notify("Data Berhasil Diperbarui");
    } else {
      response = await api.post("/students", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notify("Data Berhasil Ditambah");
    }

    return {
      success: true,
      data: response.data,
      message: response.data?.message,
    };
  } catch (err) {
    console.log(" ERROR RESPONSE:", err.response?.data);

    return {
      success: false,
      errors: err.response?.data?.errors || {},
      message: err.response?.data?.message || "Terjadi kesalahan",
    };
  }
};


export const deleteStudent = async (id) => {
  try {
    await api.delete(`/students/${id}`);
    notify("Data Berhasil Dihapus");
  } catch (err) {
    console.error(err);
    notify("Gagal menghapus data siswa", "error");
    throw err;
  }
};
