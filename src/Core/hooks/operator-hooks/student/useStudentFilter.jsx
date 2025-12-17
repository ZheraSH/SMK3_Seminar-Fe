import { useState, useMemo } from "react";
import { extractStudentMasters } from "../../../../view/pages/operator/student/utils/studentMasterExtractor";
export const useStudentFilter = (students = []) => {
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
          (student) => student.gender?.value === category.value
        );

      case "major":
        return students.filter(
          (student) => student.classroom?.major === category.value
        );

      case "level_class":
        return students.filter(
          (student) => student.classroom?.level_class === category.value
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
