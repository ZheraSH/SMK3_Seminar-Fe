import { useState, useEffect, useMemo } from "react"; 
import { getClass, createClass } from "../../../api/role-operator/class-major/classApi";
import useMasterData from "./useMasterData"; 

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        func.apply(this, args);
    }, delay);
  };
};

export default function useClasses({ initialMajor = "" }) {
   const master = useMasterData();
   const { majors, schoolYears, levelClass, teachers, loading: masterLoading } = master; // schoolYears sudah berupa array yang sudah difilter

   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true); 
   const [page, setPage] = useState(1);
   const [lastPage, setLastPage] = useState(1); 
   const [searchText, setSearchText] = useState("");
   const [filters, setFilters] = useState({ major: initialMajor, school_year: "", level_class: "",});

   const fetchClass = async (pageNumber, currentFilters, currentSearchText) => {
       try {
           setLoading(true);
           const apiParams = { page: pageNumber, search: currentSearchText,
               ...Object.fromEntries(
                   Object.entries(currentFilters).filter(([_, v]) => v)
               ),
           };

           const res = await getClass(apiParams); 

           setData(res.data); 
           setPage(res.meta.current_page); 
           setLastPage(res.meta.last_page); 

       } catch (error) {
           console.error("Error fetching Class:", error.response?.data || error);
           setData([]);
           setLastPage(1); 
       } finally {
           setLoading(false);
       }
   };

   const handleFilterChange = (newFilters) => {
       const pageReset = 1;
       setFilters(newFilters);
       fetchClass(pageReset, newFilters, searchText); 
   };

   const handlePageChange = (newPage) => {
    fetchClass(newPage, filters, searchText); 
   };

   const debouncedFetch = useMemo(
       () => debounce((searchQuery) => {
           fetchClass(1, filters, searchQuery); 
       }, 500), 
       [filters] 
   );


   const handleSearchChange = (newText) => {
 	  setSearchText(newText); 
 	  debouncedFetch(newText); 
   };


    const addClass = async (formData) => {
      setLoading(true);
      try {
        const result = await createClass(formData);
        await fetchClass(1, filters, searchText); 
        return { success: true, data: result };
      } catch (error) {
        console.error("Error adding class:", error);
        setLoading(false);
        throw error;
      }
    };

   useEffect(() => {
    fetchClass(1, { major: initialMajor, school_year: "", level_class: "" }, ""); 
   }, [initialMajor]); 

   return { 
       classesData: data, 
       loading: loading, 
       addClass, 
       page, 
       lastPage, 
       handlePageChange, 
       filters, 
       handleFilterChange, 
       searchText, 
       handleSearchChange,
    
       masterLoading: masterLoading,
       filterOptions: { 
           majors: majors || [], 
           schoolYears: schoolYears || [], 
           levelClasses: levelClass || [], 
           teachers: teachers || [],
       },
   };
}