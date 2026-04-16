
import api from "@api/axios-config";

export const getMastercards = async (params = {}) => {
    try {
        const res = await api.get("/mastercards", { params });
        return res;
    } catch (error) {
        console.error("[API] ERROR /mastercards", error.response?.data || error);
        throw error;
    }
};

export const postMastercard = async (payload) => {

    try {
        const res = await api.post("/mastercards", payload);
        return res;
    } catch (error) {
        console.error("[API] ERROR POST /mastercards", error.response?.data || error);
        throw error;
    }
};

export const postMastercardCheck = async (payload) => {
    console.log("[API] POST /mastercards/check", payload);

    try {
        const res = await api.post("/mastercards/check", payload);
        return res;
    } catch (error) {
        console.error("[API] ERROR /mastercards/check", error.response?.data || error);
        throw error;
    }
};



