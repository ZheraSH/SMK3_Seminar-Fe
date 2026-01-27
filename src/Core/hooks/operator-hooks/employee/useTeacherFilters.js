"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export const useTeacherFilter = (applyFilters) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState({
    type: "",
    value: "",
    label: "Pilih Kategori",
  });
  
  const searchTimeout = useRef(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  const handleSearch = useCallback(
    (value) => {
      setSearchTerm(value);
      clearTimeout(searchTimeout.current);

      searchTimeout.current = setTimeout(() => {
        const filters = {};
        if (value.trim()) filters.search = value.trim();
        if (category.type && category.value)
          filters[category.type] = category.value;

        applyFilters(filters);
      }, 500);
    },
    [category, applyFilters]
  );

  const handleCategoryChange = useCallback(
    (cat) => {
      setCategory(cat);

      const filters = {};
      if (searchTerm.trim()) filters.search = searchTerm.trim();
      if (cat.type && cat.value) filters[cat.type] = cat.value;

      applyFilters(filters);
    },
    [searchTerm, applyFilters]
  );

  return {
    searchTerm,
    category,
    handleSearch,
    handleCategoryChange,
    setCategory,
  };
};