"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchTeachersApi } from "../../../../Core/api/role-operator/employee/TeachersApi";

export const useTeacherPagination = () => {
  const [teachers, setTeachers] = useState([]);
  const [meta, setMeta] = useState({ last_page: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(
    async (newPage = page, filters = {}) => {
      setLoading(true);
      try {
        const res = await fetchTeachersApi(newPage, filters);
        setTeachers(res.data || []);
        setMeta(res.meta || { last_page: 1 });
      } finally {
        setLoading(false);
      }
    },
    [page]
  );

  useEffect(() => {
    reload(page, {});
  }, [page, reload]);

  return {
    teachers,
    meta,
    page,
    setPage,
    reload,
    loading,
  };
};