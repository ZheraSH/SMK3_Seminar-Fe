import api from "@services/axios-config";
export const getAbsenteeismMonitoring = async (params = {}) => {
    const token = localStorage.getItem("token");

    try {
        const res = await api.get(`/counselor/attendance/monitoring-global`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                Accept: "application/json"
            },
            params
        });
        return res.data.data;

    } catch (err) {
        console.error("Gagal fetch data:", err);
        return {
            recap: { present: 0, permission: 0, sick: 0, alpha: 0 },
            students: [],
        };
    }
};


