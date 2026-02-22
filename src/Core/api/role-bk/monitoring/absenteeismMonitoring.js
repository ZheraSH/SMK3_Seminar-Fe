import api from "../../axiosConfig";

export const getAbsenteeismMonitoring = async (params = {}) => {
    try {
        const res = await api.get(`/counselor/attendance/monitoring-global`, {
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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const getClass = async () => {
    let allTeachers = [];
    let currentPage = 1;
    let lastPage = 1;

    try {
        do {
            const res = await api.get(`/classrooms?page=${currentPage}`);
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
