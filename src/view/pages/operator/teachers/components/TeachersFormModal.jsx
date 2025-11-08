"use client";

import React from "react";
import { RoleEnum, RoleLabels } from "@/core/enums/RoleEnum";
import { GenderEnum } from "@/core/enums/GenderEnum";

export function FormModal({
  isOpen,
  onClose,
  onSubmit,
  post,
  onInputChange,
  editingId,
  errors,
  religions,
  levelclasses,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-[700px] max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {editingId ? "Edit Siswa" : "Tambah Siswa"}
        </h2>

        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
              value={post.gender}
            >
              <option value="">Pilih jenis kelamin</option>
              <option value={GenderEnum.MALE}>{GenderEnum.MALE}</option>
              <option value={GenderEnum.FEMALE}>{GenderEnum.FEMALE}</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender[0]}</p>
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
              type="number"
              placeholder="Masukkan NIK"
              name="NIK"
              value={post.NIK}
              onChange={onInputChange}
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
              type="number"
              placeholder="Masukkan NIP"
              name="NIP"
              value={post.NIP}
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              type="number"
              placeholder="-"
              name="phone_number"
              value={post.phone_number}
              onChange={onInputChange}
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
              onChange={onInputChange}
              value={
                Array.isArray(post.roles) ? post.roles[0] : post.roles || ""
              }
            >
              <option value="">Pilih Role</option>
              {Object.entries(RoleLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            {errors.roles && (
              <p className="text-red-500 text-sm mt-1">{errors.roles[0]}</p>
            )}
          </div>

          {/* Field Maple */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-600">
              Tingkatan *
            </label>
            <select
              name="levelclasses"
              className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.maple ? "border-red-500" : "border-gray-300"
              }`}
              onChange={onInputChange}
              value={post.maple}
            >
              <option value="">Pilih Tingkatan</option>
              {maple.map((levelclass) => (
                <option key={levelclass.id} value={levelclass.id}>
                  {levelclass.name}
                </option>
              ))}
            </select>
            {errors.maple && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maple[0]}
              </p>
            )}
          </div> */}

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
              onChange={onInputChange}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address[0]}</p>
            )}
          </div>

          {/* Tombol Aksi */}
          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
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
  );
}
