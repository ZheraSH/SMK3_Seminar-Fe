"use client";

import React, { useState, useCallback } from "react";
import { PermissionCard } from "./components/PermissionCard";
import { PermissionTable } from "./components/PermissionTable";
import { PermissionFormModal } from "./components/PermissionFormModal";
import { PermissionDetailModal } from "./components/PermissionDetailModal";
import { usePermissions } from "../../../../Core/hooks/role-student/permission-student/PermissionStudent";
import { PaginationPermissionStudent } from "./components/PermissionPagination";
import HeaderPage from "../../../components/elements/header/Header-new";
import { getPermissionDetailStudent, deletePermissionApi } from "../../../../Core/api/role-student/student-permission/Permission";
import LoadingData from "../../../components/elements/loadingData/loading";
import DeleteConfirmModal from "../../../components/elements/modaldelete/ModalDelete";
import { Plus, Calendar, RotateCcw,Filter,X } from "lucide-react";

export default function PermissionManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ type: "", start_date: "", end_date: "", proof: "", reason: "", });

  const { permissions, pendingPermissions, meta, page, setPage, loading, error, handleSubmit, fetchPending, fetchHistory,isDeleteModalOpen, isDeleting, openDeleteModal, closeDeleteModal, confirmDelete,startDate, setStartDate, endDate, setEndDate } = usePermissions();

  const submitForm = async (e) => {
   e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({}); 

    let clientErrors = {};
    const charCount = formData.reason ? formData.reason.length : 0;

    if (!formData.type) clientErrors.type = ["Jenis izin harus dipilih"];

    if (!formData.start_date) clientErrors.start_date = ["Tanggal mulai harus diisi"];
    if (!formData.end_date) clientErrors.end_date = ["Tanggal selesai harus diisi"];

    if (!formData.proof) clientErrors.proof = ["Silakan unggah bukti terlebih dahulu"];

    if (!formData.reason || formData.reason.trim() === "") {
      clientErrors.reason = ["Alasan tidak boleh kosong"];
    } else if (charCount < 60) {
      clientErrors.reason = [`Alasan terlalu pendek (Minimal 60 karakter, saat ini: ${charCount})`];
    } else if (charCount > 100) {
      clientErrors.reason = ["Alasan terlalu panjang (Maksimal 100 karakter)"];
    }

    if (Object.keys(clientErrors).length > 0) {
      setFormErrors(clientErrors);
      setIsSubmitting(false);
      return; 
    }

    try {
      const result = await handleSubmit(formData);

      if (result.success) {
        setFormData({ type: "", start_date: "", end_date: "", proof: "", reason: "" });
        setIsModalOpen(false);
      } else {
        setFormErrors(result.errors || {});
      }
    } catch (err) {
      setFormErrors({ general: ["Terjadi kesalahan pada server."] });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = (data) => {
    setFormData(data);
    if (Object.keys(formErrors).length > 0) {
      setFormErrors({});
    }
  };


  const handleViewDetail = useCallback(async (permission) => {
    setIsDetailOpen(true);
    setSelectedDetail(permission);

    try {
      const detail = await getPermissionDetailStudent(permission.id);
      setSelectedDetail(detail);
      console.log('berhasil ambil data detail ');

    } catch (error) {
      console.error("Error fetching detail:", error);
      setIsModalOpen(false);
    }
  }, []);

  const handleOpenModal = () => {
    setFormData({ type: "", start_date: "", end_date: "", proof: "", reason: "", });
    setFormErrors({});
    setIsModalOpen(true);
  };

  return (
    <div className=" mb-10">
      <div>
        {loading ? (<LoadingData loading={loading} type="header1" />)
          : (
            <HeaderPage span="Izin & Riwayat Izin" p="Ajukan izin kehadiran dan pantau status persetujuannya secara langsung." src="/images/particle/particle4.png" />
          )}
      </div>
      {loading ? (<LoadingData loading={loading} type="create" />)
        : (
          <div className="bg-white border border-gray-100 p-4 sm:p-3 rounded-2xl shadow-xl shadow-gray-100/50 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <div className="flex flex-col gap-1 px-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
                    Daftar Izin Aktif
                  </h2>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3 w-full xl:w-auto px-2">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-gray-50 border border-gray-200 p-1.5 rounded-2xl w-full xl:w-auto transition-all hover:border-blue-300">
                  <div className="hidden sm:flex items-center justify-center px-3 text-gray-400">
                    <Filter size={18} />
                  </div>
                  <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full">
                    <div className="relative group w-full sm:w-auto">
                      <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500">
                        <Calendar size={14} />
                      </div>
                      <input  type="date"  value={startDate} onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-white cursor-pointer border border-gray-200 text-gray-700 text-xs sm:text-sm rounded-xl pl-8 pr-2 py-2.5 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm"
                        placeholder="Mulai"
                      />
                    </div>
                    <span className="hidden sm:block text-gray-300 font-light">-</span>
                    <div className="relative group w-full sm:w-auto">
                      <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500">
                        <Calendar size={14} />
                      </div>
                      <input type="date" value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full bg-white border cursor-pointer border-gray-200 text-gray-700 text-xs sm:text-sm rounded-xl pl-8 pr-2 py-2.5 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm"
                      />
                    </div>
                  </div>
                  {(startDate || endDate) && (
                    <button  onClick={() => { setStartDate(""); setEndDate(""); }} className="hidden sm:flex p-2 hover:text-white cursor-pointer duration-800 bg-white hover:bg-red-500 border border-gray-200 rounded-xl transition-all shadow-sm hover:shadow"
                      title="Hapus Filter"
                    >
                      <X size={16} />
                    </button>
                  )}
                  {(startDate || endDate) && (
              <div className="flex justify-end sm:hidden w-full">
                <button  onClick={() => { setStartDate(""); setEndDate(""); }} className="py-2 bg-white text-gray-400 hover:text-white hover:bg-red-400 border border-gray-200 rounded-xl transition-all w-full cursor-pointer shadow-sm hover:shadow duration-800">
                     Hapus Filter Tanggal
                  </button>
              </div>
            )}
                </div>
                <button onClick={handleOpenModal} className="flex items-center justify-center gap-2 bg-[#3B82F6] cursor-pointer from-blue-600 to-blue-500 py-3 hover:from-blue-700 hover:to-blue-600 text-white px-6  rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95 w-full md:w-auto whitespace-nowrap">
                  <Plus size={20} strokeWidth={2.5} />
                  <span>Buat Izin</span>
                </button>

              </div>
            </div>
            
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

      {loading ? (<LoadingData loading={loading} type="cardclass" count={3} />

      ) : pendingPermissions.length > 0 ? (
        <div className="flex gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {pendingPermissions.map((p) => (
            <PermissionCard key={p.id} permission={p} onViewDetail={handleViewDetail}  onDelete={openDeleteModal} />
          ))}
        </div>
      ) : null}

      {(loading || permissions.length > 0 || pendingPermissions.length === 0) && (
        <div className="mt-8">
          {loading ? (<LoadingData loading={loading} type="kotakKecil" />)
            : permissions.length > 0 && pendingPermissions.length > 0 ? (
              <h2 className="text-2xl font-bold text-gray-900 mb-8 mt-8">
                Daftar Riwayat Izin
              </h2>
            ) : null}

          {loading ? (
            <LoadingData loading={loading} type="tableSchedule" count={10} />
          ) : (
            <PermissionTable permissions={permissions} onViewDetail={handleViewDetail} />
          )}
        </div>
      )}

      {permissions.length === 0 && pendingPermissions.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          <div className="flex flex-col items-center justify-center">
            <div className="w-[350px] h-[320px] mb-6 flex items-center">
              <img src="../../../../images/people/10.png" alt="Empty state" className="w-full h-full object-contain" />
            </div>
            <p className="text-gray-500 text-center text-sm"> Belum ada izin yang dikiukan, klik tombol buat izin untuk memulai. </p>
          </div>
        </div>
      )}

      <PermissionFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} formData={formData} onFormChange={handleFormChange} onSubmit={submitForm} errors={formErrors} isSubmitting={isSubmitting} />
      <PermissionDetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} permission={selectedDetail} />
      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={confirmDelete} loading={isDeleting} />
      <PaginationPermissionStudent page={page} lastPage={meta?.last_page || 1} onPrev={() => setPage(Math.max(1, page - 1))} onNext={() => setPage(Math.min(meta?.last_page || 1, page + 1))} onPageClick={(p) => setPage(p)} />
    </div>
  );
}
