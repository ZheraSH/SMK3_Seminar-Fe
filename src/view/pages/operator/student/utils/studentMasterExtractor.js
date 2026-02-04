export const extractStudentMasters = (students) => {
  const genders = new Map();
  const classrooms = new Map();
  const schoolYears = new Map();
  const majors = new Map();
  const levelClasses = new Map();

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

    if (student.classroom?.major) {
      majors.set(student.classroom.major, student.classroom.major);
    }

    if (student.classroom?.level_class) {
      levelClasses.set(student.classroom.level_class, student.classroom.level_class);
    }
  });

  return {
    genders: Array.from(genders, ([value, label]) => ({ value, label })),
    classrooms: Array.from(classrooms, ([value, label]) => ({ value, label })),
    schoolYears: Array.from(schoolYears, ([value, label]) => ({ value, label })),
    majors: Array.from(majors, ([value, label]) => ({ value, label })),
    levelClasses: Array.from(levelClasses, ([value, label]) => ({ value, label })),
  };
};
