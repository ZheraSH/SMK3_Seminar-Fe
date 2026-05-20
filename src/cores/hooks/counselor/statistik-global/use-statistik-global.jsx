import { useState, useEffect, useCallback } from "react";
import { getAttendanceStatistics, getMonthlyAttendanceTrend } from "@services/role-counselor/statistik-global/statistik-global";

export default function useAttendanceStatistics() {
    const [statistics, setStatistics] = useState(null);
    const [isLoadingStatistics, setIsLoadingStatistics] = useState(false);
    const [errorStatistics, setErrorStatistics] = useState(null);

    const fetchStatistics = useCallback(async () => {
        setIsLoadingStatistics(true);
        setErrorStatistics(null);

        try {
            const [globalRes, monthlyRes] = await Promise.all([
                getAttendanceStatistics(),
                getMonthlyAttendanceTrend()
            ]);

            if (!globalRes) throw new Error("Gagal mengambil statistik global");

            const counts = {
                hadir: globalRes.counts?.hadir || 0,
                sakit: globalRes.counts?.sakit || 0,
                terlambat: globalRes.counts?.terlambat || 0, 
                izin: globalRes.counts?.izin || 0,
                alpha: globalRes.counts?.alpa || globalRes.counts?.alpha || 0,
                total: globalRes.counts?.total || 0
            };

            const monthly_trend = {};
            if (Array.isArray(monthlyRes)) {
              monthlyRes.forEach(item => {
                  const shortMonth = item.month.substring(0, 3);
                  monthly_trend[shortMonth] = item.attendance_percentage || 0;
              });
            }

            setStatistics({ counts, monthly_trend });
        } catch (err) {setErrorStatistics("Gagal mengambil data statistik");
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

