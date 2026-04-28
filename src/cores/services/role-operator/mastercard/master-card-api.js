
import api from "@services/axios-config";

export const getMastercards = async (params = {}) => {
    try {
        const res = await api.get("/attendance/mastercards", { params });
        return res;
    } catch (error) {
        console.error("[API] ERROR /mastercards", error.response?.data || error);
        throw error;
    }
};

export const postMastercard = async (payload) => {

    try {
        const res = await api.post("/attendance/mastercards", payload);
        return res;
    } catch (error) {
        console.error("[API] ERROR POST /mastercards", error.response?.data || error);
        throw error;
    }
};

export const postMastercardCheck = async (payload) => {
    console.log("[API] POST /attendance/mastercards/check", payload);

    try {
        const res = await api.post("/attendance/mastercards/check", payload);
        return res;
    } catch (error) {
        console.error("[API] ERROR /mastercards/check", error.response?.data || error);
        throw error;
    }
};
export const deleteMastercard = async (id) => {
    try {
        const res = await api.delete(`/attendance/mastercards/${id}`);
        return res;
    } catch (error) {
        console.error("[API] ERROR DELETE /mastercards", error.response?.data || error);
        throw error;
    }
};
