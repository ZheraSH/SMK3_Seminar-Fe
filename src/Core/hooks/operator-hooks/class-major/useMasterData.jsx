import { useState, useEffect } from "react";
import { getMajors, getSchoolYears, getLevelClass, getTeachers,} from "../../../api/role-operator/class-major/classApi"; 

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
      const [majorsRes, schoolYearsRes, levelClassRes, teachersRes] =
        await Promise.all([
          getMajors(),
          getSchoolYears(),
          getLevelClass(),
          getTeachers(),
        ]);

      const activeSchoolYears = schoolYearsRes?.data 
        ? schoolYearsRes.data.filter((year) => year.active === true)
        : [];
      
      setMajors(majorsRes);
      setSchoolYears({ data: activeSchoolYears }); 
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