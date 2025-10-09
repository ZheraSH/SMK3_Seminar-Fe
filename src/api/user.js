import api from "./index"; // axios instance

// Ambil semua user
export async function getUsers() {
  const res = await api.get("/users");
  return res.data;
}

// Tambah user baru
export async function addUser(user) {
  const res = await api.post("/users", user);
  return res.data;
}

// Hapus user
export async function deleteUser(id) {
  const res = await api.delete(`/users/${id}`);
  return res.data;
}
