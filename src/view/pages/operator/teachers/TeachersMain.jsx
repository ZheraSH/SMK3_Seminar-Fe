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

import {
  submitTeacherApi,
  deleteTeacherApi,
} from "../../../../Core/api/role-operator/employee/TeachersApi";
import { extractTeacherMasters } from "./components/utils/teacherMasterExtractor";
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
  const [religions, setReligions] = useState([]);
  const [loading, setLoading] = useState(true);
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
    setEditingId(t.id);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await deleteTeacherApi(deleteId);
    reload();
    setDeleteId(null);
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
    <div className="">
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