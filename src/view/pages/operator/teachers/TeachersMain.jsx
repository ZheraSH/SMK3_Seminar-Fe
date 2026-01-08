"use client";

import React, { useState, useEffect, useMemo } from "react";
import { SearchBar } from "./components/SearchBar";
import { DetailModal } from "./components/TeacherDetailModal.jsx";
import { TeacherForm } from "./components/TeacherFormModal";
import { TeacherTable } from "./components/TeacherTable";
import { PaginationEmployee } from "./components/TeachersPagination";
import { useTeacher } from "../../../../Core/hooks/operator-hooks/employee/usePagination";
import { validateTeacherForm } from "./components/utils/validateTeacherForm";
import LoadingData from "../../../components/Loading/Data.jsx";
import {
  submitTeacherApi,
  deleteTeacherApi,
  fetchReligionsApi,
} from "../../../../Core/api/role-operator/employee/TeachersApi";
import { extractTeacherMasters } from "./components/utils/teacherMasterExtractor";
import { TeacherFilterDropdown } from "./components/FilterDropdown";
import DeleteConfirmModal from "../../../components/elements/deleteconfirm/DeleteConfirmModal";

export const TeacherMain = () => {
  const [religions, setReligions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null);

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

  const { Teacher, meta, page, setPage, reload, loading} = useTeacher();

  const [category, setCategory] = useState({
    type: "",
    value: "",
    label: "Pilih Kategori",
  });

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

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
      result = result.filter((t) =>
        t.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result;
  }, [teachersByFilter, searchTerm]);

  useEffect(() => {
    const loadReligions = async () => {
      const data = await fetchReligionsApi();
      setReligions(data);
    };
    loadReligions();
  }, []);

  const handleInput = (e) => {
    const { name, type, files, value } = e.target;

    if (type === "file") {
      setPost({ ...post, [name]: files[0] });
      return;
    }

    setPost({ ...post, [name]: value });
  };

  const handleRoleChange = (roleKey) => {
    setPost((prev) => {
      const currentRoles = [...prev.roles];
      const index = currentRoles.indexOf(roleKey);

      if (index > -1) {
        currentRoles.splice(index, 1);
      } else {
        currentRoles.push(roleKey);
      }

      return { ...prev, roles: currentRoles };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const frontendErrors = validateTeacherForm(post, editingId);

    if (Object.keys(frontendErrors).length > 0) {
      setErrors(frontendErrors);

      return;
    }

    try {
      const result = await submitTeacherApi(editingId, post);

      if (!result?.success) {
        setErrors(result?.errors || {});
        return;
      }

      setErrors({});
      setEditingId(null);
      setIsOpen(false);
      setShowRoleDropdown(false);
      reload();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan sistem. Coba lagi.");
    }
  };

  const handleEdit = (teacher) => {
    setPost({
      name: teacher.name || "",
      email: teacher.email || "",
      image: teacher.image,
      nik: teacher.nik || "",
      birth_place: teacher.birth.place || "",
      birth_date: teacher.birth.date || "",
      nip: teacher.nip || "",
      phone_number: teacher.phone_number || "",
      address: teacher.address || "",
      gender: teacher.gender.value || "",
      religion_id: teacher.religion.id || "",
      roles: teacher.roles?.map((r) => r.value) || [],
    });
    setEditingId(teacher.id);
    setIsOpen(true);
    setShowRoleDropdown(false);
  };

  const handleDetail = (teacher) => {
    setSelectedTeacher(teacher);
    setIsDetailOpen(true);
  };

  const askDeleteTeacher = (id) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteTeacherApi(deleteId);
      reload();
    } catch (e) {
      console.error(e);
    } finally {
      setDeleteId(null);
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
    setErrors({});
    setIsOpen(true);
    setShowRoleDropdown(false);
  };

  const handleResetAll = () => {
    setCategory({
      type: "",
      value: "",
      label: "Pilih Kategori",
    });
    setSearchTerm("");
  };

  if (loading) {
    return <LoadingData loading={loading} />;
  }

  return (
    <div className="p-6">
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

            <button
              onClick={handleAddNewTeacher}
              className="bg-[#3B82F6] text-white px-4 py-2 rounded-[6px] hover:bg-blue-700 transition text-sm font-medium whitespace-nowrap"
            >
              + Tambah Guru
            </button>
          </div>
        </div>
      </div>

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
        handleRoleChange={handleRoleChange}
        handleSubmit={handleSubmit}
        showRoleDropdown={showRoleDropdown}
        setShowRoleDropdown={setShowRoleDropdown}
      />

      {/* TABLE */}
      <TeacherTable
        currentTeachers={filteredTeachers}
        openItemId={openItemId}
        setOpenItemId={setOpenItemId}
        handleDetail={handleDetail}
        handleEdit={handleEdit}
        handleDelete={askDeleteTeacher}
      />

      {/* PAGINATION */}
      <PaginationEmployee
        page={page}
        lastPage={meta.last_page}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
        onPageClick={(p) => setPage(p)}
      />

      <DeleteConfirmModal
        open={deleteId !== null}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};
