import { useState, useMemo } from "react";
import { extractStudentMasters } from "../../../../view/pages/operator/student/utils/studentMasterExtractor";

export const useStudentFilter = (students) => {
  const [category, setCategory] = useState({
    type: "",
    value: "",
    label: "Pilih Kategori",
  });
  
  const [masters, setMasters] = useState({
    majors: [],
    levelClasses: [],
    genders: [
      { value: "male", label: "Laki-laki" },
      { value: "female", label: "Perempuan" }
    ]
  });
  
  const [appliedFilters, setAppliedFilters] = useState({});

  const masters = useMemo(
    () => extractStudentMasters(students),
    [students]
  );

  const filteredStudents = useMemo(() => {
    if (!category.type || !category.value) return students;

    switch (category.type) {
      case "gender":
        return students.filter(
          (s) => s.gender?.value === category.value
        );

      case "level_class":
        return students.filter((s) =>
          s.classroom?.name?.startsWith(category.value)
        );

      case "major":
        return students.filter((s) =>
          s.classroom?.name?.includes(` ${category.value} `)
        );

      default:
        return students;
    }
  }, [category]);

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
    resetFilter,
  };
};