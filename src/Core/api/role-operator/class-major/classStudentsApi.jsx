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
        const res = await axios.get(`${API_URL}/classroom-students`, {
            params: {
                classroom_id: classroomId,
                page: page,
                limit: limit, 
                search: search,
            }
        });
        return res.data; 
    } catch (err) {
        console.error("Gagal mengambil siswa kelas:", err);
        throw err;
    }
};

export const getAvailableStudents = async (classroom) => {
  try {
    const res = await axios.get(
      `${API_URL}/classroom-students/${classroom}/available-students`
    );
    return res.data.data;
  } catch (err) {
    console.error("Gagal mengambil available students:", err);
    throw err;
  }
};


export const addStudentsToClassroom = async (classroomId, studentIds) => {
  try {
    const res = await axios.post(
      `${API_URL}/classroom-students/${classroomId}/add-students`,
      { student_ids: studentIds }
    );
    notify("Data berhasil di tambah");
    return res.data;
  } catch (err) {
    console.error("Gagal menambahkan siswa:", err);
    throw err;
  }
};


export const removeStudentFromClass = async (classroomId, studentId) => {
    const res = await axios.delete(
      `${API_URL}/classroom-students/${classroomId}/remove-student/${studentId}`
    );
    notify("Data berhasil di hapus");
    return res.data;
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