import axios from "axios"
const API_BASE_URL = "http://127.0.0.1:8000/api";
import { notify } from "../../../../Core/hooks/notification/notify";

export const getVerifyPermissionBk = async (page = 1, search = "", classId = null) => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log("TOKEN:", token);
    console.log("USER DATA:", userData)
    
    // Kita gunakan URLSearchParams untuk menangani semua parameter
    const params = new URLSearchParams({ page: page });

    // Tambahkan search jika ada
    if (search) {
        params.append('search', search);
    }

    // 👇 PERBAIKAN LOGIKA FILTER: Cek apakah classId adalah string yang BUKAN kosong
    if (classId && typeof classId === 'string' && classId.trim() !== '') {
        // Gunakan 'filter' sesuai dengan yang ada di API Anda
        params.append('filter', encodeURIComponent(classId));
    }

    const url = `${API_BASE_URL}/counselor/attendance-permissions?${params.toString()}`;

    // Log URL yang terbentuk untuk debugging
    console.log("URL Request:", url);

   try {
    const res = await axios.get(url,

        {
            headers: {
                Authorization:token ? `Bearer ${token}` : "",
                Accept: "application/json"
            }
        }
    );
    console.log(" Data Verifikasi Izin dari API:", res.data);
    return res.data;
  } catch (err) {
    console.error("gagal", err);
    return {
      data: [],
            meta: { current_page: 1, last_page: 1, total: 0 }
    };
  }
};

// show
export const getPermissionDetailBk = async (permissionId) => {
    const token = localStorage.getItem("token");
    
    const url = `${API_BASE_URL}/counselor/attendance-permissions/${permissionId}`;

    console.log(`Mengambil detail izin untuk ID: ${permissionId}`);

    try {
        const res = await axios.get(
            url,
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    Accept: "application/json",
                }
            }
        );
        
        console.log("Respon Detail Izin API:", res.data);
        return res.data.data; 
    } catch (err) {
        console.error("Gagal mengambil detail izin:", err.response ? err.response.data : err.message);
        
        throw new Error(err.response?.data?.message || "Gagal memuat detail izin. Silakan coba lagi.");
    }
};

export const approvePermissionBk = async (permissionId) => {
    const token = localStorage.getItem("token");
    const url = `${API_BASE_URL}/counselor/attendance-permissions/${permissionId}/approve`;

    console.log(`Mengirim permintaan APPROVE untuk ID: ${permissionId}`);

    try {
        const res = await axios.post(
            url,
            {}, 
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    Accept: "application/json",
                }
            }
        );
        
        console.log("Respon Approve API:", res.data);
        notify('data berhasil di setujui');
        return res.data;
    } catch (err) {
        console.error("Gagal menyetujui izin:", err.response ? err.response.data : err.message);
        throw new Error(err.response?.data?.message || "Gagal menyetujui izin. Silakan coba lagi.");
    }
};

export const rejectPermissionBk = async (permissionId) => {
    const token = localStorage.getItem("token");
    
    const url = `${API_BASE_URL}/counselor/attendance-permissions/${permissionId}/reject`;

    console.log(`Mengirim permintaan REJECT untuk ID: ${permissionId}`);

    try {
        const res = await axios.post(
            url,
            {}, 
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                    Accept: "application/json",
                }
            }
        );
        
        console.log("Respon Reject API:", res.data);
        notify('data berhasil di tolak');
        return res.data;
    } catch (err) {
        console.error("Gagal menolak izin:", err.response ? err.response.data : err.message);
        
        throw new Error(err.response?.data?.message || "Gagal menolak izin. Silakan coba lagi.");
    }
};