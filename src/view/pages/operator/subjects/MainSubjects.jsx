"use client"

import { useState } from "react"
import { useSubjects } from "../../../../Core/hooks/subjects/useSubjects"
import { addSubject, updateSubject, deleteSubject } from "../../../../Core/api/maple/Subjects"

import { SubjectModal } from "./components/SubjectModal"
import { SearchBar } from "./components/SearchBar"
import { Pagination } from "./components/Pagination"
import { SubjectCard } from "./components/SubjectCard"

export default function MainMaple() {
  const { subjects, setSubjects, currentPage, setCurrentPage, totalPages, fetchSubjects } = useSubjects()
  const [newSubject, setNewSubject] = useState({ name: "" })
  const [editSubject, setEditSubject] = useState({ id: null, name: "" })
  const [openMenu, setOpenMenu] = useState(null)
  const [openModal, setOpenModal] = useState(null)
  const [search, setSearch] = useState("")

  const handleAddSubject = async (e) => {
    e.preventDefault()
    try {
      await addSubject(newSubject)
      setOpenModal(null)
      setNewSubject({ name: "" })
      fetchSubjects()
    } catch (err) {
      console.error("Error adding subject:", err)
    }
  }

  const handleUpdateSubject = async (e) => {
    e.preventDefault()
    try {
      if (editSubject.id) {
        await updateSubject(editSubject.id, editSubject.name)
        setOpenModal(null)
        setEditSubject({ id: null, name: "" })
        fetchSubjects()
      }
    } catch (err) {
      console.error("Error updating subject:", err)
    }
  }

  const handleDeleteSubject = async (id) => {
    if (!confirm("Yakin ingin menghapus mapel ini?")) return
    try {
      await deleteSubject(id)
      setSubjects(subjects.filter((s) => s.id !== id))
    } catch (error) {
      console.error("Error deleting subject:", error)
    }
  }

  const filtered = subjects.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="justify-center mt-8 mx-7">
      {/* Banner */}
      <div className="relative w-full h-[166px] mt-6 bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px] shadow-md">
        <div className="absolute inset-0 flex flex-col mt-2 rounded-[6px]">
          <div className="ml-6">
            <h1 className="text-white text-[30px] font-semibold drop-shadow-lg">Mata Pelajaran</h1>
            <p className="text-white text-[14px] font-light drop-shadow-md">
              Daftar seluruh mata pelajaran yang tersedia dalam sistem.
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="py-8">
        {/* Search & Button */}
        <SearchBar
          search={search}
          onSearchChange={setSearch}
          onAddClick={() => {
            setNewSubject({ name: "" })
            setOpenModal("add")
          }}
        />

        {/* Modal */}
        <SubjectModal
          isOpen={openModal === "add"}
          mode="add"
          subject={newSubject}
          onClose={() => setOpenModal(null)}
          onChange={(field, value) => setNewSubject({ ...newSubject, [field]: value })}
          onSubmit={handleAddSubject}
        />

        <SubjectModal
          isOpen={openModal === "edit"}
          mode="edit"
          subject={editSubject}
          onClose={() => setOpenModal(null)}
          onChange={(field, value) => setEditSubject({ ...editSubject, [field]: value })}
          onSubmit={handleUpdateSubject}
        />

        {/* CARD GRID */}
        <div className="grid grid-cols-4 gap-6">
          {filtered.map((subject, index) => (
            <SubjectCard
              key={index}
              subject={subject}
              index={index}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              onEdit={(subject) => {
                setEditSubject({ id: subject.id, name: subject.name })
                setOpenModal("edit")
              }}
              onDelete={handleDeleteSubject}
            />
          ))}
        </div>

        {/* PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        />
      </div>
    </div>
  )
}
