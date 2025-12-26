"use client";
import { useRfidManagement } from "../../../../Core/hooks/operator-hooks/rfid/use-rfid-management";

import { RfidHeader } from "./components/RfidHeader";
import { RfidTable } from "./components/RfidTable";

import RfidEditModal from "./components/RfidEditModal";
import { RfidSearchBar } from "./components/RfidSearchBar";
import { useRfid } from "../../../../Core/hooks/operator-hooks/rfid/usePagination";
import RfidAddModal from "./components/RfidAddModal";
import { deleteRFID } from "../../../../Core/api/role-operator/rfid/RfidApi";
import { PaginationRfid } from "./components/RfidPagination";
import { useState } from "react";
import DeleteConfirmModal from "../../../components/elements/deleteconfirm/DeleteConfirmModal";

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

  const [deleteId, setDeleteId] = useState(null);

  const askDeleteRfid = (id) => {
    setDeleteId(id);
  };

  const handleDeleteRfid = async () => {
    if (!deleteId) return;

    try {
      await deleteRFID(deleteId);
      setRefresh((r) => r + 1);
    } catch (e) {
      console.error(e);
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6">
      <RfidHeader />

      {/* SEARCH */}
      <RfidSearchBar
        search={search}
        onSearchChange={setSearch}
        onAddClick={() => setShowAdd(true)}
      />

      {/* TABLE */}
      <RfidTable
        filtered={rfid}
        openMenu={openMenu}
        onMenuClick={(id) => setOpenMenu(openMenu === id ? null : id)}
        onEditClick={(item) => {
          setSelected(item);
          setShowEdit(true);
        }}
        onDeleteClick={askDeleteRfid}
      />

      {/* PAGINATION */}
      <PaginationRfid
        page={meta.current_page || 1}
        lastPage={meta.last_page || 1}
        onPrev={() => setPage((prev) => Math.max(1, prev - 1))}
        onNext={() => setPage((prev) => Math.min(meta.last_page, prev + 1))}
        onPageClick={(p) => setPage(p)}
      />

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
        onSuccess={() => setRefresh((r) => r + 1)}
      />

      {/* EDIT */}
      <RfidEditModal
        show={showEdit}
        selected={selected}
        onDataChange={setSelected}
        onSave={handleEdit}
        onClose={() => setShowEdit(false)}
      />

      <DeleteConfirmModal
        open={deleteId !== null}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDeleteRfid}
      />
    </div>
  );
}
