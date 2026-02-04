import axios from "axios";
import { notify } from "../../../hooks/notification/notify";

export const fetchRfid = async (page = 1, search = "") => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/rfids", {

      params: {
        page,
        search
      }
      
    });

    return {
      data: res.data.data || [],
      meta: res.data.meta || {}
    };
    
  } catch (err) {
    console.error("Gagal mengambil RFID:", err);
    throw err;
  }
};


// Hapus RFID
export const deleteRFID = async (id) => {
  try {
    const res = await axios.delete(`http://127.0.0.1:8000/api/rfids/${id}`);
    notify("Data berhasil Dihapus")
    return res.data;
  } catch (err) {
    console.error("Gagal hapus RFID:", err.response?.data || err.message);
    throw err;
  }
};

// Update status RFID
export const updateRfidStatus = async (rfidId, status) => {
  try {
    const payload = { status };
    const res = await axios.put(`http://127.0.0.1:8000/api/rfids/${rfidId}`, payload);
    return res.data;
  } catch (err) {
    console.error("Update error:", err.response?.data || err);
    throw err;
  }
};

// Tambah RFID baru
export const addRfid = async (payload) => {
  try {
    const res = await axios.post(`http://127.0.0.1:8000/api/rfids`, payload);
    return res.data;
  } catch (err) {
    console.error("Add RFID error:", err.response?.data || err);
    throw err;
  }
};

// Ambil siswa yang belum punya RFID
export const fetchAvailableStudents = async () => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/api/rfids/available-students`);
    return res.data.data || [];
  } catch (error) {
    console.error("Gagal fetch students:", error);
    throw error;
  }
};
