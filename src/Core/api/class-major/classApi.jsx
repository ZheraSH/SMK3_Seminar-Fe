const API_BASE_URL = "http://127.0.0.1:8000/api";
import axios from "axios";
export const getClass = async (page = 1) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/classrooms?page=${page}`)
    console.log(res.data.data)
    return res.data.data
  } catch (err) {
    console.error("Gagal ambil classroom:", err)
    throw err
  }
}

export const createClass = async (formData) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/classrooms`, formData)
        return res.data; 
    } catch (err) {
        console.error("Gagal menambah classroom:", err.response ? err.response.data : err)
        throw err.response ? err.response.data : err;
    }
}


export const getMajors = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/majors`);
        return res.data.data;
    } catch (err) {
        console.error("Gagal mengambil Jurusan:", err);
        throw err;
    }
};

export const getSchoolYears = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/school-years`);
        return res.data.data;
    } catch (err) {
        console.error("Gagal mengambil Tahun Ajaran:", err);
        throw err;
    }
};

export const getLevelClass = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/level-classes`);
        return res.data.data;
    } catch (err) {
        console.error("Gagal mengambil class Ajaran:", err);
        throw err;
    }
};

export const getTeachers = async () => {
    try {
        const res = await axios.get(`${API_BASE_URL}/employees`); 
        return res.data.data; 
    } catch (err) {
        console.error("Gagal mengambil Guru/Wali Kelas:", err);
        throw err;
    }
};

