"use client";
import React from "react";
import { useRfidManagement } from "../../../../Core/hooks/rfid/use-rfid-management";
import { RfidHeader } from "./components/rfid-header";
import { RfidTable } from "./components/rfid-table";
import { RfidAddModal } from "./components/rfid-add-modal";
import { RfidEditModal } from "./components/rfid-edit-modal";
import { RfidSearchBar } from "./components/rfid-search-bar";


export function RfidManagement() {
  const {
    search,
    setSearch,
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
    filtered,
    handleAdd,
    handleDelete,
    handleEdit,
  } = useRfidManagement();

  return (
    <div className="min-h-screen bg-gray-50 px-6">
      <RfidHeader />
      <RfidSearchBar
        search={search}
        onSearchChange={setSearch}
        onAddClick={() => setShowAdd(true)}
      />
      <RfidTable
        filtered={filtered}
        openMenu={openMenu}
        onMenuClick={(id) => setOpenMenu(openMenu === id ? null : id)}
        onEditClick={(item) => {
          setSelected(item);
          setShowEdit(true);
        }}
        onDeleteClick={handleDelete}
      />

      <RfidAddModal
        show={showAdd}
        newData={newData}
        onDataChange={setNewData}
        onAdd={handleAdd}
        onClose={() => {
          setShowAdd(false);
          setNewData({ nama: "", idKartu: "", status: "Aktif" });
        }}
      />

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