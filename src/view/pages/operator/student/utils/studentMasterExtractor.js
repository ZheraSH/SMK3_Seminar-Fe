export const extractStudentMasters = (students) => {
  const genders = new Map();
  const majors = new Map();
  const levelClasses = new Map();

  students.forEach((student) => {
    // gender
    if (student.gender?.value && student.gender?.label) {
      genders.set(student.gender.value, student.gender.label);
    }

    // classroom.name = "XII PPLG 3"
    if (student.classroom?.name) {
      const parts = student.classroom.name.split(" ");

      const level = parts[0]; // XI / XII
      const major = parts[1]; // PPLG

      if (level) levelClasses.set(level, level);
      if (major) majors.set(major, major);
    }
  });

  return {
    genders: [...genders].map(([value, label]) => ({ value, label })),
    majors: [...majors].map(([value, label]) => ({ value, label })),
    levelClasses: [...levelClasses].map(([value, label]) => ({
      value,
      label,
    })),
  };
};
