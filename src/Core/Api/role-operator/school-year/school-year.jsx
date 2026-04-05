import api from "../../axiosConfig";
import { notify } from "../../../hooks/notification/notify"



export const getSchoolYears = async (page = 1, search = "") => {
  try {
    const res = await api.get(`/school-years`, {
      params: { page: page, search: search }
    })
    return res.data
  } catch (err) {
    console.error("Gagal ambil data subjects:", err)
    throw err
  }
}

export const createSchoolYears = async (formData) => {
  try {
    const res = await api.post(`/school-years`, formData)
    notify("Data Berhasil Ditambah");
    return res.data;
  } catch (err) {
    console.error("Gagal menambah school year:", err.response ? err.response.data : err)
    throw err.response ? err.response.data : err;
  }
}

export const activeschoolyear = async (id) => {
  try {
    const res = await api.post(`/school-years/${id}/activate`)
    notify("Data Berhasil Diaktifkan");
    return res.data;
  } catch (err) {
    console.error("Gagal mengaktifkan school year:", err.response ? err.response.data : err)
    throw err.response ? err.response.data : err;
  }
}

export const deleteschoolyears = async (id) => {
  try {
    const res = await api.delete(`/school-years/${id}`);
    notify('Data Berhasil Dihapus');
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : new Error("Terjadi kesalahan jaringan.");
  }
};


export const getsemester = async () => {
  try {
    const res = await api.get(`/semesters/active`);
    return res.data.data
  } catch (err) {
    console.error("Gagal ambil data subjects:", err)
    throw err
  }
}