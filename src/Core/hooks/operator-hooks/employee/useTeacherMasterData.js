"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchReligionsApi } from "../../../api/role-operator/employee/TeachersApi";
import { extractTeacherMasters } from "../../../../view/pages/operator/teachers/components/utils/teacherMasterExtractor";

export const useTeacherMasterData = (masterTeachers) => {
  const [religions, setReligions] = useState([]);

  /* LOAD RELIGIONS */
  useEffect(() => {
    fetchReligionsApi().then(setReligions);
  }, []);

  /* MASTER FILTER OPTIONS */
  const masters = useMemo(
    () => extractTeacherMasters(masterTeachers),
    [masterTeachers]
  );

  return {
    religions,
    masters,
  };
};