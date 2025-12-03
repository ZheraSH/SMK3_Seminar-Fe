"use client"

import { useState, useEffect } from "react"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { FormModal } from "./components/FormModal"
import { DetailModal } from "./components/DetailModal"

import {
  fetchStudents,
  fetchlevelclasses,
  fetchMajors,
  fetchReligions,
  submitStudent,
  deleteStudent,
} from "@/Core/api/role-operator/student/StudentApi"
import { StudentsTable } from "./components/StudentTable"
import { PaginationStudent } from "./components/Pagination"
import { SearchFilter } from "./components/Search-Filter"

export const MainStudent = () => {
  const [openCategory, setOpenCategory] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState("")
  const [category, setCategory] = useState("Pilih Kategori")
  const [isOpen, setIsOpen] = useState(false)
  const [students, setStudents] = useState([])
  const [majors, setMajors] = useState([])
  const [levelclasses, setLevelclasses] = useState([])
  const [religions, setReligions] = useState([])
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
  })
  const [editingId, setEditingId] = useState(null)
  const [errors, setErrors] = useState({})
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false) // State untuk modal detail
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 8
  const startIndex = (page - 1) * perPage
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 })
  const [currentFilter, setCurrentFilter] = useState({
    backendKey: null,
    value: null,
  })

  // Load Majors / Classes / Religions
  const loadOtherData = async () => {
    try {
      const [religionsData, majorsData, levelclassesData] = await Promise.all([
        fetchReligions(),
        fetchMajors(),
        fetchlevelclasses(),
      ])
      setReligions(religionsData)
      setMajors(majorsData)
      setLevelclasses(levelclassesData)
    } catch (err) {
      console.error(err)
    }
  }

  const loadStudents = async () => {
    try {
      const filters = {}
      if (currentFilter.backendKey && currentFilter.value) {
        filters[currentFilter.backendKey] = currentFilter.value
      }
      const res = await fetchStudents(page, searchTerm, filters)
      setStudents(res.data)
      setMeta(res.meta)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadStudents()
  }, [page, searchTerm, currentFilter])

  useEffect(() => {
    loadOtherData()
  }, [])

  const handleInput = (e) => {
    const { name, type, files, value } = e.target
    setPost({ ...post, [name]: type === "file" ? files[0] : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const frontendErrors = validateForm()
    if (Object.keys(frontendErrors).length > 0) return setErrors(frontendErrors)
    setErrors({})
    try {
      await submitStudent(post, editingId)
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
      })
      setEditingId(null)
      setPage(1)
      loadStudents()
      setIsOpen(false)
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!post.name) newErrors.name = ["Nama wajib diisi."]
    if (!post.email) newErrors.email = ["Email wajib diisi."]
    if (!post.gender) newErrors.gender = ["Jenis kelamin wajib dipilih."]
    return newErrors
  }

  const handleEdit = (student) => {
    let normalizedGender = student.gender || ""
    if (["L", "laki-laki"].includes(student.gender)) normalizedGender = "male"
    if (["P", "perempuan"].includes(student.gender)) normalizedGender = "female"
    setPost({ ...student, gender: normalizedGender, image: null })
    setEditingId(student.id)
    setIsOpen(true)
  }

  // Fungsi untuk membuka modal detail
  const handleDetail = (student) => {
    setSelectedStudent(student)
    setIsDetailOpen(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus siswa ini?")) return
    try {
      await deleteStudent(id)
      loadStudents()
    } catch (err) {
      console.error(err)
    }
  }

  // Filter majors & classes based on students that actually have classroom
  const availableMajors = majors.filter((m) => 
    students.some((s) => s.classroom?.major === m.name)
  )

  const availableLevelclasses = levelclasses.filter((l) => 
    students.some((s) => s.classroom?.level_class === l.name)
  )

  return (
    <div className="p-6">
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={(v) => {
          setPage(1)
          setSearchTerm(v)
        }}
        openCategory={openCategory}
        onOpenCategory={setOpenCategory}
        openSubMenu={openSubMenu}
        onOpenSubMenu={setOpenSubMenu}
        category={category}
        majors={availableMajors}
        levelclasses={availableLevelclasses}
        onCategorySelect={(filterObj) => {
          setCategory(filterObj.label || "Pilih Kategori")
          if (filterObj.type === "all") {
            setCurrentFilter({ backendKey: null, value: null })
          } else {
            // Map: "gender" -> "gender", "majors" -> "major", "levelclasses" -> "level_class"
            let backendKey = filterObj.type
            if (filterObj.type === "majors") backendKey = "major"
            if (filterObj.type === "levelclasses") backendKey = "level_class"
            setCurrentFilter({ backendKey, value: filterObj.value })
          }
          setPage(1)
        }}
        onAddData={() => {
          setEditingId(null)
          setIsOpen(true)
        }}
      />
      
      {/* Modal Detail */}
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
      />
      
      <StudentsTable
        students={students}
        startIndex={startIndex}
        onDetail={handleDetail} // Pastikan prop ini dikirim
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
    </div>
  )
}