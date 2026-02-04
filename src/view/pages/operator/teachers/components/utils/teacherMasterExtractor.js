export const extractTeacherMasters = (teachers) => {
  const genders = new Map();
  const subjects = new Map();
  const roles = new Map();

  teachers.forEach((t) => {
    // GENDER
    if (t.gender?.value && t.gender?.label) {
      genders.set(t.gender.value, t.gender.label);
    }

    // SUBJECTS
    if (Array.isArray(t.subjects)) {
      t.subjects.forEach((subject) => {
        if (subject.id && subject.name) {
          subjects.set(subject.id, subject.name);
        }
      });
    }

    // ROLES
    if (Array.isArray(t.roles)) {
      t.roles.forEach((role) => {
        if (role.value && role.label) {
          roles.set(role.value, role.label);
        }
      });
    }
  });

  return {
    genders: Array.from(genders, ([value, label]) => ({ value, label })),
    subjects: Array.from(subjects, ([value, label]) => ({
      value,
      label,
    })),
    roles: Array.from(roles, ([value, label]) => ({ value, label })),
  };
};
