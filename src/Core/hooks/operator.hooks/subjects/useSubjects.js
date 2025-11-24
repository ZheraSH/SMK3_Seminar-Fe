"use client";

import { useState, useEffect } from "react";
import { getSubjects, addSubject } from "../../../api/maple/Subjects";

export default function useSubjects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchSubjects = async (pageNumber = currentPage) => {
    try {
      setLoading(true);
      const res = await getSubjects(pageNumber);

      console.log("API Response:", res); // Debug: lihat response API

      // Jika API mengembalikan response terstruktur dengan pagination info
      if (res && typeof res === "object" && !Array.isArray(res)) {
        setData(res.data || []);
        setTotalPages(res.totalPages || 1);
        setTotalItems(res.totalItems || 0);
      }
      // Jika API hanya mengembalikan array biasa
      else if (Array.isArray(res)) {
        setData(res);
        // Untuk testing, kita asumsikan setiap page punya 9 items
        // Jika di page 2 dapat data, berarti totalPages minimal 2
        if (pageNumber > 1 && res.length > 0) {
          setTotalPages(Math.max(totalPages, pageNumber + 1));
        } else if (pageNumber === 1) {
          // Jika di page 1 dapat data kurang dari 9, berarti hanya 1 page
          // Jika dapat 9 data, mungkin ada page 2
          setTotalPages(res.length < 9 ? 1 : 2);
        }
        setTotalItems(res.length);
      }

      setCurrentPage(pageNumber);
    } catch (error) {
      console.error("Error fetching Subjects:", error);
      setData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const addSubjects = async (formData) => {
    setLoading(true);
    try {
      const result = await addSubject(formData);
      await fetchSubjects(1); // refresh ke halaman pertama
      return { success: true, data: result };
    } catch (error) {
      console.error("Error adding subject:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects(1);
  }, []);

  return {
    subjects: data,
    setSubjects: setData,
    loading,
    addSubjects,
    fetchSubjects,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
  };
}
