export const extractStudentMasters = (students) => {
  const genders = new Map();
  const classrooms = new Map();
  const schoolYears = new Map();

  students.forEach((student) => {
    if (student.gender?.value && student.gender?.label) {
      genders.set(student.gender.value, student.gender.label);
    }

    if (student.classroom?.id && student.classroom?.name) {
      classrooms.set(student.classroom.id, student.classroom.name);
    }

    if (student.classroom?.school_year) {
      schoolYears.set(
        student.classroom.school_year,
        student.classroom.school_year
      );
    }
  });

  return {
    genders: Array.from(genders, ([value, label]) => ({ value, label })),
    classrooms: Array.from(classrooms, ([value, label]) => ({ value, label })),
    schoolYears: Array.from(schoolYears, ([value, label]) => ({
      value,
      label,
    })),
  };
};
