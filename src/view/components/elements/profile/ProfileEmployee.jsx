

"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function ProfileEmploye() {
  const [user, setUser] = useState(null);
  const [isOpenFrom, setIsOpenFrom] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) setUser(JSON.parse(data));
  }, []);

  if (!user) return null;

  if (isOpenFrom) {
    return (
      <FormClassStudent
        onClose={() => setIsOpenFrom(false)}
        user={user}
      />
    );
  }


  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    navigate("/");
  };


  return (
    <div className="relative justify-center mx-5 pb-5">
      <img
        src="/images/profil/bg-profile.png"
        alt="banner-profile"
        className="w-full h-[140px] block rounded-3xl mt-4 object-cover"
      />

      <div className="-mt-9 relative z-10 px-0  lg:px-[13px]">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-md">

          <div className="px-4 md:px-7 pt-12 pb-16">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">

              <div className="flex gap-6">
                <div className="-mt-24 relative z-20">
                  <div className="bg-white rounded-full ml-2">
                    <img
                      src={user.image || "/images/team/valen.jpg"}
                      alt="Profile"
                      className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] rounded-full object-cover border-4 border-white"
                    />
                  </div>
                </div>

                <div className="mb-2 -mt-5">
                  <h1 className="md:text-[30px] lg:text-[24px] font-semibold text-black">
                    {user.name || "Irwandi Mustabir"}
                  </h1>
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
                  onClick={() => navigate(-1)}
                  className="bg-[#D1D5DB] text-black px-2 py-1.5 md:px-4 md:py-2 rounded-md text-[13px] md:text-[14px] font-medium hover:bg-[#c8cace]"
                >
                  Kembali
                </button>
              </div>
            </div>

            <div className="mt-5">
              <h2 className="text-[20px] md:text-[30px] lg:text-[24px] font-semibold text-black mb-8">
                Informasi Akun
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-6 ml-4 md:ml-4">
                <div className="space-y-5">
                  <InfoRow label="Nama Lengkap" value={user.name} />
                  <InfoRow
                    label="Jenis Kelamin"
                    value={user.gender || "Laki-Laki"}
                  />
                </div>

                <div className="space-y-5">
                  
                  <InfoRow
                    label="Email"
                    value={user.email || "irwandi@skaniga.com"}
                  />
                  <InfoRow
                    label="Alamat"
                    value={user.address || "Jln. Kabupaten Gg. 2"}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center md:justify-end px-10 mb-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 md:text-[20px] lg:text-[16px] font-medium transition"
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


function InfoRow({ label, value }) {
  return (
    <div className="flex items-start ">
      <span className=" md:w-50 lg:w-[38%] font-medium text-[15px] md:text-[25px] lg:text-lg text-black shrink-0">
        {label}
      </span>
      <span className="mx-3 ">:</span>
      <span className="text-[#000000] text-[15px] md:text-[25px] lg:text-lg">
        {value || "-"}
      </span>
    </div>
  );
}


function FormClassStudent({ onClose, user }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    address: "",
  });

  const [previewImage, setPreviewImage] = useState(
    user.image || "/images/team/valen.jpg"
  );
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="relative justify-center mx-2 md:mx-5 pb-5 mt-4">
      <div className="px-[13px]">
        <div className="bg-white w-full rounded-3xl border border-gray-200 shadow-md py-5">

          <div className="flex flex-col justify-center items-center gap-3">
            <label className="relative cursor-pointer group">
              <img
                src={previewImage}
                alt="Profile"
                className="
                  w-[150px] h-[150px] md:w-[180px] md:h-[180px] lg:w-[180px] lg:h-[180px]
                  rounded-full object-cover border-4 border-white
                  group-hover:blur-[3px]
                "
              />
              <div
                className="
                  absolute inset-0 rounded-full
                  flex items-center justify-center
                  bg-black/30
                  opacity-0 group-hover:opacity-100
                "
              >
                <span className="text-white text-[16px] md:text-lg font-medium text-center">
                  Ganti Foto<br />Profil
                </span>
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            <div className="flex flex-col items-center">
              <h1 className="text-[24px] font-semibold">{user.name}</h1>
            </div>
          </div>

          <form>
            <div className="flex flex-col gap-4 mt-6 px-5 md:px-10">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex flex-col flex-1">
                  <label className="mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    placeholder="Masukkan Email"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="border rounded-md p-2"
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <label className="mb-2 font-medium">Password</label>
                  <input
                    type="password"
                    value={form.password}
                    placeholder="Masukkan Password"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="border rounded-md p-2"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium">Alamat</label>
                <input
                  type="text"
                  value={form.address}
                  placeholder="Masukkan Alamat"
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="border rounded-md p-2"
                />
              </div>
            </div>
          </form>

          <div className="flex justify-end gap-4 pr-5 mt-5">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md font-medium hover:bg-[#c8cace]"
            >
              Batal
            </button>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600  text-white rounded-md font-medium">
              Simpan
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

