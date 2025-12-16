import axios from "axios"
const API_BASE_URL = "http://127.0.0.1:8000/api";
import { notify } from "../../../../Core/hooks/notification/notify";

export const getVerifyPermissionBk = async (page = 1, search = "", classId = null) => {
    const token = localStorage.getItem("token");
    const params = new URLSearchParams({ page: page });

    if (search) {
        params.append('search', search);
    }

    if (classId && typeof classId === 'string' && classId.trim() !== '') {
        params.append('filter', classId.trim()); 
    }

    const url = `${API_BASE_URL}/counselor/attendance-permissions?${params.toString()}`;

   try {
    const res = await axios.get(url,
        {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                Accept: "application/json"
            }
        }
    );
    return res.data;
    } catch (err) { 
        notify('Gagal memuat data izin: ' + (err.response?.data?.message || err.message), 'error');
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
        
        return res.data.data; 
    } catch (err) {
        
        throw new Error(err.response?.data?.message || "Gagal memuat detail izin. Silakan coba lagi.");
    }
};

export const approvePermissionBk = async (permissionId) => {
    const token = localStorage.getItem("token");
    const url = `${API_BASE_URL}/counselor/attendance-permissions/${permissionId}/approve`;


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
        
        notify('Data Berhasil Disetujui');
        return res.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || "Gagal menyetujui izin. Silakan coba lagi.");
    }
};

export const rejectPermissionBk = async (permissionId) => {
    const token = localStorage.getItem("token");
    
    const url = `${API_BASE_URL}/counselor/attendance-permissions/${permissionId}/reject`;


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
        
        notify('Data Berhasil Ditolak');
        return res.data;
    } catch (err) {
        
        throw new Error(err.response?.data?.message || "Gagal menolak izin. Silakan coba lagi.");
    }
};