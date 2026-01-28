import axios from "axios"
import { notify } from "../../../hooks/notification/notify"

const API_BASE_URL = "http://127.0.0.1:8000/api"

export const getSubjects = async (page = 1, search = "") => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`${API_BASE_URL}/subjects?page=${page}&search=${search}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : `Bearer `,
        Accept: "application/json",
      },
    })
    return res.data
  } catch (err) {
    console.error("Gagal ambil data subjects:", err)
    throw err
  }
}

export const addSubject = async (subject) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(`${API_BASE_URL}/subjects`, subject, {
      headers: {
        Authorization: token ? `Bearer ${token}` : `Bearer `,
        Accept: "application/json",
      },
    });
    notify("Data Berhasil Ditambah");
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateSubject = async (id, name) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(`${API_BASE_URL}/subjects/${id}`, {
      name: name,
    }, {
      headers: {
        Authorization: token ? `Bearer ${token}` : `Bearer `,
        Accept: "application/json",
      },
    })
    notify("Data Berhasil Diperbarui")
    return response.data
  } catch (err) {
    console.error("❌ Gagal edit mapel:", err)
    throw err
  }
}

export const deleteSubject = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(`${API_BASE_URL}/subjects/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : `Bearer `,
        Accept: "application/json",
      },
    })
    console.log(` Subject ${id} berhasil di hapus`)
    notify("Data Berhasil Dihapus")
    return response.data
  } catch (error) {
    console.error("❌ Gagal menghapus mapel:", error)
    throw error
  }
}