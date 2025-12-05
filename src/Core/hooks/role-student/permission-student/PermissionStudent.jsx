"use client";

import { useState, useEffect } from "react";
import { fetchPermissionsApi, handleSubmitPermission } from "../../../api/role-student/student-permission/Permission";
import { notify } from "../../notification/notify";

export function usePermissions() {
  const [permissions, setPermissions] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchPermissions = async (currentPage = page) => {
    try {
      setLoading(true);
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

  const handleSubmit = async (formData) => {
    try {
      const result = await handleSubmitPermission(formData);
      
      // Jika ada error validasi dari backend, kembalikan error
      if (result && result.errors) {
        return { success: false, errors: result.errors };
      }
      
      
      // Jika sukses, refresh data dan kembalikan success
      notify("Data Berhasil Ditambah");
      await fetchPermissions(page);
      return { success: true, errors: null };
      
    } catch (err) {
      console.error(err.response?.data || err);
      // Kirim balik error validasi atau error umum
      if (err.response?.status === 422) {
        return { success: false, errors: err.response.data.errors };
      }
      throw err;
    }
  };

  useEffect(() => {
    fetchPermissions(page);
  }, [page]);

  return { permissions, meta, loading, error, page, setPage, fetchPermissions, handleSubmit };
}