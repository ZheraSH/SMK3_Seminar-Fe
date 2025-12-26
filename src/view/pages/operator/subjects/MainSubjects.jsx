"use client";

import { useState, useEffect } from "react";
import {
  addSubject,
  updateSubject,
  deleteSubject,
} from "../../../../Core/api/role-operator/subjects/Subjects";

import { SubjectModal } from "./components/SubjectModal";
import { SearchBar } from "./components/SearchBar";
import { Pagination } from "./components/Pagination";
import { SubjectCard } from "./components/SubjectCard";
import useSubjects from "../../../../Core/hooks/operator-hooks/subjects/useSubjects";
import HeaderPage from "../../../components/elements/header/Header.Page";
import DeleteConfirmModal from "../../../components/elements/deleteconfirm/DeleteConfirmModal";

export default function MainMaple() {
  const {
    subjects,
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
  const [deleteId, setDeleteId] = useState(null);

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
        setErrors({ name: message });
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
        fetchSubjects(currentPage);
      }
    } catch (err) {
      console.error("Error updating subject:", err);
    }
  };

  const askDeleteSubject = (id) => {
    setDeleteId(id);
  };

  const handleDeleteSubject = async () => {
    if (!deleteId) return;

    try {
      await deleteSubject(deleteId);

      const page =
        subjects.length === 1 && currentPage > 1
          ? currentPage - 1
          : currentPage;

      setCurrentPage(page);
      fetchSubjects(page);
    } catch (e) {
      console.error(e);
    } finally {
      setDeleteId(null);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchSubjects(newPage);
    setSearch("");
  };

  if (loading && subjects.length === 0) {
    return <div className="flex justify-center mt-8">Loading...</div>;
  }

  return (
    <div className="justify-center mt-8 mx-7">
      <HeaderPage
        h1="Mata Pelajaran"
        p=" Daftar seluruh mata pelajaran yang tersedia dalam sistem."
      />

      {/* CONTENT */}
      <div className="">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              onDelete={askDeleteSubject}
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

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={() => handlePageChange(currentPage - 1)}
            onNext={() => handlePageChange(currentPage + 1)}
            onPageClick={(p) => handlePageChange(p)}
          />
        )}

        <DeleteConfirmModal
          open={deleteId !== null}
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDeleteSubject}
        />
      </div>
    </div>
  );
}
