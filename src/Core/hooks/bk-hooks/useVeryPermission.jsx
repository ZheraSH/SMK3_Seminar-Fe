import { useState, useEffect, useCallback } from "react";
import useMaster from './AttendanceMonitoring/useMaster'; 

const ALL_CLASSES_VALUE = "";
const formatClassValue = (name) => name;

const formatNestedOptions = (majors, classroom) => {
    const options = [{
        label: "Semua Kelas",
        value: ALL_CLASSES_VALUE, 
        isMajor: false,
    }];

    const classesByMajorCode = classroom.reduce((acc, cls) => {
        const majorCode = cls['major.code']; 
        if (majorCode) {
            if (!acc[majorCode]) {
                acc[majorCode] = [];
            }
            acc[majorCode].push({
                label: cls.name, 
                value: formatClassValue(cls.name), 
                isMajor: false, 
            });
        }
        return acc;
    }, {});

    majors.forEach(major => {
        const majorCode = major.code; 
        const majorClasses = classesByMajorCode[majorCode] || [];

       let children;
        
        if (majorClasses.length === 0) {
            children = [{
                label: "Kelas belum ada", 
                value: `no_class_${majorCode}`,
                isPlaceholder: true,
                isMajor: false,
            }];
        } else {
            children = majorClasses;
        }

        options.push({
            label: major.code, 
            value: majorCode, 
            isMajor: true, 
            children: children
        });
    });

    return options;
};


export function useVerifyPermissionData(fetchApi) {
    const {  majors: masterMajors, classroom: masterClassroom,  loading: masterLoading,  error: masterError } = useMaster(); 

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
    const [selectedClassId, setSelectedClassId] = useState(ALL_CLASSES_VALUE); 
    
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
        setCurrentPage(1); 
    }, []);

    const handleClassSelect = useCallback((value) => {
        const finalValue = Array.isArray(value) ? value[value.length - 1] : value;
        
        setSelectedClassId(finalValue);
        setCurrentPage(1);
    }, []);

    useEffect(() => {
        const fetchPermissions = async () => {
            if (masterLoading) {
                setLoading(true);
                return;
            }

            setLoading(true);
            setError(null);
            
            let classFilter = selectedClassId;
            
            try {
                const response = await fetchApi(currentPage, searchQuery, classFilter); 

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

                const rawClasses = response.data.map(item => item.classroom);
                const validClasses = rawClasses.filter(cls => 
                    cls && cls.name && cls.name.trim() !== ''
                );

                setClasses(prevClasses => {
                    const uniqueClassesMap = new Map();
                    prevClasses.forEach(item => uniqueClassesMap.set(item.name, item));
                    validClasses.forEach(item => uniqueClassesMap.set(item.name, item));
                    return Array.from(uniqueClassesMap.values());
                });

            } catch (err) {
                console.error("Fetching error:", err);
                setError("Gagal memuat data Izin");
                setPermissions([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPermissions();
    }, [
        currentPage, 
        fetchApi,
        refreshTrigger,
        searchQuery, 
        selectedClassId, 
        masterLoading
    ]);

    const nestedOptions = formatNestedOptions(masterMajors, masterClassroom);

    const options = {
        classes: nestedOptions, 
    };

    return {
        permissions,
        loading: loading || masterLoading,
        error: error || masterError,
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
        handleClassSelect,
        options 
    };
}