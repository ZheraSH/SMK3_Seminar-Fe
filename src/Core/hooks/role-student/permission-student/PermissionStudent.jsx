"use client";

import { useState, useEffect, useCallback } from "react";
import {  fetchPermissionsApi,  fetchPendingPermissionsApi,  handleSubmitPermission,deletePermissionApi } from "../../../api/role-student/student-permission/Permission";
import { notify } from "../../notification/notify";

export function usePermissions() {
  const [permissions, setPermissions] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const [pendingPermissions, setPendingPermissions] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [permissionToDelete, setPermissionToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchPending = useCallback(async (start = startDate, end = endDate) => {
    try {
      const data = await fetchPendingPermissionsApi(start, end);
      setPendingPermissions(data || []);
    } catch (err) {
      console.error("Gagal mengambil data pending:", err);
    }
  }, [startDate, endDate]);

  const fetchHistory = useCallback(async (currentPage = page, start = startDate, end = endDate) => {
    try {
      setLoading(true);
      const data = await fetchPermissionsApi(currentPage, start, end);
      setPermissions(data.data || []);
      setMeta(data.meta || {});
      setError(null);
    } catch (err) {
      setError("Gagal mengambil data izin");
    } finally {
      setLoading(false);
    }
  }, [page, startDate, endDate]);

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

  const openDeleteModal = (id) => {
    setPermissionToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setPermissionToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
  if (!permissionToDelete) return;
  setIsDeleting(true);
  try {
    await deletePermissionApi(permissionToDelete);
    notify("Izin berhasil dibatalkan");
    
    await fetchPending(); 
    await fetchHistory(page); 
    
    closeDeleteModal();
  } catch (err) {
   const serverMessage = err.response?.data?.message || "Gagal membatalkan izin";
    notify(serverMessage, "error");
    console.log(serverMessage);
  } finally {
    setIsDeleting(false);
  }
};

  // useEffect(() => {
  //   fetchPending();
  // }, []);

  useEffect(() => {
    fetchPending(startDate, endDate);
    fetchHistory(page,startDate, endDate);
  }, [page,startDate, endDate, fetchPending, fetchHistory]);

  return { permissions,pendingPermissions,meta, loading, error, page, setPage, fetchHistory, fetchPending, handleSubmit,isDeleteModalOpen, isDeleting, openDeleteModal, closeDeleteModal, confirmDelete, startDate,
    setStartDate,
    endDate,
    setEndDate,
};
}