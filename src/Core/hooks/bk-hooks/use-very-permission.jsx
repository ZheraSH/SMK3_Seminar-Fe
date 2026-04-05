import { useState, useEffect, useCallback, useMemo } from "react";

const ALL_CLASSES_VALUE = "";

export function useVerifyPermissionData(fetchApi) {
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allAvailableClasses, setAllAvailableClasses] = useState(new Map());
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [perPage, setPerPage] = useState(8);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [selectedClassId, setSelectedClassId] = useState(ALL_CLASSES_VALUE);
    const [selectedType, setSelectedType] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    useEffect(() => {
        if (permissions.length > 0) {
            setAllAvailableClasses(prevMap => {
                const newMap = new Map(prevMap); 
                permissions.forEach(p => {
                    if (p.classroom && p.classroom.name) {
                        newMap.set(p.classroom.name, p.classroom);
                    }
                });
                return newMap;
            });
        }
    }, [permissions]);

    const classOptions = useMemo(() => {
        const options = [{ label: "Semua Kelas", value: ALL_CLASSES_VALUE }];
        
        Array.from(allAvailableClasses.values()).forEach(cls => {
            options.push({
                label: cls.name,
                value: cls.name,
            });
        });

        return options.sort((a, b) => a.label.localeCompare(b.label));
    }, [allAvailableClasses]);

    const handlePageChange = useCallback((newPage) => {
        if (newPage >= 1 && newPage <= lastPage) setCurrentPage(newPage);
    }, [lastPage]);

    const refetchData = useCallback(() => setRefreshTrigger(prev => prev + 1), []);
    
    const handleSearchChange = useCallback((query) => {
        setSearchQuery(query);
    }, []);

    const handleClassSelect = useCallback((value) => {
        setSelectedClassId(value);
        setCurrentPage(1);
    }, []);

    const handleTypeSelect = useCallback((value) => {
        setSelectedType(value);
        setCurrentPage(1);
    }, []);

    const handleStatusSelect = useCallback((value) => {
        setSelectedStatus(value);
        setCurrentPage(1);
    }, []);

    useEffect(() => {
        const fetchPermissions = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetchApi(currentPage, debouncedSearch, selectedClassId,selectedType,selectedStatus);

                if (!response || !response.data) {
                    setPermissions([]);
                    return;
                }

                setPermissions(response.data || []);
                if (response.meta) {
                    setLastPage(response.meta.last_page || 1);
                    setTotalItems(response.meta.total || 0);
                    setPerPage(response.meta.per_page || 8);
                }
            } catch (err) {
                setError("Gagal memuat data");
            } finally {
                setLoading(false);
            }
        };
        fetchPermissions();
    }, [currentPage, fetchApi, refreshTrigger, debouncedSearch, selectedClassId,selectedType,selectedStatus]);

    return {
        permissions,
        loading,
        error,
        currentPage,
        lastPage,
        totalItems,
        perPage,
        handlePageChange,
        refetchData,
        searchQuery,
        handleSearchChange,
        selectedClassId,
        handleClassSelect,
        options: { classes: classOptions } ,
        selectedType,
        handleTypeSelect,
        selectedStatus,
        handleStatusSelect,
    };
}