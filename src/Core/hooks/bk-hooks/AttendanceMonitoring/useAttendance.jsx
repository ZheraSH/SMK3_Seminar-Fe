import { useEffect, useState, useCallback } from "react";
import { getAbsenteeismMonitoring } from "../../../api/role-bk/monitoring/absenteeismMonitoring";

export function useAttendanceMonitoring() {
    const [students, setStudents] = useState([]);
    const [recap, setRecap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState("Show all");
    const [lastUpdated, setLastUpdated] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const fetchData = useCallback(async (params = {}, page = 1) => {
        setLoading(true);
        setError(null);

        try {
            if (searchQuery && Object.keys(params).length === 0) {
                params.search = searchQuery;
            }
            params.page = page;

            const data = await getAbsenteeismMonitoring(params);
            if (!data) {
                setError("Data Monitoring Tidak Ditemukan");
                setStudents([]);
                setRecap({});
                setTotalPages(1);
                return;
            }

            setStudents(data.list.data || []);
            setRecap(data.recap || {});
            setTotalPages(data.list.meta?.last_page || 1);
            setCurrentPage(data.list.meta?.current_page || 1);

            setLastUpdated(new Date());
        } catch (err) {
            console.error(err);
            setError("Gagal memuat data Izin");
            setStudents([]);
            setRecap({});
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        fetchData({}, currentPage);
    }, [fetchData, currentPage]);

    const handleFilterSelect = (item, type) => {
        setSelectedFilter(item);
        setCurrentPage(1);
        if (item === "Show all") {
            fetchData({}, 1);
        } else {
            fetchData({ [type]: item }, 1);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return {
        students,
        recap,
        loading,
        error,
        searchQuery,
        selectedFilter,
        lastUpdated,
        currentPage,
        totalPages,
        handleSearchChange,
        handleFilterSelect,
        handlePageChange,
        fetchData,
    };
}
