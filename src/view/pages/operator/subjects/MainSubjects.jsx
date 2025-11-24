"use client";

import { useState, useEffect } from "react";
import {
  addSubject,
  updateSubject,
  deleteSubject,
} from "../../../../Core/api/maple/Subjects";

import { SubjectModal } from "./components/SubjectModal";
import { SearchBar } from "./components/SearchBar";
import { Pagination } from "./components/Pagination";
import { SubjectCard } from "./components/SubjectCard";
import useSubjects from "../../../../Core/hooks/operator.hooks/subjects/useSubjects";

export default function MainMaple() {
  const {
    subjects,
    setSubjects,
    currentPage,
    setCurrentPage,
    totalPages,
    fetchSubjects,
    loading,
  } = useSubjects();

  const [newSubject, setNewSubject] = useState({ name: "" });
  const [editSubject, setEditSubject] = useState({ id: null, name: "" });
  const [openMenu, setOpenMenu] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [search, setSearch] = useState("");

  // Filter subjects based on search - hanya untuk display
  const filteredSubjects = subjects.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const [errors, setErrors] = useState({});
  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      await addSubject(newSubject);
      setOpenModal(null);
      setNewSubject({ name: "" });
      fetchSubjects(currentPage);
    } catch (err) {
      const message = err.response?.data?.errors?.name?.[0];
      if (message) {
        setErrors({ name: message }); // ⬅️ di sini tempatnya
      }
    }
  };

  const handleUpdateSubject = async (e) => {
    e.preventDefault();
    try {
      if (editSubject.id) {
        await updateSubject(editSubject.id, editSubject.name);
        setOpenModal(null);
        setEditSubject({ id: null, name: "" });
        fetchSubjects(currentPage); // reload current page
      }
    } catch (err) {
      console.error("Error updating subject:", err);
    }
  };

  const handleDeleteSubject = async (id) => {
    if (!confirm("Yakin ingin menghapus mapel ini?")) return;
    try {
      await deleteSubject(id);
      // Jika halaman terakhir hanya memiliki 1 item, kembali ke halaman sebelumnya
      if (subjects.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
        fetchSubjects(currentPage - 1);
      } else {
        fetchSubjects(currentPage);
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchSubjects(newPage);
    setSearch(""); // reset search ketika ganti page
  };

  if (loading && subjects.length === 0) {
    return <div className="flex justify-center mt-8">Loading...</div>;
  }

  return (
    <div className="justify-center mt-8 mx-7">
      {/* Banner */}
      <div className="relative w-full h-[166px] mt-6 bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px] shadow-md">
        <div className="absolute inset-0 flex flex-col mt-2 rounded-[6px]">
          <div className="ml-6">
            <h1 className="text-white text-[30px] font-semibold drop-shadow-lg">
              Mata Pelajaran
            </h1>
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
            setNewSubject({ name: "" });
            setOpenModal("add");
          }}
        />

        {/* Modal */}
        <SubjectModal
          isOpen={openModal === "add"}
          mode="add"
          subject={newSubject}
          errors={errors}
          setErrors={setErrors}
          onClose={() => setOpenModal(null)}
          onChange={(field, value) =>
            setNewSubject({ ...newSubject, [field]: value })
          }
          onSubmit={handleAddSubject}
        />

        <SubjectModal
          isOpen={openModal === "edit"}
          mode="edit"
          subject={editSubject}
          errors={errors}
          setErrors={setErrors}
          onClose={() => setOpenModal(null)}
          onChange={(field, value) =>
            setEditSubject({ ...editSubject, [field]: value })
          }
          onSubmit={handleUpdateSubject}
        />

        {/* CARD GRID */}
        <div className="grid grid-cols-4 gap-6">
          {filteredSubjects.map((subject, index) => (
            <SubjectCard
              key={subject.id || index}
              subject={subject}
              index={index}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              onEdit={(subject) => {
                setEditSubject({ id: subject.id, name: subject.name });
                setOpenModal("edit");
              }}
              onDelete={handleDeleteSubject}
            />
          ))}
        </div>

        {/* Show message when no results */}
        {filteredSubjects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {search
              ? "Tidak ada mata pelajaran yang sesuai dengan pencarian."
              : "Tidak ada mata pelajaran."}
          </div>
        )}

        {/* PAGINATION - hanya tampil jika totalPages > 1 */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={() => handlePageChange(Math.max(currentPage - 1, 1))}
            onNext={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
          />
        )}
      </div>
    </div>
  );
}
