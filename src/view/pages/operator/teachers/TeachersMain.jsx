"use client";

import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { validateTeacherForm } from "./components/utils/validateTeacherForm";
import {
  submitTeacherApi,
  deleteTeacherApi,
  fetchReligionsApi,
} from "../../../../Core/api/role-operator/employee/TeachersApi";

import { useTeacherFilters } from "../../../../Core/hooks/operator-hooks/employee/useTeacherFilters";
import { SearchBar } from "./components/SearchBar";
import { FilterDropdown } from "./components/FilterDropdown";
import { DetailModal } from "./components/TeacherDetailModal.jsx";
import { TeacherForm } from "./components/TeacherFormModal";
import { TeacherTable } from "./components/TeacherTable";
import { useTeacher } from "../../../../Core/hooks/operator-hooks/employee/usePagination";
import { PaginationEmployee } from "./components/TeachersPagination";

export const TeacherMain = () => {
  const [religions, setReligions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [post, setPost] = useState({
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
    religion_id: 1,
    roles: [],
  });

  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  // FILTER
  const {
    searchTerm,
    setSearchTerm,
    openCategory,
    setOpenCategory,
    openSubMenu,
    setOpenSubMenu,
    category,
    setCategory,
    categoryRef,
    handleCategorySelect,
    filterTeachers,
  } = useTeacherFilters();

  // PAGINATION DATA
  const { Teacher, meta, page, setPage, reload } = useTeacher();

  // FETCH RELIGIONS
  useEffect(() => {
    const loadReligions = async () => {
      const data = await fetchReligionsApi();
      setReligions(data);
    };
    loadReligions();
  }, []);

  // INPUT HANDLER
  const handleInput = (e) => {
    const { name, type, files, value } = e.target;

    if (name === "roles") {
      setPost({
        ...post,
        roles: [value],
      });
      return;
    }

    setPost({
      ...post,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // SUBMIT
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

    setEditingId(null);
    setIsOpen(false);
    reload();
  };

  // EDIT
  const handleEdit = (teacher) => {
    setPost({
      name: teacher.name || "",
      email: teacher.email || "",
      image: null,
      NIK: teacher.NIK || "",
      birth_place: teacher.birth_place || "",
      birth_date: teacher.birth_date || "",
      NIP: teacher.NIP || "",
      phone_number: teacher.phone_number || "",
      address: teacher.address || "",
      gender: teacher.gender || "",
      religion_id: teacher.religion_id || "",
      roles: Array.isArray(teacher.roles)
        ? teacher.roles.map((r) => r.value || r.name || r)
        : [],
    });

    setEditingId(teacher.id);
    setIsOpen(true);
  };

  // DETAIL
  const handleDetail = (teacher) => {
    setSelectedTeacher(teacher);
    setIsDetailOpen(true);
  };

  // DELETE
  const handleDelete = async (id) => {
    const ok = await deleteTeacherApi(id);
    if (ok) reload();
  };

  // ADD NEW
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

  return (
    <div className="p-6">
      {/* SEARCH + FILTER + ADD (RESPONSIVE FIXED) */}
      <div
        className="
          flex flex-col gap-3 mb-5
          sm:flex-row sm:items-center sm:justify-between sm:gap-5
        "
      >
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <FilterDropdown
          category={category}
          openCategory={openCategory}
          setOpenCategory={setOpenCategory}
          openSubMenu={openSubMenu}
          setOpenSubMenu={setOpenSubMenu}
          religions={religions}
          categoryRef={categoryRef}
          handleCategorySelect={handleCategorySelect}
        />

        <DetailModal
          isDetailOpen={isDetailOpen}
          selectedTeacher={selectedTeacher}
          setIsDetailOpen={setIsDetailOpen}
        />

        <div className="flex-1"></div>

        <button
          onClick={handleAddNewTeacher}
          className="
    bg-[#3B82F6]
    w-full              /* mobile: full */
    sm:w-auto           /* desktop: auto */
    text-white px-4 py-2 rounded-[6px]
    hover:bg-blue-700 transition text-sm font-medium
    whitespace-nowrap flex-shrink-0
    flex items-center justify-center gap-1
  "
        >
          <span>+</span>
          Tambah Data
        </button>
      </div>

      {/* FORM */}
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

      {/* TABLE */}
      <TeacherTable
        currentTeachers={filterTeachers(Teacher)}
        openItemId={openItemId}
        setOpenItemId={setOpenItemId}
        handleDetail={handleDetail}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {/* PAGINATION */}
      <PaginationEmployee
        page={page}
        lastPage={meta.last_page}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
        onPageClick={(p) => setPage(p)}
      />
    </div>
  );
};
