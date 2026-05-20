import api from "@services/axios-config";

export const fetchRfidHistory = async (status = "", search = "", page = 1) => {
    try {
        const params = {  page, status, search};
        const res = await api.get("/rfid-tap-history", { params });
        return res.data;
    } catch (err) {throw err;
    }
};

