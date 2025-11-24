// src/hooks/useMasterData.js

import { useState, useEffect } from "react";
import {
  getMajors,
  getSchoolYears,
  getLevelClass,
  getTeachers,
} from "../../../api/class-major/classApi";

export default function useMasterData() {
  const [majors, setMajors] = useState([]);
  const [schoolYears, setSchoolYears] = useState([]);
  const [levelClass, setLevelClass] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMasterData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Ambil semua data master secara paralel untuk efisiensi
      const [majorsRes, schoolYearsRes, levelClassRes, teachersRes] =
        await Promise.all([
          getMajors(),
          getSchoolYears(),
          getLevelClass(),
          getTeachers(),
        ]);

      setMajors(majorsRes);
      setSchoolYears(schoolYearsRes);
      setLevelClass(levelClassRes);
      setTeachers(teachersRes);
    } catch (err) {
      console.error("Gagal mengambil data master:", err);
      setError("Gagal memuat data master.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterData();
  }, []);

  return {
    majors,
    schoolYears,
    levelClass,
    teachers,
    loading,
    error,
    fetchMasterData,
  };
}
