import axios from "axios"

export const fetchClass = async () => {
   try {
    const res = await axios.get("http://127.0.0.1:8000/api/lessonSchedules");
    console.log("📦 Data Jadwal Pelajaran dari API:", res.data);
    return res.data.data;
  } catch (err) {
    console.error("gagal", err);
    return [];
  }
};



