import api from "./Index";

export async function getTeachers() {
  const res = await api.get("/teachers");
  return res.data;
}

export async function addTeacher(teacher) {
  const res = await api.post("/teachers", teacher);
  return res.data;
}

export async function updateTeacher(id, teacher) {
  const res = await api.put(`/teachers/${id}`, teacher);
  return res.data;
}

// 🔹 Hapus guru
export async function deleteTeacher(id) {
  const res = await api.delete(`/teachers/${id}`);
  return res.data;
}
