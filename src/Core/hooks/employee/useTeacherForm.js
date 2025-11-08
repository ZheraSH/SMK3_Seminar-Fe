import { useState,useEffect } from "react"
import { createEmployee, updateEmployee, deleteEmployee } from "@api/Employee"
import { getRoles } from "@api/Roles"

// Fungsi bantu untuk pastikan gambar bisa diakses dari backend
const resolveImageUrl = (imagePath) => {
  if (!imagePath) return "/images/default-user.png"
  return imagePath.startsWith("http")
    ? imagePath
    : `http://127.0.0.1:8000${imagePath}`
}

export const useTeacherForm = (refreshData, editingTeacherIdRef) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    NIP: "",
    NIK: "",
    birth_date: "",
    birth_place: "",
    phone_number: "",
    religion_id: "",
    address: "",
    roles: "",
    mapel: "",
    email: "",
    image: null,
  })

  const [roles, setRoles] = useState([]) // ⬅️ Tambahkan state roles

  // 🔹 Panggil API getRoles saat pertama kali hook ini dijalankan
  useEffect(() => {
    const fetchRoles = async () => {
      const data = await getRoles()
      console.log("Roles API result:", data)
      setRoles(data)
    }

    fetchRoles()
  }, [])

  // 🔹 Handle perubahan input (termasuk select)
  const handleChange = (e) => {
    const { name, value, multiple, options, files } = e.target

    if (files && files[0]) {
      // Input file (gambar)
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
      return
    }

    if (multiple) {
      const values = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value)
      setFormData((prev) => ({ ...prev, [name]: values }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // 🔹 Tambah guru baru
  const handleSubmit = async () => {
    try {
      if (!formData.name || !formData.NIP || !formData.email) {
        alert("Nama, NIP, dan Email wajib diisi!")
        return
      }

      const submitData = new FormData()
      submitData.append("name", formData.name)
      submitData.append("email", formData.email)
      submitData.append("gender", formData.gender)
      submitData.append("NIP", formData.NIP)
      submitData.append("NIK", formData.NIK || "")
      submitData.append("birth_date", formData.birth_date)
      submitData.append("birth_place", formData.birth_place)
      submitData.append("phone_number", formData.phone_number || "")
      submitData.append("religion_id", formData.religion_id || "")
      submitData.append("address", formData.address)
      submitData.append("mapel", formData.mapel || "")

      // roles dikirim dalam bentuk array
      if (formData.roles) {
        submitData.append("roles[]", formData.roles)
      }

      // upload gambar
      if (formData.image && typeof formData.image !== "string") {
        submitData.append("image", formData.image)
      }

      await createEmployee(submitData)
      alert("Guru baru berhasil ditambahkan!")
      await refreshData()
      return true
    } catch (error) {
      console.error("Error creating teacher:", error)
      alert(error.response?.data?.message || "Terjadi kesalahan saat menambah guru!")
      return false
    }
  }

  // 🔹 Update data guru
  const handleUpdateSubmit = async () => {
    try {
      const id = editingTeacherIdRef.current
      if (!id) {
        alert("ID guru tidak ditemukan!")
        return false
      }

      const submitData = new FormData()
      submitData.append("name", formData.name)
      submitData.append("email", formData.email)
      submitData.append("gender", formData.gender)
      submitData.append("NIP", formData.NIP)
      submitData.append("NIK", formData.NIK || "")
      submitData.append("birth_date", formData.birth_date)
      submitData.append("birth_place", formData.birth_place)
      submitData.append("phone_number", formData.phone_number || "")
      submitData.append("religion_id", formData.religion_id || "")
      submitData.append("address", formData.address)
      submitData.append("mapel", formData.mapel || "")

      if (formData.roles) {
        submitData.append("roles[]", formData.roles)
      }

      if (formData.image && typeof formData.image !== "string") {
        submitData.append("image", formData.image)
      }

      await updateEmployee(id, submitData)
      alert("Data guru berhasil diperbarui!")
      await refreshData()
      return true
    } catch (error) {
      console.error("Error updating teacher:", error)
      alert(error.response?.data?.message || "Gagal memperbarui data guru!")
      return false
    }
  }

  // 🔹 Hapus guru
  const handleDelete = async (id) => {
    if (!id) {
      alert("ID guru tidak ditemukan!")
      return false
    }

    if (!window.confirm("Yakin ingin menghapus guru ini?")) return false

    try {
      await deleteEmployee(id)
      alert("Guru berhasil dihapus!")
      await refreshData()
      return true
    } catch (error) {
      console.error(error)
      alert("Gagal menghapus guru!")
      return false
    }
  }

  // 🔹 Saat klik edit (prefill form)
  const handleEditClick = (teacherToEdit) => {
    if (!teacherToEdit) return

    const formattedBirthDate = teacherToEdit.birth_date
      ? teacherToEdit.birth_date.split("T")[0]
      : ""

    setFormData({
      name: teacherToEdit.name || "",
      gender: teacherToEdit.gender?.value || teacherToEdit.gender || "",
      NIP: teacherToEdit.NIP || "",
      NIK: teacherToEdit.NIK || "",
      birth_date: formattedBirthDate,
      birth_place: teacherToEdit.birth_place || "",
      phone_number: teacherToEdit.phone_number || "",
      religion_id:
        teacherToEdit.religion_id?.toString() ||
        teacherToEdit.religion?.id?.toString() ||
        "",
      address: teacherToEdit.address || "",
      roles: Array.isArray(teacherToEdit.roles)
        ? teacherToEdit.roles[0] || ""
        : teacherToEdit.role_id || "",
      mapel: teacherToEdit.mapel || "",
      email: teacherToEdit.email || "",
      image: resolveImageUrl(teacherToEdit.image),
    })

    editingTeacherIdRef.current = teacherToEdit.id
  }

  // 🔹 Untuk detail guru
  const handleShowDetail = (teacher) => teacher

  // 🔹 Toggle menu aksi
  const handleToggleMenu = (currentOpenMenuId, id, setOpenMenuId) => {
    setOpenMenuId(currentOpenMenuId === id ? null : id)
  }

  // 🔹 Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      gender: "",
      NIP: "",
      NIK: "",
      birth_date: "",
      birth_place: "",
      phone_number: "",
      religion_id: "",
      address: "",
      roles: "",
      mapel: "",
      email: "",
      image: null,
    })
    editingTeacherIdRef.current = null
  }

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    handleUpdateSubmit,
    handleDelete,
    handleEditClick,
    handleShowDetail,
    handleToggleMenu,
    resetForm,
  }
}
