import { useState, useMemo } from "react";
import { extractStudentMasters } from "../../../../view/pages/operator/student/utils/studentMasterExtractor";

export const useStudentFilter = (students) => {
  const [category, setCategory] = useState({
    type: "",
    value: "",
    label: "Pilih Kategori",
  });

  const [appliedFilters, setAppliedFilters] = useState({});

  const masters = useMemo(() => {
    const extracted = extractStudentMasters(students || []);
    return {
      ...extracted,
      genders: [
        { value: "male", label: "Laki-laki" },
        { value: "female", label: "Perempuan" }
      ]
    };
  }, [students]);


  const filteredStudents = useMemo(() => {
    if (!students) return [];
    if (!category.type || !category.value) return students;

    switch (category.type) {
      case "gender":
        return students.filter(
          (s) => s.gender?.value === category.value
        );

      case "level_class":
        return students.filter((s) => {
          if (s.classroom?.level_class === category.value) return true;
          return s.classroom?.name?.split(" ")[0] === category.value;
        });

      case "major":
        return students.filter((s) => {
          if (s.classroom?.major === category.value) return true;
          return s.classroom?.name?.split(" ")[1] === category.value;
        });

      default:
        return students;
    }
  }, [category, students]);

  const resetFilter = () => {
    setCategory({
      type: "",
      value: "",
      label: "Pilih Kategori",
    });
    setAppliedFilters({});
  };

  return {
    category,
    setCategory,
    masters,
    appliedFilters,
    filteredStudents,
    resetFilter,
  };
};