"use client";

import React, { useState } from "react";
import { PermissionCard } from "./components/PermissionCard";
import { PermissionTable } from "./components/PermissionTable";
import { PermissionFormModal } from "./components/PermissionFormModal";
import { PermissionDetailModal } from "./components/PermissionDetailModal";
import { usePermissions } from "../../../../Core/hooks/role-student/permission-student/PermissionStudent";
import { PaginationPermissionStudent } from "./components/PermissionPagination";
import HeaderPage from "../../../components/elements/header/Header.Page";
import { PermissionCardsSection } from "./components/PermissionCardsSection";

export default function PermissionManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    start_date: "",
    end_date: "",
    proof: "",
    reason: "",
  });

  const { permissions, meta, page, setPage, loading, error, handleSubmit } =
    usePermissions();

  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({}); // Reset errors sebelum submit

    try {
      const result = await handleSubmit(formData);

      if (result.success) {
        // Jika sukses, reset form dan tutup modal
        setFormData({
          type: "",
          start_date: "",
          end_date: "",
          proof: "",
          reason: "",
        });
        setFormErrors({});
        setIsModalOpen(false);
      } else {
        // Jika ada error validasi, tampilkan error tanpa menutup modal
        setFormErrors(result.errors || {});
      }
    } catch (err) {
      // Handle error umum
      console.error("Error submitting form:", err);
      setFormErrors({
        general: ["Terjadi kesalahan. Silakan coba lagi."],
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = (data) => {
    setFormData(data);
    // Clear errors ketika user mulai mengisi form kembali
    if (Object.keys(formErrors).length > 0) {
      setFormErrors({});
    }
  };

  const handleViewDetail = (item) => {
    setSelectedDetail(item);
    setIsDetailOpen(true);
  };

  const handleOpenModal = () => {
    setFormData({
      type: "",
      start_date: "",
      end_date: "",
      proof: "",
      reason: "",
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const recentPermissions = [...permissions]
    .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
    .slice(0, 3);

  return (
    <div className="mx-7 mb-10">
      <HeaderPage
        h1="Izin & Riwayat Izin"
        p="Ajukan izin kehadiran dan pantau status persetujuannya secara langsung."
      />

      {/* Header */}
      <div className="border border-gray-300 p-2 rounded-2xl shadow-lg mb-5">
        <div className="flex justify-between items-center mx-4">
          <h2 className="text-[24px] font-semibold text-gray-900">
            Daftar Izin Aktif
          </h2>
          <button
            onClick={handleOpenModal}
            className="bg-[#3B82F6] hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            + Buat Izin
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* Recent */}
      {recentPermissions.length > 0 && (
        <div>
          <div className="flex gap-4 flex-wrap">
            {recentPermissions.map((p) => (
              <PermissionCard
                key={p.id}
                permission={p}
                onViewDetail={handleViewDetail}
              />
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      {permissions.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 mt-8">
            Daftar Riwayat Izin
          </h2>
          <PermissionTable
            permissions={permissions}
            onViewDetail={handleViewDetail}
          />
        </div>
      )}

      {permissions.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          <div className="flex flex-col items-center justify-center">
            <div className="w-[350px] h-[320px] mb-6 flex items-center">
              <img
                src="../../../../images/people/10.png"
                alt="Empty state"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-gray-500 text-center text-sm">
              Belum ada izin yang dikiukan, klik tombol buat izin untuk memulai.
            </p>
          </div>
        </div>
      )}

      {/* Modals */}
      <PermissionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={submitForm}
        errors={formErrors}
        isSubmitting={isSubmitting}
      />

      <PermissionDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        permission={selectedDetail}
      />

      {/* Pagination */}
      <PaginationPermissionStudent
        page={page}
        lastPage={meta?.last_page || 1}
        onPrev={() => setPage(Math.max(1, page - 1))}
        onNext={() => setPage(Math.min(meta?.last_page || 1, page + 1))}
        onPageClick={(p) => setPage(p)}
      />
    </div>
  );
}
