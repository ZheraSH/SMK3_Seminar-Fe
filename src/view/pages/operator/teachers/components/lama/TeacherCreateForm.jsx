"use client"
import { useState } from "react"
import { X } from "lucide-react"

export default function TeacherCreateForm({
  showModal,
  handleCloseModal,
  formData,
  handleChange,
  handleSubmit,
  roles,
  religions,
  nipError,
}) {
  const [errors, setErrors] = useState({})
  console.log("formData:", formData)

  if (!showModal) return null

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name) newErrors.name = "Nama wajib diisi."
    if (!formData.email) newErrors.email = "Email wajib diisi."
    if (!formData.gender) newErrors.gender = "Jenis kelamin wajib dipilih."
    if (!formData.NIK) newErrors.NIK = "NIK wajib diisi."
    if (!formData.NIP) newErrors.NIP = "NIP wajib diisi."
    if (!formData.birth_place) newErrors.birth_place = "Tempat lahir wajib diisi."
    if (!formData.birth_date) newErrors.birth_date = "Tanggal lahir wajib diisi."
    if (!formData.phone_number) newErrors.phone_number = "Nomor telepon wajib diisi."
    if (!formData.mapel) newErrors.mapel = "Mata pelajaran wajib diisi."
    if (!formData.address) newErrors.address = "Alamat wajib diisi."
    if (!formData.roles) newErrors.roles = "Role Wajib diisi."

    if (nipError) newErrors.NIP = "NIP sudah digunakan."

    return newErrors
  }

  const handleLocalSubmit = () => {
    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      handleSubmit()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-[680px] rounded-[10px] shadow-2xl my-12 relative animate-in zoom-in-95 fade-in-0">
        {/* Tombol Close */}
        <button
          onClick={handleCloseModal}
          className="absolute right-4 top-4 text-gray-500 hover:text-black p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-2">
          <h2 className="text-lg font-semibold border-gray-200">
            Tambah Guru
          </h2>
        </div>

        {/* Form dengan Scroll */}
        <div className="px-6 overflow-y-auto max-h-[70vh] pb-4">
          <FormFields
            formData={formData}
            handleChange={handleChange}
            religions={religions}
            roles={roles}
            errors={errors}
          />
        </div>

        {/* Tombol Submit */}
        <div className="flex justify-end px-6 py-4 border-t border-gray-100">
          <button
            onClick={handleLocalSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all font-semibold shadow-md shadow-blue-500/30"
          >
            + Tambah
          </button>
        </div>
      </div>
    </div>
  )
}

function FormFields({ formData, handleChange, religions, roles, errors }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Nama */}
      <InputField
        label="Nama Lengkap"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Masukkan nama lengkap"
        required
        error={errors.name}
      />

      {/* Email */}
      <InputField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Masukkan Email"
        required
        error={errors.email}
      />

      {/* Foto */}
      <FileField
        label="Foto Guru"
        name="image"
        onChange={handleChange}
        required
      />

      {/* Gender */}
      <SelectField
        label="Jenis Kelamin"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
        options={[
          { value: "", label: "Pilih jenis kelamin" },
          { value: "male", label: "Laki-laki" },
          { value: "female", label: "Perempuan" },
        ]}
        error={errors.gender}
      />

      {/* NIK */}
      <InputField
        label="NIK"
        name="NIK"
        value={formData.NIK}
        onChange={handleChange}
        placeholder="Masukkan NIK"
        required
        error={errors.NIK}
      />

      {/* NIP */}
      <InputField
        label="NIP"
        name="NIP"
        value={formData.NIP}
        onChange={handleChange}
        placeholder="Masukkan NIP"
        required
        error={errors.NIP}
      />

      {/* Tempat Lahir */}
      <InputField
        label="Tempat Lahir"
        name="birth_place"
        value={formData.birth_place}
        onChange={handleChange}
        placeholder="Masukkan tempat lahir"
        required
        error={errors.birth_place}
      />

      {/* Tanggal Lahir */}
      <InputField
        label="Tanggal Lahir"
        name="birth_date"
        type="date"
        value={formData.birth_date}
        onChange={handleChange}
        required
        error={errors.birth_date}
      />

      {/* Agama */}
      <SelectField
        label="Agama"
        name="religion_id"
        value={formData.religion_id}
        onChange={handleChange}
        options={[{ value: "", label: "Pilih agama" }, ...religions.map((r) => ({ value: r.id, label: r.name }))]}
      />

      {/* Nomor Telepon */}
      <InputField
        label="Nomor Telepon"
        name="phone_number"
        type="tel"
        value={formData.phone_number}
        onChange={handleChange}
        placeholder="Contoh: 081234567890"
        required
        error={errors.phone_number}
      />

      {/* Role */}
        <SelectField
  label="Role"
  name="roles"
  value={String(formData.roles ?? "")} // nilai awal kosong ""
  onChange={handleChange}
  options={[
    { value: "", label: "-- Pilih Role --" },
    ...roles.map((r) => ({
      value: String(r.id),  // id role
      label: r.name,        // nama role
    })),
  ]}
/>




      {/* Mata Pelajaran */}
      <InputField
        label="Mata Pelajaran"
        name="mapel"
        value={formData.mapel}
        onChange={handleChange}
        placeholder="Contoh: Matematika"
        required
        error={errors.mapel}
      />

      {/* Alamat */}
      <div className="col-span-2">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Alamat Lengkap <span className="text-red-500">*</span>
        </label>
        <textarea
          id="address"
          name="address"
          rows="2"
          value={formData.address}
          onChange={handleChange}
          placeholder="Masukkan alamat lengkap"
          className={`bg-[#000000]/5 border ${errors.address ? "border-red-500" : "border-gray-300"} p-2 rounded-lg w-full text-sm resize-none`}
        />
        {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
      </div>
    </div>
  )
}

/* --- Subcomponents --- */

function InputField({ label, name, value, onChange, placeholder, type = "text", required, error }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-[#000000]/5 border ${error ? "border-red-500" : "border-gray-300"} p-2 rounded-lg w-full text-sm`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}

function FileField({ label, name, onChange, required }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0]
          if (file) onChange({ target: { name, value: file } })
        }}
        className="file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border file:border-gray-300 file:text-gray-600 file:text-sm 
        file:font-medium file:bg-white hover:file:bg-blue-100
        bg-[#000000]/5 p-1 border border-gray-300 rounded-lg w-full text-sm transition-shadow"
      />
    </div>
  )
}

function SelectField({ label, name, value, onChange, options, required, error }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`bg-[#000000]/5 border ${error ? "border-red-500" : "border-gray-300"} p-2 rounded-lg w-full text-sm`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}
