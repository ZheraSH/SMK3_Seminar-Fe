import { useState, useEffect, useCallback } from "react";
import { 
    getProfileOperator, 
    schoolYear, 
    updateProfileOperator,
    getPublicLogo 
} from "../../../api/role-operator/profile/ProfileOperator";

export default function useProfile() {
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null); 
    const [year, setYear] = useState(null);
    const [schoolInfo, setSchoolInfo] = useState(null); 

    const fetchLogo = useCallback(async () => {
        try {
            const response = await getPublicLogo();
            if (response) setSchoolInfo(response);
        } catch (err) {
            console.error("Gagal load logo sidebar:", err);
        }
    }, []);

    const fetchProfile = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getProfileOperator();
            if (!response || response.length === 0) {
                throw new Error("Data profile kosong");
            }
            setData(response[0]);
        } catch (err) {
            setError(err.message || "Terjadi Kesalahan Saat Memuat Data.");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchSchoolYear = useCallback(async () => {
        try {
            const result = await schoolYear();
            if (result) setYear(result);
        } catch (error) {
            console.error("Gagal fetch school year:", error);
        }
    }, []);

    const handleUpdate = async (formData) => {
        setUpdating(true);
        try {
            const result = await updateProfileOperator(formData);
            await fetchProfile(); 
            await fetchLogo(); 
            return result;
        } catch (err) {
            setError(err.message || "Gagal memperbarui data");
            throw err;
        } finally {
            setUpdating(false);
        }
    };

    useEffect(() => {
        fetchLogo(); 
        fetchProfile();
        fetchSchoolYear();
    }, [fetchProfile, fetchSchoolYear, fetchLogo]);

    return { 
        data, 
        schoolInfo, 
        loading, 
        updating, 
        error, 
        year, 
        refetch: fetchProfile, 
        handleUpdate 
    };
}