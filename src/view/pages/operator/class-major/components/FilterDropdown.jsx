import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useClassFilter = (classesDataFromApi) => {
  const [searchParams] = useSearchParams();

  const initialMajorFilter = searchParams.get('major');

  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(initialMajorFilter || 'Show all');
  const [openCategoryKey, setOpenCategoryKey] = useState(initialMajorFilter ? 'major' : null);
  const [searchTerm, setSearchTerm] = useState('');

  const filterMenuOptions = useMemo(() => {
    if (!classesDataFromApi || classesDataFromApi.length === 0) {
      return [{ type: "item", label: "Show all", filterValue: "Show all" }];
    }

    const majorNames = [
      ...new Set(
        classesDataFromApi
          .map((c) => c.major?.code || c.major_code || c.major || null)
          .filter(Boolean)
      )
    ];

    const levelNames = [
      ...new Set(
        classesDataFromApi
          .map((c) => c.name?.split(" ")[0]?.toUpperCase())
          .filter(Boolean)
      )
    ];

    const yearNames = [
      ...new Set(
        classesDataFromApi
          .map((c) =>
            c.school_year?.name ||
            c.school_year?.tahun ||
            c.school_year_name ||
            c.school_year ||
            null
          )
          .filter(Boolean)
      )
    ];

    return [
      { type: "item", label: "Show all", filterValue: "Show all" },
      { type: "category", label: "Jurusan", key: "major", items: majorNames },
      { type: "category", label: "Tingkatan", key: "level", items: levelNames },
      { type: "category", label: "Tahun Ajaran", key: "year", items: yearNames }
    ];
  }, [classesDataFromApi]);

  // filter data
 
  const filteredClasses = useMemo(() => {
    let result = [...(classesDataFromApi || [])];

    // SEARCH
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.name?.toLowerCase().includes(term) ||
           c.homeroom_teacher?.toLowerCase().includes(term)
      );
    }

    // FILTER DROPDOWN
    if (selectedFilter !== "Show all") {
      const filterValue = decodeURIComponent(selectedFilter)
        .toUpperCase()
        .trim();

      result = result.filter((classData) => {
        const majorCode = (
          classData.major?.code ||
          classData.major_code ||
          ""
        )
          .toUpperCase()
          .trim();

        const majorFullName = (
          classData.major?.code ||
          classData.major_code ||
          classData.major ||
          ""
        )
          .toUpperCase()
          .trim();

        const levelName = classData.name?.split(" ")[0]?.toUpperCase();
        const yearName = (
          classData.school_year?.name ||
          classData.school_year ||
          ""
        )
          .toUpperCase()
          .trim();

        return (
          majorCode === filterValue ||
          majorFullName === filterValue ||
          levelName === filterValue ||
          yearName === filterValue
        );
      });
    }

    // setiap filter berubah → reset page ke 1
    setCurrentPage(1);

    return result;
  }, [selectedFilter, searchTerm, classesDataFromApi]);

  return {
    isDropdownOpen,
    selectedFilter,
    openCategoryKey,
    searchTerm,
    filterMenuOptions,

    handleFilterSelect: (opt) => {
      setSelectedFilter(opt);
      setIsDropdownOpen(false);
      setOpenCategoryKey(null);
    },

    toggleDropdown: () => {
      setIsDropdownOpen((v) => !v);
      setOpenCategoryKey(null);
    },

    toggleCategory: (key) => {
      setOpenCategoryKey((old) => (old === key ? null : key));
    },

    setSearchTerm,

    filteredClasses 
  };
};
