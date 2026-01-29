

"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut,ArrowLeftToLine } from "lucide-react";
import fetchProfile from "../../../../Core/hooks/profile/profileAkun/useProfile";
import LoadingData from "../loadingData/loading";
import { notify } from "../../../../Core/hooks/notification/notify";

export default function ProfileEmploye() {
  const [isOpenFrom, setIsOpenFrom] = useState(false);
  const navigate = useNavigate();
  const {
    data,loading,error
  } = fetchProfile ();


  if (isOpenFrom) {
    return (
      <FormClassStudent
        onClose={() => setIsOpenFrom(false)}
        user={data}
      />
    );
  }

  if(loading) {
    return(<LoadingData loading={loading} type=" profilePage" />)
  }
  return (
    <div className="relative justify-center pb-5">
      <img
        src="/images/profil/bg-profile1.png"
        alt="banner-profile"
        className="w-full h-[140px] block rounded-3xl mt-4 object-cover"
      />

      <div className="-mt-9 relative z-10 px-0 lg:px-[10px] ">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-md pr-0 lg:mr-0.5">

          <div className="px-4 md:px-7 pt-12 pb-16">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">

              <div className="flex gap-6">
                <div className="-mt-24 relative z-20">
                  <div className="bg-white rounded-full ml-2">
                    <img
                      src={data.photo || "/images/team/valen.jpg"}
                      alt="Profile"
                      className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] rounded-full object-cover border-4 border-white"
                    />
                  </div>
                </div>

                <div className="mb-2 -mt-5">
                  <h1 className="md:text-[30px] lg:text-[24px] font-semibold text-black">
                    {data.name || "Irwandi Mustabir"}
                  </h1>
                  <p className="text-black text-[15px] md:text-[20px] lg:text-lg">
                    {data.profile_type === 'student' ? 'Siswa' : 'Karyawan'}
                  </p>
                </div>
              </div>

              <div className="-mt-5 flex gap-2">
                <button
                  onClick={() => setIsOpenFrom(true)}
                  className="px-2 py-1.5 md:px-4 md:py-2 bg-[#4489F4] hover:bg-blue-600 text-white rounded-md text-[13px] md:text-[14px] font-medium transition"
                >
                  Edit Profil
                </button>

                <button
                  onClick={() => {
                    if (window.history.length > 1) {
                      navigate(-1);
                    } else {
                      navigate("/student-home");
                    }
                  }}
                  className="bg-[#D1D5DB] text-black flex gap-2 px-2 py-1.5 md:px-4 md:py-2 rounded-md text-[13px] md:text-[14px] font-medium hover:bg-[#c8cace]"
                >
                  <ArrowLeftToLine size={20} /> Kembali
                </button>
              </div>
            </div>

            <div className="mt-5">
              <h2 className="text-[20px] md:text-[30px] lg:text-[24px] font-semibold text-black mb-8">
                Informasi Akun
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-5 px-5 ">
               
                  <div className="space-y-6">
                    <ProfileInfoRow label="Nama Lengkap" value={data.name} />
                    <ProfileInfoRow label="Jenis Kelamin" value={data.gender?.label} />
                  </div>
                <div className="space-y-6">
                  <ProfileInfoRow label="Email" value={data.email} />
                  <ProfileInfoRow label="Alamat" value={data.address}  alignTop={true} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center md:justify-end px-10 mb-6">
            <button
              onClick={() => {
                localStorage.removeItem("userData");
                navigate("/");
              }}
              className="flex items-center gap-2 text-red-500 hover:text-red-900 md:text-[20px] lg:text-[16px] font-medium transition"
            >
              <LogOut />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


function ProfileInfoRow({ label, value,alignTop = false }) {
  return (
    <div className={`flex flex-col sm:flex-row ${alignTop ? 'items-start' : 'items-start sm:items-center'} gap-1 sm:gap-0`}>
      <div className="w-full sm:w-40 md:w-48 flex-shrink-0 font-bold text-gray-800 text-sm md:text-base">
        {label}
      </div>
      <div className="hidden sm:block mr-3 font-semibold text-gray-800">:</div>
      <div className="text-gray-700 text-sm md:text-base break-words sm:break-normal flex-1 leading-relaxed font-medium">
        {value || "-"}
      </div>
    </div>
  );
}


function FormClassStudent({ onClose, user }) {
  const { 
    updateUserEmail, 
    updateUserPhoto, 
    updateUserPassword,
    isUpdating 
  } = fetchProfile();

  const [form, setForm] = useState({
    email: user.email || "",
    current_password: "",
    new_password: "",
    new_password_confirmation: ""
  });

  const [previewImage, setPreviewImage] = useState(user.photo || "/images/team/valen.jpg");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (imageFile) {
        await updateUserPhoto(imageFile);
      }

      if (form.email !== user.email) {
        await updateUserEmail(form.email);
      }

      if (form.new_password) {
        const passwordData = {
          current_password: form.current_password,
          new_password: form.new_password,
          new_password_confirmation: form.new_password_confirmation
        };
        await updateUserPassword(passwordData);
      }

      notify("Berhasil Memperbarui Data!", "success");
      onClose();
    } catch (err) {
      notify(err.response?.data?.message || "Terjadi kesalahan saat memperbarui data");
    }
  };

  return (
    <div className="relative justify-center mx-0 md:mx-5 pb-5 mt-4">
      <div>
        <div className="bg-white w-full rounded-3xl border border-gray-200 shadow-md py-5">
          <div className="flex flex-col justify-center items-center gap-3">
             <label className="relative cursor-pointer group">
               <img
                src={previewImage}
                alt="Profile"
                className="w-[150px] h-[150px] md:w-[180px] md:h-[180px] lg:w-[180px] lg:h-[180px] rounded-full object-cover border-4 border-white group-hover:blur-[3px]"
              />
              <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100">
                <span className="text-white text-[16px] md:text-lg font-medium text-center">
                  Ganti Foto<br />Profil
                </span>
              </div>
               <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                 const file = e.target.files[0];
                 if(file) { setImageFile(file); setPreviewImage(URL.createObjectURL(file)); }
               }} />
             </label>
             <div className="text-center">
               <h1 className="text-[24px] font-semibold">{user.name}</h1>
               <p className="text-[14px]">Siswa</p>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="px-5 md:px-10 mt-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="border rounded-md p-2"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium">Password Sekarang</label>
                <input
                  type="password"
                  value={form.current_password}
                  onChange={(e) => setForm({...form, current_password: e.target.value})}
                  className="border rounded-md p-2"
                  placeholder="Masukkan password saat ini"
                />
                <p className="text-sm text-gray-500 italic"><span className="text-red-600">*</span>Kosongkan password jika tidak ingin mengubahnya</p>
              </div>

              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex flex-col flex-1">
                  <label className="mb-2 font-medium">Password Baru</label>
                  <input
                    type="password"
                    value={form.new_password}
                    onChange={(e) => setForm({...form, new_password: e.target.value})}
                    className="border rounded-md p-2"
                    placeholder="Minimal 8 karakter"
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <label className="mb-2 font-medium">Konfirmasi Password Baru</label>
                  <input
                    type="password"
                    value={form.new_password_confirmation}
                    onChange={(e) => setForm({...form, new_password_confirmation: e.target.value})}
                    className="border rounded-md p-2"
                    placeholder="Ulangi password baru"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md font-medium">
                Batal
              </button>
              <button 
                type="submit" 
                disabled={isUpdating}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
              >
                {isUpdating ? "Memproses..." : "Simpan "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}