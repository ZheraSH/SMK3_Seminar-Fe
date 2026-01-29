// const API_BASE_URL = "http://127.0.0.1:8000/api";
import api from "../../axiosConfig";
import { notify } from "../../../hooks/notification/notify";
import axios from "axios";

export const getClass = async (params = {}) => {
    try {
        const res = await api.get(`/classrooms`, { params });
        return res.data;
    } catch (err) {
        console.error("Gagal ambil classroom:", err);
        throw err;
    }
};

export const createClass = async (formData) => {
    try {
        const res = await api.post(`/classrooms`, formData)
        notify("Data Berhasil Ditambah");
        return res.data;
    } catch (err) {
        console.error("Gagal menambah classroom:", err.response ? err.response.data : err)
        throw err.response ? err.response.data : err;
    }
}


export const getMajors = async () => {
    try {
        const res = await api.get(`/majors`);
        return res.data.data;
    } catch (err) {
        console.error("Gagal mengambil Jurusan:", err);
        throw err;
    }
};

export const getSchoolYears = async () => {
    try {
        const res = await api.get(`/school-years`);
        return res.data.data;
    } catch (err) {
        console.error("Gagal mengambil Tahun Ajaran:", err);
        throw err;
    }
};

export const getLevelClass = async () => {
    try {
        const res = await api.get(`/level-classes`);
        return res.data.data;
    } catch (err) {
        console.error("Gagal mengambil class Ajaran:", err);
        throw err;
    }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const getTeachers = async () => {
    let allTeachers = [];
    let currentPage = 1;
    let lastPage = 1;

    try {
        do {
            const res = await api.get(`/employees?page=${currentPage}`);
            const responseData = res.data;

            if (responseData.data && Array.isArray(responseData.data)) {
                allTeachers = allTeachers.concat(responseData.data);
            }

            if (responseData.meta) {
                lastPage = responseData.meta.last_page || currentPage;
            } else if (responseData.links && responseData.links.next) {

            } else {
                lastPage = currentPage;
            }

            if (currentPage < lastPage) {
                await delay(150);
            }

            currentPage++;

        } while (currentPage <= lastPage);

        return allTeachers;

    } catch (err) {
        console.error("Gagal mengambil SEMUA Guru/Wali Kelas:", err.response ? err.response.data : err);
        throw err;
    }
};

export const getAllClasses = async () => {
    let allClasses = [];
    let currentPage = 1;
    let lastPage = 1;

    try {
        do {
            const res = await api.get(`/classrooms?page=${currentPage}`);
            const responseData = res.data;

            if (responseData.data && Array.isArray(responseData.data)) {
                allClasses = allClasses.concat(responseData.data);
            }

            if (responseData.meta) {
                lastPage = responseData.meta.last_page || currentPage;
            } else {
                lastPage = currentPage;
            }

            if (currentPage < lastPage) {
                await delay(150);
            }

            currentPage++;

        } while (currentPage <= lastPage);

        return allClasses;

    } catch (err) {
        console.error("Gagal mengambil SEMUA Kelas:", err.response ? err.response.data : err);
        throw err;
    }
};

