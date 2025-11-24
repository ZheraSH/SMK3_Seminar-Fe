"use client";
import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { SearchFilter } from "./components/Search-Filter";
import { FormModal } from "./components/FormModal";
import { DetailModal } from "./components/DetailModal";
import { StudentsTable } from "./components/StudentTable";

import {
  fetchStudents,
  fetchlevelclasses,
  fetchMajors,
  fetchReligions,
  submitStudent,
  deleteStudent,
} from "../../../../Core/api/student/StudentApi";
import { PaginationStudent } from "./components/Pagination";


export const MainStudent = () => {
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState("");
  const [category, setCategory] = useState("Pilih Kategori");

  const [isOpen, setIsOpen] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);

  // DATA
  const [students, setStudents] = useState([]);
  const [majors, setMajors] = useState([]);
  const [levelclasses, setLevelclasses] = useState([]);
  const [religions, setReligions] = useState([]);

  // FORM
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
    religion_id: 1,
  });

  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  // DETAIL
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // SEARCH & PAGINATION API
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;
  const startIndex = (page - 1) * perPage;
  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  // FETCH DATA

  const loadOtherData = async () => {
    try {
      const [religionsData, majorsData, levelclassesData] = await Promise.all([
        fetchReligions(),
        fetchMajors(),
        fetchlevelclasses(),
      ]);

      setReligions(religionsData);
      setMajors(majorsData);
      setLevelclasses(levelclassesData);
    } catch (err) {
      console.error("Gagal load lainnya:", err);
    }
  };

  // HANDLE FORM INPUT
  const handleInput = (e) => {
    const { name, type, files, value } = e.target;
    setPost({
      ...post,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const frontendErrors = validateForm();
    if (Object.keys(frontendErrors).length > 0) {
      setErrors(frontendErrors);
      return;
    }

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
        religion_id: 1,
      });

      setEditingId(null);

      // Refresh data dari page terakhir
      setPage(1);
      loadStudents();

      setIsOpen(false);
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };

  // EDIT
  const handleEdit = (student) => {
    let normalizedGender = student.gender || "";

    if (student.gender === "L" || student.gender === "laki-laki")
      normalizedGender = "male";
    if (student.gender === "P" || student.gender === "perempuan")
      normalizedGender = "female";

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
      religion_id: student.religion_id || "",
      gender: normalizedGender || "",
      majors: student.major?.id || "",
      levelclasses: student.levelclass?.id || "",
    });

    setEditingId(student.id);
    setIsOpen(true);
  };

  const handleDetail = (student) => {
    setSelectedStudent(student);
    setIsDetailOpen(true);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus siswa ini?")) return;
    try {
      await deleteStudent(id);
      loadStudents();
    } catch (err) {
      console.error(err);
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
    if (!post.number_kk) newErrors.number_kk = ["No KK wajib diisi."];
    if (!post.number_akta) newErrors.number_akta = ["No Akta wajib diisi."];
    if (!post.order_child) newErrors.order_child = ["Anak ke wajib diisi."];
    if (!post.count_siblings)
      newErrors.count_siblings = ["Jumlah saudara wajib diisi."];
    if (!post.address) newErrors.address = ["Alamat wajib diisi."];
    if (!post.religion_id) newErrors.religion_id = ["Agama wajib dipilih."];
    if (!post.majors) newErrors.majors = ["Jurusan wajib dipilih."];
    if (!post.levelclasses)
      newErrors.levelclasses = ["Tingkatan wajib dipilih."];
    return newErrors;
  };

  const [currentFilter, setCurrentFilter] = useState({ type: null, value: null });

  const loadStudents = async () => {
    try {
      const filters = {};
      if (currentFilter.type && currentFilter.value) {
        filters[currentFilter.type] = currentFilter.value;
      }
      const res = await fetchStudents(page, searchTerm, filters);
      setStudents(res.data);
      setMeta(res.meta);
    } catch (err) {
      console.error("Gagal load students:", err);
    }
  };
  

  useEffect(() => {
    loadStudents();
  }, [page, searchTerm, currentFilter]); // <- penting

  useEffect(() => {
    loadOtherData();
  }, []);

  
  return (
    <div className="p-6">
      {/* SEARCH */}
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={(v) => {
          setPage(1);
          setSearchTerm(v);
        }}
        openCategory={openCategory}
        onOpenCategory={setOpenCategory}
        openSubMenu={openSubMenu}
        onOpenSubMenu={setOpenSubMenu}
        category={category}
        onCategorySelect={(selected) => {
          setCategory(selected);
        
          if (selected === "Semua Kategori") {
            setCurrentFilter({ type: null, value: null });
          } else if (selected.startsWith("Gender: ")) {
            const label = selected.split(": ")[1]; // "Laki-laki" atau "Perempuan"
            const value = label === "Laki-laki" ? "male" : "female"; // mapping
            setCurrentFilter({ type: "gender", value });
          } else if (selected.startsWith("majors: ")) {
            setCurrentFilter({ type: "majors", value: selected.split(": ")[1] });
          } else if (selected.startsWith("levelclasses: ")) {
            setCurrentFilter({ type: "levelclasses", value: selected.split(": ")[1] });
          }
        }}
        
        onAddData={() => {
          setEditingId(null);
          setIsOpen(true);
        }}
      />


      {/* DETAIL */}
      <DetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        student={selectedStudent}
      />

      {/* FORM */}
      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        post={post}
        onInputChange={handleInput}
        editingId={editingId}
        errors={errors}
        religions={religions}
        majors={majors}
        levelclasses={levelclasses}
      />

      {/* TABLE */}
      <StudentsTable
        students={students}
        startIndex={startIndex}
        onDetail={handleDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* PAGINATION BUTTONS */}
      <PaginationStudent
        page={page}
        lastPage={meta.last_page}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
        onPageClick={(p) => setPage(p)}
      />
    </div>
  );
};
