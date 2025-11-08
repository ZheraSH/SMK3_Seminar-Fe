// "use client"
// import { X } from "lucide-react"

// export default function TeacherForm({
//   showModal,
//   handleCloseModal,
//   editingTeacherIdRef,
//   formData,
//   handleChange,
//   handleSubmit,
//   religions,
// }) {
//   if (!showModal) return null

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//       <div className="bg-white p-5 w-[680px] h-[100%] rounded-[10px] shadow-2xl my-12 relative animate-in zoom-in-95 fade-in-0">
//         <button
//           onClick={handleCloseModal}
//           className="absolute right-4 top-4 text-gray-500 hover:text-black p-1 rounded-full hover:bg-gray-100 transition-colors"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         <h2 className="text-lg mb-3 pb-1 font-semibold border-gray-200">
//           {editingTeacherIdRef.current ? `Edit Data Guru (ID: ${editingTeacherIdRef.current})` : "Tambah Guru"}
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//               Nama Lengkap <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Masukkan nama lengkap"
//               className="bg-[#000000]/5 border border-gray-300 p-2 rounded-lg w-full text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Masukkan Email"
//               className="bg-[#000000]/5 border border-gray-300 p-2 rounded-lg w-full text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
//             />
//           </div>

//           <div>
//             <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
//               Foto Guru <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="image"
//               name="image"
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 const file = e.target.files[0]
//                 if (file) handleChange({ target: { name: "image", value: file } })
//               }}
//               className="file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border file:border-gray-300 file:text-gray-600 file:text-sm 
//                             file:font-medium file:bg-white  hover:file:bg-blue-100
//                             bg-[#000000]/5 p-1 border border-gray-300 rounded-lg w-full text-sm transition-shadow"
//             />
//           </div>

//           <div>
//             <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
//               Jenis Kelamin
//             </label>
//             <select
//               id="gender"
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               className="bg-[#000000]/5 border border-gray-300 p-2 rounded-lg w-full text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
//             >
//               <option value="">Pilih jenis kelamin</option>
//               <option value="male">Laki-laki</option>
//               <option value="female">Perempuan</option>
//             </select>
//           </div>

//           <div>
//             <label htmlFor="NIK" className="block text-sm font-medium text-gray-700 mb-1">
//               NIK <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="NIK"
//               name="NIK"
//               value={formData.NIK}
//               onChange={handleChange}
//               placeholder="Masukkan NIK"
//               className="bg-[#000000]/5 border border-gray-300 p-2 rounded-lg w-full text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
//             />
//           </div>

//           <div>
//             <label htmlFor="NIP" className="block text-sm font-medium text-gray-700 mb-1">
//               NIP <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="NIP"
//               name="NIP"
//               value={formData.NIP}
//               onChange={handleChange}
//               placeholder="Masukkan NIP"
//               className="bg-[#000000]/5 border border-gray-300 p-2 rounded-lg w-full text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
//             />
//           </div>

//           <div>
//             <label htmlFor="birth_place" className="block text-sm font-medium text-gray-700 mb-1">
//               Tempat Lahir <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="birth_place"
//               name="birth_place"
//               value={formData.birth_place}
//               onChange={handleChange}
//               placeholder="Masukkan tempat lahir"
//               className="bg-[#000000]/5 border border-gray-300 p-2 rounded-lg w-full text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
//             />
//           </div>

//           <div>
//             <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-1">
//               Tanggal Lahir <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="birth_date"
//               name="birth_date"
//               value={formData.birth_date}
//               onChange={handleChange}
//               className="bg-[#000000]/5 border border-gray-300 p-2 rounded-lg w-full text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
//               type="date"
//             />
//           </div>

//           <div>
//             <label htmlFor="religion_id" className="block text-sm font-medium text-gray-700 mb-1">
//               Agama
//             </label>
//             <select
//               id="religion_id"
//               name="religion_id"
//               value={formData.religion_id || ""} 
//               onChange={handleChange}
//               className="bg-[#000000]/5 border border-gray-300 p-2 rounded-lg w-full text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
//             >
//               <option value="">Pilih agama</option>

//               {Array.isArray(religions) && religions.length > 0 ? (
//                 religions.map((religion) => (
//                   <option key={religion.id} value={religion.id}>
//                     {religion.name}
//                   </option>
//                 ))
//               ) : (
//                 <option disabled>Loading...</option> 
//               )}
//             </select>
//           </div>

//           <div>
//             <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
//               Nomor Telepon <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="phone_number"
//               name="phone_number"
//               value={formData.phone_number}
//               onChange={handleChange}
//               placeholder="Contoh: 081234567890"
//               className="bg-[#000000]/5 border border-gray-300 p-2 rounded-lg w-full text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
//               type="tel"
//             />
//           </div>

//           <div className="col-span-1">
//             <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
//               Role <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="role"
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               placeholder="Contoh: Pengajar / BK / Wali Kelas"
//               className="bg-[#000000]/5 border border-gray-300 p-2 rounded-lg w-full text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
//             />
//           </div>

//           <div className="col-span-1">
//             <label htmlFor="mapel" className="block text-sm font-medium text-gray-700 mb-1">
//               Mata Pelajaran <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="mapel"
//               name="mapel"
//               value={formData.mapel}
//               onChange={handleChange}
//               placeholder="Contoh: Matematika"
//               className="bg-[#000000]/5 border border-gray-300 p-2 rounded-lg w-full text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
//             />
//           </div>

//           <div className="col-span-2">
//             <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
//               Alamat Lengkap <span className="text-red-500">*</span>
//             </label>
//             <input
//               id="address"
//               name="address"
//               rows="2"
//               value={formData.address}
//               onChange={handleChange}
//               placeholder="Masukkan alamat lengkap"
//               className="bg-[#000000]/5 border border-gray-300 p-2 rounded-lg w-full text-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow resize-none"
//             ></input>~
//           </div>
//         </div>

//         <div className="flex justify-end pt-3 border-t border-gray-100">
//           <button
//             onClick={handleSubmit}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all font-semibold shadow-md shadow-blue-500/30"
//           >
//             {editingTeacherIdRef.current ? "Simpan Perubahan" : "+ Tambah"}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
