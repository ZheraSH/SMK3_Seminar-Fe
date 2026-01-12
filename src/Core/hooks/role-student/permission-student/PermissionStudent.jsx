"use client";

import { useState, useEffect, useCallback } from "react";
import {  fetchPermissionsApi,  fetchPendingPermissionsApi,  handleSubmitPermission } from "../../../api/role-student/student-permission/Permission";
import { notify } from "../../notification/notify";

export function usePermissions() {
  const [permissions, setPermissions] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  
  const [pendingPermissions, setPendingPermissions] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPending = async () => {
    try {
      const data = await fetchPendingPermissionsApi();
      setPendingPermissions(data || []);
    } catch (err) {
      console.error("Gagal mengambil data pending:", err);
    }
  };

  const fetchHistory = async (currentPage = page) => {
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

  const refreshAll = async () => {
    await Promise.all([fetchPending(), fetchHistory(1)]);
    setPage(1);
  };

  const handleSubmit = async (formData) => {
    try {
      const result = await handleSubmitPermission(formData);
      
      if (result && result.errors) {
        return { success: false, errors: result.errors };
      }
      
      notify("Data Berhasil Ditambah");
      await refreshAll();
      return { success: true, errors: null };
      
    } catch (err) {
      console.error(err.response?.data || err);
      if (err.response?.status === 422) {
        return { success: false, errors: err.response.data.errors };
      }
      throw err;
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  useEffect(() => {
    fetchHistory(page);
  }, [page]);

  return { permissions,pendingPermissions,meta, loading, error, page, setPage, fetchHistory, fetchPending, handleSubmit };
}