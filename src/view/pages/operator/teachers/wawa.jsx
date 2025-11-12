"use client";

import axios from "axios";
import React from "react";
import { useState, useEffect, useRef } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Edit3,
  Trash2,
  Eye,
} from "lucide-react";

export const TeacherMainyuyu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState("");
  const [category, setCategory] = useState("Pilih Kategori");
  const [errors, setErrors] = useState({});
  const categoryRef = useRef(null);
  // 🔍 State untuk modal detail guru
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
  const [religions, setReligions] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  // 🧭 Ambil data dari backend
  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/employees");
      const data = Array.isArray(res.data.data) ? res.data.data : res.data;
      setTeachers(data);
      setAllTeachers(data);
      console.log("✅ Data Guru:", data);
      console.log("Total data dari backend:", res.data.data.length);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  const fetchReligions = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/religions");
      console.log("📦 Data agama dari API:", res.data);
      setReligions(res.data.data);
    } catch (err) {
      console.error("gagal", err);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchReligions();
  }, []);

  // 🖋️ Handle input dengan support untuk roles array
  const handleInput = (e) => {
    const { name, type, files, value } = e.target;

    if (name === "roles") {
      setPost({
        ...post,
        [name]: [{ value: value, label: value }], // Simpan sebagai array dengan struktur {value, label}
      });
    } else {
      setPost({
        ...post,
        [name]: type === "file" ? files[0] : value,
      });
    }
  };

  // 💾 Tambah atau update data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi frontend terlebih dahulu
    const frontendErrors = validateForm();
    if (Object.keys(frontendErrors).length > 0) {
      setErrors(frontendErrors);
      return;
    }

    setErrors({});

    const formData = new FormData();
    Object.entries(post).forEach(([key, value]) => {
      if (key === "roles" && Array.isArray(value) && value.length > 0) {
        const roleValue = value[0]?.value || value[0];
        formData.append(key, roleValue);
      } else if (key === "roles") {
        return;
      } else if (value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    try {
      if (editingId) {
        const updatedPost = { ...post };
        if (post.email === "") {
          delete updatedPost.email;
        }
        await axios.post(
          `http://127.0.0.1:8000/api/employees/${editingId}?_method=PUT`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Data guru berhasil diperbarui!");
      } else {
        await axios.post("http://127.0.0.1:8000/api/employees", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Data guru berhasil ditambahkan!");
      }

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
      fetchTeachers();

      // Refresh data dari server
      await fetchTeachers();

      // Jika menambah data baru, set ke halaman terakhir
      if (!editingId) {
        setTimeout(() => {
          const totalItems = allTeachers.length + 1;
          const newTotalPages = Math.ceil(totalItems / rowsPerPage);
          setCurrentPage(newTotalPages);
        }, 100);
      }
    } catch (err) {
      console.log("🔥 ERROR RESPONSE:", err.response?.data);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.log("⚠️ Tidak ada field 'errors' di response");
      }
    }
  };

  // ✏️ Edit
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

  // 🧭 Tampilkan modal detail
  const handleDetail = (teacher) => {
    setSelectedTeacher(teacher);
    setIsDetailOpen(true);
  };

  // 🗑️ Hapus
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus guru ini?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/employees/${id}`);
      alert("Data guru berhasil dihapus!");
      fetchTeachers();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data guru");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!post.name) newErrors.name = ["Nama wajib diisi."];
    if (!post.email && !editingId) newErrors.email = ["Email wajib diisi."];
    if (!post.gender) newErrors.gender = ["Jenis kelamin wajib dipilih."];
    if (!post.NIK) newErrors.NIK = ["NIK wajib diisi."];
    if (!post.NIP) newErrors.NIP = ["NIP wajib diisi."];
    if (!post.birth_place)
      newErrors.birth_place = ["Tempat lahir wajib diisi."];
    if (!post.birth_date) newErrors.birth_date = ["Tanggal lahir wajib diisi."];
    if (!post.phone_number)
      newErrors.phone_number = ["Nomer telepon wajib diisi."];
    if (!post.address) newErrors.address = ["Alamat wajib diisi."];
    if (!post.religion_id) newErrors.religion_id = ["Agama wajib dipilih."];
    if (!post.roles || post.roles.length === 0)
      newErrors.roles = ["Role wajib dipilih."];

    return newErrors;
  };

  // Filter pencarian dan kategori
  const [currentFilter, setCurrentFilter] = useState({
    type: null,
    value: null,
  });

  const filteredTeachers = allTeachers.filter((teacher) => {
    // Filter berdasarkan pencarian
    const keyword = searchTerm.toLowerCase();
    const matchesSearch =
      teacher.name?.toLowerCase().includes(keyword) ||
      teacher.NIK?.toLowerCase().includes(keyword) ||
      teacher.NIP?.toLowerCase().includes(keyword) ||
      teacher.gender?.toLowerCase().includes(keyword);

    // Filter berdasarkan kategori yang dipilih
    let matchesFilter = true;
    if (currentFilter.type && currentFilter.value) {
      switch (currentFilter.type) {
        case "gender":
          matchesFilter =
            teacher.gender?.toLowerCase() === currentFilter.value.toLowerCase();
          break;
        case "religion":
          matchesFilter =
            teacher.religion?.name?.toLowerCase() ===
            currentFilter.value.toLowerCase();
          break;
        default:
          matchesFilter = true;
      }
    }

    return matchesSearch && matchesFilter;
  });

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setOpenCategory(false);
        setOpenSubMenu("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    } else if (selected.startsWith("religion: ")) {
      filterValue = selected.split(": ")[1];
      filterType = "religion";
    }

    setCurrentFilter({ type: filterType, value: filterValue });
  };

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);

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
    <div className="p-6 ">
      {/* Baris atas: tombol + search bar */}
      <div className="flex justify-between items-center mb-5 gap-5">
        <div className="flex items-center w-[320px] border rounded-full px-3 py-1.5 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition gap-1">
          <Search size={20} className=" text-gray-500" />
          <input
            type="text"
            placeholder="Cari nama / NIK / NIP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none text-sm bg-transparent placeholder:text-gray-500"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative" ref={categoryRef}>
          <button
            onClick={() => {
              setOpenCategory(!openCategory);
              setOpenSubMenu("");
            }}
            className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 shadow-sm hover:bg-gray-50 transition text-sm font-medium min-w-[170px] justify-between "
          >
            <span
              className={`${
                category === "Pilih Kategori" ? "text-black" : "text-black"
              }`}
            >
              {category}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                openCategory ? "rotate-180" : ""
              }`}
            />
          </button>

          {openCategory && (
            <div className="absolute top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 z-20">
              <button
                onClick={() => handleCategorySelect("Semua Kategori")}
                className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-blue-50 rounded-lg text-gray-700 font-medium transition"
              >
                Tampilkan Semua
                {(category === "Semua Kategori" ||
                  category === "Pilih Kategori") && (
                  <span className="text-blue-600 font-bold">✓</span>
                )}
              </button>

              {/* Gender */}
              <div className="border-t border-gray-100">
                <button
                  onClick={() =>
                    setOpenSubMenu(openSubMenu === "gender" ? "" : "gender")
                  }
                  className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition"
                >
                  Jenis Kelamin
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      openSubMenu === "gender" ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {openSubMenu === "gender" && (
                  <div className="ml-4 border-l border-gray-200 pl-2 py-1 space-y-1">
                    {["Laki-laki", "Perempuan"].map((g) => (
                      <button
                        key={g}
                        onClick={() => handleCategorySelect(`Gender: ${g}`)}
                        className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition ${
                          category === `Gender: ${g}`
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Religion */}
              <div className="border-t border-gray-100">
                <button
                  onClick={() =>
                    setOpenSubMenu(openSubMenu === "religion" ? "" : "religion")
                  }
                  className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition"
                >
                  Agama
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      openSubMenu === "religion" ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {openSubMenu === "religion" && (
                  <div className="ml-4 border-l border-gray-200 pl-2 py-1 space-y-1 max-h-40 overflow-y-auto">
                    {religions.map((r) => (
                      <button
                        key={r.id}
                        onClick={() =>
                          handleCategorySelect(`religion: ${r.name}`)
                        }
                        className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition ${
                          category === `religion: ${r.name}`
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {r.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Detail Guru */}
        {isDetailOpen && selectedTeacher && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-[700px] px-10 py-8 relative">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  Detail Guru
                </h2>
              </div>

              {/* Foto Profil */}
              <div className="flex justify-center mb-6">
                {selectedTeacher.image ? (
                  <img
                    src={selectedTeacher.image || "/placeholder.svg"}
                    alt="Foto guru"
                    className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow-sm mb-5"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>

              {/* Isi Detail */}
              <div className="grid grid-cols-2 text-gray-700 text-[15px] gap-y-2 mb-4">
                <div className="space-y-7">
                  <p>
                    <span className="font-medium">Nama :</span>{" "}
                    {selectedTeacher.name || "-"}
                  </p>
                  <p>
                    <span className="font-medium">NIK :</span>{" "}
                    {selectedTeacher.NIK || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Agama :</span>{" "}
                    {selectedTeacher.religion?.name || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Tanggal Lahir :</span>{" "}
                    {selectedTeacher.birth_date || "-"}
                  </p>
                  <p>
                    <span className="font-medium">No Telepon :</span>{" "}
                    {selectedTeacher.phone_number || "-"}
                  </p>
                </div>

                <div className="space-y-7">
                  <p>
                    <span className="font-medium">NIP :</span>{" "}
                    {selectedTeacher.NIP || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Jenis Kelamin :</span>{" "}
                    {selectedTeacher.gender === "male"
                      ? "Laki - laki"
                      : selectedTeacher.gender === "female"
                      ? "Perempuan"
                      : "-"}
                  </p>
                  <p>
                    <span className="font-medium">Tempat Lahir :</span>{" "}
                    {selectedTeacher.birth_place || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Role :</span>{" "}
                    {Array.isArray(selectedTeacher.roles)
                      ? selectedTeacher.roles
                          .map((r) => r.label || r.value || r.name || r)
                          .join(", ")
                      : "-"}
                  </p>
                </div>
              </div>

              {/* Alamat */}
              <div className="mt-4 pt-3 text-gray-700 text-[15px]">
                <p>
                  <span className="font-medium">Alamat :</span>{" "}
                  {selectedTeacher.address || "-"}
                </p>
              </div>

              {/* Tombol Tutup */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="px-6 py-2 bg-[#3B82F6] text-white rounded-[15px] hover:bg-blue-700 transition-all shadow-md"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1"></div>

        <button
          onClick={() => {
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
          }}
          className="bg-[#3B82F6] text-white px-4 py-2 rounded-[6px] hover:bg-blue-700 transition text-sm font-medium whitespace-nowrap flex-shrink-0 w-[140px] flex items-center justify-center gap-1"
        >
          <span>+</span>
          Tambah Data
        </button>
      </div>

      {/* Form Input */}
      <div className="">
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-[700px] max-h-[90vh] overflow-y-auto p-6 relative">
              {/* Tombol Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
              >
                ✕
              </button>

              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Tambah Guru
              </h2>

              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Field Nama */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Nama Lengkap *
                  </label>
                  <input
                    className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Masukkan nama lengkap"
                    name="name"
                    value={post.name}
                    onChange={handleInput}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name[0]}
                    </p>
                  )}
                </div>

                {/* Field Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Email *
                  </label>
                  <input
                    className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Masukkan Email"
                    name="email"
                    value={post.email}
                    onChange={handleInput}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email[0]}
                    </p>
                  )}
                </div>

                {/* Field Foto */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Foto
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleInput}
                    className="border border-gray-300 rounded-lg p-2 w-full bg-gray-50"
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.image[0]}
                    </p>
                  )}
                </div>

                {/* Field Jenis Kelamin */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Jenis Kelamin *
                  </label>
                  <select
                    name="gender"
                    className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.gender ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={handleInput}
                    value={post.gender}
                  >
                    <option value="">Pilih jenis kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.gender[0]}
                    </p>
                  )}
                </div>

                {/* Field NIK */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    NIK *
                  </label>
                  <input
                    className={`border rounded-lg p-2 w-full ${
                      errors.NIK ? "border-red-500" : "border-gray-300"
                    }`}
                    type="text"
                    placeholder="Masukkan NIK"
                    name="NIK"
                    value={post.NIK}
                    onChange={handleInput}
                  />
                  {errors.NIK && (
                    <p className="text-red-500 text-sm mt-1">{errors.NIK[0]}</p>
                  )}
                </div>

                {/* Field NIP */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    NIP *
                  </label>
                  <input
                    className={`border rounded-lg p-2 w-full ${
                      errors.NIP ? "border-red-500" : "border-gray-300"
                    }`}
                    type="text"
                    placeholder="Masukkan NIP"
                    name="NIP"
                    value={post.NIP}
                    onChange={handleInput}
                  />
                  {errors.NIP && (
                    <p className="text-red-500 text-sm mt-1">{errors.NIP[0]}</p>
                  )}
                </div>

                {/* Field Tempat Lahir */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Tempat Lahir *
                  </label>
                  <input
                    className={`border rounded-lg p-2 w-full ${
                      errors.birth_place ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Masukkan tempat lahir"
                    name="birth_place"
                    value={post.birth_place}
                    onChange={handleInput}
                  />
                  {errors.birth_place && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.birth_place[0]}
                    </p>
                  )}
                </div>

                {/* Field Tanggal Lahir */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Tanggal Lahir *
                  </label>
                  <input
                    className={`border rounded-lg p-2 w-full ${
                      errors.birth_date ? "border-red-500" : "border-gray-300"
                    }`}
                    type="date"
                    name="birth_date"
                    value={post.birth_date}
                    onChange={handleInput}
                  />
                  {errors.birth_date && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.birth_date[0]}
                    </p>
                  )}
                </div>

                {/* Field Agama */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Agama *
                  </label>
                  <select
                    name="religion_id"
                    className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.religion_id ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={handleInput}
                    value={post.religion_id}
                  >
                    <option value="">Pilih agama</option>
                    {religions.map((religion) => (
                      <option key={religion.id} value={religion.id}>
                        {religion.name}
                      </option>
                    ))}
                  </select>
                  {errors.religion_id && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.religion_id[0]}
                    </p>
                  )}
                </div>

                {/* Field Nomer Telfon */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Nomer Telfon *
                  </label>
                  <input
                    className={`border rounded-lg p-2 w-full ${
                      errors.phone_number ? "border-red-500" : "border-gray-300"
                    }`}
                    type="text"
                    placeholder="Masukkan nomor telepon"
                    name="phone_number"
                    value={post.phone_number}
                    onChange={handleInput}
                  />
                  {errors.phone_number && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone_number[0]}
                    </p>
                  )}
                </div>

                {/* Field Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Role *
                  </label>
                  <select
                    name="roles"
                    className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.roles ? "border-red-500" : "border-gray-300"
                    }`}
                    onChange={handleInput}
                    value={
                      Array.isArray(post.roles) && post.roles.length > 0
                        ? post.roles[0]?.value || ""
                        : ""
                    }
                  >
                    <option value="">Pilih Role</option>
                    <option value="teacher">Guru Pengajar</option>
                    <option value="homeroom_teacher">Wali Kelas</option>
                    <option value="curriculum_coordinator">
                      Waka Kurikulum
                    </option>
                  </select>

                  {errors.roles && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.roles[0]}
                    </p>
                  )}
                </div>

                {/* Field Alamat */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Alamat *
                  </label>
                  <textarea
                    className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Masukkan alamat lengkap"
                    name="address"
                    value={post.address}
                    onChange={handleInput}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address[0]}
                    </p>
                  )}
                </div>

                {/* Tombol Aksi */}
                <div className="col-span-2 flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    {editingId ? "Update" : "Tambah"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Table Data */}
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-[#3B82F6] text-white text-sm">
            <th
              className="px-4 py-3 text-left font-medium border-r  border-[#3B82F6]"
              colSpan={2}
            >
              Nama
            </th>
            <th className="px-4 py-3 text-left font-medium border-r border-[#3B82F6]">
              NIP
            </th>
            <th className="px-4 py-3 text-left font-medium border-r border-[#3B82F6]">
              Maple
            </th>
            <th className="px-4 py-3 text-left font-medium border-r border-[#3B82F6]">
              Roles
            </th>
            <th className="px-4 py-3 text-center font-medium">Aksi</th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-700">
          {currentTeachers.length > 0 ? (
            currentTeachers.map((teacher, index) => (
              <tr
                key={teacher.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="pl-4 py-3 text-center">
                  <img
                    src={teacher.image}
                    alt=""
                    className="border border-gray-500 rounded-full w-[38px] h-[38px]"
                  />
                </td>
                <td className="py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">
                      {teacher.name}
                    </span>
                    <span className="text-gray-600 text-[12px] font-light">
                      {teacher.gender}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 font-medium">{teacher.NIP}</td>
                <td className="px-4 py-3 font-medium">
                  {teacher.maple || "-"}
                </td>
                <td>
                  {Array.isArray(teacher.roles)
                    ? teacher.roles.map((r) => r.label).join(", ")
                    : teacher.roles?.label || teacher.roles?.value || "-"}
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() =>
                        setOpenItemId(
                          openItemId === teacher.id ? null : teacher.id
                        )
                      }
                      className="text-gray-700 hover:text-gray-900"
                    >
                      <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
                    </button>

                    {/* Dropdown menu */}
                    {openItemId === teacher.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                        <button
                          onClick={() => {
                            handleDetail(teacher);
                            setOpenItemId(null);
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4 text-blue-500 mr-2" />
                          Detail
                        </button>

                        <button
                          onClick={() => {
                            handleEdit(teacher);
                            setOpenItemId(null);
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit3 className="w-4 h-4 text-yellow-500 mr-2" />
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            handleDelete(teacher.id);
                            setOpenItemId(null);
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Trash2 className="w-4 h-4 text-red-500 mr-2" />
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-5 text-gray-500">
                Tidak ada data guru
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6 select-none">
        {/* Tombol Sebelumnya */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100 text-blue-600"
          }`}
        >
          &lt;
        </button>

        {/* Nomor Halaman */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (page) =>
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
          )
          .map((page, i, arr) => (
            <React.Fragment key={page}>
              {i > 0 && arr[i - 1] !== page - 1 && (
                <span className="px-2 text-gray-400">...</span>
              )}
              <button
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md transition ${
                  page === currentPage
                    ? "bg-blue-600 text-white border-blue-600 font-medium"
                    : "hover:bg-gray-100 text-blue-600 font-medium"
                }`}
              >
                {page}
              </button>
            </React.Fragment>
          ))}

        {/* Tombol Berikutnya */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100 text-blue-600"
          }`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
