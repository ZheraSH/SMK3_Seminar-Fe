import axios from "axios"
import { notify } from "../../../hooks/notification/notify"


const API_BASE_URL = "http://127.0.0.1:8000/api"

export const getSchoolYears= async (page = 1,search = "") => {
  try {
    const res = await axios.get(`${API_BASE_URL}/school-years`,{
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
        const res = await axios.post(`${API_BASE_URL}/school-years`, formData)
        notify("Data Berhasil Ditambah");
        return res.data; 
    } catch (err) {
        console.error("Gagal menambah school year:", err.response ? err.response.data : err)
        throw err.response ? err.response.data : err;
    }
}

export const activeschoolyear = async (id) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/school-years/${id}/activate`)
        notify("Data Berhasil Diactivkan");
        return res.data; 
    } catch (err) {
        console.error("Gagal mengaktifkan school year:", err.response ? err.response.data : err)
        throw err.response ? err.response.data : err;
    }
}

export const deleteschoolyears = async (id) => {
    try {
        const res = await axios.delete(`${API_BASE_URL}/school-years/${id}`);
         notify('Data Berhasil Dihapus');
        return res.data; 
    } catch (err) {
        throw err.response ? err.response.data : new Error("Terjadi kesalahan jaringan.");
    }
};


export const getsemester = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/semesters/active`);
    return res.data.data
  } catch (err) {
    console.error("Gagal ambil data subjects:", err)
    throw err
  }
}