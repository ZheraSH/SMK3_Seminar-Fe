export const extractTeacherMasters = (teachers) => {
  const genders = new Map();
  const subjects = new Map();
  const roles = new Map();

  teachers.forEach((t) => {

    if (t.gender_value && t.gender_label) {
      genders.set(t.gender_value, t.gender_label);
    }

    if (Array.isArray(t.subjects)) {
      t.subjects.forEach((subject) => {
        subjects.set(subject.id, subject.name);
      });
    }

    if (Array.isArray(t.roles)) {
      t.roles.forEach((role) => {
        roles.set(role.value, role.label);
      });
    }
  });

  return {
    genders: Array.from(genders, ([value, label]) => ({ value, label })),
    subjects: Array.from(subjects, ([value, label]) => ({
      value: value,
      label: label,
    })),
    roles: Array.from(roles, ([value, label]) => ({ value, label })),
  };
};
