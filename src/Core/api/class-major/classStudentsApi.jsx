import axios from "axios";

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



// export const getClassroomStudents = async (id) => {
//   try {
//     const res = await axios.get(`${API_URL}/classroomStudents/${id}`);
//     return res.data.data; // sesuai responmu
//   } catch (err) {
//     console.error("Gagal mengambil siswa kelas:", err);
//     throw err;
//   }
// };

export const getAvailableStudents = async (classroom) => {
  try {
    const res = await axios.get(
      `${API_URL}/classrooms/${classroom}/available-students`
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
      `${API_URL}/classrooms/${classroomId}/add-students`,
      { student_ids: studentIds }
    );
    return res.data;
  } catch (err) {
    console.error("Gagal menambahkan siswa:", err);
    throw err;
  }
};


export const removeStudentFromClass = async (id, studentId) => {
  const res = await axios.delete(
    `${API_URL}/classrooms/${id}/remove-student/${studentId}`
  );
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