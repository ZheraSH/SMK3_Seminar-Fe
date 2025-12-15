import { getClass } from "../../../api/role-bk/monitoring/absenteeismMonitoring";
import { getMajors } from "../../../api/role-operator/class-major/classApi";
import { useState, useEffect } from "react";

const masterDataCache = {}; 
const fetchAndCache = async (apiFunc, key) => {
    try {
        const res = await apiFunc();
        const dataToCache = res?.data || res || []; 
        masterDataCache[key] = dataToCache;
        return dataToCache;
    } catch (error) {
        console.error(`Error fetching ${key}:`, error);
        return []
    }
};


export default function useMaster() {
    const [majors, setMajors] = useState([]);
    const [classroom, setClassroom] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMaster = async () => {
        setLoading(true);
        setError(null);

        if (masterDataCache.majors || masterDataCache.classroom) {
            setMajors(masterDataCache.majors || []);
            setClassroom(masterDataCache.classroom || []);
            setLoading(false);
            return;
        }

        try {
            await Promise.all([
                fetchAndCache(getMajors, "majors"),
                fetchAndCache(getClass, "classroom"),
            ]);

            setMajors(masterDataCache.majors || []);
            setClassroom(masterDataCache.classroom || []);
        } catch (err) {
            console.error("Error fetching master data:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMaster();
    }, []);

    return { majors, classroom, loading, error };
}
