import api from "@api/index";

export async function getRoles() {
  try {
    const response = await api.get("/roles");
    const roles = response.data?.data || response.data || [];

    
    console.log("✅ Berhasil memuat roles:", roles); // ✅ log sukses

    return roles;
  } catch (error) {
    console.error("Gagal memuat roles:", error);
    return []; 
  }
}
