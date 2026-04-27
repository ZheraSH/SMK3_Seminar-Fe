import { notify } from "@core/hooks/notification/notify";
import api from "@services/axios-config";

export const getClassroomDetail = async (id) => {
  try {
    const res = await api.get(`/classrooms/${id}`);
    return res.data.data;
  } catch (err) {
    console.error("Gagal mengambil detail kelas:", err);
    throw err;
  }
};


export const getClassroomStudents = async (classroomId, page = 1, limit = 8, search = "") => {
  try {
    const res = await api.get(`/classrooms/${classroomId}/students`, {
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
    const res = await api.get(`/classrooms/${classroomId}/students-available`);
    return res.data.data;
  } catch (err) {
    throw err;
  }
};

export const addStudentsToClassroom = async (classroomId, studentIds) => {
  try {
    const res = await api.post(`/classrooms/${classroomId}/students-add`,
      { student_ids: studentIds }
    );
    notify("Data Berhasil Ditambah");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const removeStudentFromClass = async (classroomId, studentId) => {
  try {
    const res = await api.delete(`/classrooms/${classroomId}/student-remove/${studentId}`);
    notify("Data Berhasil Dihapus");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getStudentDetail = async (id) => {
  try {
    const res = await api.get(`/students/${id}`);
    return res.data.data;
  } catch (err) {
    throw err;
  }
};

export const importStudentsToClassroom = async (classroomId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await api.post(`/classrooms/${classroomId}/students-import`, formData);
    
    const { status, message, data } = res.data;
    const importedCount = data?.imported_count;

    if (status && importedCount > 0) {
      notify(message , "success");
    } else {
      const errorMsg = importedCount === 0 
        ? "Gagal: Data mungkin sudah ada" 
        : (message || "Gagal mengimport");
        
      notify(errorMsg, "error");
    }

    return res.data;
  } catch (err) {
    const msg = err.response?.data?.message || "Terjadi kesalahan sistem";
    notify(msg, "error"); 
    throw err;
  }
}