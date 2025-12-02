import { useState, useEffect } from "react";
import { getClass, createClass, getMajors, getSchoolYears,getLevelClass,} from "../../../api/role-operator/class-major/classApi";

export default function useClasses({ initialMajor = "" }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1); 
  const [filters, setFilters] = useState({ major: initialMajor, school_year: "", level_class: "",});
  const [filterOptions, setFilterOptions] = useState({ majors: [], schoolYears: [], levelClasses: [],});

  const fetchClass = async (pageNumber = page, currentFilters = filters) => {
    try {
      setLoading(true);
      const res = await getClass(pageNumber, currentFilters); 
      setData(res.data); 
      setPage(res.meta.current_page); 
      setLastPage(res.meta.last_page); 
      setFilters(currentFilters);
      
    } catch (error) {
      console.error("Error fetching Class:", error);
      setData([]);
      setLastPage(1); 
    } finally {
      setLoading(false);
    }
  };
  
  const fetchFilterOptions = async () => {
    try {
      const [majorsRes, yearsRes, levelsRes] = await Promise.all([
        getMajors(),
        getSchoolYears(),
        getLevelClass(),
      ]);
      
      setFilterOptions({
        majors: majorsRes || [],
        schoolYears: yearsRes || [],
        levelClasses: levelsRes || [],
      });
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  const handleFilterChange = (newFilters) => {
    const pageReset = 1;
    fetchClass(pageReset, newFilters);
  };
  
  const handlePageChange = (newPage) => {
    fetchClass(newPage, filters);
  };

  const addClass = async (formData) => {
    setLoading(true);
    try {
      const result = await createClass(formData);
      await fetchClass(1, filters);
      return { success: true, data: result };
    } catch (error) {
      console.error("Error adding class:", error);
      setLoading(false);
      throw error;
    }
  };

  useEffect(() => {
   fetchClass(1, {  major: initialMajor, school_year: "", level_class: "",});
    fetchFilterOptions();
  }, []);

  return { classesData: data, loading, addClass, page, lastPage,  handlePageChange,  filters, handleFilterChange, filterOptions,};
}