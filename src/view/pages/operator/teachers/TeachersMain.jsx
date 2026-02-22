"use client";

import React, { useState, useEffect, useMemo, memo, useCallback } from "react";
import { SearchBar } from "./components/SearchBar";
import { DetailModal } from "./components/TeacherDetailModal.jsx";
import { TeacherForm } from "./components/TeacherFormModal";
import { TeacherTable } from "./components/TeacherTable";
import { PaginationEmployee } from "./components/TeachersPagination";
import { validateTeacherForm } from "./components/utils/validateTeacherForm";
import api from "../../../../Core/api";

import {
  submitTeacherApi,
  deleteTeacherApi,
} from "../../../../Core/api/role-operator/employee/TeachersApi";
import { TeacherFilterDropdown } from "./components/FilterDropdown";
import LoadingData from "../../../components/elements/loadingData/loading.jsx";
import DeleteConfirmModal from "../../../components/elements/modaldelete/ModalDelete.jsx";

// Import custom hooks
import { useTeacherPagination } from "../../../../Core/hooks/operator-hooks/employee/usePagination";
import { useTeacherFilter } from "../../../../Core/hooks/operator-hooks/employee/useTeacherFilters";
import { useTeacherMasterData } from "../../../../Core/hooks/operator-hooks/employee/useTeacherMasterData";

/* ==========================
   MEMOIZED COMPONENTS
========================== */
const MemoizedSearchBar = memo(SearchBar);
const MemoizedTeacherFilterDropdown = memo(TeacherFilterDropdown);
const MemoizedTeacherTable = memo(TeacherTable);
const MemoizedPaginationEmployee = memo(PaginationEmployee);

/* ==========================
   MAIN COMPONENT
========================== */
export const TeacherMain = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [masterTeachers, setMasterTeachers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // State untuk form
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

  const { teachers, meta, page, setPage, reload, loading: teachersLoading } = useTeacherPagination();

  const { searchTerm, category, handleSearch, handleCategoryChange, setCategory, filteredTeachers } = useTeacherFilter(
    teachers,
    (searchValue) => reload(1, { search: searchValue })
  );

  const loadMasterTeachers = useCallback(async () => {
    try {
      const res = await api.get("/employees?per_page=100");
      setMasterTeachers(res.data?.data || []);
    } catch (error) {
      console.error("Gagal memuat master teachers:", error);
    }
  }, []);

  // Gunakan master data dari hook
  const { religions, masters } = useTeacherMasterData(masterTeachers);

  const combinedLoading = teachersLoading || initLoading;

  useEffect(() => {
    const init = async () => {
      setInitLoading(true);
      try {
        await loadMasterTeachers();
      } catch (error) {
        console.error("Gagal memuat master data:", error);
      } finally {
        setInitLoading(false);
      }
    };
    init();
  }, [loadMasterTeachers]);

  const handleInput = (e) => {
    const { name, value, files, type } = e.target;
    setPost((p) => ({
      ...p,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleRoleChange = (role) => {
    setPost((p) => ({
      ...p,
      roles: p.roles.includes(role)
        ? p.roles.filter((r) => r !== role)
        : [...p.roles, role],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feErrors = validateTeacherForm(post, editingId);
    if (Object.keys(feErrors).length) {
      setErrors(feErrors);
      return;
    }

    const res = await submitTeacherApi(editingId, post);
    if (!res.success) {
      if (res.errors) setErrors(res.errors);
      return;
    }

    setErrors({});
    setEditingId(null);
    setIsOpen(false);
    reload();
  };

  const handleEdit = (t) => {
    setPost({
      name: t.name || "",
      email: t.email || "",
      image: t.image,
      nik: t.nik || "",
      birth_place: t.birth_place || "",
      birth_date: t.birth_date || "",
      nip: t.nip || "",
      phone_number: t.phone_number || "",
      address: t.address || "",
      gender: t.gender?.value || "",
      religion_id: t.religion?.id || "",
      roles: t.roles?.map((r) => r.value) || [],
    });
    setEditingId(t.id);
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

    setIsOpen(true);
  };

  const handleResetAll = () => {
    setCategory({
      type: "",
      value: "",
      label: "Pilih Kategori",
    });
    handleSearch("");
    setPage(1);
    reload(1, {});
  };

  return (
    <div className="">
      {combinedLoading && teachers.length === 0 ? (
        <LoadingData loading={combinedLoading} type="create" />
      ) : (
        <div className="flex flex-col gap-3 mb-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex flex-col sm:flex-row gap-3 w-full items-stretch sm:items-center">
              <MemoizedSearchBar
                searchTerm={searchTerm}
                setSearchTerm={handleSearch}
              />

              <MemoizedTeacherFilterDropdown
                category={category}
                setCategory={handleCategoryChange}
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

      <TeacherForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        post={post}
        setPost={setPost}
        religions={religions}
        errors={errors}
        editingId={editingId}
        handleInput={handleInput}
        handleRoleChange={handleRoleChange}
        handleSubmit={handleSubmit}
        showRoleDropdown={showRoleDropdown}
        setShowRoleDropdown={setShowRoleDropdown}
      />

      {teachersLoading ? (
        <LoadingData loading={teachersLoading} type="tableSiswaKaryawan" count={10} />
      ) : (
        <>
          <MemoizedTeacherTable
            startIndex={(page - 1) * 10}
            currentTeachers={filteredTeachers}
            openItemId={openItemId}
            setOpenItemId={setOpenItemId}
            handleDetail={handleDetail}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <MemoizedPaginationEmployee
            page={page}
            lastPage={meta?.last_page || 1}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(meta?.last_page || 1, p + 1))}
            onPageClick={(p) => setPage(p)}
          />
        </>
      )}
    </div>
  );
};
