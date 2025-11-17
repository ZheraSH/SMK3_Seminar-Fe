import axios from "axios"

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
    const response = await axios.post(`${API_BASE_URL}/subjects`, subject)
    alert("✅ Mapel berhasil di tambah!")
    return response.data
  } catch (err) {
    console.error("Gagal tambah mapel:", err)
    throw err
  }
}

export const updateSubject = async (id, name) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/subjects/${id}`, {
      name: name,
    })
    alert("✅ Mapel berhasil diperbarui!")
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
    alert("✅ Mapel berhasil diHapus!")
    return response.data
  } catch (error) {
    console.error("❌ Gagal menghapus mapel:", error)
    throw error
  }
}
