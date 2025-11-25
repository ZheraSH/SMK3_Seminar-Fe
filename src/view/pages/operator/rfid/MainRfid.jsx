"use client";
import { useRfidManagement } from "../../../../Core/hooks/operator-hooks/rfid/use-rfid-management";

import { RfidHeader } from "./components/RfidHeader";
import { RfidTable } from "./components/RfidTable";

import  RfidEditModal  from "./components/RfidEditModal";
import { RfidSearchBar } from "./components/RfidSearchBar";
import { PaginationRfid } from "./components/RfidPagination";
import { useRfid } from "../../../../Core/hooks/operator-hooks/rfid/usePagination";
import RfidAddModal from "./components/RfidAddModal";
import {deleteRFID} from "../../../../Core/api/role-operator/rfid/RfidApi"

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

  const handleDelete = async (id) => {
    // Konfirmasi dulu
    const ok = window.confirm("Yakin mau hapus RFID ini?");
    if (!ok) return;
  
    try {
      await deleteRFID(id);
      setRefresh((r) => r + 1);
    } catch (e) {
      console.error("Gagal hapus RFID", e);
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
        onDeleteClick={handleDelete}
      />

      {/* PAGINATION */}
      <PaginationRfid
        page={meta.current_page || 1}
        lastPage={meta.last_page || 1}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
        onPageClick={setPage}
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
    </div>
  );
}
