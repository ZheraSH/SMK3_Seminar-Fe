import { useEffect, useState, useCallback } from "react";
import { getAbsenteeismMonitoring } from "../../../api/role-bk/monitoring/absenteeismMonitoring";

export function useAttendanceMonitoring() {
    const [students, setStudents] = useState([]);
    const [recap, setRecap] = useState({});
    const [noData, setNoData] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState("Show all");
    const [lastUpdated, setLastUpdated] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeFilter, setActiveFilter] = useState({});

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const fetchData = useCallback(async (params = {}, page = 1) => {
        setLoading(true);
        setError(null);

        try {
            const finalParams = {
                ...params,
                page,
            };

            if (searchQuery) {
                finalParams.search = searchQuery;
            }

            const data = await getAbsenteeismMonitoring(finalParams);

            if (!data || !data.list?.data?.length) {
                setStudents([]);
                setRecap({});
                setTotalPages(1);
                setNoData(true);
                return;
            }

            setStudents(data.list.data || []);
            setRecap(data.recap || {});
            setTotalPages(data.list.meta?.last_page || 1);
            setCurrentPage(data.list.meta?.current_page || 1);

            setLastUpdated(new Date());
            setNoData(false);
        } catch (err) {
            console.error(err);
            setError("Gagal memuat data Izin");
            setStudents([]);
            setRecap({});
            setTotalPages(1);
            setNoData(false);
        } finally {
            setLoading(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        fetchData(activeFilter, currentPage);
    }, [fetchData, currentPage, activeFilter]);

    const handleFilterSelect = (item, type) => {
        setSelectedFilter(item);
        setCurrentPage(1);

        if (item === "Show all") {
            setActiveFilter({});
            fetchData({}, 1);
        } else {
            const newFilter = { [type]: item };
            setActiveFilter(newFilter);
            fetchData(newFilter, 1);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return {
        students,
        recap,
        loading,
        noData,
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
