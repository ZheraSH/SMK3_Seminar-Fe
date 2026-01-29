"use client";

import React, { useState, useEffect, useMemo } from "react";
import { SearchBar } from "./components/SearchBar";
import { DetailModal } from "./components/TeacherDetailModal.jsx";
import { TeacherForm } from "./components/TeacherFormModal";
import { TeacherTable } from "./components/TeacherTable";
import { PaginationEmployee } from "./components/TeachersPagination";
import { useTeacher } from "../../../../Core/hooks/operator-hooks/employee/usePagination";
import { validateTeacherForm } from "./components/utils/validateTeacherForm";

import {
  submitTeacherApi,
  deleteTeacherApi,
  fetchReligionsApi,
} from "../../../../Core/api/role-operator/employee/TeachersApi";
import { extractTeacherMasters } from "./components/utils/teacherMasterExtractor";
import { TeacherFilterDropdown } from "./components/FilterDropdown";
import LoadingData from "../../../components/elements/loadingData/loading.jsx";
import DeleteConfirmModal from "../../../components/elements/modaldelete/ModalDelete.jsx";

export const TeacherMain = () => {
  const [religions, setReligions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [post, setPost] = useState({
    name: "",
    email: "",
    image: null,
    nik: "",
    birth_place: "",
    birth_date: "",
    nip: "",
    phone_number: "",
    address: "",
    gender: "",
    religion_id: "",
    roles: [],
  });

  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  const { Teacher, meta, page, setPage, reload } = useTeacher();

  // Delete Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [category, setCategory] = useState({
    type: "",
    value: "",
    label: "Pilih Kategori",
  });

  const masters = useMemo(() => extractTeacherMasters(Teacher), [Teacher]);

  const teachersByFilter = useMemo(() => {
    if (!category.type || !category.value) return Teacher;

    switch (category.type) {
      case "gender":
        return Teacher.filter((t) => t.gender?.value === category.value);

      case "subjects":
        return Teacher.filter((t) =>
          t.subjects?.some((subject) => subject.id === category.value)
        );

      case "role":
        return Teacher.filter((t) =>
          t.roles?.some((role) => role.value === category.value)
        );

      default:
        return Teacher;
    }
  }, [Teacher, category]);

  const filteredTeachers = useMemo(() => {
    let result = teachersByFilter;
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter((t) => {
        const matchName = t.name?.toLowerCase().includes(lowerTerm);
        const matchNip = t.nip?.toString().toLowerCase().includes(lowerTerm);
        const matchRole = t.roles?.some((role) => {
          const rLabel = (role.label || role.value || role).toString().toLowerCase();
          return rLabel.includes(lowerTerm);
        });

        return matchName || matchNip || matchRole;
      });
    }
    return result;
  }, [teachersByFilter, searchTerm]);

  useEffect(() => {
    const loadReligions = async () => {
      setLoading(true);
      try {
        const data = await fetchReligionsApi();
        setReligions(data);
      } catch (error) {
        console.error("Gagal memuat data agama:", error);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    loadReligions();
  }, []);

  const handleInput = (e) => {
    const { name, type, files, value } = e.target;
    if (name === "roles") {
      setPost({ ...post, roles: [value] });
      return;
    }
    setPost({ ...post, [name]: type === "file" ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const frontendErrors = validateTeacherForm(post, editingId);
    if (Object.keys(frontendErrors).length > 0) {
      setErrors(frontendErrors);
      return;
    }

    const result = await submitTeacherApi(editingId, post);
    if (!result.success) {
      setErrors(result.errors || {});
      return;
    }

    setErrors({});
    setEditingId(null);
    setIsOpen(false);
    reload();
  };

  const handleEdit = (teacher) => {
    setPost({
      name: teacher.name || "",
      email: teacher.email || "",
      image: teacher.image,
      nik: teacher.nik || "",
      birth_place: teacher.birth_place || "",
      birth_date: teacher.birth_date || "",
      nip: teacher.nip || "",
      phone_number: teacher.phone_number || "",
      address: teacher.address || "",
      gender: teacher.gender.value || "",
      religion_id: teacher.religion.id || "",
      roles: teacher.roles?.map((r) => r.value) || [],
    });
    setEditingId(teacher.id);
    setIsOpen(true);
  };

  const handleDetail = (teacher) => {
    setSelectedTeacher(teacher);
    setIsDetailOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleteLoading(true);

    try {
      const ok = await deleteTeacherApi(deleteId);
      if (ok) reload();
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (e) {
      console.error(e);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleAddNewTeacher = () => {
    setEditingId(null);
    setPost({
      name: "",
      email: "",
      image: null,
      NIK: "",
      birth_place: "",
      birth_date: "",
      NIP: "",
      phone_number: "",
      address: "",
      gender: "",
      religion_id: "",
      roles: [],
    });
    setIsOpen(true);
  };

  const handleResetAll = () => {
    setCategory({
      type: "",
      value: "",
      label: "Pilih Kategori",
    });
    setSearchTerm("");
  };

  return (
    <div className="p-6">
      {loading ?
        (<LoadingData loading={loading} type="create" />)
        : (
          <div className="flex flex-col gap-3 mb-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex flex-col sm:flex-row gap-3 w-full items-stretch sm:items-center">
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={(v) => {
                    setSearchTerm(v);
                    setPage(1);
                  }}
                />

                <TeacherFilterDropdown
                  category={category}
                  setCategory={setCategory}
                  masters={masters}
                />
              </div>

              <div className="flex gap-3">
                <DetailModal
                  isDetailOpen={isDetailOpen}
                  selectedTeacher={selectedTeacher}
                  setIsDetailOpen={setIsDetailOpen}
                />

                <DeleteConfirmModal
                  isOpen={showDeleteModal}
                  onClose={() => setShowDeleteModal(false)}
                  onConfirm={confirmDelete}
                  title="Hapus Guru?"
                  message="Apakah Anda yakin ingin menghapus data guru ini? Tindakan ini tidak dapat dibatalkan."
                  loading={deleteLoading}
                />

                <button
                  onClick={handleAddNewTeacher}
                  className="bg-[#3B82F6] text-white px-4 py-2 rounded-[6px] hover:bg-blue-700 transition text-sm font-medium whitespace-nowrap"
                >
                  + Tambah Guru
                </button>
              </div>
            </div>
          </div>
        )}

      {/* FORM MODAL */}
      <TeacherForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        post={post}
        setPost={setPost}
        religions={religions}
        errors={errors}
        editingId={editingId}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />

      {loading ?
        (<LoadingData loading={loading} type="tableSiswaKaryawan" count={10} />)
        : (
          <>
            <TeacherTable
              currentTeachers={filteredTeachers}
              openItemId={openItemId}
              setOpenItemId={setOpenItemId}
              handleDetail={handleDetail}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            <PaginationEmployee
              page={page}
              lastPage={meta.last_page}
              onPrev={() => setPage(page - 1)}
              onNext={() => setPage(page + 1)}
              onPageClick={(p) => setPage(p)}
            />
          </>
        )}
    </div>
  );
};
