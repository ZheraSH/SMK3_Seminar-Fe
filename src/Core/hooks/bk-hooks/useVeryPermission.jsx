import { useState, useEffect, useCallback } from "react";

export function useVerifyPermissionData(fetchApi) {
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [classes, setClasses] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [perPage, setPerPage] = useState(8);

    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedClassId, setSelectedClassId] = useState(null);

    const handlePageChange = useCallback((newPage) => {
        if (newPage >= 1 && newPage <= lastPage) {
            setCurrentPage(newPage);
        }
    }, [lastPage]);

    const refetchData = useCallback(() => {
        setRefreshTrigger(prev => prev + 1); 
    }, []);

    const handleSearchChange = useCallback((query) => {
        setSearchQuery(query);
        // Reset ke halaman 1 setiap kali query pencarian berubah
        setCurrentPage(1); 
    }, []);

    const handleClassSelect = useCallback((classId) => {
        setSelectedClassId(classId);
        setCurrentPage(1); // Reset ke halaman 1 saat filter berubah
    }, []);

    useEffect(() => {
        const fetchPermissions = async (page, search, classId) => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetchApi(page, search, classId); 

                if (!response || !response.data) {
                    setError("Data Izin Tidak Ditemukan");
                    setPermissions([]);
                    setTotalItems(0);
                    setLastPage(1);
                    return;
                }
                
                setPermissions(response.data || []); 
                
                if (response.meta) {
                    setLastPage(response.meta.last_page || 1);
                    setTotalItems(response.meta.total || 0);
                    setPerPage(response.meta.per_page || 8);
                }

                const newClasses = response.data.reduce((acc, current) => {
                    // Cek jika classroom ada dan belum ada di akumulator
                    if (current.classroom && !acc.some(c => c.id === current.classroom.id)) {
                        acc.push(current.classroom);
                    }
                    return acc;
                }, []);
                
                // Gabungkan kelas baru dengan kelas lama tanpa duplikasi
                setClasses(prevClasses => {
                    const allUniqueClasses = [...new Map([
                        ...prevClasses.map(item => [item.id, item]), 
                        ...newClasses.map(item => [item.id, item])
                    ]).values()];
                    return allUniqueClasses;
                });

            } catch (err) {
                console.error("Fetching error:", err);
                setError("Gagal memuat data Izin");
                setPermissions([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPermissions(currentPage, searchQuery, selectedClassId);
    }, [currentPage, fetchApi,refreshTrigger,searchQuery, selectedClassId]); 

    return {
        permissions,
        loading,
        error,
        classes,
        currentPage,
        lastPage,
        totalItems,
        perPage,
        handlePageChange,
        refetchData,
        searchQuery,
        handleSearchChange,
        selectedClassId,
        handleClassSelect
    };
}