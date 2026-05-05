"use client";

import React, { useState, useCallback } from "react";
import { PermissionCard } from "./components/permission-card";
import { PermissionTable } from "./components/permission-table";
import { PermissionFormModal } from "./components/permission-form-modal";
import { PermissionDetailModal } from "./components/permission-detail-modal";
import { usePermissions } from "@core/hooks/role-student/permission-student/use-permission-student";
import { PaginationPermissionStudent } from "./components/permission-pagination";
import HeaderPage from "@elements/header/header-new-1";
import { getPermissionDetailStudent, deletePermissionApi } from "@services/role-student/student-permission/permission-student";
import LoadingData from "@elements/loading-data/loading";
import DeleteConfirmModal from "@elements/modaldelete/modal-delete";
import { Plus, Calendar, RotateCcw, Filter, X } from "lucide-react";

export default function PermissionManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ type: "", start_date: "", end_date: "", proof: "", reason: "", });

  const { permissions, pendingPermissions, meta, page, setPage, loading, error, handleSubmit, fetchPending, fetchHistory, isDeleteModalOpen, isDeleting, openDeleteModal, closeDeleteModal, confirmDelete, startDate, setStartDate, endDate, setEndDate } = usePermissions();

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
    <div className=" mb-16 md:mb-10">
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
              <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex flex-col gap-1 px-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight whitespace-nowrap">
                      Daftar Izin Aktif
                    </h2>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full lg:w-auto px-2">
                  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2.5 bg-transparent md:bg-gray-50 border-none md:border md:border-gray-200 p-0 md:p-2 rounded-none md:rounded-2xl w-full lg:w-auto transition-all">
                    <div className="flex items-center gap-2 px-1 md:px-3 text-gray-500 md:border-r border-gray-200 md:h-10 mb-1 md:mb-0">
                      <Filter size={16} />
                      <span className="text-sm font-semibold whitespace-nowrap">Filter Tanggal</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-2 w-full">
                      <div className="flex flex-col w-full">
                        <label className="md:hidden text-[10px] font-extrabold text-gray-400 uppercase mb-2 ml-4 tracking-wider">Mulai</label>
                        <div className="flex flex-col flex-1 w-full bg-[#F8FAFC] md:bg-white border border-gray-100 rounded-[20px] md:rounded-xl px-5 md:px-3 py-3.5 md:py-1.5 shadow-sm group focus-within:border-blue-400 transition-all">
                          <span className="hidden md:block text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1 group-focus-within:text-blue-500 transition-colors">Mulai</span>
                          <div className="flex items-center gap-2">
                            <div className="text-gray-400 group-focus-within:text-blue-500 transition-colors">
                              <Calendar size={16} />
                            </div>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}className="bg-transparent text-sm font-semibold text-gray-700 outline-none cursor-pointer w-full"/>
                            <div className="md:hidden text-gray-300">
                               <RotateCcw size={14} />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="hidden sm:block text-gray-300 px-1 opacity-50">
                        <RotateCcw size={12} />
                      </div>

                      <div className="flex flex-col w-full">
                        <label className="md:hidden text-[10px] font-extrabold text-gray-400 uppercase mb-2 ml-4 tracking-wider">Berakhir</label>
                        <div className="flex flex-col flex-1 w-full bg-[#F8FAFC] md:bg-white border border-gray-100 rounded-[20px] md:rounded-xl px-5 md:px-3 py-3.5 md:py-1.5 shadow-sm group focus-within:border-blue-400 transition-all">
                          <span className="hidden md:block text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1 group-focus-within:text-blue-500 transition-colors">Berakhir</span>
                          <div className="flex items-center gap-2">
                            <div className="text-gray-400 group-focus-within:text-blue-500 transition-colors">
                              <Calendar size={16} />
                            </div>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}className="bg-transparent text-sm font-semibold text-gray-700 outline-none cursor-pointer w-full"/>
                            <div className="md:hidden text-gray-300">
                               <RotateCcw size={14} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {(startDate || endDate) && (
                      <button  onClick={() => { setStartDate(""); setEndDate(""); }}  className="flex items-center justify-center gap-2 p-2.5 md:p-2 bg-white text-gray-400 hover:text-white hover:bg-red-500 border border-gray-200 rounded-full transition-all shadow-sm hover:shadow duration-300 w-full md:w-16 md:h-12 "  title="Hapus Filter">
                        <X size={18} />
                        <span className="md:hidden text-xs font-bold uppercase">Hapus Filter</span>
                      </button>
                    )}
                  </div>

                  <button onClick={handleOpenModal} className="flex items-center justify-center gap-2 bg-[#3B82F6] cursor-pointer from-blue-600 to-blue-500 py-4 md:py-3.5 hover:from-blue-700 hover:to-blue-600 text-white px-8 rounded-[18px] md:rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 w-full md:w-auto whitespace-nowrap mt-2 md:mt-0 text-base md:text-sm">
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
        <div className="flex gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {pendingPermissions.map((p) => (
            <PermissionCard key={p.id} permission={p} onViewDetail={handleViewDetail} onDelete={openDeleteModal} />
          ))}
        </div>
      ) : null}

      {(loading || permissions.length > 0 || pendingPermissions.length === 0) && (
        <div className="mt-8">
          {loading ? (<LoadingData loading={loading} type="kotakKecil" />)
            : permissions.length > 0 && pendingPermissions.length > 0 ? (
              <div className="flex flex-col gap-2 mb-6 mt-10">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
                  Riwayat Pengajuan Izin
                </h2>
                <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
              </div>
            ) : null}

          {loading ? (
            <LoadingData loading={loading} type="tableSchedule" count={10} />
          ) : (
            <PermissionTable permissions={permissions} onViewDetail={handleViewDetail} />
          )}
        </div>
      )}

      {permissions.length === 0 && pendingPermissions.length === 0 && !loading && (
        <div className="text-center py-10 px-4 text-gray-500">
          <div className="flex flex-col items-center justify-center">

            <div className="w-72 h-auto md:w-[400px] md:h-[285px] mb-6">
              <img
                src="/images/null/nullimage.png"
                alt="Empty state"
                className="w-full h-auto object-contain"
              />
            </div>

            <p className="text-gray-500 text-center text-xs sm:text-sm md:text-base max-w-xs sm:max-w-md">
              Belum ada izin yang diajukan, klik tombol buat izin untuk memulai.
            </p>

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

