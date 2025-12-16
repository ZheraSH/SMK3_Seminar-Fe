"use client";

import React from "react";

export function FormModal({
  isOpen,
  onClose,
  onSubmit,
  post,
  onInputChange,
  editingId,
  errors,
  religions,
  majors,
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
              <p>
                {" "}
                Nama Lengkap <span className="text-red-500">*</span>
              </p>
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
              <p>
                {" "}
                Email <span className="text-red-500">*</span>
              </p>
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
              <p>
                {" "}
                Foto <span className="text-red-500">*</span>
              </p>
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
              <p>
                {" "}
                Jenis Kelamin <span className="text-red-500">*</span>
              </p>
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
              <p>
                {" "}
                NISN <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              className={`border rounded-lg p-2 w-full ${
                errors.nisn ? "border-red-500" : "border-gray-300"
              }`}
              type="number"
              placeholder="Masukkan NISN"
              name="nisn"
              value={post.nisn}
              onChange={onInputChange}
            />
            {errors.nisn && (
              <p className="text-red-500 text-sm mt-1">{errors.nisn[0]}</p>
            )}
          </div>

          {/* Field Agama */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              <p>
                {" "}
                Agama <span className="text-red-500">*</span>
              </p>
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

          {/* Field Tempat Lahir */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              <p>
                {" "}
                Tempat Lahir <span className="text-red-500">*</span>
              </p>
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
              <p>
                {" "}
                Tanggal Lahir <span className="text-red-500">*</span>
              </p>
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

          {/* Field No KK */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              <p>
                {" "}
                Nomer KK <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              className={`border rounded-lg p-2 w-full ${
                errors.number_kk ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="-"
              type="number"
              name="number_kk"
              value={post.number_kk}
              onChange={onInputChange}
            />
            {errors.number_kk && (
              <p className="text-red-500 text-sm mt-1">{errors.number_kk[0]}</p>
            )}
          </div>

          {/* Field Saudara Ke */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              <p>
                {" "}
                Saudara Ke <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.count_siblings ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="-"
              type="number"
              name="count_siblings"
              value={post.count_siblings}
              onChange={onInputChange}
            />
            {errors.count_siblings && (
              <p className="text-red-500 text-sm mt-1">
                {errors.count_siblings[0]}
              </p>
            )}
          </div>

          {/* Field No Akta */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              <p>
                {" "}
                Nomer Akta <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              className={`border rounded-lg p-2 w-full ${
                errors.number_akta ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="-"
              type="number"
              name="number_akta"
              value={post.number_akta}
              onChange={onInputChange}
            />
            {errors.number_akta && (
              <p className="text-red-500 text-sm mt-1">
                {errors.number_akta[0]}
              </p>
            )}
          </div>

          {/* Field Anak Ke */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              <p>
                {" "}
                Anak Ke <span className="text-red-500">*</span>
              </p>
            </label>
            <input
              className={`border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.order_child ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="-"
              type="number"
              name="order_child"
              value={post.order_child}
              onChange={onInputChange}
            />
            {errors.order_child && (
              <p className="text-red-500 text-sm mt-1">
                {errors.order_child[0]}
              </p>
            )}
          </div>

          {/* Field Alamat */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              <p>
                {" "}
                Alamat <span className="text-red-500">*</span>
              </p>
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
