"use client";

import React, { useState, useEffect, useMemo } from "react";
import { SearchBar } from "./components/search-bar";
import { DetailModal } from "./components/teacher-detail-modal";
import { TeacherForm } from "./components/teacher-form-modal";
import { TeacherTable } from "./components/teacher-table";
import { PaginationEmployee } from "./components/teachers-pagination";
import { useTeacher } from "@core/hooks/operator/employee/use-pagination";
import { validateTeacherForm } from "./components/utils/validate-teacher-form";

import {
  submitTeacherApi,
  deleteTeacherApi,
  fetchReligionsApi,
} from "@services/role-operator/employee/teachers-api";
import { getTeachers } from "@services/role-operator/class-major/class-api";
import { extractTeacherMasters } from "./components/utils/teacher-master-extractor";
import { TeacherFilterDropdown } from "./components/filter-dropdown";
import LoadingData from "@elements/loading-data/loading";
import DeleteConfirmModal from "@elements/modaldelete/modal-delete";

export default function TeachersPage() {
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
  const [allTeachersForMasters, setAllTeachersForMasters] = useState([]);
  const [localPage, setLocalPage] = useState(1);
  const itemsPerPage = 15;

  const [category, setCategory] = useState({
    type: "",
    value: "",
    label: "Pilih Kategori",
  });

  const { Teacher, meta, page, setPage, reload } = useTeacher(
    searchTerm,
    category.type === "role" ? category.value : "",
    category.type === "gender" ? category.value : "",
    category.type === "subjects" ? category.value : ""
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const masters = useMemo(() => {
    const extracted = extractTeacherMasters(allTeachersForMasters);
    return {
      ...extracted,
      genders: [
        { value: "male", label: "Laki-laki" },
        { value: "female", label: "Perempuan" },
      ]
    };
  }, [allTeachersForMasters]);

  const { filteredTeachers, localMeta } = useMemo(() => {
    const isLocalOnly = category.type === "gender" || category.type === "subjects";

    if (isLocalOnly) {
      const filtered = allTeachersForMasters.filter((t) => {
        if (category.type === "gender") {
          return (
            t.gender?.value?.toLowerCase() === category.value?.toLowerCase()
          );
        }
        if (category.type === "subjects") {
          return t.subjects?.some(
            (s) => String(s.id) === String(category.value)
          );
        }
        return true;
      });

      const total = filtered.length;
      const lastPage = Math.ceil(total / itemsPerPage) || 1;
      const start = (localPage - 1) * itemsPerPage;
      const sliced = filtered.slice(start, start + itemsPerPage);

      return {
        filteredTeachers: sliced,
        localMeta: {
          current_page: localPage,
          last_page: lastPage,
          total: total,
        },
      };
    }

    return {
      filteredTeachers: Teacher,
      localMeta: meta,
    };
  }, [Teacher, allTeachersForMasters, category, localPage, meta]);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [religionsData, allTeachersData] = await Promise.all([
          fetchReligionsApi(),
          getTeachers()
        ]);
        setReligions(religionsData);
        setAllTeachersForMasters(allTeachersData);
      } catch (error) {
        console.error("Gagal memuat data awal:", error);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    loadInitialData();
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

    setIsSubmitting(true);
    const result = await submitTeacherApi(editingId, post);
    setIsSubmitting(false);
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
    setPage(1);
    setLocalPage(1);
  };

  return (
    <div className="">
      {loading ?
        (<LoadingData loading={loading} type="create" />)
        : (
          <div className="flex flex-col gap-3 mb-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex flex-row gap-3 w-full items-stretch sm:items-center">
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={(v) => {
                    setSearchTerm(v);
                    setPage(1);
                  }}
                />

                <div className=" hidden md:block">
                  <TeacherFilterDropdown
                    category={category}
                    setCategory={(cat) => {
                      setCategory(cat);
                      setPage(1);
                      setLocalPage(1);
                    }}
                    masters={masters}
                  />
                </div>
                <div className=" block md:hidden">
                  <button
                    onClick={handleAddNewTeacher}
                    className="bg-[#3B82F6] text-white px-3 py-1 items-center md:px-4 md:py-2 flex gap-1 rounded-full md:rounded-[6px] hover:bg-blue-700 transition text-2xl md:text-sm font-medium whitespace-nowrap"
                  >
                    + <span className=" hidden md:block"> Tambah Guru</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
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

               

                <div className=" block md:hidden w-full">
                    <TeacherFilterDropdown
                    category={category}
                    setCategory={(cat) => {
                      setCategory(cat);
                      setPage(1);
                      setLocalPage(1);
                    }}
                    masters={masters}
                  />
                </div>
                
                <button
                  onClick={handleAddNewTeacher}
                  className="bg-[#3B82F6] hidden md:block text-white px-4 py-2 rounded-[6px] hover:bg-blue-700 transition text-sm font-medium whitespace-nowrap"
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
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
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
              page={
                category.type === "gender" || category.type === "subjects"
                  ? localPage
                  : page
              }
              lastPage={localMeta.last_page}
              onPrev={() =>
                category.type === "gender" || category.type === "subjects"
                  ? setLocalPage((p) => Math.max(1, p - 1))
                  : setPage(page - 1)
              }
              onNext={() =>
                category.type === "gender" || category.type === "subjects"
                  ? setLocalPage((p) => Math.min(localMeta.last_page, p + 1))
                  : setPage(page + 1)
              }
              onPageClick={(p) =>
                category.type === "gender" || category.type === "subjects"
                  ? setLocalPage(p)
                  : setPage(p)
              }
            />
          </>
        )}
    </div>
  );
};

