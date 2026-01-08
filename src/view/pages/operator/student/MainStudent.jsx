"use client";

import { useState, useEffect, useMemo } from "react";
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
import LoadingData from "../../../components/Loading/Data"

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
  const [loading, setLoading] = useState(false);

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
      await new Promise(resolve => setTimeout(resolve, 500));
      const res = await fetchStudents(page, searchTerm);
      setStudents(res.data || []);
      setMeta(res.meta || { current_page: 1, last_page: 1, total: 0 });
    } catch (err) {
      console.error(err);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudentsData();
  }, [page, searchTerm]);

  useEffect(() => {
    loadReligionsData();
  }, []);

  const {
    category,
    setCategory,
    masters,
    filteredStudents: studentsByFilter,
    resetFilter,
  } = useStudentFilter(students);

  const filteredStudents = useMemo(() => {
    let result = studentsByFilter;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((student) => {
        if (student.name?.toLowerCase().includes(searchLower)) return true;

        const nisnString = student.nisn ? student.nisn.toString() : "";
        if (nisnString.toLowerCase().includes(searchLower)) return true;

        if (student.classroom?.name?.toLowerCase().includes(searchLower))
          return true;

        if (student.classroom?.level_class?.toLowerCase().includes(searchLower))
          return true;

        if (student.classroom?.major?.toLowerCase().includes(searchLower))
          return true;

        const level = student.classroom?.level_class || "";
        const major = student.classroom?.major || "";
        const fullClass = `${level} ${major}`.toLowerCase().trim();
        if (fullClass.includes(searchLower)) return true;

        return false;
      });
    }

    return result;
  }, [studentsByFilter, searchTerm]);

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
      loadStudentsData();
      setIsOpen(false);
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!post.name) newErrors.name = ["Nama wajib diisi."];
    if (!post.email) newErrors.email = ["Email wajib diisi."];
    if (!post.gender) newErrors.gender = ["Jenis kelamin wajib dipilih."];
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

  const askDeleteStudent = (id) => {
    setDeleteId(id);
  };

  const handleDelete = async (id) => {
    if (!deleteId) return;

    try {
      await deleteStudent(deleteId);
      loadStudentsData();
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

  if( loading ){
    return (<LoadingData loading={loading} />);
   }

  return (
    <div className="p-6">
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
            {/* Detail Modal */}
            <DetailModal
              isOpen={isDetailOpen}
              onClose={() => setIsDetailOpen(false)}
              student={selectedStudent}
            />

            {/*Tambah Data */}
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

      {/* FORM MODAL */}
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

      {/* TABLE */}
      <StudentsTable
        students={filteredStudents}
        onDetail={handleDetail}
        onEdit={handleEdit}
        onDelete={askDeleteStudent}
      />

      {/* PAGINATION */}
      <PaginationStudent
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
