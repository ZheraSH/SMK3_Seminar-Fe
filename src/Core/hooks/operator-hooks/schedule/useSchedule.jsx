import { useState, useEffect, useMemo } from "react"; // Tambahkan useMemo
import { getClass, getMajors, getSchoolYears, getLevelClass } from "../../../api/role-operator/class-major/classApi";

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

 const [scheduleData, setScheduleData] = useState([]);
 const [loading, setLoading] = useState(true);
 const [page, setPage] = useState(1);
 const [lastPage, setLastPage] = useState(1);
 
 const [searchText, setSearchText] = useState("");
 
 const [filters, setFilters] = useState({ major: initialMajor, school_year: "", level_class: "",});
 const [filterOptions, setFilterOptions] = useState({ majors: [], schoolYears: [], levelClasses: [],});
 const [activeTab, setActiveTab] = useState("kelas");
 const [selectedClassroomData, setSelectedClassroomData] = useState(null);

 const fetchSchedule = async ( pageNumber = page, currentFilters = filters, currentSearchText = searchText ) => {
  try {
   setLoading(true);
   
   const apiParams = { page: pageNumber, search: currentSearchText, ...currentFilters,};

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

 const fetchFilterOptions = async () => {
  try {
   const [majorsRes, yearsRes, levelsRes] = await Promise.all([ getMajors(), getSchoolYears(), getLevelClass(),]);

   const activeSchoolYears = yearsRes?.data 
    ? yearsRes.data.filter((year) => year.active === true)
    : [];
   
   setFilterOptions({ 
    majors: majorsRes || [], 
    schoolYears: { data: activeSchoolYears } || [],
    levelClasses: levelsRes || [],
   });

  } catch (error) {
   console.error("Error fetching filter options:", error);
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
  fetchFilterOptions();
  
  return () => {
  };
 }, []);


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
  filterOptions,
  searchText,
  handleSearchChange,
 };
}