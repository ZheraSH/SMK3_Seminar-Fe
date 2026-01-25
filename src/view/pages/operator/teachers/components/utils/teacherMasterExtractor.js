export const extractTeacherMasters = (teachers = []) => {
  const genders = new Map();
  const subjects = new Map();
  const roles = new Map();

  teachers.forEach((t) => {
    // ✅ GENDER (FIX)
    if (t.gender?.value && t.gender?.label) {
      genders.set(t.gender.value, t.gender.label);
    }

    // ✅ SUBJECTS (AMAN)
    if (Array.isArray(t.subjects)) {
      t.subjects.forEach((s) => {
        if (s?.id && s?.name) {
          subjects.set(s.id, s.name);
        }
      });
    }

    // ✅ ROLES (AMAN)
    if (Array.isArray(t.roles)) {
      t.roles.forEach((r) => {
        if (r?.value && r?.label) {
          roles.set(r.value, r.label);
        }
      });
    }
  });

  return {
    genders: Array.from(genders, ([value, label]) => ({ value, label })),
    subjects: Array.from(subjects, ([value, label]) => ({ value, label })),
    roles: Array.from(roles, ([value, label]) => ({ value, label })),
  };
};
