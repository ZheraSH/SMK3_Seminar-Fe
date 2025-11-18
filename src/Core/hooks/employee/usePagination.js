"use client"

import { useState, useEffect } from "react";
import { fetchTeachersApi, submitTeacherApi } from "../../api/maple/Subjects";

export default function useSubjects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchSubjects = async (pageNumber = currentPage) => {
    try {
      setLoading(true);
      const res = await fetchTeachersApi(pageNumber);

      console.log("API Response:", res);

      if (res?.data) {
        setData(res.data);
        setTotalPages(res.last_page || 1);
        setTotalItems(res.total || 0);
      } else {
        setData([]);
        setTotalPages(1);
        setTotalItems(0);
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

  const addSubjects = async (post) => {
    setLoading(true);
    try {
      const result = await submitTeacherApi(null, post);
      await fetchSubjects(1);
      return { success: true, data: result };
    } catch (error) {
      console.error("Error adding teacher:", error);
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
