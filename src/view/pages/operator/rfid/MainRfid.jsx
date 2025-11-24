"use client"
import { useRfidManagement } from "../../../../Core/hooks/rfid/use-rfid-management"


import { RfidHeader } from "./components/rfid-header"
import { RfidTable } from "./components/rfid-table"
import { RfidAddModal } from "./components/rfid-add-modal"
import { RfidEditModal } from "./components/rfid-edit-modal"
import { RfidSearchBar } from "./components/rfid-search-bar"
import { PaginationRfid } from "./components/rfid-pagination"
import { useRfid } from "../../../../Core/hooks/rfid/usePagination"

export function RfidManagement() {
  const { rfid, meta, page, setPage, search, setSearch, loading, setRefresh  } = useRfid()

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
    handleDelete,
    handleEdit,
  } = useRfidManagement()



  return (
    <div className="min-h-screen bg-gray-50 px-6">
      <RfidHeader />

      {/* SEARCH */}
      <RfidSearchBar search={search} onSearchChange={setSearch} onAddClick={() => setShowAdd(true)} />

      {/* TABLE */}
      <RfidTable
        filtered={rfid}
        openMenu={openMenu}
        onMenuClick={(id) => setOpenMenu(openMenu === id ? null : id)}
        onEditClick={(item) => {
          setSelected(item)
          setShowEdit(true)
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
          setShowAdd(false)
          setNewData({ nama: "", idKartu: "", status: "Aktif" })
        }}
        onSuccess={() => setRefresh(r => r + 1)} 
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
  )
}
