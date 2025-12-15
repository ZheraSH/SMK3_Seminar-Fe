import { useMemo, useState } from "react";

export const extractStudentMasters = (students) => {
  const genders = new Map();
  const majors = new Map();
  const levelClasses = new Map();

  students.forEach((student) => {
    if (student.gender_value && student.gender_label) {
      genders.set(student.gender_value, student.gender_label);
    }

    if (student.classroom?.major) {
      majors.set(student.classroom.major, student.classroom.major);
    }

    if (student.classroom?.level_class) {
      levelClasses.set(
        student.classroom.level_class,
        student.classroom.level_class
      );
    }
  });

  return {
    genders: Array.from(genders, ([value, label]) => ({ value, label })),
    majors: Array.from(majors, ([value, label]) => ({ value, label })),
    levelClasses: Array.from(levelClasses, ([value, label]) => ({
      value,
      label,
    })),
  };
};

export const useStudentFilter = (students) => {
  const [category, setCategory] = useState({
    type: "",
    value: "",
    label: "Pilih Kategori",
  });

  const masters = useMemo(() => {
    return extractStudentMasters(students);
  }, [students]);

  const filteredStudents = useMemo(() => {
    if (!category.type || !category.value) return students;

    switch (category.type) {
      case "gender":
        return students.filter(
          (student) => student.gender_value === category.value
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
