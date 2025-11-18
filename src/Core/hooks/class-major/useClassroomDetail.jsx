import { useEffect, useState } from "react";
import {
  getClassroomDetail,
  getAvailableStudents,
  addStudentsToClassroom,
  removeStudentFromClass
} from "../../api/class-major/classStudentsApi";

export default function useClassroomDetail(classroomId) {
  const [classroom, setClassroom] = useState(null);
  const [students, setStudents] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // ============================
  // FETCH DATA
  // ============================
  const fetchData = async () => {
    if (!classroomId) return;

    try {
      setLoading(true);

      // Detail kelas + siswa
      const detail = await getClassroomDetail(classroomId);
      setClassroom(detail);
      setStudents(detail.students || []);

      // Siswa available
      const available = await getAvailableStudents(classroomId);
      setAvailableStudents(available || []);

    } catch (err) {
      console.error("Error fetching classroom detail:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [classroomId]);

  // ============================
  // ADD STUDENTS
  // ============================
  const addStudents = async (studentIds) => {
    try {
      setActionLoading(true);

      const res = await addStudentsToClassroom(classroomId, studentIds);

      // Refresh data setelah berhasil
      await fetchData();

      return { success: true, data: res };
    } catch (err) {
      console.error("Gagal menambahkan siswa:", err);
      return { success: false, error: err };
    } finally {
      setActionLoading(false);
    }
  };

  // ============================
  // REMOVE STUDENT
  // ============================
  const removeStudent = async (studentId) => {
    try {
      setActionLoading(true);

      const res = await removeStudentFromClass(classroomId, studentId);

      // Refresh setelah dihapus
      await fetchData();

      return { success: true, data: res };
    } catch (err) {
      console.error("Gagal menghapus siswa:", err);
      return { success: false, error: err };
    } finally {
      setActionLoading(false);
    }
  };

  return {
    classroom,
    students,
    availableStudents,
    loading,
    actionLoading,
    addStudents,
    removeStudent,
  };
}
