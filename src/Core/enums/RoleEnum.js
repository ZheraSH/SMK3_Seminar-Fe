export const RoleEnum = Object.freeze({
    SCHOOL: "school_operator",
    STUDENT: "student",
    TEACHER: "teacher", 
    HOMEROOM_TEACHER: "homeroom_teacher",
    COUNSELOR: "counselor",
    STAFF: "staff_tu",
    CURRICULUM_COORDINATOR: "curriculum_coordinator"
  });
  
  export const RoleLabels = Object.freeze({
    [RoleEnum.TEACHER]: 'Guru Pengajar',
    [RoleEnum.HOMEROOM_TEACHER]: 'Wali Kelas', 
    [RoleEnum.COUNSELOR]: 'BK',
    [RoleEnum.STAFF]: 'Staff TU',
    [RoleEnum.CURRICULUM_COORDINATOR]: 'Waka Kurikulum'
  });