"use client";

import { useState, useEffect } from "react";
import { getSubjects, addSubject as apiAddSubject } from "../../../api/role-operator/subjects/Subjects";

export default function useSubjects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Tambahkan searchTerm sebagai parameter
  const fetchSubjects = async (pageNumber = 1, searchTerm = "") => {
    try {
      setLoading(true);
      const res = await getSubjects(pageNumber, searchTerm);

      if (res && res.status === true) {
        setData(res.data || []);
        setTotalPages(res.meta?.last_page || 1);
        setTotalItems(res.meta?.total || 0);
        setCurrentPage(res.meta?.current_page || pageNumber);
      }
    } catch (error) {
      console.error("Error fetching Subjects:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const addSubjects = async (formData) => {
    setLoading(true);
    try {
      const result = await apiAddSubject(formData);
      await fetchSubjects(1, ""); // Reset ke page 1 tanpa filter setelah tambah data
      return { success: true, data: result };
    } catch (error) {
      console.error("Error adding subject:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Load data pertama kali saat halaman dibuka
  useEffect(() => {
    fetchSubjects(1, "");
  }, []);

  return {
    subjects: data,
    loading,
    addSubjects,
    fetchSubjects,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
  };
}