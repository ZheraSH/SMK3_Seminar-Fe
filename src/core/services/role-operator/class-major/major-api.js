<<<<<<< HEAD:src/Core/api/role-operator/class-major/majorApi.jsx
import api from "../../axiosConfig";
=======
import api from "@services/axios-config";
>>>>>>> dev2:src/core/services/role-operator/class-major/major-api.js

export const getMajors = async () => {
    try {
        const res = await api.get(`/majors`);
        return res.data.data; 
    } catch (err) {
        console.error("Gagal ambil majors:", err.message);
        throw err; 
    }
}



