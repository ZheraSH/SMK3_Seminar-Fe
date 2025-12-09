import { useState, useEffect } from 'react';
import { getDashboard } from '../../../api/role-bk/dashboard/dashboard';


export const useDashboardData = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const dashboardData = await getDashboard();
            if (dashboardData) {
                setData(dashboardData);
            } else {
                setData(null); 
            }
        } catch (err) {
            console.error("Gagal memuat data di Hook:", err);
            setError("Gagal memuat data dashboard. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); 

    return { data, isLoading, error, refetch: fetchData };
};