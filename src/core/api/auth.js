import api from "@api/index";

export async function loginUser(credentials) {
  const res = await api.post("/login", credentials);
  return res.data;
}
