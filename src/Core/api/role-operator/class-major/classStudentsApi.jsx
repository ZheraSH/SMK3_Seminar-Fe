import axios from "axios";
import { notify } from "../../../hooks/notification/notify";
const API_URL = "http://127.0.0.1:8000/api";

export const getClassroomDetail = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/classrooms/${id}`);
    return res.data.data;
  } catch (err) {
    console.error("Gagal mengambil detail kelas:", err);
    throw err;
  }
};


export const getClassroomStudents = async (classroomId, page = 1, limit = 8, search = "") => {
    try {
        const res = await axios.get(`${API_URL}/classrooms/${classroomId}/students`, {
            params: {
                page: page,
                limit: limit, 
                search: search,
            }
        });
        return res.data; 
    } catch (err) {
        throw err;
    }
};

export const getAvailableStudents = async (classroomId) => {
  try {
    const res = await axios.get(
      `${API_URL}/classrooms/${classroomId}/students-available`
    );
    return res.data.data;
  } catch (err) {
    throw err;
  }
};

export const addStudentsToClassroom = async (classroomId, studentIds) => {
  try {
    const res = await axios.post(
      `${API_URL}/classrooms/${classroomId}/students-add`,
      { student_ids: studentIds }
    );
    notify("Data Berhasil Ditambah");
    return res.data;
  } catch (err) {
    throw err;
  }
};

// 4. Hapus Siswa dari Kelas
export const removeStudentFromClass = async (classroomId, studentId) => {
    try {
        const res = await axios.delete(
          `${API_URL}/classrooms/${classroomId}/student-remove/${studentId}`
        );
        notify("Data Berhasil Dihapus");
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const getStudentDetail = async (id) => { 
  try {
    const res = await axios.get(`${API_URL}/students/${id}`);
    return res.data.data;
  } catch (err) {
    console.error("Gagal mengambil detail siswa:", err);
    throw err;
  }
};