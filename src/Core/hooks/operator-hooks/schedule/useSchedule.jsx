import { useState, useEffect, useMemo } from "react"; 
import { getClass } from "../../../api/role-operator/class-major/classApi"; 
import useMasterData from "../class-major/useMasterData";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export default function useSchedule({ initialMajor = "" }) {
    const master = useMasterData();
    const { majors, schoolYears, levelClass, loading: masterLoading } = master;

    const [scheduleData, setScheduleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState({ major: initialMajor, school_year: "", level_class: "",});
    const [activeTab, setActiveTab] = useState("kelas");
    const [selectedClassroomData, setSelectedClassroomData] = useState(null);

    const fetchSchedule = async ( pageNumber = page, currentFilters = filters, currentSearchText = searchText ) => {
        try {
        setLoading(true);
        
        const apiParams = { page: pageNumber, search: currentSearchText, 
                ...Object.fromEntries(
                    Object.entries(currentFilters).filter(([_, v]) => v)
                ),
            };

        const res = await getClass(apiParams);
        
        setScheduleData(res.data);
        setPage(res.meta.current_page);
        setLastPage(res.meta.last_page);
        setFilters(currentFilters); 
        } catch (error) {
        console.error("Error fetching schedule:", error);
        setScheduleData([]);
        setLastPage(1);

        } finally {
        setLoading(false);
        }
    };


    const handleFilterChange = (newFilters) => {
        fetchSchedule(1, newFilters, searchText); 
    };

    const handlePageChange = (newPage) => {
        fetchSchedule(newPage, filters, searchText);
    };
    
    const debouncedFetch = useMemo(
        () => debounce((searchQuery) => {
        fetchSchedule(1, filters, searchQuery); 
        }, 500), 
        [filters]
    );

    const handleSearchChange = (newText) => {
        setSearchText(newText); 
        debouncedFetch(newText);
    };

    const handleViewSchedule = (classroomData) => {
        setSelectedClassroomData(classroomData);
        setActiveTab("jadwal-kelas");
    };

    const handleBackToClasses = () => {
        setSelectedClassroomData(null);
        setActiveTab("kelas");
    };

    useEffect(() => {
        fetchSchedule(1, { major: initialMajor, school_year: "", level_class: "" }, "");
        // fetchFilterOptions() dihapus
    }, [initialMajor]);

  return {
      activeTab,
      setActiveTab,
      selectedClassroomData,
      handleViewSchedule,
      handleBackToClasses,
      scheduleData,
      loading,
      page,
      lastPage,
      handlePageChange,
      filters,
      handleFilterChange,
        
      filterOptions: { 
            majors: majors || [], 
            schoolYears: schoolYears || [], 
            levelClasses: levelClass || [],
        },
        masterLoading: masterLoading, 
      searchText,
      handleSearchChange,
  };
}