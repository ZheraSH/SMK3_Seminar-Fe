import { useState, useEffect, useRef } from 'react';

export const useTeacherFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState("");
  const [category, setCategory] = useState("Pilih Kategori");
  const [currentFilter, setCurrentFilter] = useState({
    type: null,
    value: null,
  });
  const categoryRef = useRef(null);

  const handleCategorySelect = (selected) => {
    setCategory(selected);
    setOpenCategory(false);
    setOpenSubMenu("");

    if (selected === "Semua Kategori") {
      setCurrentFilter({ type: null, value: null });
      return;
    }

    let filterType = null;
    let filterValue = null;

    if (selected.startsWith("Gender: ")) {
      const genderLabel = selected.split(": ")[1];
      filterValue = genderLabel;
      filterType = "gender";
    } else if (selected.startsWith("religion: ")) {
      filterValue = selected.split(": ")[1];
      filterType = "religion";
    }

    setCurrentFilter({ type: filterType, value: filterValue });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setOpenCategory(false);
        setOpenSubMenu("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterTeachers = (allTeachers) => {
    return allTeachers.filter((teacher) => {
      const keyword = searchTerm.toLowerCase();
      const matchesSearch =
        teacher.name?.toLowerCase().includes(keyword) ||
        teacher.NIK?.toLowerCase().includes(keyword) ||
        teacher.NIP?.toLowerCase().includes(keyword) ||
        teacher.gender?.toLowerCase().includes(keyword);

      let matchesFilter = true;
      if (currentFilter.type && currentFilter.value) {
        switch (currentFilter.type) {
          case "gender":
            matchesFilter =
              teacher.gender?.toLowerCase() === currentFilter.value.toLowerCase();
            break;
          case "religion":
            matchesFilter =
              teacher.religion?.name?.toLowerCase() ===
              currentFilter.value.toLowerCase();
            break;
          default:
            matchesFilter = true;
        }
      }

      return matchesSearch && matchesFilter;
    });
  };

  return {
    searchTerm,
    setSearchTerm,
    openCategory,
    setOpenCategory,
    openSubMenu,
    setOpenSubMenu,
    category,
    setCategory,
    currentFilter,
    setCurrentFilter,
    categoryRef,
    handleCategorySelect,
    filterTeachers,
  };
};
