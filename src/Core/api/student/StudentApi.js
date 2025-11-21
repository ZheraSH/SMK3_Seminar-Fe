import axios from "axios"
import { notify } from "../../hooks/notification/notify"

const API_BASE_URL = "http://127.0.0.1:8000/api"


export const fetchStudents = async (page = 1, search = "", filter = {}) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/students`, {
      params: {
        page,
        search,
        gender: filter.gender || "",
        major: filter.major || "",
        levelclass: filter.levelclass || "",
      },
    });

    console.log(res.data.data);

    return {
      data: res.data.data ?? [],
      meta: res.data.meta ?? {},
    };
  } catch (err) {
    console.error("Gagal ambil data siswa:", err);
    throw err;
  }
};


export const fetchlevelclasses = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/levelClass`)
    console.log(res.data.data)
    return res.data.data
  } catch (err) {
    console.error("Gagal ambil data:", err)
    throw err
  }
}

export const fetchMajors = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/majors`)
    console.log(res.data.data)
    return res.data.data
  } catch (err) {
    console.error("Gagal ambil majors:", err)
    throw err
  }
}

export const fetchReligions = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/religions`)
    console.log("📦 Data agama dari API:", res.data)
    return res.data.data
  } catch (err) {
    console.error("gagal", err)
    throw err
  }
}

export const submitStudent = async (post, editingId) => {
  const formData = new FormData()
  Object.entries(post).forEach(([key, value]) => {
    if (value !== null) formData.append(key, value)
  })

  try {
    if (editingId) {
      await axios.post(`${API_BASE_URL}/students/${editingId}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      notify("Data siswa berhasil diperbarui!");
    } else {
      await axios.post(`${API_BASE_URL}/students`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      notify("Data siswa berhasil ditambahkan!");
    }
  } catch (err) {
    console.log("🔥 ERROR RESPONSE:", err.response?.data)
    throw err
  }
}

export const deleteStudent = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/students/${id}`)
    alert("Data siswa berhasil dihapus!")
  } catch (err) {
    console.error(err)
    alert("Gagal menghapus data siswa")
    throw err
  }
}
