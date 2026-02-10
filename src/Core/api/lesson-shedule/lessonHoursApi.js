import api from "../axiosConfig";
import { notify } from "../../hooks/notification/notify";


export const fetchLessonHoursByDay = async (day) => {
    if (!day) {
        console.error("Hari harus disediakan.");
        return [];
    }
    try {
        const res = await api.get(`/lesson-hours/${day}`);
        return res.data.data;
    } catch (err) {
        console.error("gagal mengambil data per hari", err);
        return [];
    }
};

export const addLessonHour = async (lessonData) => {
    try {
        const res = await api.post(`/lesson-hours`, lessonData);
         notify('Data Berhasil Ditambah');
        return res.data; 

    } catch (err) {
        throw err.response ? err.response.data : new Error("Terjadi kesalahan jaringan.");
    }
};

export const UpdateLessonHour = async (lessonId,lessonData) => {
    try {
        const res = await api.put(`/lesson-hours/${lessonId}`, lessonData);
         notify('Data Berhasil Diperbarui');
        return res.data; 

    } catch (err) {
        throw err.response ? err.response.data : new Error("Terjadi kesalahan jaringan.");
    }
};

export const deleteLessonHour = async (id) => {
    try {
        const res = await api.delete(`/lesson-hours/${id}`);
         notify('Data Berhasil Dihapus');
        return res.data; 
    } catch (err) {
        throw err.response ? err.response.data : new Error("Terjadi kesalahan jaringan.");
    }
};