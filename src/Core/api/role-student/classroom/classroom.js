import api from "../../axiosConfig";

export const getClassroom = async (params = {}) =>  {

    try {
        const res = await api.get(
            `/student/classroom-info`,
            {
                headers : {
                    Accept: "application/json",
                },
                params
            }
        );
        return res.data;
    }
    catch (error) {
        console.log("Gagal mengambil jadwal: ", error);
        return null;
    }
}