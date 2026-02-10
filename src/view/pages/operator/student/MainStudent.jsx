"use client";

import { useState, useEffect, useCallback } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FormModal } from "./components/FormModal";
import { DetailModal } from "./components/DetailModal";
import DeleteConfirmModal from "../../../components/elements/modaldelete/ModalDelete";
import {
  fetchStudents,
  fetchReligions,
  submitStudent,
  deleteStudent,
} from "@/Core/api/role-operator/student/StudentApi";
import { StudentsTable } from "./components/StudentTable";
import { PaginationStudent } from "./components/Pagination";
import { SearchFilterStudent } from "./components/Search";
import { StudentFilterDropdown } from "./components/FilterDroopDownStudent";
import { useStudentFilter } from "../../../../Core/hooks/operator-hooks/student/useStudentFilter";
import LoadingData from "../../../components/elements/loadingData/loading";

export const MainStudent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [religions, setReligions] = useState([]);
  const [post, setPost] = useState({
    name: "",
    email: "",
    image: null,
    nisn: "",
    birth_place: "",
    birth_date: "",
    number_kk: "",
    number_akta: "",
    order_child: "",
    count_siblings: "",
    address: "",
    gender: "",
    religion_id: 1,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [loading, setLoading] = useState(false); // Added loading state

  // Move the useStudentFilter hook call here, inside the component
  const { category, setCategory, masters, appliedFilters, resetFilter } =
    useStudentFilter();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadReligionsData = async () => {
    try {
      const religionsData = await fetchReligions();
      setReligions(religionsData);
    } catch (err) {
      console.error(err);
    }
  };

  const loadStudentsData = async () => {
    setLoading(true);
    try {
      // Pass appliedFilters to fetchStudents if your API supports filtering
      const res = await fetchStudents(page, searchTerm, appliedFilters);
      setStudents(res.data || []);
      setMeta(res.meta || { current_page: 1, last_page: 1, total: 0 });
    } catch (err) {
      console.error(err);
      setStudents([]);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  }, [page, searchTerm, appliedFilters]);

  useEffect(() => {
    loadStudentsData();
  }, [loadStudentsData]);

  useEffect(() => {
    loadReligionsData();
  }, []);

  const handleInput = (e) => {
    const { name, type, files, value } = e.target;
    setPost({ ...post, [name]: type === "file" ? files[0] : value });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    try {
      const res = await submitStudent(post, editingId);

      if (res.success) {
        setPost({
          name: "",
          email: "",
          image: null,
          nisn: "",
          birth_place: "",
          birth_date: "",
          number_kk: "",
          number_akta: "",
          order_child: "",
          count_siblings: "",
          address: "",
          gender: "",
          religion_id: 1,
        });

        setEditingId(null);
        setPage(1);
        loadStudentsData();
        setIsOpen(false);
      } else {
        if (res.errors) {
          setErrors(res.errors);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };



  const handleEdit = (student) => {
    setPost({
      name: student.name || "",
      email: student.email || "",
      image: null,
      nisn: student.nisn || "",
      birth_place: student.birth_place || "",
      birth_date: student.birth_date || "",
      number_kk: student.number_kk || "",
      number_akta: student.number_akta || "",
      order_child: student.order_child || "",
      count_siblings: student.count_siblings || "",
      address: student.address || "",
      gender: student.gender.value || "",
      religion_id: student.religion_id || student.religion?.id || 1,
    });

    setEditingId(student.id);
    setIsOpen(true);
  };

  const handleDetail = (student) => {
    setSelectedStudent(student);
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
      await deleteStudent(deleteId);
      loadStudentsData();
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleResetAll = () => {
    resetFilter();
    setSearchTerm("");
    setPage(1);
  };

  return (
    <div className="">
      {loading ?
        (<LoadingData loading={loading} type="create" />)
        : (
          <div className="flex flex-col gap-3 mb-5">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row  gap-3 w-full items-start sm:items-center">
                <SearchFilterStudent
                  searchTerm={searchTerm}
                  onSearchChange={(value) => {
                    setPage(1);
                    setSearchTerm(value);
                  }}
                />

                <StudentFilterDropdown
                  category={category}
                  setCategory={setCategory}
                  masters={masters}
                />
              </div>

              <div className="flex gap-3">
                <DetailModal
                  isOpen={isDetailOpen}
                  onClose={() => setIsDetailOpen(false)}
                  student={selectedStudent}
                />

                <DeleteConfirmModal
                  isOpen={showDeleteModal}
                  onClose={() => setShowDeleteModal(false)}
                  onConfirm={confirmDelete}
                  title="Hapus Siswa?"
                  message="Apakah Anda yakin ingin menghapus data siswa ini? Tindakan ini tidak dapat dibatalkan."
                  loading={deleteLoading}
                />

                <button
                  onClick={() => {
                    setEditingId(null);
                    setIsOpen(true);
                  }}
                  className="bg-[#3B82F6] text-white px-4 py-2 rounded-[6px] hover:bg-blue-700 transition text-sm font-medium w-full sm:w-auto whitespace-nowrap"
                >
                  + Tambah Siswa
                </button>
              </div>
            </div>
          </div>
        )}

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        post={post}
        onInputChange={handleInput}
        editingId={editingId}
        errors={errors}
        religions={religions}
      />

      {loading ? (<LoadingData loading={loading} type="tableSiswaKaryawan" count={10} />)
        : (
          <>
            <StudentsTable
              students={filteredStudents}
              onDetail={handleDetail}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <PaginationStudent
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
