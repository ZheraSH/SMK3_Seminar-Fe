import api from "@services/axios-config";
import { notify } from "@core/hooks/notification/notify";

export const getClass = async (params = {}) => {
    try {
        const res = await api.get(`/classrooms`, { params });
        return res.data;
    } catch (err) {throw err;
    }
};

export const createClass = async (formData) => {
    try {
        const res = await api.post(`/classrooms`, formData)
        notify("Data Berhasil Ditambah");
        return res.data;
    } catch (err) {throw err.response ? err.response.data : err;
    }
}


export const getMajors = async () => {
    try {
        const res = await api.get(`/majors`);
        return res.data.data;
    } catch (err) {throw err;
    }
};

export const getSchoolYears = async () => {
    try {
        const res = await api.get(`/school-years`);
        return res.data.data;
    } catch (err) {throw err;
    }
};

export const getLevelClass = async () => {
    try {
        const res = await api.get(`/level-classes`);
        return res.data.data;
    } catch (err) {throw err;
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

    } catch (err) {throw err;
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

    } catch (err) {throw err;
    }
};



