"use client";

import { useState, useEffect } from "react";
import { fetchPermissionsApi, handleSubmitPermission } from "../../../api/role-student/student-permission/Permission";

export function usePermissions() {
  const [permissions, setPermissions] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchPermissions = async (currentPage = page) => {
    try {
      const data = await fetchPermissionsApi(currentPage);
      setPermissions(data.data || []);
      setMeta(data.meta || {});
      setError(null);
    } catch (err) {
      console.error(err);
      setPermissions([]);
      setMeta({});
      setError("Gagal mengambil data izin");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData, onSuccess, onError) => {
    try {
      await handleSubmitPermission(formData);
      fetchPermissions(page); // refresh halaman saat ini
      onSuccess?.();
    } catch (err) {
      console.error(err.response?.data || err);
      onError?.();
    }
  };

  useEffect(() => {
    fetchPermissions(page);
  }, [page]);

  return { permissions, meta, loading, error, page, setPage, fetchPermissions, handleSubmit };
}
