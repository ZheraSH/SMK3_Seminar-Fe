import { useState, useEffect } from "react";
import { fetchSummaryClassdaily } from "../../api/role-homeroom/summary-class/SummaryClass";


export function useRecap() {
    
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const today = new Date().toISOString().split("T")[0];
        const data = await fetchSummaryClassdaily(today);
        setStudents(data?.students ?? []);
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    };
    fetchData();
    }, []);

    return (
        students,loading
    )
}