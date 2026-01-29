import api from "../axiosConfig";
import { notify } from "../../hooks/notification/notify";

export const fetchClass = async (page = 1) => {
   try {
    const res = await api.get(`/classrooms?page=${page}`);
    return res.data.data;
  } catch (err) {
    return [];
  }
};


export const fetchClassScheduleByDay = async (classroomId, day) => {
    if (!classroomId || !day) {
        return []; 
    }
    
    const endpoint = `/lesson-schedules/${classroomId}/schedules/${day}`;
    try {
        const res = await api.get(endpoint);
        if (res.data && res.data.data) {
            return res.data.data;
        } 
        return [];

    } catch (err) {
        return [];
    }
};

export const addSchedule = async (scheduleData) => {
    try {
        const res = await api.post(`/lesson-schedules`, scheduleData);
        notify("Data Berhasil Ditambah");
        return res.data;
    } catch (err) {
        throw err.response?.data || new Error("Gagal menambahkan jadwal. Cek kembali data input."); 
    }
};

export const updateSchedule = async (scheduleId, scheduleData) => {
    try {
        const res = await api.put(`/lesson-schedules/${scheduleId}`, scheduleData);
        notify("Data Berhasil Diperbarui");
        return res.data;
    } catch (err) {
        throw err.response?.data || new Error("Gagal memperbarui jadwal. Cek kembali data input."); 
    }
};

export const deleteSchedule = async (scheduleId) => {
    try {
        const res = await api.delete(`/lesson-schedules/${scheduleId}`);
        notify("Data Berhasil Dihapus");
        return res.data;
    } catch (err) {
        throw err.response?.data || new Error("Gagal menghapus jadwal. Silakan cek koneksi atau server."); 
    }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchSubject = async () => {
    let allSubjects = [];
    let currentPage = 1;
    let lastPage = 1;

    try {
        do {
            const endpoint = `/subjects?page=${currentPage}`;
            const res = await api.get(endpoint);
            const responseData = res.data;
            if (responseData && responseData.data) {
                allSubjects = [...allSubjects, ...responseData.data];
            }

            lastPage = responseData.meta?.last_page || responseData.last_page || 1;

            if (currentPage < lastPage) {
                await delay(500);
                currentPage++;
            } else {
                break;
            }

        } while (currentPage <= lastPage);

        return allSubjects;
    } catch (err) {
        console.error("Error fetching subjects:", err);
        return allSubjects; 
    }
};

export const fetchTeacher = async () => {
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
                await delay(500); 
            }
            
            currentPage++;

        } while (currentPage <= lastPage); 
        
        return allTeachers;
        
    } catch (err) {
        console.error("Gagal mengambil SEMUA Guru/Wali Kelas:", err.response ? err.response.data : err);
        throw err;
    }
};

export const fetchLesson = async (day = null) => { 
    let endpoint;

    if (day) {
        endpoint = `/lesson-hours/${day}`;
    } else {
        endpoint = `/lesson-hours`;
    }

    try {
        const res = await api.get(endpoint);
        return res.data.data;
    } catch (err) {
        return [];
    }
};