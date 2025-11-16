"use client";

import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { validateTeacherForm } from "./components/utils/validateTeacherForm";
import {
  submitTeacherApi,
  deleteTeacherApi,
  fetchTeachersApi,
  fetchReligionsApi,
} from "../../../../Core/api/employee/TeachersApi";
import { useTeacherFilters } from "../../../../Core/hooks/employee/useTeacherFilters";
import { SearchBar } from "./components/SearchBar";
import { FilterDropdown } from "./components/FilterDropdown";
import { DetailModal } from "./components/TeacherDetailModal.jsx.jsx";
import { TeacherForm } from "./components/TeacherFormModal";
import { TeacherTable } from "./components/TeacherTable";
import { Pagination } from "./components/TeachersPagination";

export const TeacherMain = () => {
  const [allTeachers, setAllTeachers] = useState([]);
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
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    searchTerm,
    setSearchTerm,
    openCategory,
    setOpenCategory,
    openSubMenu,
    setOpenSubMenu,
    category,
    setCategory,
    currentFilter,
    setCurrentFilter,
    categoryRef,
    handleCategorySelect,
    filterTeachers,
  } = useTeacherFilters();

  const fetchTeachers = async (page = 1) => {
    const data = await fetchTeachersApi(page);
    setAllTeachers(data);
    return data;
  };

  useEffect(() => {
    fetchTeachers();
    const loadReligions = async () => {
      const data = await fetchReligionsApi();
      setReligions(data);
    };
    loadReligions();
  }, []);

  const handleInput = (e) => {
    const { name, type, files, value } = e.target;
    if (name === "roles") {
      setPost({
        ...post,
        roles: [value],
      });
    } else {
      setPost({
        ...post,
        [name]: type === "file" ? files[0] : value,
      });
    }
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
    fetchTeachers();

    if (!editingId) {
      setTimeout(() => {
        const totalItems = allTeachers.length + 1;
        const newTotalPages = Math.ceil(totalItems / rowsPerPage);
        setCurrentPage(newTotalPages);
      }, 100);
    }
  };

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
        ? teacher.roles.map((r) => ({
            value: r.value || r.name || r,
            label: r.label || r.name || r,
          }))
        : [],
    });
    setEditingId(teacher.id);
    setIsOpen(true);
  };

  const handleDetail = (teacher) => {
    setSelectedTeacher(teacher);
    setIsDetailOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await deleteTeacherApi(id);
    if (result) {
      fetchTeachers();
    }
  };

  const filteredTeachers = filterTeachers(allTeachers);
  const totalPages = Math.ceil(filteredTeachers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentTeachers = filteredTeachers.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-5 gap-5">
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
          className="bg-[#3B82F6] text-white px-4 py-2 rounded-[6px] hover:bg-blue-700 transition text-sm font-medium whitespace-nowrap flex-shrink-0 w-[140px] flex items-center justify-center gap-1"
        >
          <span>+</span>
          Tambah Data
        </button>
      </div>

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

      <TeacherTable
        currentTeachers={currentTeachers}
        openItemId={openItemId}
        setOpenItemId={setOpenItemId}
        handleDetail={handleDetail}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
