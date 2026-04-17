<<<<<<< HEAD:src/Core/api/role-operator/rfid/RfidApi.js
import api from "../../axiosConfig";
import { notify } from "../../../hooks/notification/notify";
=======
import api from "@services/axios-config";
import { notify } from "@/core/hooks/notification/notify";
>>>>>>> dev2:src/core/services/role-operator/rfid/rfid-api.js

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
    const res = await api.delete(`/rfids/${id}`);
    notify("Data berhasil Dihapus");
    return res.data;
  } catch (err) {
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
    console.log(res.data.data);
    return res.data.data || [];
  } catch (error) {
    console.error("Gagal fetch students coy:", error);
    throw error;
  }
};



