import React from 'react';

export const TeacherForm = ({
  isOpen,
  setIsOpen,
  post,
  setPost,
  religions,
  errors,
  editingId,
  handleInput,
  handleSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-[700px] max-h-[90vh] overflow-y-auto p-6 relative">
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

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Role *
            </label>
            <select
              name="roles"
              value={post.roles[0] || ""}
              onChange={(e) =>
                setPost((prev) => ({
                  ...prev,
                  roles: [e.target.value],
                }))
              }
              className="border px-3 py-2 rounded-md w-full"
            >
              <option value="">Pilih Role</option>
              <option value="Guru">Guru</option>
              <option value="Admin">Admin</option>
              <option value="Wali Kelas">Wali Kelas</option>
            </select>
            {errors.roles && (
              <p className="text-red-500 text-sm mt-1">
                {errors.roles[0]}
              </p>
            )}
          </div>

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
  );
};
