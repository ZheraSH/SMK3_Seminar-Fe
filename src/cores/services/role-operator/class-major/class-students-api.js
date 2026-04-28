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

export const validateImportFile = (file) => {
  if (!file) {
    throw new Error("File Excel wajib di-upload.");
  }

  if (file.size > 5120 * 1024) {
    throw new Error("Ukuran file maksimal 5MB.");
  }

  const allowedExtensions = ['xlsx', 'xls', 'csv'];
  const fileExtension = file.name?.split('.').pop()?.toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    throw new Error("Format file harus berupa xlsx, xls, atau csv.");
  }
  return true;
};

export const importStudentsToClassroom = async (classroomId, file) => {
  validateImportFile(file);

  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await api.post(`/classrooms/${classroomId}/students-import`, formData);

    const { status, message, data } = res.data;
    const importedCount = data?.imported_count;

    if (!status || importedCount === 0) {
      throw new Error(message || "Gagal: Data mungkin sudah ada atau tidak ada data yang diimport");
    }

    notify(message || "Data Berhasil Diimport", "success");
    return res.data;
  } catch (err) {
    if (err instanceof Error && !err.response) {
      throw err;
    }

    if (err.response?.status === 422 && err.response?.data?.errors) {
      const firstError = Object.values(err.response.data.errors)[0][0];
      throw new Error(firstError || "Terjadi kesalahan validasi");
    }

    const msg = err.response?.data?.message || err.message || "Terjadi kesalahan sistem";

    if (msg.includes('Duplicate entry') || msg.includes('SQLSTATE')) {
      throw new Error("Gagal: Terjadi duplikasi data atau kesalahan database. Mohon periksa data anda.");
    }

    throw new Error(msg);
  }
}