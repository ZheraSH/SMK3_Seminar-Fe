"use client";
import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { SearchFilter } from "./TeachersSearch-Filter";
import { FormModal } from "./TeachersFormModal";
import { DetailModal } from "./TeachersDetailModal";
import { TeachersTable } from "./TeachersTable";
import { Pagination } from "./TeachersPagination";
import {
  fetchTeachers,
  fetchlevelclasses,
  fetchMajors,
  fetchReligions,
  submitTeachers,
  deleteTeachers,
} from "../../../../../Core/api/employee/TeachersApi";

export const TeachersBoy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);
  const [Teachers, setTeachers] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [Majors, setMajors] = useState([]);
  const [levelclasses, setlevelclasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState("");
  const [category, setCategory] = useState("Pilih Kategori");
  const [errors, setErrors] = useState({});
  const [selectedTeachers, setSelectedTeachers] = useState(null);
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
        const [TeachersData, religionsData, majorsData, levelclassesData] =
          await Promise.all([
            fetchTeachers(),
            fetchReligions(),
            fetchMajors(),
            fetchlevelclasses(),
          ]);

        setTeachers(TeachersData);
        setAllTeachers(TeachersData);
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

    const newValue =
    name === "roles"
      ? [value] // backend butuh array
      : type === "file"
      ? files[0]
      : value;
      
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
      await submitTeachers(post, editingId);

      setPost({
        name: "",
        email: "",
        image: null,
        NIK: "",
        NIP: "",
        NIP: "",
        phone_number: "",
        religion_id: "",
        birth_place: "",
        birth_date: "",
        address: "",
        gender: "",
        roles: "",
      });
      setEditingId(null);
      const updatedTeachers = await fetchTeachers();
      setTeachers(updatedTeachers);
      setAllTeachers(updatedTeachers);

      if (!editingId) {
        setTimeout(() => {
          const totalItems = updatedTeachers.length;
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
  const handleEdit = (Teachers) => {
    console.log("🔍 Teachers data for edit:", Teachers);
    let normalizedGender = Teachers.gender || "";

    if (Teachers.gender === "L" || Teachers.gender === "laki-laki") {
      normalizedGender = "male";
    } else if (Teachers.gender === "P" || Teachers.gender === "perempuan") {
      normalizedGender = "female";
    }

    setPost({
      name: Teachers.name || "",
      email: Teachers.email || "",
      image: null,
      NIK: Teachers.NIK || "",
      NIP: Teachers.NIP || "",
      birth_place: Teachers.birth_place || "",
      birth_date: Teachers.birth_date || "",
      phone_number: Teachers.phone_number || "",
      religion_id: Teachers.religion_id?.id || Teachers.religion_id || "",
      address: Teachers.address || "",
      roles: Teachers.roles || "",
      gender: normalizedGender || "",
    });
    setEditingId(Teachers.id);
    setIsOpen(true);
  };

  // Tampilkan modal detail
  const handleDetail = (Teachers) => {
    setSelectedTeachers(Teachers);
    setIsDetailOpen(true);
  };

  // Hapus
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus siswa ini?")) return;
    try {
      await deleteTeachers(id);
      const updatedTeachers = await fetchTeachers();
      setTeachers(updatedTeachers);
      setAllTeachers(updatedTeachers);
    } catch (err) {
      console.error(err);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!post.name) newErrors.name = ["Nama wajib diisi."];
    if (!post.email) newErrors.email = ["Email wajib diisi."];
    if (!post.gender) newErrors.gender = ["Jenis kelamin wajib dipilih."];
    if (!post.NIP) newErrors.NIP = ["NIP wajib diisi."];
    if (!post.NIK) newErrors.NIK = ["NIK wajib diisi."];
    if (!post.birth_place)newErrors.birth_place = ["Tempat lahir wajib diisi."];
    if (!post.birth_date) newErrors.birth_date = ["Tanggal lahir wajib diisi."];
    if (!post.phone_number) newErrors.phone_number = ["No telfon wajib diisi."];
    if (!post.address) newErrors.address = ["Alamat wajib diisi."];
    if (!post.religion_id) newErrors.religion_id = ["Agama wajib dipilih."];
    if (!post.roles) newErrors.roles = ["Roles wajib dipilih."];

    return newErrors;
  };

  // Filter pencarian dan kategori
  const [currentFilter, setCurrentFilter] = useState({
    type: null,
    value: null,
  });

  const filteredTeachers = allTeachers.filter((Teachers) => {
    const keyword = searchTerm.toLowerCase();
    const matchesSearch =
      Teachers.name?.toLowerCase().includes(keyword) ||
      Teachers.nisn?.toLowerCase().includes(keyword) ||
      Teachers.gender?.toLowerCase().includes(keyword);

    let matchesFilter = true;
    if (currentFilter.type && currentFilter.value) {
      switch (currentFilter.type) {
        case "gender":
          matchesFilter =
            Teachers.gender?.toLowerCase() ===
            currentFilter.value.toLowerCase();
          break;
        case "majors":
          matchesFilter =
            Teachers.majors?.toLowerCase() ===
            currentFilter.value.toLowerCase();
          break;
        case "levelclasses":
          matchesFilter =
            Teachers.levelclasses?.toLowerCase() ===
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
            NIK: "",
            NIP: "",
            NIP: "",
            phone_number: "",
            religion_id: "",
            birth_place: "",
            birth_date: "",
            address: "",
            gender: "",
            roles: "",
          });
          setIsOpen(true);
        }}
      />

      <DetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        Teachers={selectedTeachers}
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

      <TeachersTable
        Teachers={currentTeachers}
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
