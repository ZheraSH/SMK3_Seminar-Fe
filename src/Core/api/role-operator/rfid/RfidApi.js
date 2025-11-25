import axios from "axios";

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
