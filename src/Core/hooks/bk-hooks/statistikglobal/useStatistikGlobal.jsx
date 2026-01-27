import { useState, useEffect, useCallback } from "react";
import { getAttendanceStatistics } from "../../../api/role-bk/statistikGlobal/statistikGlobal";

export default function useAttendanceStatistics() {
    const [statistics, setStatistics] = useState(null);
    const [isLoadingStatistics, setIsLoadingStatistics] = useState(false);
    const [errorStatistics, setErrorStatistics] = useState(null);

    const fetchStatistics = useCallback(async () => {
        setIsLoadingStatistics(true);
        setErrorStatistics(null);

        try {
            const result = await getAttendanceStatistics();

            // Get current month (1-12)
            const currentMonthIndex = new Date().getMonth() + 1;

            // Find current month data
            const currentMonthData = result.find(d => d.month === currentMonthIndex) || {
                hadir: 0,
                terlambat: 0,
                izin: 0,
                alpha: 0
            };

            const totalCurrent = currentMonthData.hadir + currentMonthData.terlambat + currentMonthData.izin + currentMonthData.alpha;

            const counts = {
                hadir: currentMonthData.hadir,
                terlambat: currentMonthData.terlambat,
                izin: currentMonthData.izin,
                alpha: currentMonthData.alpha,
                total: totalCurrent
            };

            // Process monthly trend
            const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
            const monthly_trend = {};

            result.forEach(item => {
                if (item.month >= 1 && item.month <= 12) {
                    const monthName = months[item.month - 1];
                    const total = item.hadir + item.terlambat + item.izin + item.alpha;
                    const percentage = total > 0
                        ? ((item.hadir + item.terlambat) / total) * 100
                        : 0;
                    monthly_trend[monthName] = parseFloat(percentage.toFixed(1));
                }
            });

            setStatistics({ counts, monthly_trend });
        } catch (err) {
            console.error("Gagal fetch statistik:", err);
            setErrorStatistics("Gagal mengambil data statistik");
        } finally {
            setIsLoadingStatistics(false);
        }
        return () => { };

    }, []);

    useEffect(() => {
        fetchStatistics();
    }, [fetchStatistics]);

    return {
        statistics,
        isLoadingStatistics,
        errorStatistics,
        refreshStatistics: fetchStatistics,
    };
}
