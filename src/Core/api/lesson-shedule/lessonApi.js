import axios from "axios"
import { notify } from "../../hooks/notification/notify";
const API_BASE_URL = "http://127.0.0.1:8000/api";
export const fetchClass = async (page = 1) => {
   try {
    const res = await axios.get(`${API_BASE_URL}/classrooms?page=${page}`);
    return res.data.data;
  } catch (err) {
    return [];
  }
};


export const fetchClassScheduleByDay = async (classroomId, day) => {
    if (!classroomId || !day) {
        return []; 
    }
    
    const endpoint = `${API_BASE_URL}/lesson-schedules/${classroomId}/schedules/${day}`;
    try {
        const res = await axios.get(endpoint);
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
        const res = await axios.post(`${API_BASE_URL}/lesson-schedules`, scheduleData);
        notify("Data Berhasil Ditambah");
        return res.data;
    } catch (err) {
        throw err.response?.data || new Error("Gagal menambahkan jadwal. Cek kembali data input."); 
    }
};

export const updateSchedule = async (scheduleId, scheduleData) => {
    try {
        const res = await axios.put(`${API_BASE_URL}/lesson-schedules/${scheduleId}`, scheduleData);
        notify("Data Berhasil Diperbarui");
        return res.data;
    } catch (err) {
        throw err.response?.data || new Error("Gagal memperbarui jadwal. Cek kembali data input."); 
    }
};

export const deleteSchedule = async (scheduleId) => {
    try {
        const res = await axios.delete(`${API_BASE_URL}/lesson-schedules/${scheduleId}`);
        notify("Data Berhasil Dihapus");
        return res.data;
    } catch (err) {
        throw err.response?.data || new Error("Gagal menghapus jadwal. Silakan cek koneksi atau server."); 
    }
};


export const fetchSubject = async () => {
   try {
    const res = await axios.get(`${API_BASE_URL}/subjects`);
    return res.data.data;
  } catch (err) {
    return [];
  }
};
export const fetchTeacher = async () => {
    let allTeachers = [];
    let currentPage = 1;
    let lastPage = 1; 

    try {
        do {
            const endpoint = `${API_BASE_URL}/employees?page=${currentPage}`;
            const res = await axios.get(endpoint);
            
            const responseData = res.data;

            if (responseData && responseData.data && Array.isArray(responseData.data)) {
                allTeachers = allTeachers.concat(responseData.data);
            }

            if (responseData.meta) {
                lastPage = responseData.meta.last_page;
            } else {
                break; 
            }
            

            currentPage++;

        } while (currentPage <= lastPage); 

        return allTeachers;

    } catch (err) {
        return allTeachers; 
    }
};
export const fetchLesson = async (day = null) => { 
    let endpoint;

    if (day) {
        endpoint = `${API_BASE_URL}/lesson-hours/day/${day}`;
    } else {
        endpoint = `${API_BASE_URL}/lesson-hours`;
    }

    try {
        const res = await axios.get(endpoint);
        return res.data.data;
    } catch (err) {
        return [];
    }
};