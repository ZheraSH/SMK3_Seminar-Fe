"use client";
import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { SearchFilter } from "./components/Search-Filter";
import { FormModal } from "./components/FormModal";
import { DetailModal } from "./components/DetailModal";
import { StudentsTable } from "./components/StudentTable";
import { Pagination } from "./components/Pagination";
import {
  fetchStudents,
  fetchlevelclasses,
  fetchMajors,
  fetchReligions,
  submitStudent,
  deleteStudent,
} from "../../../../Core/api/student/StudentApi";

export const MainStudent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [Majors, setMajors] = useState([]);
  const [levelclasses, setlevelclasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState("");
  const [category, setCategory] = useState("Pilih Kategori");
  const [errors, setErrors] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
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
  const [religions, setReligions] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [studentsData, religionsData, majorsData, levelclassesData] =
          await Promise.all([
            fetchStudents(),
            fetchReligions(),
            fetchMajors(),
            fetchlevelclasses(),
          ]);

        setStudents(studentsData);
        setAllStudents(studentsData);
        setReligions(religionsData);
        setMajors(majorsData);
        setlevelclasses(levelclassesData);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    loadData();
  }, []);

  // Handle input
  const handleInput = (e) => {
    const { name, type, files, value } = e.target;
    setPost({
      ...post,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Tambah atau update data
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
        religion_id: "",
        gender: "",
        majors: "",
        levelclasses: "",
      });
      setEditingId(null);
      const updatedStudents = await fetchStudents();
      setStudents(updatedStudents);
      setAllStudents(updatedStudents);

      if (!editingId) {
        setTimeout(() => {
          const totalItems = updatedStudents.length;
          const newTotalPages = Math.ceil(totalItems / rowsPerPage);
          setCurrentPage(newTotalPages);
        }, 100);
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.log("⚠️ Tidak ada field 'errors' di response");
      }
    }
  };

  // Edit
  const handleEdit = (student) => {
    console.log("🔍 Student data for edit:", student);
    let normalizedGender = student.gender || "";

    if (student.gender === "L" || student.gender === "laki-laki") {
      normalizedGender = "male";
    } else if (student.gender === "P" || student.gender === "perempuan") {
      normalizedGender = "female";
    }

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

  // Tampilkan modal detail
  const handleDetail = (student) => {
    setSelectedStudent(student);
    setIsDetailOpen(true);
  };

  // Hapus
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus siswa ini?")) return;
    try {
      await deleteStudent(id);
      const updatedStudents = await fetchStudents();
      setStudents(updatedStudents);
      setAllStudents(updatedStudents);
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

  // Filter pencarian dan kategori
  const [currentFilter, setCurrentFilter] = useState({
    type: null,
    value: null,
  });

  const filteredStudents = allStudents.filter((student) => {
    const keyword = searchTerm.toLowerCase();
    const matchesSearch =
      student.name?.toLowerCase().includes(keyword) ||
      student.nisn?.toLowerCase().includes(keyword) ||
      student.gender?.toLowerCase().includes(keyword);

    let matchesFilter = true;
    if (currentFilter.type && currentFilter.value) {
      switch (currentFilter.type) {
        case "gender":
          matchesFilter =
            student.gender?.toLowerCase() === currentFilter.value.toLowerCase();
          break;
        case "majors":
          matchesFilter =
            student.majors?.toLowerCase() === currentFilter.value.toLowerCase();
          break;
        case "levelclasses":
          matchesFilter =
            student.levelclasses?.toLowerCase() ===
            currentFilter.value.toLowerCase();
          break;
        default:
          matchesFilter = true;
      }
    }

    return matchesSearch && matchesFilter;
  });

  // Handle filter
  const handleCategorySelect = (selected) => {
    setCategory(selected);
    setOpenCategory(false);
    setOpenSubMenu("");

    if (selected === "Semua Kategori") {
      setCurrentFilter({ type: null, value: null });
      return;
    }

    let filterType = null;
    let filterValue = null;

    if (selected.startsWith("Gender: ")) {
      const genderLabel = selected.split(": ")[1];
      filterValue = genderLabel;
      filterType = "gender";
    } else if (selected.startsWith("majors: ")) {
      filterValue = selected.split(": ")[1];
      filterType = "majors";
    } else if (selected.startsWith("levelclasses: ")) {
      filterValue = selected.split(": ")[1];
      filterType = "levelclasses";
    }

    setCurrentFilter({ type: filterType, value: filterValue });
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6">
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        category={category}
        openCategory={openCategory}
        onOpenCategory={setOpenCategory}
        openSubMenu={openSubMenu}
        onOpenSubMenu={setOpenSubMenu}
        onCategorySelect={handleCategorySelect}
        onAddData={() => {
          setEditingId(null);
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
            religion_id: "",
            gender: "",
            majors: "",
            levelclasses: "",
          });
          setIsOpen(true);
        }}
      />

      <DetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        student={selectedStudent}
      />

      <FormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        post={post}
        onInputChange={handleInput}
        editingId={editingId}
        errors={errors}
        religions={religions}
        majors={Majors}
        levelclasses={levelclasses}
      />

      <div className="clear-both"></div>

      <StudentsTable
        students={currentStudents}
        startIndex={startIndex}
        onDetail={handleDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
