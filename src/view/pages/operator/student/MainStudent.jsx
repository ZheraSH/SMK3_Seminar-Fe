"use client";

import { useState, useEffect, useCallback } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FormModal } from "./components/FormModal";
import { DetailModal } from "./components/DetailModal";
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
import DeleteConfirmModal from "../../../components/elements/deleteconfirm/DeleteConfirmModal";
import LoadingData from "../../../components/Loading/Data";

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

  const loadReligionsData = async () => {
    try {
      const religionsData = await fetchReligions();
      setReligions(religionsData);
    } catch (err) {
      console.error(err);
    }
  };

  const loadStudentsData = useCallback(async () => {
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
      setLoading(false);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const frontendErrors = validateForm();
    if (Object.keys(frontendErrors).length > 0)
      return setErrors(frontendErrors);

    setErrors({});

    try {
      await submitStudent(post, editingId);

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
      await loadStudentsData();
      setIsOpen(false);
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!post.name) newErrors.name = ["Nama wajib diisi."];
    if (!post.email) newErrors.email = ["Email wajib diisi."];
    if (!post.gender) newErrors.gender = ["Jenis kelamin wajib dipilih."];
    if (!post.nisn) newErrors.nisn = ["NISN wajib diisi."];
    if (!post.birth_place)
      newErrors.birth_place = ["Tempat lahir wajib diisi."];
    if (!post.birth_date) newErrors.birth_date = ["Tanggal lahir wajib diisi."];
    if (!post.address) newErrors.address = ["Alamat wajib diisi."];
    if (!post.religion_id) newErrors.religion_id = ["Agama wajib dipilih."];
    return newErrors;
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
      gender: student.gender?.value || student.gender || "",
      religion_id: student.religion_id || student.religion?.id || 1,
    });

    setEditingId(student.id);
    setIsOpen(true);
  };

  const handleDetail = (student) => {
    setSelectedStudent(student);
    setIsDetailOpen(true);
  };

  const askDeleteStudent = (id) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteStudent(deleteId);
      await loadStudentsData();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteId(null);
    }
  };

  const handleResetAll = () => {
    resetFilter();
    setSearchTerm("");
    setPage(1);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col gap-3 mb-5">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 w-full items-start sm:items-center">
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

            <div className=""></div>
          </div>

          <div className="flex gap-3 items-center">
            {/* Detail Modal */}
            <DetailModal
              isOpen={isDetailOpen}
              onClose={() => setIsDetailOpen(false)}
              student={selectedStudent}
            />

            {/* Tambah Data */}
            <button
              onClick={() => {
                setEditingId(null);
                setIsOpen(true);
              }}
              className="bg-[#3B82F6] text-white px-4 py-2 rounded-[6px] hover:bg-blue-700 transition text-sm font-medium whitespace-nowrap"
            >
              + Tambah Siswa
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Memuat data...</p>
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

      {!loading && (
        <>
          <StudentsTable
            students={students}
            onDetail={handleDetail}
            onEdit={handleEdit}
            onDelete={askDeleteStudent}
          />

          {meta.last_page > 1 && (
            <PaginationStudent
              page={page}
              lastPage={meta.last_page}
              onPrev={() => setPage((prev) => Math.max(1, prev - 1))}
              onNext={() =>
                setPage((prev) => Math.min(meta.last_page, prev + 1))
              }
              onPageClick={(p) => setPage(p)}
            />
          )}
        </>
      )}

      <DeleteConfirmModal
        open={deleteId !== null}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};
