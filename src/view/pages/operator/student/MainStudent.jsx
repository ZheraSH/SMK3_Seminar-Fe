"use client"

import { useState, useEffect } from "react"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { FormModal } from "./components/FormModal"
import { DetailModal } from "./components/DetailModal"

import {
  fetchStudents,
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
    gender: "",
    religion_id: 1,
  })
  const [editingId, setEditingId] = useState(null)
  const [errors, setErrors] = useState({})
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 8
  const startIndex = (page - 1) * perPage
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0 })

  const [currentFilter, setCurrentFilter] = useState({
    backendKey: null,
    value: null,
  })

  const extractFiltersFromStudents = (studentsData) => {
    const majors = new Set()
    const levelclasses = new Set()

    studentsData.forEach((student) => {
      const cls = student.classroom
      if (cls?.major) majors.add(cls.major)
      if (cls?.level_class) levelclasses.add(cls.level_class)
    })

    return {
      majors: [...majors].sort(),
      levelclasses: [...levelclasses].sort(),
    }
  }

  const loadOtherData = async () => {
    try {
      const religionsData = await fetchReligions()
      setReligions(religionsData)
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

      const filterOptions = extractFiltersFromStudents(res.data)
      setMajors(filterOptions.majors)
      setLevelclasses(filterOptions.levelclasses)
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
        gender: "",
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

  // ✅ HANDLE EDIT — MIRIP TEACHER, MINIM PERUBAHAN
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
      gender: student.gender_value  || "",
      religion_id:
        student.religion_id ||
        student.religion?.id ||
        1,
    })

    setEditingId(student.id)
    setIsOpen(true)
  }

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

  const handleCategorySelect = (filterObj) => {
    const backendMap = {
      gender: "gender",
      major: "major_id",
      level_class: "level_class",
    }

    if (filterObj.type === "all") {
      setCategory("Pilih Kategori")
      setCurrentFilter({ backendKey: null, value: null })
    } else {
      setCategory(filterObj.label)
      setCurrentFilter({
        backendKey: backendMap[filterObj.type],
        value: filterObj.value,
      })
    }

    setPage(1)
    setOpenCategory(false)
    setOpenSubMenu("")
  }

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
        majors={majors}
        levelclasses={levelclasses}
        onCategorySelect={handleCategorySelect}
        onAddData={() => {
          setEditingId(null)
          setIsOpen(true)
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
      />

      <StudentsTable
        students={students}
        startIndex={startIndex}
        onDetail={handleDetail}
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
