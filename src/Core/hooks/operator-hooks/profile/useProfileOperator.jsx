import { useState, useEffect, useCallback } from "react";
import { getProfileOperator, schoolYear, updateProfileOperator } from "../../../api/role-operator/profile/ProfileOperator";

export default function useProfile() {
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false); // State khusus saat proses update
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [year, setYear] = useState(null);

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
            return result;
        } catch (err) {
            setError(err.message || "Gagal memperbarui data");
            throw err;
        } finally {
            setUpdating(false);
        }
    };

    useEffect(() => {
        fetchProfile();
        fetchSchoolYear();
    }, [fetchProfile, fetchSchoolYear]);

    return { 
        data, 
        loading, 
        updating, 
        error, 
        year, 
        refetch: fetchProfile, 
        handleUpdate 
    };
}






