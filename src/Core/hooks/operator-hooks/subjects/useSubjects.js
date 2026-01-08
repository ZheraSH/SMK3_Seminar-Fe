"use client";

import { useState, useEffect } from "react";
import {
  getSubjects,
  addSubject,
} from "../../../api/role-operator/subjects/Subjects";

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

      if (res && typeof res === "object" && !Array.isArray(res)) {
        setData(res.data || []);
        setTotalPages(res.totalPages || 1);
        setTotalItems(res.totalItems || 0);
      }

      else if (Array.isArray(res)) {
        setData(res);
        if (pageNumber > 1 && res.length > 0) {
          setTotalPages(Math.max(totalPages, pageNumber + 1));
        } else if (pageNumber === 1) {
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
      await new Promise(resolve => setTimeout(resolve, 500));
      const result = await addSubject(formData);
      await fetchSubjects(1); 
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
