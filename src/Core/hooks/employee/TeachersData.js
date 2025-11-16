import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTeacherData = () => {
  const [teachers, setTeachers] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [religions, setReligions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTeachers = async (page = 1) => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/employees?page=${page}`
      );
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      console.log(data);
      setAllTeachers(data); // WAJIB ADA
      return data;
    } catch (err) {
      console.error("Gagal ambil employees:", err);
    }
  };

  const fetchReligions = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/religions");
      console.log("📦 Data agama dari API:", res.data);
      setReligions(res.data.data);
    } catch (err) {
      console.error("gagal", err);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchReligions();
  }, []);

  return {
    teachers,
    setTeachers,
    allTeachers,
    setAllTeachers,
    religions,
    setReligions,
    currentPage,
    setCurrentPage,
    fetchTeachers,
    fetchReligions,
  };
};
