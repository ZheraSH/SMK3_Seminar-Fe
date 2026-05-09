import api from "@services/axios-config";


export const loginUserApi = async ({ email, password }) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const result = response.data;

    if (result && result.data && result.data.token && result.data.user) {
      const user = result.data.user;
      return {
        token: result.data.token,
        user: user,
        roles: user.roles,
        role: result.data.role,
      };
    } else {
      throw new Error("Format respons tidak sesuai. Silakan coba lagi.");
    }
  } catch (error) {
    console.error("Login API Error:", error);

    // Tampilkan pesan error spesifik jika ada dari backend
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error("Gagal login. Periksa kembali email dan password Anda.");
  }
};
