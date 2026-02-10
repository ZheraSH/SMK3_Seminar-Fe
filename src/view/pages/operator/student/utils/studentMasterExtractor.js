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

    if (student.classroom?.name) {
      const parts = student.classroom.name.split(" ");

      const level = parts[0]; 
      const major = parts[1]; 

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
