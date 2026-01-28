"use client";

import React, { useState ,useCallback} from "react";
import { PermissionCard } from "./components/PermissionCard";
import { PermissionTable } from "./components/PermissionTable";
import { PermissionFormModal } from "./components/PermissionFormModal";
import { PermissionDetailModal } from "./components/PermissionDetailModal";
import { usePermissions } from "../../../../Core/hooks/role-student/permission-student/PermissionStudent";
import { PaginationPermissionStudent } from "./components/PermissionPagination";
import HeaderPage from "../../../components/elements/header/Header-new";
import { getPermissionDetailStudent } from "../../../../Core/api/role-student/student-permission/Permission";
import LoadingData from "../../../components/elements/loadingData/loading";

export default function PermissionManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ type: "", start_date: "", end_date: "", proof: "", reason: "",});

  const { permissions,pendingPermissions, meta, page, setPage, loading, error, handleSubmit } = usePermissions();

  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setFormErrors({});
    let clientErrors = {};

    if (!formData.type) clientErrors.type = ["Jenis izin harus dipilih"];
    if (!formData.start_date) clientErrors.start_date = ["Tanggal mulai harus diisi"];
    if (!formData.end_date) clientErrors.end_date = ["Tanggal selesai harus diisi"];
    if (!formData.reason) clientErrors.reason = ["Alasan tidak boleh kosong"];
    if (!formData.proof) clientErrors.proof = ["Silakan unggah bukti terlebih dahulu"];

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

  // const  = (item) => {
  //   console.log("Data yang dikirim ke modal:", item);
  //   setSelectedDetail(item);
  //   setIsDetailOpen(true);
  // };

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
    setFormData({ type: "", start_date: "", end_date: "", proof: "", reason: "",});
    setFormErrors({});
    setIsModalOpen(true);
  };

  return (
    <div className=" mb-10">
      <div>
        {loading? (<LoadingData loading={loading} type="header1" />)
        : (
          <HeaderPage span="Izin & Riwayat Izin" p="Ajukan izin kehadiran dan pantau status persetujuannya secara langsung." src="/images/particle/particle4.png"/>
          )}
      </div>
      {loading? (<LoadingData loading={loading} type="create" />)
      :(
        <div className="border border-gray-300 p-3 rounded-2xl shadow-lg mb-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center px-2 sm:px-4">
            <h2 className="text-lg sm:text-[24px] font-semibold text-gray-900 text-center sm:text-left">
              Daftar Izin Aktif
            </h2>
            <button onClick={handleOpenModal} className="bg-[#3B82F6] hover:bg-blue-700 text-white  px-4 py-2 sm:px-5 sm:py-2  rounded-lg font-medium transition">
              + Buat Izin
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {loading? (<LoadingData loading={loading} type="cardclass" count={3}/>

      ) : pendingPermissions.length > 0 ? (
        <div className="flex gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {pendingPermissions.map((p) => (
            <PermissionCard key={p.id} permission={p} onViewDetail={handleViewDetail}/>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-center w-full py-6">
          Tidak ada izin Aktif saat ini.
        </div>
      )}

      {(loading || permissions.length > 0) && (
        <div>
          {loading? (<LoadingData  loading={loading} type="kotakKecil"/>)
          :(
            <h2 className="text-2xl font-bold text-gray-900 mb-8 mt-8"> 
              Daftar Riwayat Izin 
            </h2>
          )}
          
          {loading ? (
            <LoadingData loading={loading} type="tableSchedule" count={10}/>
          ) : (
            <PermissionTable permissions={permissions} onViewDetail={handleViewDetail}/>
          )}
        </div>
      )}

      {permissions.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
          <div className="flex flex-col items-center justify-center">
            <div className="w-[350px] h-[320px] mb-6 flex items-center">
              <img src="../../../../images/people/10.png" alt="Empty state" className="w-full h-full object-contain"/>
            </div>
            <p className="text-gray-500 text-center text-sm"> Belum ada izin yang dikiukan, klik tombol buat izin untuk memulai. </p>
          </div>
        </div>
      )}

      <PermissionFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} formData={formData} onFormChange={handleFormChange} onSubmit={submitForm} errors={formErrors} isSubmitting={isSubmitting}/>
      <PermissionDetailModal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} permission={selectedDetail}/>
      <PaginationPermissionStudent page={page} lastPage={meta?.last_page || 1} onPrev={() => setPage(Math.max(1, page - 1))} onNext={() => setPage(Math.min(meta?.last_page || 1, page + 1))} onPageClick={(p) => setPage(p)}/>
    </div>
  );
}
