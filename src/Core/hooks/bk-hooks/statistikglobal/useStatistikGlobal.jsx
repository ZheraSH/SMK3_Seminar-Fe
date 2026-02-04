import { useState, useEffect, useCallback } from "react";
import { getAttendanceStatistics } from "../../../api/role-bk/statistikGlobal/statistikGlobal";

export default function useAttendanceStatistics() {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorStatistics, setErrorStatistics] = useState(null);

    const fetchStatistics = useCallback(async () => {
        setLoading(true);
        setErrorStatistics(null);

        try {
            const result = await getAttendanceStatistics();
            setStatistics(result);
        } catch (err) {
            console.error("Gagal fetch statistik:", err);
            setErrorStatistics("Gagal mengambil data statistik");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStatistics();
    }, [fetchStatistics]);

    return {
        statistics,
        loading,
        errorStatistics,
        refreshStatistics: fetchStatistics, 
    };
}
