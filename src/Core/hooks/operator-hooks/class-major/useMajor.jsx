import { useState, useEffect } from "react";
import { getMajors } from "../../../api/role-operator/class-major/majorApi";

export default function useMajors() {
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const fetchMajors = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const majorsData = await getMajors();
      if (Array.isArray(majorsData)) {
        setMajors(majorsData);
      } else {
        setMajors([]);
      }
    } catch (error) {
      console.error("Error fetch majors di hook:", error);
      setMajors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMajors();
  }, []);
  return { majors, loading };
}
