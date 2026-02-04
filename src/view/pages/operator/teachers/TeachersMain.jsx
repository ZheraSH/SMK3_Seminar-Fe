"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  memo,
} from "react";
import { SearchBar } from "./components/SearchBar";
import { DetailModal } from "./components/TeacherDetailModal.jsx";
import { TeacherForm } from "./components/TeacherFormModal";
import { TeacherTable } from "./components/TeacherTable";
import { PaginationEmployee } from "./components/TeachersPagination";
import { validateTeacherForm } from "./components/utils/validateTeacherForm";
import LoadingData from "../../../components/Loading/Data.jsx";
import { TeacherFilterDropdown } from "./components/FilterDropdown";
import DeleteConfirmModal from "../../../components/elements/deleteconfirm/DeleteConfirmModal";

import {
  submitTeacherApi,
  deleteTeacherApi,
} from "../../../../Core/api/role-operator/employee/TeachersApi";

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
  const [isOpen, setIsOpen] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

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

  // Hook untuk pagination dengan masterTeachers yang terpisah
  const {
    teachers,
    meta,
    page,
    setPage,
    reload: reloadPagination,
    loading,
  } = useTeacherPagination();

  // State terpisah untuk masterTeachers (untuk filter options)
  const [masterTeachers, setMasterTeachers] = useState([]);

  // Load masterTeachers sekali saat awal
  const loadMasterTeachers = useCallback(async () => {
    try {
      const res = await fetchTeachersApi(1, {});
      setMasterTeachers(res.data || []);
    } catch (error) {
      console.error("Failed to load master teachers:", error);
    }
  }, []);

  // Wrapper untuk reload yang juga bisa update masterTeachers jika perlu
  const reload = useCallback(async (newPage = page, filters = {}) => {
    await reloadPagination(newPage, filters);
    
    // Jika halaman pertama dan tanpa filter, update masterTeachers
    if (newPage === 1 && Object.keys(filters).length === 0) {
      loadMasterTeachers();
    }
  }, [page, reloadPagination, loadMasterTeachers]);

  // Function untuk apply filters
  const applyFilters = useCallback((filters) => {
    setPage(1);
    reload(1, filters);
  }, [setPage, reload]);

  // Hook untuk filter
  const {
    searchTerm,
    category,
    handleSearch,
    handleCategoryChange,
  } = useTeacherFilter(applyFilters);

  // Hook untuk master data
  const { religions, masters } = useTeacherMasterData(masterTeachers);

  // Initial load untuk master teachers
  React.useEffect(() => {
    loadMasterTeachers();
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

    setIsOpen(false);
    setEditingId(null);
    setErrors({});
    reload();
  };

  const handleEdit = (t) => {
    setPost({
      name: t.name ?? "",
      email: t.email ?? "",
      image: t.image ?? null,
      nik: t.nik ?? "",
      birth_place: t.birth?.place ?? "",
      birth_date: t.birth?.date ?? "",
      nip: t.nip ?? "",
      phone_number: t.phone_number ?? "",
      address: t.address ?? "",
      gender: t.gender?.value ?? "",
      religion_id: t.religion?.id ?? "",
      roles: t.roles?.map((r) => r.value) ?? [],
    });
    setEditingId(t.id);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteTeacherApi(deleteId);
    reload();
    setDeleteId(null);
  };

  if (loading && !teachers.length) return <LoadingData loading />;

  return (
    <div className="p-6">
      <div className="flex gap-3 mb-4">
        <MemoizedSearchBar 
          key="search-bar"
          searchTerm={searchTerm} 
          setSearchTerm={handleSearch} 
        />

        {masters && (
          <MemoizedTeacherFilterDropdown
            key="teacher-filter"
            category={category}
            setCategory={handleCategoryChange}
            masters={masters}
          />
        )}

        <button
          onClick={() => {
            setEditingId(null);
            setIsOpen(true);
          }}
          className="ml-auto bg-[#3B82F6] text-white px-4 py-2 rounded-[6px] hover:bg-blue-700 transition text-sm font-medium whitespace-nowrap"
        >
          + Tambah Guru
        </button>
      </div>

      <TeacherForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        post={post}
        religions={religions}
        errors={errors}
        editingId={editingId}
        handleInput={handleInput}
        handleRoleChange={handleRoleChange}
        handleSubmit={handleSubmit}
        showRoleDropdown={showRoleDropdown}
        setShowRoleDropdown={setShowRoleDropdown}
      />

      <MemoizedTeacherTable
        currentTeachers={teachers}
        openItemId={openItemId}
        setOpenItemId={setOpenItemId}
        handleDetail={(t) => {
          setSelectedTeacher(t);
          setIsDetailOpen(true);
        }}
        handleEdit={handleEdit}
        handleDelete={(id) => setDeleteId(id)}
      />

      <MemoizedPaginationEmployee
        page={page}
        lastPage={meta.last_page}
        onPageClick={setPage}
      />

      <DetailModal
        isDetailOpen={isDetailOpen}
        selectedTeacher={selectedTeacher}
        setIsDetailOpen={setIsDetailOpen}
      />

      <DeleteConfirmModal
        open={deleteId !== null}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};