import axios from "axios";
import { notify } from "../../hooks/notification/notify";
const API_BASE_URL = "http://127.0.0.1:8000/api";

export const fetchLessonHoursByDay = async (day) => {
    if (!day) {
        console.error("Hari harus disediakan.");
        return [];
    }
    try {
        const res = await axios.get(`${API_BASE_URL}/lesson-hours/day/${day}`);
        return res.data.data;
    } catch (err) {
        console.error("gagal mengambil data per hari", err);
        return [];
    }
};

export const addLessonHour = async (lessonData) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/lesson-hours`, lessonData);
         notify('Data Berhasil Ditambah');
        return res.data; 

    } catch (err) {
        throw err.response ? err.response.data : new Error("Terjadi kesalahan jaringan.");
    }
};

export const deleteLessonHour = async (id) => {
    try {
        const res = await axios.delete(`${API_BASE_URL}/lesson-hours/${id}`);
         notify('Data Berhasil Dihapus');
        return res.data; 
    } catch (err) {
        throw err.response ? err.response.data : new Error("Terjadi kesalahan jaringan.");
    }
};