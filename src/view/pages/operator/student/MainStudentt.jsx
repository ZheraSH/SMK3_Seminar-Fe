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
  const categoryRef = useRef(null);
  // 🔍 State untuk modal detail siswa
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

  // 🧭 Ambil data dari backend
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/students");
      const data = Array.isArray(res.data.data) ? res.data.data : res.data;
      setStudents(data);
      setAllStudents(data);
      console.log("✅ Data siswa:", data);
      console.log("Total data dari backend:", res.data.data.length);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  const fetchlevelclasses = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/levelclasses");
      setlevelclasses(res.data.data);
      console.log(res.data.data);
      // Pastikan current page tidak melebihi total pages
      const totalPages = Math.ceil(data.length / rowsPerPage);
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      }
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  const fetchMajors = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/majors");
      console.log(res.data.data);
      setMajors(res.data.data);
    } catch (err) {
      console.error("Gagal ambil majors:", err);
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
    fetchStudents();
    fetchReligions();
    fetchMajors();
    fetchlevelclasses();
  }, []);

  // 🖋️ Handle input
  const handleInput = (e) => {
    const { name, type, files, value } = e.target;
    setPost({
      ...post,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // 💾 Tambah atau update data
  const handleSubmit = async (e) => {
    e.preventDefault();

      // Validasi frontend terlebih dahulu
  const frontendErrors = validateForm();
  if (Object.keys(frontendErrors).length > 0) {
    setErrors(frontendErrors);
    return; // Berhenti jika ada error validasi frontend
  }
  
  setErrors({});

    const formData = new FormData();
    Object.entries(post).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });

    try {
      if (editingId) {
        // UPDATE
        await axios.post(
          `http://127.0.0.1:8000/api/students/${editingId}?_method=PUT`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Data siswa berhasil diperbarui!");
      } else {
        // CREATE
        await axios.post("http://127.0.0.1:8000/api/students", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Data siswa berhasil ditambahkan!");
      }

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
      fetchStudents();

      // Refresh data dari server
      await fetchStudents();

      // Jika menambah data baru, set ke halaman terakhir
      if (!editingId) {
        // Tunggu sebentar untuk memastikan state allStudents sudah terupdate
        setTimeout(() => {
          const totalItems = allStudents.length + 1; // +1 untuk data baru
          const newTotalPages = Math.ceil(totalItems / rowsPerPage);
          setCurrentPage(newTotalPages);
        }, 100);
      }
    } catch (err) {
      console.log("🔥 ERROR RESPONSE:", err.response?.data); // debug dulu
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.log("⚠️ Tidak ada field 'errors' di response");
      }
    }
  };

  // ✏️ Edit
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
      religion_id: student.religion_id || "",
      gender: student.gender || "",
      majors: student.major?.id || "",
      levelclasses: student.levelclass?.id || "",
    });
    setEditingId(student.id);
    setIsOpen(true);
  };

  // 🧭 Tampilkan modal detail
  const handleDetail = (student) => {
    setSelectedStudent(student);
    setIsDetailOpen(true);
  };

  // 🗑️ Hapus
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus siswa ini?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/students/${id}`);
      alert("Data siswa berhasil dihapus!");
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data siswa");
    }
  };


  const validateForm = () => {
    const newErrors = {};
  
    if (!post.name) newErrors.name = ["Nama wajib diisi."];
    if (!post.email) newErrors.email = ["Email wajib diisi."];
    if (!post.gender) newErrors.gender = ["Jenis kelamin wajib dipilih."];
    if (!post.nisn) newErrors.nisn = ["NISN wajib diisi."];
    if (!post.birth_place) newErrors.birth_place = ["Tempat lahir wajib diisi."];
    if (!post.birth_date) newErrors.birth_date = ["Tanggal lahir wajib diisi."];
    if (!post.number_kk) newErrors.number_kk = ["No KK wajib diisi."];
    if (!post.number_akta) newErrors.number_akta = ["No Akta wajib diisi."];
    if (!post.order_child) newErrors.order_child = ["Anak ke wajib diisi."];
    if (!post.count_siblings) newErrors.count_siblings = ["Jumlah saudara wajib diisi."];
    if (!post.address) newErrors.address = ["Alamat wajib diisi."];
    if (!post.religion_id) newErrors.religion_id = ["Agama wajib dipilih."];
    if (!post.majors) newErrors.majors = ["Jurusan wajib dipilih."];
    if (!post.levelclasses) newErrors.levelclasses = ["Tingkatan wajib dipilih."];
  
    return newErrors;
  };

  // Filter pencarian dan kategori
  const [currentFilter, setCurrentFilter] = useState({
    type: null,
    value: null,
  });

  const filteredStudents = allStudents.filter((student) => {
    // Filter berdasarkan pencarian
    const keyword = searchTerm.toLowerCase();
    const matchesSearch =
      student.name?.toLowerCase().includes(keyword) ||
      student.nisn?.toLowerCase().includes(keyword) ||
      student.gender?.toLowerCase().includes(keyword);

    // Filter berdasarkan kategori yang dipilih
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

    // Jika pilih "Semua Kategori"
    if (selected === "Semua Kategori") {
      setCurrentFilter({ type: null, value: null });
      return;
    }

    let filterType = null;
    let filterValue = null;

    // 🔹 Filter Gender
    if (selected.startsWith("Gender: ")) {
      const genderLabel = selected.split(": ")[1];
      filterValue = genderLabel; // langsung label
      filterType = "gender";
    }

    // 🔹 Filter Jurusan (majors)
    else if (selected.startsWith("majors: ")) {
      filterValue = selected.split(": ")[1];
      filterType = "majors";
    }

    // 🔹 Filter Level Kelas
    else if (selected.startsWith("levelclasses: ")) {
      filterValue = selected.split(": ")[1];
      filterType = "levelclasses";
    }

    setCurrentFilter({ type: filterType, value: filterValue });
  };

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  // Hitung total halaman
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

  // Tentukan data siswa yang ditampilkan
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // Fungsi untuk ubah halaman
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
          <Search size={25} className=" mr-2" />
          <input
            type="text"
            placeholder="Cari nama / NIS / Kelas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none text-sm bg-transparent placeholder:text-black"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative" ref={categoryRef}>
          <button
            onClick={() => {
              setOpenCategory(!openCategory);
              setOpenSubMenu("");
            }}
            className="flex items-center gap-2 bg-white border rounded-full mr-170 px-4 py-2 shadow-sm hover:bg-gray-50 transition text-sm font-medium min-w-[170px] justify-between "
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

              {/* majors */}
              <div className="border-t border-gray-100">
                <button
                  onClick={() =>
                    setOpenSubMenu(openSubMenu === "majors" ? "" : "majors")
                  }
                  className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition"
                >
                  Jurusan
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      openSubMenu === "majors" ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {openSubMenu === "majors" && (
                  <div className="ml-4 border-l border-gray-200 pl-2 py-1 space-y-1">
                    {["PPLG", "DKV"].map((r) => (
                      <button
                        key={r}
                        onClick={() => handleCategorySelect(`majors: ${r}`)}
                        className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition ${
                          category === `majors: ${r}`
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* levelclasses */}
              <div className="border-t border-gray-100">
                <button
                  onClick={() =>
                    setOpenSubMenu(
                      openSubMenu === "levelclasses" ? "" : "levelclasses"
                    )
                  }
                  className="flex justify-between items-center w-full text-left text-sm px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 transition"
                >
                  Tingkatan
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      openSubMenu === "levelclasses" ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {openSubMenu === "levelclasses" && (
                  <div className="ml-4 border-l border-gray-200 pl-2 py-1 space-y-1 max-h-40 overflow-y-auto">
                    {["XII", "XI", "X"].map((m) => (
                      <button
                        key={m}
                        onClick={() =>
                          handleCategorySelect(`levelclasses: ${m}`)
                        }
                        className={`block w-full text-left text-sm px-3 py-1.5 rounded-md transition ${
                          category === `levelclasses: ${m}`
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Detail Siswa */}
        {isDetailOpen && selectedStudent && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-[700px] px-10 py-8 relative">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  Detail Siswa
                </h2>
              </div>

              {/* Foto Profil */}
              <div className="flex justify-center mb-6">
                {selectedStudent.image ? (
                  <img
                    src={`http://127.0.0.1:8000/storage/${selectedStudent.image}`}
                    alt="Foto siswa"
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
                    {selectedStudent.name || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Kelas :</span>{" "}
                    {selectedStudent.levelclass || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Agama :</span>{" "}
                    {selectedStudent.religion?.name || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Tanggal Lahir :</span>{" "}
                    {selectedStudent.birth_date || "-"}
                  </p>
                  <p>
                    <span className="font-medium">No Akta :</span>{" "}
                    {selectedStudent.number_akta || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Jumlah Saudara :</span>{" "}
                    {selectedStudent.count_siblings || "-"}
                  </p>
                </div>

                <div className="space-y-7">
                  <p>
                    <span className="font-medium">NISN :</span>{" "}
                    {selectedStudent.nisn || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Jenis Kelamin :</span>{" "}
                    {selectedStudent.gender === "male"
                      ? "Laki - laki"
                      : selectedStudent.gender === "female"
                      ? "Perempuan"
                      : "-"}
                  </p>
                  <p>
                    <span className="font-medium">Tempat Lahir :</span>{" "}
                    {selectedStudent.birth_place || "-"}
                  </p>
                  <p>
                    <span className="font-medium">No KK :</span>{" "}
                    {selectedStudent.number_kk || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Anak Ke- :</span>{" "}
                    {selectedStudent.order_child || "-"}
                  </p>
                </div>
              </div>

              {/* Alamat */}
              <div className="mt-4 pt-3 text-gray-700 text-[15px]">
                <p>
                  <span className="font-medium">Alamat :</span>{" "}
                  {selectedStudent.address || "-"}
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

        <button
          onClick={() => {
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
          className="bg-blue-600 text-white px-4 py-2 rounded-[6px] hover:bg-blue-700 transition sticky right-0 "
        >
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
                Tambah Siswa
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
              <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.image[0]}</p>
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
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender[0]}</p>
            )}
          </div>

          {/* Field NISN */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              NISN *
            </label>
            <input
              className={`border rounded-lg p-2 w-full ${
                errors.nisn ? "border-red-500" : "border-gray-300"
              }`}
              type="number"
              placeholder="Masukkan NISN"
              name="nisn"
              value={post.nisn}
              onChange={handleInput}
            />
            {errors.nisn && (
              <p className="text-red-500 text-sm mt-1">{errors.nisn[0]}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.religion_id[0]}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.birth_place[0]}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.birth_date[0]}</p>
            )}
          </div>

          {/* Field No KK */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              No KK *
            </label>
            <input
              className={`border rounded-lg p-2 w-full ${
                errors.number_kk ? "border-red-500" : "border-gray-300"
              }`}
              type="number"
              name="number_kk"
              value={post.number_kk}
              onChange={handleInput}
            />
            {errors.number_kk && (
              <p className="text-red-500 text-sm mt-1">{errors.number_kk[0]}</p>
            )}
          </div>

          {/* Field Saudara Ke */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Saudara Ke *
            </label>
            <input
              className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.count_siblings ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="-"
              type="number"
              name="count_siblings"
              value={post.count_siblings}
              onChange={handleInput}
            />
            {errors.count_siblings && (
              <p className="text-red-500 text-sm mt-1">{errors.count_siblings[0]}</p>
            )}
          </div>

          {/* Field No Akta */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              No Akta *
            </label>
            <input
              className={`border rounded-lg p-2 w-full ${
                errors.number_akta ? "border-red-500" : "border-gray-300"
              }`}
              type="number"
              name="number_akta"
              value={post.number_akta}
              onChange={handleInput}
            />
            {errors.number_akta && (
              <p className="text-red-500 text-sm mt-1">{errors.number_akta[0]}</p>
            )}
          </div>

          {/* Field Anak Ke */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Anak Ke *
            </label>
            <input
              className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.order_child ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="-"
              type="number"
              name="order_child"
              value={post.order_child}
              onChange={handleInput}
            />
            {errors.order_child && (
              <p className="text-red-500 text-sm mt-1">{errors.order_child[0]}</p>
            )}
          </div>

          {/* Field Jurusan */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Jurusan *
            </label>
            <select
              name="majors"
              className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.majors ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleInput}
              value={post.majors}
            >
              <option value="">Pilih Jurusan</option>
              {Majors.map((major) => (
                <option key={major.id} value={major.id}>
                  {major.name}
                </option>
              ))}
            </select>
            {errors.majors && (
              <p className="text-red-500 text-sm mt-1">{errors.majors[0]}</p>
            )}
          </div>

          {/* Field Tingkatan */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Tingkatan *
            </label>
            <select
              name="levelclasses"
              className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.levelclasses ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleInput}
              value={post.levelclasses}
            >
              <option value="">Pilih Tingkatan</option>
              {levelclasses.map((levelclass) => (
                <option key={levelclass.id} value={levelclass.id}>
                  {levelclass.name}
                </option>
              ))}
            </select>
            {errors.levelclasses && (
              <p className="text-red-500 text-sm mt-1">{errors.levelclasses[0]}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.address[0]}</p>
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
            <th className="px-4 py-4.5 text-center font-semibold border-r border-[#3B82F6]">
              No
            </th>
            <th className="px-4 py-3 text-left font-semibold border-r border-[#3B82F6]">
              Nama
            </th>
            <th className="px-4 py-3 text-left font-semibold border-r border-[#3B82F6]">
              NISN
            </th>
            <th className="px-4 py-3 text-left font-semibold border-r border-[#3B82F6]">
              Kelas
            </th>
            <th className="px-4 py-3 text-left font-semibold border-r border-[#3B82F6]">
              Tahun Ajaran
            </th>
            <th className="px-4 py-3 text-left font-semibold border-r border-[#3B82F6]">
              RFID
            </th>
            <th className="px-4 py-3 text-center font-semibold">Aksi</th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-700">
          {currentStudents.length > 0 ? (
            currentStudents.map((student, index) => (
              <tr
                key={student.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 text-center">
                  {startIndex + index + 1}
                </td>
                <td className="px-4 py-3">{student.name}</td>
                <td className="px-4 py-3">{student.nisn}</td>
                <td className="px-4 py-3">{student.levelclass || "-"}</td>
                <td className="px-4 py-3">{student.academic_year || "-"}</td>

                <td className="px-4 py-3">
                  {student.rfid ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={student.rfid}
                        disabled
                        className="border border-gray-300 rounded-md px-2 py-1 w-[100px] text-center text-gray-600"
                      />
                      <button
                        onClick={() => handleEditRFID(student)}
                        className="text-yellow-500 hover:text-yellow-600 transition"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddRFID(student)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition"
                    >
                      Tambah RFID
                    </button>
                  )}
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() =>
                        setOpenItemId(
                          openItemId === student.id ? null : student.id
                        )
                      }
                      className="text-gray-700 hover:text-gray-900"
                    >
                      <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
                    </button>

                    {/* Dropdown menu */}
                    {openItemId === student.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                        <button
                          onClick={() => {
                            handleDetail(student);
                            setOpenItemId(null);
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4 text-blue-500 mr-2" />
                          Detail
                        </button>

                        <button
                          onClick={() => {
                            handleEdit(student);
                            setOpenItemId(null);
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit3 className="w-4 h-4 text-yellow-500 mr-2" />
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            handleDelete(student.id);
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
                Tidak ada data siswa
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
