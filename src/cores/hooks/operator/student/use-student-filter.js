import { useState, useMemo } from "react";
import { extractStudentMasters } from "@pages/operator/student/utils/student-master-extractor";

export const useStudentFilter = (students) => {
  const [category, setCategory] = useState({
    type: "",
    value: "",
    label: "Pilih Kategori",
  });

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
          s.classroom?.name?.split(" ")[0] === category.value
        );

      case "major":
        return students.filter((s) =>
          s.classroom?.name?.includes(` ${category.value} `)
        );

      default:
        return students;
    }
  }, [students, category]);

  const resetFilter = () => {
    setCategory({
      type: "",
      value: "",
      label: "Pilih Kategori",
    });
  };

  return {
    category,
    setCategory,
    masters,
    filteredStudents,
    resetFilter,
  };
};
