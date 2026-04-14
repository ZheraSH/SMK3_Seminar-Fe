"use client";
import { useState } from "react";
import { useRfidManagement } from "@/core/hooks/operator/rfid/use-rfid-management";
import { RfidHeader } from "./components/rfid-header";
import { RfidTable } from "./components/rfid-table";
import RfidEditModal from "./components/rfid-edit-modal";
import { RfidSearchBar } from "./components/rfid-search-bar";
import { PaginationRfid } from "./components/rfid-pagination";
import { useRfid } from "@/core/hooks/operator/rfid/use-pagination";
import RfidAddModal from "./components/rfid-add-modal";
import { deleteRFID } from "@api/role-operator/rfid/rfid-api";
import LoadingData from "@elements/loading-data/loading";
import Header from "@elements/header/header-new";
import DeleteConfirmModal from "@elements/modaldelete/modal-delete";

export default function RfidPage() {
  const { rfid, meta, page, setPage, search, setSearch, loading, setRefresh } =
    useRfid();

  const {
    showAdd,
    setShowAdd,
    showEdit,
    setShowEdit,
    selected,
    setSelected,
    newData,
    setNewData,
    openMenu,
    setOpenMenu,
    handleAdd,
    handleEdit,
  } = useRfidManagement();

  // State for Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);

    try {
      await deleteRFID(deleteId);
      setRefresh((r) => r + 1);
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (e) {
      console.error("Gagal hapus RFID", e);
    } finally {
      setDeleteLoading(false);
    }
  };

  const refreshData = () => {
    setRefresh((r) => r + 1);
  };


  return (
    <div className="min-h-screen bg-gray-50 px-6">
      <div className=" hidden md:block">
        {loading ? (<LoadingData loading={loading} type="header1" />)
          : (
            <Header
              span="Daftar RFID"
              p="Daftar Pengguna RFID"
              src="/images/particle/rfid.png"
            />
          )}
      </div>


      {loading ? (<LoadingData loading={loading} type="create" />)
        : (
          <RfidSearchBar
            search={search}
            onSearchChange={setSearch}
            onAddClick={() => setShowAdd(true)}
          />
        )}

      {loading ? (<LoadingData loading={loading} type="tableSchedule" count={10} />)
        : (
          <>
            <RfidTable
              filtered={rfid}
              openMenu={openMenu}
              onMenuClick={(id) => setOpenMenu(openMenu === id ? null : id)}
              onDeleteClick={handleDelete}
              onStatusUpdate={refreshData}
            />

            <PaginationRfid
              page={meta.current_page || 1}
              lastPage={meta.last_page || 1}
              onPrev={() => setPage(page - 1)}
              onNext={() => setPage(page + 1)}
              onPageClick={setPage}
            />
          </>
        )}

      <RfidAddModal
        show={showAdd}
        newData={newData}
        onDataChange={setNewData}
        onAdd={handleAdd}
        onClose={() => {
          setShowAdd(false);
          setNewData({ nama: "", idKartu: "", status: "Aktif" });
        }}
        onSuccess={refreshData}
      />

      <RfidEditModal
        show={showEdit}
        selected={selected}
        onDataChange={setSelected}
        onSave={() => {
          handleEdit();
          refreshData();
        }}
        onClose={() => setShowEdit(false)}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Hapus RFID?"
        message="Apakah Anda yakin ingin menghapus data RFID ini? Tindakan ini tidak dapat dibatalkan."
        loading={deleteLoading}
      />
    </div>
  );
}

