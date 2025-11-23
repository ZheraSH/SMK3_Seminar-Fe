import axios from "axios"
import { notify } from "../../hooks/notification/notify"

const API_BASE_URL = "http://127.0.0.1:8000/api"

export const getSubjects = async (page = 1) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/subjects?page=${page}`)
    console.log(res.data.data)
    return res.data.data
  } catch (err) {
    console.error("Gagal ambil classroom:", err)
    throw err
  }
}


export const addSubject = async (subject) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/subjects`, subject);
    notify("Subjects Berhasil Di Tambahkan!");
    return response.data;
  } catch (err) {
    throw err; // lempar ke komponen
  }
};


export const updateSubject = async (id, name) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/subjects/${id}`, {
      name: name,
    })
    notify("Subjects Berhasil Di DI Perbarui!")
    return response.data
  } catch (err) {
    console.error("❌ Gagal edit mapel:", err)
    throw err
  }
}

export const deleteSubject = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/subjects/${id}`)
    console.log(`🗑️ Subject ${id} berhasil dihapus`)
    notify("Subjects Berhasil Di Hapus!")
    return response.data
  } catch (error) {
    console.error("❌ Gagal menghapus mapel:", error)
    throw error
  }
}
