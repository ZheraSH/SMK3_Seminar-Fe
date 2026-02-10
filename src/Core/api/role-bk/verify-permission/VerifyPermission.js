import { notify } from "../../../../Core/hooks/notification/notify";
import api from "../../axiosConfig";

export const getVerifyPermissionBk = async (page = 1, search = "", classId = null, type = null, status = null) => {
    const params = new URLSearchParams({ page: page });

    if (search) {
        params.append('search', search);
    }

    if (classId && typeof classId === 'string' && classId.trim() !== '') {
        params.append('classroom', classId.trim()); 
    }

    if (type && type !== 'all') {
        params.append('type', type);
    }

    if (status && status !== 'all') {
        params.append('status', status);
    }

    const url = `/counselor/attendance-permissions?${params.toString()}`;

   try {
    const res = await api.get(url,
        {
            headers: {
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

export const getPermissionDetailBk = async (permissionId) => {
    
    const url = `/counselor/attendance-permissions/${permissionId}`;

    try {
        const res = await api.get(
            url,
            {
                headers: {
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
    const url = `/counselor/attendance-permissions/${permissionId}/approve`;


    try {
        const res = await api.post(
            url,
            {}, 
            {
                headers: {
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
    
    const url = `/counselor/attendance-permissions/${permissionId}/reject`;


    try {
        const res = await api.post(
            url,
            {}, 
            {
                headers: {
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