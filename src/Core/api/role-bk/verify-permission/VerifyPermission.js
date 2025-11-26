import axios from "axios"
const API_BASE_URL = "http://127.0.0.1:8000/api";

export const getVerifyPermissionBk= async () => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log("TOKEN:", token);
    console.log("USER DATA:", userData)
   try {
    const res = await axios.get(`${API_BASE_URL}/counselor/attendance-permissions`,

        {
            headers: {
                Authorization:token ? `Bearer ${token}` : "",
                Accept: "application/json"
            }
        }
    );
    console.log(" Data Verifikasi Izin dari API:", res.data);
    return res.data.data;
  } catch (err) {
    console.error("gagal", err);
    return [];
  }
};