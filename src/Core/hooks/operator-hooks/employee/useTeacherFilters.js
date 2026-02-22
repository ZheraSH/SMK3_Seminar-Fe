"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";

export const useTeacherFilter = (teachers, applyFilters) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState({
    type: "",
    value: "",
    label: "Pilih Kategori",
  });

  const searchTimeout = useRef(null);

  // Client-side filtering
  const filteredTeachers = useMemo(() => {
    if (!teachers) return [];
    if (!category.type || !category.value) return teachers;

    switch (category.type) {
      case "gender":
        return teachers.filter(
          (t) => t.gender?.value === category.value || t.gender === category.value
        );

      case "role":
        return teachers.filter((t) => {
          if (!Array.isArray(t.roles)) return false;
          return t.roles.some(
            (r) => r.value === category.value || r === category.value
          );
        });

      case "subject_id":
        return teachers.filter((t) => {
          if (!Array.isArray(t.subjects)) return false;
          return t.subjects.some((s) => String(s.id) === String(category.value));
        });

      default:
        return teachers;
    }
  }, [category, teachers]);

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
        applyFilters(value.trim()); // Only apply search filter to API
      }, 500);
    },
    [applyFilters]
  );

  const handleCategoryChange = useCallback(
    (cat) => {
      setCategory(cat);
      // No applyFilters here to avoid API reload/skeleton
    },
    []
  );

  return {
    searchTerm,
    category,
    handleSearch,
    handleCategoryChange,
    filteredTeachers,
    setCategory,
  };
};