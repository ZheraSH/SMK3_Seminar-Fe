import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const getAbsenteeismMonitoring = async (params = {}) => {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.get(`${API_BASE_URL}/counselor/attendance/monitoring-global`, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                Accept: "application/json"
            },
            params
        });
        console.log("Data Monitoring Absen dari API:");
        return res.data.data;
    } catch (err) {
        console.error("Gagal fetch data:", err);
        return {
            recap: { present: 0, permission: 0, sick: 0, alpha: 0 },
            students: [],
        };
    }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const getClass = async () => {
    let allTeachers = [];
    let currentPage = 1;
    let lastPage = 1;

    try {
        do {
            const res = await axios.get(`${API_BASE_URL}/classrooms?page=${currentPage}`);
            const responseData = res.data;

            if (responseData.data && Array.isArray(responseData.data)) {
                allTeachers = allTeachers.concat(responseData.data);
            }

            if (responseData.meta) {
                lastPage = responseData.meta.last_page || currentPage;
            } else if (responseData.links && responseData.links.next) {

            } else {
                lastPage = currentPage;
            }

            if (currentPage < lastPage) {
                await delay(150);
            }

            currentPage++;

        } while (currentPage <= lastPage);

        return allTeachers;

    } catch (err) {
        console.error("Gagal mengambil SEMUA Guru/Wali Kelas:", err.response ? err.response.data : err);
        throw err;
    }
};
