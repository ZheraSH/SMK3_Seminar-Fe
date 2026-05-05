"use client";

import { useState, useEffect, useMemo } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FormModal } from "./components/form-modal";
import { DetailModal } from "./components/detail-modal";
import DeleteConfirmModal from "@elements/modaldelete/modal-delete";
import {
  fetchStudents,
  fetchReligions,
  submitStudent,
  deleteStudent,
  fetchMajors,
  fetchlevelclasses,
  getAllStudents,
} from "@services/role-operator/student/student-api";
import { getAllClasses } from "@services/role-operator/class-major/class-api";
import { StudentsTable } from "./components/student-table";
import { PaginationStudent } from "./components/pagination-student";
import { SearchFilterStudent } from "./components/search-student";
import { StudentFilterDropdown } from "./components/filter-dropdown-student";
import { useStudentFilter } from "@core/hooks/operator/student/use-student-filter";
import LoadingData from "@elements/loading-data/loading";

export default function StudentPage() {
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
    religion_id: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [allMajors, setAllMajors] = useState([]);
  const [allLevels, setAllLevels] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [allStudentsForFilter, setAllStudentsForFilter] = useState([]);
  const [localPage, setLocalPage] = useState(1);
  const itemsPerPage = 15;

  const loadReligionsData = async () => {
    try {
      const religionsData = await fetchReligions();
      setReligions(religionsData);
    } catch (err) {
      console.error(err);
    }
  };

  const loadFilterMasters = async () => {
    try {
      const [majorsData, levelsData, classesData, allStudentsData] = await Promise.all([
        fetchMajors(),
        fetchlevelclasses(),
        getAllClasses(),
        getAllStudents()
      ]);
      setAllMajors(majorsData || []);
      setAllLevels(levelsData || []);
      setAllClasses(classesData || []);
      setAllStudentsForFilter(allStudentsData || []);
    } catch (err) {
      console.error("Gagal load masters:", err);
    }
  };

  const {
    category,
    setCategory,
    resetFilter,
  } = useStudentFilter([]);

  const loadStudentsData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const filters = {
        gender: category.type === "gender" ? category.value : "",
        major: category.type === "major" ? category.value : "",
        level_class: category.type === "level_class" ? category.value : "",
        classroom: "",
      };

      const res = await fetchStudents(page, searchTerm, filters);
      setStudents(res.data || []);
      setMeta(res.meta || { current_page: 1, last_page: 1, total: 0 });
    } catch (err) {
      console.error(err);
      setStudents([]);
    } finally {
      if (showLoading) {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadStudentsData(searchTerm === "" && !category.type);
  }, [page, searchTerm, category]);

  useEffect(() => {
    loadReligionsData();
    loadFilterMasters();
  }, []);

  const masters = useMemo(() => {
    return {
      genders: [
        { value: "male", label: "Laki-laki" },
        { value: "female", label: "Perempuan" },
      ],
      majors: allMajors.map(m => ({ value: m.name, label: m.name })),
      levelClasses: allLevels.map(l => ({ value: l.name, label: l.name })),
    };
  }, [allMajors, allLevels]);

  const isLocalOnly = useMemo(() => {
    return ["gender", "level_class"].includes(category.type);
  }, [category.type]);

  const { filteredStudents, localMeta } = useMemo(() => {
    if (isLocalOnly) {
      let filtered = [...allStudentsForFilter];

      if (category.type === "gender") {
        filtered = filtered.filter(
          (s) => s.gender?.value?.toLowerCase() === category.value?.toLowerCase()
        );
      }

      if (category.type === "level_class") {
        filtered = filtered.filter(
          (s) => s.classroom?.name?.split(" ")[0] === category.value
        );
      }

      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        filtered = filtered.filter((s) =>
          (s.name || "").toLowerCase().includes(search) ||
          (s.nisn || "").toLowerCase().includes(search) ||
          (s.classroom?.name || "").toLowerCase().includes(search)
        );
      }

      const total = filtered.length;
      const lastPage = Math.ceil(total / itemsPerPage) || 1;
      const start = (localPage - 1) * itemsPerPage;
      const sliced = filtered.slice(start, start + itemsPerPage);

      return {
        filteredStudents: sliced,
        localMeta: {
          current_page: localPage,
          last_page: lastPage,
          total: total,
          per_page: itemsPerPage,
        },
      };
    }

    return {
      filteredStudents: students,
      localMeta: meta,
    };
  }, [students, allStudentsForFilter, category, localPage, meta, isLocalOnly, searchTerm]);

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
    setIsSubmitting(true);

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
          religion_id: "",
        });

        setEditingId(null);
        setPage(1);
        loadStudentsData();
        loadFilterMasters();
        setIsOpen(false);
      } else {
        if (res.errors) {
          setErrors(res.errors);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
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
      religion_id: student.religion_id || student.religion?.id || "",
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
      loadFilterMasters();
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
    setLocalPage(1);
  };

  return (
    <div className="">
      {loading ?
        (<LoadingData loading={loading} type="create" />)
        : (
          <div className="flex flex-col gap-3 mb-5">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="flex flex-row  gap-3 w-full items-start sm:items-center">
                <SearchFilterStudent
                  searchTerm={searchTerm}
                  onSearchChange={(value) => {
                    setPage(1);
                    setLocalPage(1);
                    setSearchTerm(value);
                  }}
                />

                <div className=" hidden md:block">
                  <StudentFilterDropdown
                    category={category}
                    setCategory={(cat) => {
                      setPage(1);
                      setLocalPage(1);
                      setCategory(cat);
                    }}
                    masters={masters}
                  />
                </div>

                <button
                  onClick={() => {
                    setEditingId(null);
                    setIsOpen(true);
                  }}
                  className="bg-[#3B82F6] text-white block md:hidden px-3 py-1 items-center md:px-4 md:py-2 flex gap-1 rounded-full md:rounded-[6px] hover:bg-blue-700 transition text-2xl md:text-sm font-medium whitespace-nowrap"
                >
                  + <span className=" hidden">Tambah Siswa</span>
                </button>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
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
                  className="bg-[#3B82F6] text-white hidden md:block px-4 py-2 rounded-[6px] hover:bg-blue-700 transition text-sm font-medium w-full sm:w-auto whitespace-nowrap"
                >
                  + Tambah Siswa
                </button>
                <div className=" block md:hidden w-full">
                  <StudentFilterDropdown
                    category={category}
                    setCategory={(cat) => {
                      setPage(1);
                      setLocalPage(1);
                      setCategory(cat);
                    }}
                    masters={masters}
                  />
                </div>

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
        isSubmitting={isSubmitting}
      />

      {loading ? (<LoadingData loading={loading} type="tableSiswaKaryawan" count={10} />)
        : (
          <>
            <StudentsTable
              students={filteredStudents}
              startIndex={(localMeta.current_page - 1) * (localMeta.per_page || itemsPerPage)}
              onDetail={handleDetail}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <PaginationStudent
              page={isLocalOnly ? localPage : page}
              lastPage={localMeta.last_page}
              onPrev={() =>
                isLocalOnly
                  ? setLocalPage((p) => Math.max(1, p - 1))
                  : setPage(page - 1)
              }
              onNext={() =>
                isLocalOnly
                  ? setLocalPage((p) => Math.min(localMeta.last_page, p + 1))
                  : setPage(page + 1)
              }
              onPageClick={(p) =>
                isLocalOnly ? setLocalPage(p) : setPage(p)
              }
            />
          </>
        )}

    </div>
  );
};

