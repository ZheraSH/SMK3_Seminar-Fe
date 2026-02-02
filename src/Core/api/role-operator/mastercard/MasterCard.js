
import api from "../../axiosConfig";

export const getMastercards = async (params = {}) => {
    console.log("[API] GET /mastercards", params);

    try {
        const res = await api.get("/mastercards", { params });
        console.log("[API] RESPONSE /mastercards", res.data);
        return res;
    } catch (error) {
        console.error("[API] ERROR /mastercards", error.response?.data || error);
        throw error;
    }
};

export const postMastercard = async (payload) => {
    console.log("[API] POST /mastercards", payload);

    try {
        const res = await api.post("/mastercards", payload);
        console.log("[API] RESPONSE /mastercards", res.data);
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
        console.log("[API] RESPONSE /mastercards/check", res.data);
        return res;
    } catch (error) {
        console.error("[API] ERROR /mastercards/check", error.response?.data || error);
        throw error;
    }
};
