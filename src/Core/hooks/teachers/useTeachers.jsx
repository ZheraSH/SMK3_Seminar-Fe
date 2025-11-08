// "use client";

// import { useState, useEffect } from "react";
// import {
//   fetchTeachers,
//   fetchlevelclasses,
//   fetchMajors,
//   fetchReligions,
//   submitTeachers,
//   deleteTeachers,
// } from "../../api/employee/TeachersApi";

// export const useTeachers = () => {
//   // Modal states
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDetailOpen, setIsDetailOpen] = useState(false);
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
  
//   // Data states
//   const [teachers, setTeachers] = useState([]);
//   const [allTeachers, setAllTeachers] = useState([]);
//   const [majors, setMajors] = useState([]);
//   const [levelclasses, setLevelclasses] = useState([]);
//   const [religions, setReligions] = useState([]);
  
//   // Form states
//   const [post, setPost] = useState({
//     name: "",
//     email: "",
//     image: null,
//     nisn: "",
//     birth_place: "",
//     birth_date: "",
//     number_kk: "",
//     number_akta: "",
//     order_child: "",
//     count_siblings: "",
//     address: "",
//     religion_id: "",
//     gender: "",
//     majors: "",
//     levelclasses: "",
//   });
  
//   const [editingId, setEditingId] = useState(null);
//   const [errors, setErrors] = useState({});
  
//   // Filter & Search states
//   const [searchTerm, setSearchTerm] = useState("");
//   const [category, setCategory] = useState("Pilih Kategori");
//   const [openCategory, setOpenCategory] = useState(false);
//   const [openSubMenu, setOpenSubMenu] = useState("");
//   const [currentFilter, setCurrentFilter] = useState({ type: null, value: null });
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 7;

//   // Load all data on mount
//   const loadAllData = async () => {
//     try {
//       const [teachersData, religionsData, majorsData, levelclassesData] = await Promise.all([
//         fetchTeachers(),
//         fetchReligions(),
//         fetchMajors(),
//         fetchlevelclasses(),
//       ]);

//       setTeachers(teachersData);
//       setAllTeachers(teachersData);
//       setReligions(religionsData);
//       setMajors(majorsData);
//       setLevelclasses(levelclassesData);
//     } catch (err) {
//       console.error("Error loading data:", err);
//     }
//   };

//   useEffect(() => {
//     loadAllData();
//   }, []);

//   // Handle input changes
//   const handleInput = (e) => {
//     const { name, type, files, value } = e.target;
//     setPost({
//       ...post,
//       [name]: type === "file" ? files[0] : value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const frontendErrors = validateForm();
//     if (Object.keys(frontendErrors).length > 0) {
//       setErrors(frontendErrors);
//       return;
//     }

//     setErrors({});

//     try {
//       await submitTeachers(post, editingId);

//       // Reset form
//       setPost({
//         name: "",
//         email: "",
//         image: null,
//         nisn: "",
//         birth_place: "",
//         birth_date: "",
//         number_kk: "",
//         number_akta: "",
//         order_child: "",
//         count_siblings: "",
//         address: "",
//         religion_id: "",
//         gender: "",
//         majors: "",
//         levelclasses: "",
//       });
//       setEditingId(null);

//       // Refresh data
//       const updatedTeachers = await fetchTeachers();
//       setTeachers(updatedTeachers);
//       setAllTeachers(updatedTeachers);

//       // Adjust pagination for new items
//       if (!editingId) {
//         setTimeout(() => {
//           const totalItems = updatedTeachers.length;
//           const newTotalPages = Math.ceil(totalItems / rowsPerPage);
//           setCurrentPage(newTotalPages);
//         }, 100);
//       }
//     } catch (err) {
//       if (err.response?.data?.errors) {
//         setErrors(err.response.data.errors);
//       } else {
//         console.log("⚠️ Tidak ada field 'errors' di response");
//       }
//     }
//   };

//   // Handle edit teacher
//   const handleEdit = (teacher) => {
//     console.log("🔍 Teacher data for edit:", teacher);

//     // Normalize gender
//     let normalizedGender = teacher.gender || "";
//     if (teacher.gender === "L" || teacher.gender === "laki-laki") {
//       normalizedGender = "male";
//     } else if (teacher.gender === "P" || teacher.gender === "perempuan") {
//       normalizedGender = "female";
//     }

//     setPost({
//       name: teacher.name || "",
//       email: teacher.email || "",
//       image: null,
//       nisn: teacher.nisn || "",
//       birth_place: teacher.birth_place || "",
//       birth_date: teacher.birth_date || "",
//       number_kk: teacher.number_kk || "",
//       number_akta: teacher.number_akta || "",
//       order_child: teacher.order_child || "",
//       count_siblings: teacher.count_siblings || "",
//       address: teacher.address || "",
//       religion_id: teacher.religion_id || "",
//       gender: normalizedGender || "",
//       majors: teacher.major?.id || "",
//       levelclasses: teacher.levelclass?.id || "",
//     });
//     setEditingId(teacher.id);
//     setIsOpen(true);
//   };

//   // Handle view details
//   const handleDetail = (teacher) => {
//     setSelectedTeacher(teacher);
//     setIsDetailOpen(true);
//   };

//   // Handle delete teacher
//   const handleDelete = async (id) => {
//     if (!window.confirm("Yakin ingin menghapus guru ini?")) return;
//     try {
//       await deleteTeachers(id);
//       const updatedTeachers = await fetchTeachers();
//       setTeachers(updatedTeachers);
//       setAllTeachers(updatedTeachers);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Form validation
//   const validateForm = () => {
//     const newErrors = {};

//     if (!post.name) newErrors.name = ["Nama wajib diisi."];
//     if (!post.email) newErrors.email = ["Email wajib diisi."];
//     if (!post.gender) newErrors.gender = ["Jenis kelamin wajib dipilih."];
//     if (!post.nisn) newErrors.nisn = ["NISN wajib diisi."];
//     if (!post.birth_place) newErrors.birth_place = ["Tempat lahir wajib diisi."];
//     if (!post.birth_date) newErrors.birth_date = ["Tanggal lahir wajib diisi."];
//     if (!post.number_kk) newErrors.number_kk = ["No KK wajib diisi."];
//     if (!post.number_akta) newErrors.number_akta = ["No Akta wajib diisi."];
//     if (!post.order_child) newErrors.order_child = ["Anak ke wajib diisi."];
//     if (!post.count_siblings) newErrors.count_siblings = ["Jumlah saudara wajib diisi."];
//     if (!post.address) newErrors.address = ["Alamat wajib diisi."];
//     if (!post.religion_id) newErrors.religion_id = ["Agama wajib dipilih."];
//     if (!post.majors) newErrors.majors = ["Jurusan wajib dipilih."];
//     if (!post.levelclasses) newErrors.levelclasses = ["Tingkatan wajib dipilih."];

//     return newErrors;
//   };

//   // Filter teachers based on search and category
//   const filteredTeachers = allTeachers.filter((teacher) => {
//     const keyword = searchTerm.toLowerCase();
//     const matchesSearch =
//       teacher.name?.toLowerCase().includes(keyword) ||
//       teacher.nisn?.toLowerCase().includes(keyword) ||
//       teacher.gender?.toLowerCase().includes(keyword);

//     let matchesFilter = true;
//     if (currentFilter.type && currentFilter.value) {
//       switch (currentFilter.type) {
//         case "gender":
//           matchesFilter = teacher.gender?.toLowerCase() === currentFilter.value.toLowerCase();
//           break;
//         case "majors":
//           matchesFilter = teacher.majors?.toLowerCase() === currentFilter.value.toLowerCase();
//           break;
//         case "levelclasses":
//           matchesFilter = teacher.levelclasses?.toLowerCase() === currentFilter.value.toLowerCase();
//           break;
//         default:
//           matchesFilter = true;
//       }
//     }

//     return matchesSearch && matchesFilter;
//   });

//   // Handle category selection
//   const handleCategorySelect = (selected) => {
//     setCategory(selected);
//     setOpenCategory(false);
//     setOpenSubMenu("");

//     if (selected === "Semua Kategori") {
//       setCurrentFilter({ type: null, value: null });
//       return;
//     }

//     let filterType = null;
//     let filterValue = null;

//     if (selected.startsWith("Gender: ")) {
//       const genderLabel = selected.split(": ")[1];
//       filterValue = genderLabel;
//       filterType = "gender";
//     } else if (selected.startsWith("majors: ")) {
//       filterValue = selected.split(": ")[1];
//       filterType = "majors";
//     } else if (selected.startsWith("levelclasses: ")) {
//       filterValue = selected.split(": ")[1];
//       filterType = "levelclasses";
//     }

//     setCurrentFilter({ type: filterType, value: filterValue });
//   };

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredTeachers.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const currentTeachers = filteredTeachers.slice(startIndex, startIndex + rowsPerPage);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   // Reset form for adding new data
//   const resetForm = () => {
//     setEditingId(null);
//     setPost({
//       name: "",
//       email: "",
//       image: null,
//       nisn: "",
//       birth_place: "",
//       birth_date: "",
//       number_kk: "",
//       number_akta: "",
//       order_child: "",
//       count_siblings: "",
//       address: "",
//       religion_id: "",
//       gender: "",
//       majors: "",
//       levelclasses: "",
//     });
//     setIsOpen(true);
//   };

//   return {
//     // Modal states
//     isOpen,
//     setIsOpen,
//     isDetailOpen,
//     setIsDetailOpen,
//     selectedTeacher,
    
//     // Data states
//     teachers: filteredTeachers,
//     currentTeachers,
//     religions,
//     majors,
//     levelclasses,
    
//     // Form states
//     post,
//     editingId,
//     errors,
    
//     // Filter & Search states
//     searchTerm,
//     setSearchTerm,
//     category,
//     openCategory,
//     setOpenCategory,
//     openSubMenu,
//     setOpenSubMenu,
    
//     // Pagination states
//     currentPage,
//     totalPages,
//     startIndex,
//     rowsPerPage,
    
//     // Methods
//     handleInput,
//     handleSubmit,
//     handleEdit,
//     handleDetail,
//     handleDelete,
//     handleCategorySelect,
//     handlePageChange,
//     resetForm,
//   };
// };