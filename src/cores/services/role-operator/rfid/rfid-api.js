import api from "@services/axios-config";
import { notify } from "@core/hooks/notification/notify";

export const fetchRfid = async (page = 1, search = "") => {
  try {
    const res = await api.get("/rfids", {
      params: {
        page,
        search,
      },
    });

    return {
      data: res.data.data || [],
      meta: res.data.meta || {},
    };
  } catch (err) {
    console.error("Gagal mengambil RFID:", err);
    throw err;
  }
};

export const deleteRFID = async (id) => {
  try {
    const response = await api.delete(`/rfids/${id}`);
    return response.data;
  } catch (err) {
    const msg = err.response?.data?.message;
    if (msg && msg.includes('Attempt to read property "id" on null')) {
      return { status: true, message: "Data berhasil dihapus" };
    }
    console.error("Gagal hapus RFID:", err.response?.data || err.message);
    throw err;
  }
};

export const updateRfidStatus = async (rfidId, status) => {
  try {
    const payload = { status };
    const res = await api.put(`/rfids/${rfidId}`, payload);
    return res.data;
  } catch (err) {
    console.error("Update error:", err.response?.data || err);
    throw err;
  }
};


export const updateRfid = async (rfidId, payload) => {
  try {
    const res = await api.put(`/rfids/${rfidId}`, payload);
    return res.data;
  } catch (err) {
    console.error("Update RFID error:", err.response?.data || err);
    throw err;
  }
};


export const addRfid = async (payload) => {
  try {
    const res = await api.post("/rfids", payload);
    return res.data;
  } catch (err) {
    console.error("Add RFID error:", err.response?.data || err);
    throw err;
  }
};


export const fetchAvailableStudents = async () => {
  try {
    const res = await api.get("/rfids/students-available");
    return res.data.data || [];
  } catch (error) {
    console.error("Gagal fetch students coy:", error);
    throw error;
  }
};



