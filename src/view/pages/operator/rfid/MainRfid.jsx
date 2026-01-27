"use client";
import { useState } from "react";
import { useRfidManagement } from "../../../../Core/hooks/operator-hooks/rfid/use-rfid-management";
import { RfidHeader } from "./components/RfidHeader";
import { RfidTable } from "./components/RfidTable";
import RfidEditModal from "./components/RfidEditModal";
import { RfidSearchBar } from "./components/RfidSearchBar";
import { PaginationRfid } from "./components/RfidPagination";
import { useRfid } from "../../../../Core/hooks/operator-hooks/rfid/usePagination";
import RfidAddModal from "./components/RfidAddModal";
import { deleteRFID } from "../../../../Core/api/role-operator/rfid/RfidApi";
import LoadingData from "../../../components/elements/loadingData/loading";
import Header from "../../../components/elements/header/Header-new";


import DeleteConfirmModal from "../../../components/elements/modaldelete/ModalDelete";

export function RfidManagement() {
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
        {loading?(<LoadingData loading={loading} type="header1" />)
        :(
          <Header
            span="Daftar RFID"
            p="Daftar Pengguna RFID"
            src="/images/particle/rfid.png"
          />
        )}
      </div>

     
      {loading? (<LoadingData loading={loading} type="create" />)
      :(
        <RfidSearchBar
          search={search}
          onSearchChange={setSearch}
          onAddClick={() => setShowAdd(true)}
        />
      )}

      {/* TABLE dengan prop onStatusUpdate */}
      {loading?(<LoadingData loading={loading} type="tableSchedule" count={10}/>)
      :(
        <>
          <RfidTable
            filtered={rfid}
            openMenu={openMenu}
            onMenuClick={(id) => setOpenMenu(openMenu === id ? null : id)}
            onDeleteClick={handleDelete}
            onStatusUpdate={refreshData}
          />

          {/* PAGINATION */}
          <PaginationRfid
            page={meta.current_page || 1}
            lastPage={meta.last_page || 1}
            onPrev={() => setPage(page - 1)}
            onNext={() => setPage(page + 1)}
            onPageClick={setPage}
          />
        </>
      )}

      {/* ADD */}
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

      {/* DELETE CONFIRMATION MODAL */}
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