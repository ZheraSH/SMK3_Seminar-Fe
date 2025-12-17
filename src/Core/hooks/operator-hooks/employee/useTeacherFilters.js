import { useMemo, useState } from "react";
import { extractTeacherMasters } from "../../../../view/pages/operator/teachers/components/utils/teacherMasterExtractor";

export const useTeacherFilter = (teachers) => {
  const [category, setCategory] = useState({
    type: "",
    value: "",
    label: "Pilih Kategori",
  });

  const masters = useMemo(() => {
    return extractTeacherMasters(teachers);
  }, [teachers]);

  const filteredTeachers = useMemo(() => {
    if (!category.type || !category.value) return teachers;

    switch (category.type) {
      case "gender":
        return teachers.filter((t) => t.gender?.value === category.value);

      case "subjects":
        return teachers.filter((t) =>
          t.subjects?.some((s) => String(s.id) === String(category.value))
        );

      case "role":
        return teachers.filter((t) =>
          t.roles?.some((role) => role.value === category.value)
        );

      default:
        return teachers;
    }
  }, [teachers, category]);

  return {
    category,
    setCategory,
    masters,
    filteredTeachers,
  };
};
